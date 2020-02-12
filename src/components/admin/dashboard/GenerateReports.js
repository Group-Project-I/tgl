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
        loading: 1
    }

    handleChange = (e) => {
        console.log(e.type)
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
        console.log(this.state)
        if(this.props.hires){
            this.setState({
                hires: this.props.hires
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
                <div style={{paddingTop:"300px"}}>
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
                <div>
                    <Report hires={this.state.hires}></Report>
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

const mapDispatchToProps = (dispatch) => {
    return {
        // addImportHire: (importHire) => dispatch(addImportHire(importHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
        {collection: 'hires'},
    ])
)(GenerateReports);