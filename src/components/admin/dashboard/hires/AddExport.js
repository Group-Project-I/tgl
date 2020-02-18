import React, {Component} from 'react'
import {Redirect, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addExportHire} from '../../../../store/actions/adminHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import Card from 'react-bootstrap/Card'
import {compose} from 'redux'
import { Squares } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'

// Form to add an export hire
// Driver can add exports on behalf of customers 
// List of customers will be available to select from

class AddExport extends Component {
    state = {
        containerType: '20',
        // containerPickupLocation: '',
        containerPickupAddressLine1: '',
        containerPickupAddressLine2: '',
        containerPickupCity: '',
        pickupDatetime: '',
        cargoLocationAddressLine1: '',
        cargoLocationAddressLine2: '',
        cargoLocationCity: '',
        cargoType: '',
        netWeight: '',
        loadingPort: 'Colombo',
        loadingTerminal: '',
        vessel: '',
        loadingDatetime: '',
        driverId: '',
        driverName: '',
        customerId: '',
        customerName: '',
        vehicleId: '',
        vehicleNo: '',
        remarks: 'None',
        loading: 1,
        freeDrivers: '',
        availableCustomers: '',
        redir: 0
    }

    // Update state and display label for input field on click
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        var tag = e.target.id+"Tag"
        document.getElementById(tag).style.display = "block"
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addExportHire(this.state)
        this.setState({
            redir : 1
        })
    }

    // Update field to type date on click 
    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'datetime-local'

        var iso = new Date().toISOString();
        var minDate = iso.substring(0,iso.length-8);
        e.target.min = minDate

        var tag = e.target.id+"Tag"
        document.getElementById(tag).style.display = "block"
    }

    // Update state of the container type
    handleContainerType = (e) => {
        if(e.target.value){
            this.setState({
                containerType: e.target.value
            })
        }
    }

    // Update state of the loading port
    handleLoadingPort = (e) => {
        if(e.target.value){
            this.setState({
                loadingPort: e.target.value
            })
        }
    }

    // Adds the customer name and id to the state
    handleCustomer = (e) => {
        if(e.target.value){
            const x = e.target.value.split('_')
            this.setState({
                customerId: x[0],
                customerName: x[1]
            })
        }
    }

    // Gets the list of customers
    getCustomers = (e) => {
        if(this.props.customers){
            const availableCustomers = this.props.customers.sort((a,b) => { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}).reverse()
            this.setState({
                availableCustomers: availableCustomers.filter(item => item.disabled === false)
            })
        }
    }

    // Filters the list of available drivers
    // A driver is available if there are no hires assigned for the driver in the pickup date of the hire
    availableDrivers = (e) => {

        const dateTime = this.refs.pickup.value

        if(dateTime){
            if(this.props.hires && this.props.drivers){
                const driversOnHire = this.props.hires.filter(item => item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.driverId)

                const allDrivers = this.props.drivers.filter(item => item.disabled === false)
                const freeDrivers = allDrivers.filter(function(item) {
                    return !driversOnHire.includes(item.id); 
                  })
                this.setState({
                    freeDrivers: freeDrivers
                });
            }
        }else{
            this.setState({
                freeDrivers: [{id: 0, firstName: 'Please Select a', lastName: 'pickup date', mobile: ''}]
            });
        }
    }

    // Updates state with driver name and id
    handleDriver = (e) => {
        if(e.target.value){
            const y = e.target.value.split('_')
            this.setState({
                driverId: y[0],
                driverName: y[1]
            })
        }
    }

    // Filters the list of available vehicles
    // A vehicle is available if there are no hires assigned for the vehicle in the pickup date of the hire
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

    // Update state with vehicle number and id
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

    // Show estimate popup
    handleShowEstimate = (e) => {
        e.preventDefault()
        if(this.props.pricing){
            var city = this.props.pricing.filter(item => item.id === this.state.cargoLocationCity.toUpperCase())
            if(city.length && this.state.containerType === '20'){
                this.setState({
                    show: true,
                    cost: city[0].export20ft
                })
            }else if(city.length && this.state.containerType === '40'){
                this.setState({
                    show: true,
                    cost: city[0].export40ft
                })
            }else{
                this.setState({
                    show: true,
                    cost: null
                })
            }
            
        }
        
    }

    // Show driver assignments on the day before and after popup
    handleShowDriver = (e) => {
        e.preventDefault()
        if(this.state.driverId && this.props.hires && this.state.pickupDatetime){
            var hireList = this.props.hires.filter(item => item.driverId === this.state.driverId && (item.hireStatus !== 'completed' || item.hireStatus !== 'declined'))
            var dayBefore = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.state.pickupDatetime).add(-1,'days').format().toString().split('T')[0])
            var dayAfter = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.state.pickupDatetime).add(1,'days').format().toString().split('T')[0])

            if(dayAfter.length && dayBefore.length){
                this.setState({
                    driverDayBefore: dayBefore[0],
                    driverDayAfter: dayAfter[0],
                    showD: true
                })
            }
            else if(dayAfter.length && !dayBefore.length){
                this.setState({
                    driverDayBefore: null,
                    driverDayAfter: dayAfter[0],
                    showD: true
                })
            }
            else if(!dayAfter.length && dayBefore.length){
                this.setState({
                    driverDayBefore: dayBefore[0],
                    driverDayAfter: null,
                    showD: true
                })
            }
            else{
                this.setState({
                    driverDayBefore: null,
                    driverDayAfter: null,
                    showD: true
                })
            }
        }
        
    }

    // Show vehicle assignments on the day before and after popup
    handleShowVehicle = (e) => {
        e.preventDefault()
        if(this.state.vehicleId && this.props.hires){
            var hireList = this.props.hires.filter(item => item.vehicleId === this.state.vehicleId && (item.hireStatus !== 'completed' || item.hireStatus !== 'declined'))
            var dayBefore = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.state.pickupDatetime).add(-1,'days').format().toString().split('T')[0])
            var dayAfter = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.state.pickupDatetime).add(1,'days').format().toString().split('T')[0])

            if(dayAfter.length && dayBefore.length){
                this.setState({
                    vehiclerDayBefore: dayBefore[0],
                    vehicleDayAfter: dayAfter[0],
                    showV: true
                })
            }
            else if(dayAfter.length && !dayBefore.length){
                this.setState({
                    vehicleDayBefore: null,
                    vehicleDayAfter: dayAfter[0],
                    showV: true
                })
            }
            else if(!dayAfter.length && dayBefore.length){
                this.setState({
                    vehicleDayBefore: dayBefore[0],
                    vehicleDayAfter: null,
                    showV: true
                })
            }
            else{
                this.setState({
                    vehicleDayBefore: null,
                    vehicleDayAfter: null,
                    showV: true
                })
            }
        }
        
    }


    handleClose = () => {
        // e.preventDefault();
        this.setState({
          show: false,
          showD: false,
          showV: false
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
                    <br/><br/><h2 className="center">Add Export</h2><br/><br/>
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
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <p id="containerPickupAddressLine1Tag" style={{display:'none',fontFamily:'Times New Roman'}}>Address Line 1</p>
                                    <input placeholder="Address Line 1" type="text" id="containerPickupAddressLine1" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                <p id="containerPickupAddressLine2Tag" style={{display:'none',fontFamily:'Times New Roman'}}>Address Line 2</p>
                                    <input placeholder="Address Line 2" type="text" id="containerPickupAddressLine2" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <p id="containerPickupCityTag" style={{display:'none',fontFamily:'Times New Roman'}}>City</p>
                                    <input placeholder="City" type="text" id="containerPickupCity" onChange={this.handleChange} required />
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header><h4>Cargo Details</h4></Card.Header>
                            <Card.Body>
                            <br/>
                            <h5>Pick up Date and Time</h5>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <p id="pickupDatetimeTag" style={{display:'none',fontFamily:'Times New Roman'}}>Cargo Pickup Date and Time(01/25/2001 01:00:PM)</p>
                                    <input placeholder="Cargo Pickup Date and Time" onFocus={this.handleDate} ref="pickup" type="text" id="pickupDatetime"  onChange={this.handleChange} required />    
                                </div>
                            </div>
                            <hr/><h5>Location</h5> 
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <p id="cargoLocationAddressLine1Tag" style={{display:'none',fontFamily:'Times New Roman'}}>Address Line 1</p>
                                    <input placeholder="Address Line 1" type="text" id="cargoLocationAddressLine1" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <p id="cargoLocationAddressLine2Tag" style={{display:'none',fontFamily:'Times New Roman'}}>Address Line 2</p>
                                    <input placeholder="Address Line 2" type="text" id="cargoLocationAddressLine2" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <p id="cargoLocationCityTag" style={{display:'none',fontFamily:'Times New Roman'}}>City</p>
                                    <input placeholder="City" type="text" id="cargoLocationCity" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div>
                            <div className="input-field center">
                                <button className={this.state.cargoLocationCity ? "btn orange lighten-1 z-depth-5 btnLong" : "invisible"}  onClick={this.handleShowEstimate} >Show Estimate</button>
                            </div>
                            </div>
                            <hr/>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <p id="cargoTypeTag" style={{display:'none',fontFamily:'Times New Roman'}}>Cargo Type(s)</p>
                                    <input placeholder="Cargo Type(s)" type="text" id="cargoType" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field col-6">
                                    <p id="netWeightTag" style={{display:'none',fontFamily:'Times New Roman'}}>Net Weight</p>
                                    <input placeholder="Net Weight" type="text" id="netWeight" onChange={this.handleChange} required/>
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
                                <h5 className='blue-text' style={{paddingRight: '5px'}}>Cargo Location: </h5> {this.state.cargoLocationCity}
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
                            <Card.Header><h4>Loading Details</h4></Card.Header>
                            <Card.Body>
                            <br/>
                            <hr/><h5>Loading Port</h5>
                            <div className="row" style={{paddingTop: '50px'}}>
                                <div className="col-4"></div>
                                <select className="form-control col-4" placeholder="Loading Port" id="loadingPort" onChange={this.handleLoadingPort} required>
                                    <option value="Colombo">Colombo</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <p id="loadingTerminalTag" style={{display:'none',fontFamily:'Times New Roman'}}>Loading Terminal</p>
                                    <input placeholder="Loading Terminal" type="text" id="loadingTerminal" onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row" style={{paddingTop: '40px'}}> 
                                <div className="input-field col-6">
                                    <p id="loadingDatetimeTag" style={{display:'none',fontFamily:'Times New Roman'}}>Loading Date and Time(01/25/2000 10:00:AM)</p>
                                    <input placeholder="Loading Date and Time" onFocus={this.handleDate} type="text" id="loadingDatetime" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <p id="vesselTag" style={{display:'none',fontFamily:'Times New Roman'}}>Vessel</p>
                                    <input placeholder="Vessel" type="text" id="vessel" onChange={this.handleChange} required/>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header><h4>Customer</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    <select className="form-control" id="customerId" onFocus={this.getCustomers} onChange={this.handleCustomer}>
                                        {this.state.availableCustomers ?  this.state.availableCustomers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                    </select>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header><h4>Assign Driver</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    <select className="form-control" id="driverId" onFocus={this.availableDrivers} onChange={this.handleDriver} onBlur={this.handleDriver}>
                                        {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                    </select>
                                </div>
                                <div className="input-field col-6 center">
                                    <button className="btn orange lighten-1 z-depth-5 btnLong"  onClick={this.handleShowDriver} >Check Activity</button>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <Modal show={this.state.showD} onHide={this.handleClose} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                        <Modal.Header closeButton>
                            <Modal.Title> <div className="center">Driver Activity</div> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.driverDayBefore ? 
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>Hire Type: {this.state.driverDayBefore.hireType.toUpperCase()}</h6>
                                        <h6>Pickup: {moment(this.state.driverDayBefore.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                        <h6>Location: {this.state.driverDayBefore.hireType === 'import' ? this.state.driverDayBefore.destinationCity : this.state.driverDayBefore.cargoLocationCity}</h6>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>No assigned hires for this date</h6>
                                    </div>
                                </div>  
                            }
                            <hr/>
                            {this.state.driverDayAfter ? 
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>Hire Type: {this.state.driverDayAfter.hireType.toUpperCase()}</h6>
                                        <h6>Pickup: {moment(this.state.driverDayAfter.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                        <h6>Location: {this.state.driverDayAfter.hireType === 'import' ? this.state.driverDayAfter.destinationCity : this.state.driverDayAfter.cargoLocationCity}</h6>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>No assigned hires for this date</h6>
                                    </div>
                                </div> 
                            }
                        </Modal.Body>
                        </Modal>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header><h4>Assign Vehicle</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    <select className="form-control" id="vehicleId" onChange={this.handleVehicle} onFocus={this.availableVehicles} onBlur={this.handleVehicle}>
                                        {this.state.freeVehicles ? this.state.freeVehicles.map((x, i) => {return (<option value={x.id + "_" + x.vehicleNo} key={i}>{x.vehicleNo + " - " + x.trailerNo}</option>)}) : null}
                                    </select>
                                </div>
                                <div className="input-field col-6 center">
                                    <button className="btn orange lighten-1 z-depth-5 btnLong" onClick={this.handleShowVehicle} >Check Activity</button>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        <Modal show={this.state.showV} onHide={this.handleClose} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                        <Modal.Header closeButton>
                            <Modal.Title> <div className="center">Vehicle Activity</div> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.vehicleDayBefore ? 
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>Hire Type: {this.state.vehicleDayBefore.hireType.toUpperCase()}</h6>
                                        <h6>Pickup: {moment(this.state.vehicleDayBefore.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                        <h6>Location: {this.state.vehicleDayBefore.hireType === 'import' ? this.state.vehicleDayBefore.destinationCity : this.state.vehicleDayBefore.cargoLocationCity}</h6>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>No assigned hires for this date</h6>
                                    </div>
                                </div>  
                            }
                            <hr/>
                            {this.state.vehicleDayAfter ? 
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>Hire Type: {this.state.vehicleDayAfter.hireType.toUpperCase()}</h6>
                                        <h6>Pickup: {moment(this.state.vehicleDayAfter.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                        <h6>Location: {this.state.vehicleDayAfter.hireType === 'import' ? this.state.vehicleDayAfter.destinationCity : this.state.vehicleDayAfter.cargoLocationCity}</h6>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.state.pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
                                    </div>  
                                    <div>
                                        <h6>No assigned hires for this date</h6>
                                    </div>
                                </div> 
                            }
                        </Modal.Body>
                        </Modal>
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header><h4>Remarks</h4></Card.Header>
                            <Card.Body>
                            <div className="input-field row col-12">
                                <p id="remarksTag" style={{display:'none',fontFamily:'Times New Roman'}}>Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)</p>
                                <textarea placeholder="Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange} />
                            </div>
                            </Card.Body>
                        </Card>
                        <input type="hidden" id="hireType" value="export"/><br/><br/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-5 btn1">Add</button>
                            <NavLink to='/admin'><button className="btn red lighten-1 z-depth-5 btn1">Cancel</button></NavLink>
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
        addExportHire: (exportHire) => dispatch(addExportHire(exportHire))
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
)(AddExport);