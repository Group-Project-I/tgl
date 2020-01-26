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

class GenerateReports extends Component {
    state = {
        customer: 'All',
        driver: 'All',
        vehicle: 'All',
        From: '',
        To: '',
        hireType:'All',
        loading: 1
    }

    handleChange = (e) => {
        console.log(e)
        // this.setState({
        //     [e.target.id]: e.value
        // })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addImportHire(this.state) 
        this.setState({
            redir : 1
        })
        
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.customers && this.props.drivers){
            this.setState({
                loading: 0,
                customers: this.props.customers.map((x,y) => {return {name:x.firstName, value:x.id, type:'customer'}}),
                drivers: this.props.drivers,
                vehicles: this.props.vehicles
            });
        }
        
    }

    render() {
        if(this.state.redir === 1){
            return <Redirect to='/admin/hires' />
        }

        const options = [
            // {name: 'Swedish', value: 'sv'},
            // {name: 'English', value: 'en'},
            // this.state.customers ? this.state.customers.map((x,i) => {return {name: x.firstName + " " + x.lastName, value: x.id}}) : null
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
                            <span className="col-3 center">Customer</span>
                            <span className="col-3 center">Driver</span>
                            <span className="col-3 center">Vehicle</span>
                            <span className="col-3 center">Hire Type</span>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <SelectSearch search='true' onChange={this.handleChange} options={this.state.customers ? this.state.customers : null} value="All" id="customer" placeholder="Select Customer" />
                            </div>
                            <div className="col-3">
                                <select className="form-control" id='driver'>
                                    <option value='All'>All</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <select className="form-control" id='vehicle'>
                                    <option value='All'>All</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <select className="form-control" id='hireType'>
                                    <option value='All'>All</option>
                                </select>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop: "20px"}}>
                            <span className="col-2"></span>
                            <span className="col-4 center">From</span>
                            <span className="col-4 center">To</span>
                        </div>
                        <div className="row">
                            <div className="col-2">
                            </div>
                            <div className="col-4">
                                <select id='from'>
                                    <option value='All'>All</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select id='to'>
                                    <option value='All'>All</option>
                                </select>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
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