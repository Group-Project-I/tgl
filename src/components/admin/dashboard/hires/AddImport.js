import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addImportHire} from '../../../../store/actions/adminHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Card from 'react-bootstrap/Card'
import { Squares } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import Modal from 'react-bootstrap/Modal'

class AddImport extends Component {
    state = {
        containerType: '20',
        // pickupLocation: '',
        containerPickupAddressLine1: '',
        containerPickupAddressLine2: '',
        containerPickupCity: '',
        pickupDatetime: '',
        cargoType: '',
        netWeight: '',
        unloadingPort: 'Colombo',
        unloadingTerminal: '',
        vessel: '',
        vesselArrivalDatetime: '',
        destinationAddressLine1: '',
        destinationAddressLine2: '',
        destinationCity: '',
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

    handleUnloadingPort = (e) => {
        if(e.target.value){
            this.setState({
                unloadingPort: e.target.value
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

    handleShow = (e) => {
        e.preventDefault()
        if(this.props.pricing){
            var city = this.props.pricing.filter(item => item.id === this.state.destinationCity.toUpperCase())
            if(city.length && this.state.containerType === '20'){
                this.setState({
                    show: true,
                    cost: city[0].import20ft
                })
            }else if(city.length && this.state.containerType === '40'){
                this.setState({
                    show: true,
                    cost: city[0].import40ft
                })
            }else{
                this.setState({
                    show: true,
                    cost: null
                })
            }
            
        }
        
    }

    handleClose = () => {
        // e.preventDefault();
        this.setState({
          show: false,
        })
    }

    render() {
        if(this.state.redir === 1){
            return <Redirect to='/admin/hires' />
        }
        return (
            this.state.loading === 1 ? (
                <div style={{paddingTop:"300px"}}>
                    <Squares color="#007bff" size={32} speed={1} animating={true} />
                </div>
            ) :
            <Card border="primary">
                <Card.Body>
                    <br/><br/><h2 className="center">Add Import</h2><br/><br/>
                    <form onSubmit={this.handleSubmit} >
                        <div className="row col-4">
                            <select className="form-control" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                                <option value="20">20ft</option>
                                <option value="40">40ft</option>
                            </select>
                        </div>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                            <Card.Body>
                            <br/>
                            <h5>Pick up Date and Time</h5>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <input placeholder="Pickup Date and Time" ref="pickup" onFocus={this.handleDate} type="text" id="pickupDatetime" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <hr/><h5>Location</h5>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <input placeholder="Address Line 1" type="text" id="containerPickupAddressLine1" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Address Line 2" type="text" id="containerPickupAddressLine2" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="City" type="text" id="containerPickupCity" onChange={this.handleChange} required />
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Cargo Details</h4></Card.Header>
                            <Card.Body>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <input placeholder="Cargo Type(s)" type="text" id="cargoType" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Net Weight" type="text" id="netWeight" onChange={this.handleChange} required />
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Unloading Details</h4></Card.Header>
                            <Card.Body>
                            <br/>
                            <hr/><h5>Unloading Port</h5>
                            <div className="row" style={{paddingTop: '50px'}}>
                                <div className="col-4"></div>
                                <select className="form-control col-4" placeholder="Unloading Port" id="unloadingPort" onChange={this.handleLoadingPort} required>
                                    <option value="Colombo">Colombo</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="Unloading Terminal" type="text" id="unloadingTerminal" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <hr/><h5>Vessel Details</h5>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <input placeholder="Vessel" type="text" id="vessel" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Vessel Arrival Date and Time" onFocus={this.handleDate} type="text" id="vesselArrivalDatetime" onChange={this.handleChange} required />
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Destination Address</h4></Card.Header>
                            <Card.Body>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <input placeholder="Address Line 1" type="text" id="destinationAddressLine1" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Address Line 2" type="text" id="destinationAddressLine2" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="City" type="text" id="destinationCity" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div>
                            <div className="input-field center">
                                <button className={this.state.destinationCity ? "btn orange lighten-1 z-depth-5 btnLong" : "invisible"}  id="btnLong" onClick={this.handleShow} >Show Estimate</button>
                            </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <Modal show={this.state.show} onHide={this.handleClose} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                        <Modal.Header closeButton>
                            <Modal.Title> <div className="center">Estimated Cost</div> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='row'>
                                <h5 className='blue-text' style={{paddingRight: '5px'}}>Destination: </h5> {this.state.destinationCity}
                            </div>
                            <div className="row">
                                <h5 className='blue-text' style={{paddingRight: '5px'}}>Container Type: </h5> {this.state.containerType}ft 
                            </div>
                            {this.state.cost ? 
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>Estimated Cost: </h5> Rs.{this.state.cost} 
                                    </div>  
                                    <hr/>
                                    Note that the estimated cost may subject to change.
                                </div>
                                :
                                <div className="row">
                                    No cost estimation available for the provided destinaiton address.
                                </div>  
                            }
                        </Modal.Body>
                        </Modal>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Customer</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    <select className="form-control" id="customerId" onFocus={this.getCustomers} onChange={this.handleCustomer}>
                                        {/* {this.props.customers.sort((a,b) => { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}).reverse().map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)})} */}
                                        {this.state.availableCustomers ?  this.state.availableCustomers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}

                                    </select>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Driver</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    <select className="form-control" id="driverId" onFocus={this.availableDrivers} onChange={this.handleDriver} onBlur={this.handleDriver}>
                                        {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                    </select>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Vehicle</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    <select className="form-control" id="vehicleId" onChange={this.handleVehicle} onFocus={this.availableVehicles} onBlur={this.handleVehicle}>
                                        {this.state.freeVehicles ? this.state.freeVehicles.map((x, i) => {return (<option value={x.id + "_" + x.vehicleNo} key={i}>{x.vehicleNo + " - " + x.trailerNo}</option>)}) : null}
                                    </select>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Remarks</h4></Card.Header>
                            <Card.Body>
                            <div className="input-field row col-12">
                                <textarea placeholder="Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/><br/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-5 btn1" type="submit">Add</button>
                            <button className="btn red lighten-1 z-depth-5 btn1">Cancel</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
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
        addImportHire: (importHire) => dispatch(addImportHire(importHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
        {collection: 'hires'},
        {collection: 'pricing'}
    ])
)(AddImport);