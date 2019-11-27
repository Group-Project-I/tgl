import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addImportHire} from '../../../../store/actions/adminHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
// import { thisExpression } from '@babel/types'

class AddImport extends Component {
    state = {
        containerType: '20',
        pickupLocation: '',
        pickupDatetime: '',
        cargoType: '',
        weight: '',
        unloadingPort: '',
        vesselArrivalDatetime: '',
        destination: '',
        driverId: '',
        driverName: '',
        customerId: '',
        customerName: '',
        vehicleId: '',
        vehicleNo: '',
        remarks: '',
        loading: 1,
        freeDrivers: '',
        availableCustomers: '',
        redir: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addImportHire(this.state) 
        this.setState({
            redir : 1
        })
        
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'datetime-local'
    }

    handleContainerType = (e) => {
        if(e.target.value){
            this.setState({
                containerType: e.target.value
            })
        }
    }

    handleCustomer = (e) => {
        if(e.target.value){
            const x = e.target.value.split('_')
            this.setState({
                customerId: x[0],
                customerName: x[1]
            })
        }
    }

    getCustomers = (e) => {
        if(this.props.customers){
            const availableCustomers = this.props.customers.sort((a,b) => { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}).reverse()
            this.setState({
                availableCustomers: availableCustomers.filter(item => item.disabled === false)
            })
        }
    }

    availableDrivers = (e) => {
        const dateTime = this.refs.pickup.value

        if(dateTime){
            if(this.props.hires && this.props.drivers){
                const driversOnHire = this.props.hires.filter(item =>item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.driverId)

                const allDrivers = this.props.drivers
                const freeDrivers = allDrivers.filter(function(item) {
                    return !driversOnHire.includes(item.id); 
                  })
                this.setState({
                    freeDrivers: freeDrivers.filter(item => item.disabled === false)
                });
            }
        }else{
            this.setState({
                freeDrivers: [{id: 0, firstName: 'Please Select a', lastName: 'pickup date', mobile: ''}]
            });
        }
    }

    handleDriver = (e) => {
        if(e.target.value){
            const y = e.target.value.split('_')
            this.setState({
                driverId: y[0],
                driverName: y[1]
            })
        }
    }

    availableVehicles = (e) => {
        const dateTime = this.refs.pickup.value
        
        if(dateTime){
            if(this.props.hires && this.props.vehicles){
                const vehiclesOnHire = this.props.hires.filter(item => item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.vehicleId)
               
                const allVehicles = this.props.vehicles.filter(item => item.disabled === false)
                const freeVehicles = allVehicles.filter(function(item) {
                    return !vehiclesOnHire.includes(item.id); 
                  })
                this.setState({
                    freeVehicles: freeVehicles
                });
            }
        }else{
            this.setState({
                freeVehicles: [{id: 0, vehicleNo: 'Please Select a pickup date', trailerNo: ''}]
            });
        }
    }

    handleVehicle = (e) => {
        if(e.target.value){
            const x = e.target.value.split('_')
            this.setState({
                vehicleId: x[0],
                vehicleNo: x[1]
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.customers && this.props.drivers){
            this.setState({
                loading: 0,
            });
        }
        
    }

    render() {
        if(this.state.redir === 1){
            return <Redirect to='/admin/hires' />
        }
        return (
            this.state.loading === 1 ? (
                <div><br/><br/><br/><br/><h1>Loading</h1></div>
            ) :
            <div>
                <br/><br/>
                <h2 className="center">Add Import</h2><br/><br/>
                <form onSubmit={this.handleSubmit} >
                    <div className="row col-4">
                        <select className="form-control" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                            <option value="20">20ft</option>
                            <option value="40">40ft</option>
                        </select>
                    </div>
                    <br/><hr/><h5>Container Pickup Details</h5> <br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Pickup Location" type="text" id="pickupLocation" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input placeholder="Pickup Date and Time" ref="pickup" onFocus={this.handleDate} type="text" id="pickupDatetime" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <br/><hr/><h5>Cargo Details</h5> <br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Cargo Type" type="text" id="cargoType" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input placeholder="Weight" type="text" id="weight" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <br/><hr/><h5>Unloading Details</h5><br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="unloading Port" type="text" id="unloadingPort" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input placeholder="Vessel Arrival Date and Time" onFocus={this.handleDate} type="text" id="vesselArrivalDatetime" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Destination" type="text" id="destination" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <br/><hr/><h5>Customer</h5><br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <select className="form-control" id="customerId" onFocus={this.getCustomers} onChange={this.handleCustomer}>
                                {/* {this.props.customers.sort((a,b) => { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}).reverse().map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)})} */}
                                {this.state.availableCustomers ?  this.state.availableCustomers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}

                            </select>
                        </div>
                    </div>
                    <br/><hr/><h5>Driver</h5><br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <select className="form-control" id="driverId" onFocus={this.availableDrivers} onChange={this.handleDriver} onBlur={this.handleDriver}>
                                {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                            </select>
                        </div>
                    </div>
                    <br/><hr/><h5>Vehicle</h5><br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <select className="form-control" id="vehicleId" onChange={this.handleVehicle} onFocus={this.availableVehicles} onBlur={this.handleVehicle}>
                                {this.state.freeVehicles ? this.state.freeVehicles.map((x, i) => {return (<option value={x.id + "_" + x.vehicleNo} key={i}>{x.vehicleNo + " - " + x.trailerNo}</option>)}) : null}
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="input-field row col-12">
                        <textarea placeholder="Remarks" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                    </div>
                    <br/><br/>
                    <div className="input-field center">
                        <button className="btn blue lighten-1 z-depth-5 btn1" type="submit">Add</button>
                        <button className="btn red lighten-1 z-depth-5 btn1">Cancel</button>
                    </div>
                </form>
            </div>
        )     
        
    }
}

const mapStateToProps = (state) => {
    return{
        customers: state.firestore.ordered.customers,
        drivers: state.firestore.ordered.drivers,
        vehicles: state.firestore.ordered.vehicles,
        hires: state.firestore.ordered.hires
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addImportHire: (importHire) => dispatch(addImportHire(importHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
        {collection: 'hires'}
    ])
)(AddImport);