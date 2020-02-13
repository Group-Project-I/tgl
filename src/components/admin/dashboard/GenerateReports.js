import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Card from 'react-bootstrap/Card'
import { Squares } from 'react-activity'
import 'react-activity/dist/react-activity.css'
import moment from 'moment'
import SelectSearch from 'react-select-search'
import Report from './Report'

class GenerateReports extends Component {
    state = {
        customer: 'All',
        driver: 'All',
        vehicle: 'All',
        From: '',
        To: '',
        hireType:'All',
        customerId: '',
        driverId: '',
        vehicleId: '',
        hireTypeId:'',
        hires: '',
        loading: 1,
        valid: 0
    }

    handleChange = (e) => {
        // console.log(e.type)
        this.setState({
            [e.type + 'Id']: e.value,
            [e.type]: e.name
        })
    }

    handleChangeDate = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const dateTo = moment(this.state.To)
        const dateFrom = moment(this.state.From)
        if(this.props.hires){
            const hireList = this.props.hires.filter(item => item.hireStatus === 'completed' && moment(item.completedDatetime.toDate()).isBetween(dateFrom,dateTo))
            const filteredHires = hireList.filter(item => this.state.customerId ?  item.customerId === this.state.customerId : 1 && 
                                                    this.state.driverId ? item.driverId === this.state.driverId : 1 && 
                                                    this.state.vehicleId ? item.vehicleId === this.state.vehicleId : 1 && 
                                                    this.state.hireTypeId ? item.hireType === this.state.hireTypeId : 1)
            this.setState({
                hires: filteredHires,
                valid: 1
            })
        }
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.customers && this.props.drivers && this.props.vehicles){
            this.setState({
                loading: 0,
                customers: this.props.customers.map((x,y) => {return {name:x.firstName + ' ' + x.lastName, value:x.id, type:'customer'}}),
                drivers: this.props.drivers.map((x,y) => {return {name:x.firstName + ' ' + x.lastName, value:x.id, type:'driver'}}),
                vehicles: this.props.vehicles.map((x,y) => {return {name:x.vehicleNo, value:x.id, type:'vehicle'}})
            });
        }
        
    }

    render() {
        if(this.state.redir === 1){
            return <Redirect to='/admin/hires' />
        }

        const hireType = [
            {name: 'Import', value: 'import', type:'hireType'},
            {name: 'Export', value: 'export', type:'hireType'},
        ];
        return (
            this.state.loading === 1 ? (
                <div style={{paddingTop:"400px",paddingLeft:"800px"}}>
                    <Squares color="#007bff" size={32} speed={1} animating={true} />
                </div>
            ) :
            <div style={{padding:'80px'}}>
                <Card border="primary"> 
                    <Card.Header><h4>Generate Report</h4></Card.Header>
                    <Card.Body>
                        <div className="row" style={{paddingTop: "20px"}}>
                            <span className="col-3 center"><h6>Customer</h6></span>
                            <span className="col-3 center"><h6>Driver</h6></span>
                            <span className="col-3 center"><h6>Vehicle</h6></span>
                            <span className="col-3 center"><h6>Hire Type</h6></span>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-3">
                                    <SelectSearch search='true' onChange={this.handleChange} options={this.state.customers ? this.state.customers : null} value="All" id="customer" placeholder={this.state.customer} />
                                </div>
                                <div className="col-3">
                                    <SelectSearch search='true' onChange={this.handleChange} options={this.state.drivers ? this.state.drivers : null} value="All" id="driver" placeholder={this.state.driver} />
                                </div>
                                <div className="col-3">
                                    <SelectSearch search='true' onChange={this.handleChange} options={this.state.vehicles ? this.state.vehicles : null} value="All" id="vehicle" placeholder={this.state.vehicle} />
                                </div>
                                <div className="col-3">
                                    <SelectSearch search='true' onChange={this.handleChange} options={hireType} value="All" id="hireType" placeholder={this.state.hireType} />
                                </div>
                            </div>
                            <div className="row" style={{paddingTop: "20px"}}>
                                <span className="col-2"></span>
                                <span className="col-4 center"><h6>From</h6></span>
                                <span className="col-4 center"><h6>To</h6></span>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                </div>
                                <div className="col-4">
                                    <input placeholder="Select Date" onFocus={this.handleDate} ref="pickup" type="text" id="From"  onChange={this.handleChangeDate} required />    
                                </div>
                                <div className="col-4">
                                    <input placeholder="Select Date" onFocus={this.handleDate} ref="pickup" type="text" id="To"  onChange={this.handleChangeDate} required />    
                                </div>
                            </div>
                            <div className="row" style={{paddingTop: "20px"}}>
                                <div className="col-5"></div>
                                <button className="col-2 btn blue lighten-1 z-depth-5 btnLong">Generate</button> 
                            </div>
                        </form>
                    </Card.Body>
                </Card>
                <div style={{paddingTop:'20px'}}>
                    <Report hires={this.state.hires.length ? this.state.hires : null}></Report>
                    {!this.state.hires.length && this.state.valid === 1 ? 
                        <h6 className="center">No Records Available</h6> : null
                    }
                </div>
            </div>
        )
                 
        
    }
}

const mapStateToProps = (state) => {
    return{
        customers: state.firestore.ordered.customers,
        drivers: state.firestore.ordered.drivers,
        vehicles: state.firestore.ordered.vehicles,
        hires: state.firestore.ordered.hires,
        pricing: state.firestore.ordered.pricing
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
        {collection: 'hires'},
    ])
)(GenerateReports);