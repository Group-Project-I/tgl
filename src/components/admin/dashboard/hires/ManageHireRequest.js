import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Redirect} from 'react-router-dom'
import {acceptHireRequest} from '../../../../store/actions/adminHireActions'
import {declineHireRequest} from '../../../../store/actions/adminHireActions'
import { Squares } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'

// DIsplays a hire request where the admin can assign a vehcle and a driver to the hire 
// Can also decline a request
class ManageHireRequest extends Component {
    state = {
        driverId: '',
        driverName: '',
        vehicleId: '',
        vehicleNo: '',
        remarks: '',
        loading: 1,
        freeDrivers: '',
        redir: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // Function to accept hire request 
    // hire id, assignment information and customer id are passed to the function (customer is notified when accepted)
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.acceptHireRequest(this.props.hire[0].id, this.state, this.props.hire[0].customerId) 
        this.setState({
            redir : 1
        })     
    }

    // Decline hire request
    // hire id, assignment information and customer id are passed to the function (customer is notified when declined)
    declineHire = (e) => {
        e.preventDefault();
        this.props.declineHireRequest(this.props.hire[0].id, this.state, this.props.hire[0].customerId)
        this.setState({
            redir : 1
        })
    }

    // List of available driver on the pickup date of the hire
    availableDrivers = (e) => {
        const dateTime = this.props.hire[0].pickupDatetime
        const ListH = this.props.hires.filter(item => item.driverId !== "" && item.hireStatus !== "completed")
        if(dateTime && ListH){
            if(ListH && this.props.drivers){
                const driversOnHire = ListH.filter(item => item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.driverId)

                const allDrivers = this.props.drivers.filter(item => item.disabled === false)
                const freeDrivers = allDrivers.filter(function(item) {
                    return !driversOnHire.includes(item.id); 
                  })
                this.setState({
                    freeDrivers: freeDrivers
                });
            }
        }
    }

    // Set state with driver name and id 
    handleDriver = (e) => {
        if(e.target.value){
            const y = e.target.value.split('_')
            this.setState({
                driverId: y[0],
                driverName: y[1]
            })
        }
    }

    // List of available vehicles in the pickup date of the hire
    availableVehicles = (e) => {    
        const dateTime = this.props.hire[0].pickupDatetime   
        const ListH = this.props.hires.filter(item => item.vehicleId !== "" && item.hireStatus !== "completed") 
        if(dateTime && ListH){

            if(ListH && this.props.vehicles){
                const vehiclesOnHire = ListH.filter(item => item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.vehicleId)
               
                const allVehicles = this.props.vehicles.filter(item => item.disabled === false)
                const freeVehicles = allVehicles.filter(function(item) {
                    return !vehiclesOnHire.includes(item.id); 
                  })
                this.setState({
                    freeVehicles: freeVehicles
                });
            }
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
        
        if(this.props.drivers && this.props.hires){
            this.setState({
                ...nextProps,
                loading: 0,
            });
            // this.availableDrivers()
        } 
    }

    // Displays hires assigned to the driver the day before and day after
    handleShowDriver = (e) => {
        e.preventDefault()
        if(this.state.driverId && this.props.hires){
            var hireList = this.props.hires.filter(item => item.driverId === this.state.driverId && (item.hireStatus !== 'completed' || item.hireStatus !== 'declined'))
            var dayBefore = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.props.hire[0].pickupDatetime).add(-1,'days').format().toString().split('T')[0])
            var dayAfter = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.props.hire[0].pickupDatetime).add(1,'days').format().toString().split('T')[0])

            if(dayAfter.length && dayBefore.length){
                this.setState({
                    driverDayBefore: dayBefore[0],
                    driverDayAfter: dayAfter[0],
                    show: true
                })
            }
            else if(dayAfter.length && !dayBefore.length){
                this.setState({
                    driverDayBefore: null,
                    driverDayAfter: dayAfter[0],
                    show: true
                })
            }
            else if(!dayAfter.length && dayBefore.length){
                this.setState({
                    driverDayBefore: dayBefore[0],
                    driverDayAfter: null,
                    show: true
                })
            }
            else{
                this.setState({
                    driverDayBefore: null,
                    driverDayAfter: null,
                    show: true
                })
            }
        }
        
    }

    // // Displays hires assigned to the vehicle the day before and day after
    handleShowVehicle = (e) => {
        e.preventDefault()
        if(this.state.vehicleId && this.props.hires){
            var hireList = this.props.hires.filter(item => item.vehicleId === this.state.vehicleId && (item.hireStatus !== 'completed' || item.hireStatus !== 'declined'))
            var dayBefore = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.props.hire[0].pickupDatetime).add(-1,'days').format().toString().split('T')[0])
            var dayAfter = hireList.filter(item => item.pickupDatetime.toString().split('T')[0] === moment(this.props.hire[0].pickupDatetime).add(1,'days').format().toString().split('T')[0])

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
        this.setState({
          show: false,
          showV: false
        })
    }

    render() {

        if(this.state.redir === 1){
            return <Redirect to='/admin/hires' />
        }
        return (
            this.state.loading === 1 ? (
                <div className="text-center" style={{paddingTop:"500px"}}><Squares color="#007bff" size={32} speed={1} animating={true} /></div>
            ) :
            <div style={{padding:"80px"}}>
                <Card border="primary" >
                    <Card.Body>
                        <br/><br/>
                        <h1 className="center">Hire Request</h1><br/><br/>
                        <div className="container">
                            <div className="col-4" style={{padding: '20px'}}>
                                <h6><b className='blue-text'>Hire Type: </b> {this.props.hire[0].hireType.toUpperCase()}</h6>
                            </div>
                            <div className="col-4" style={{padding: '20px'}}>
                                <h6><b className='blue-text'>Container Type: </b> {this.props.hire[0].containerType}ft</h6>
                            </div>
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Container Pickup Details</h5></Card.Header>
                                <Card.Body>
                                <h6>Location</h6>
                                <div className="row" style={{paddingTop: '40px'}}>
                                    <div className="col-6">
                                        <h6 className="left"><b className='blue-text'>Address Line 1: </b> {this.props.hire[0].containerPickupAddressLine1}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="left"><b className='blue-text'>Address Line 2: </b> {this.props.hire[0].containerPickupAddressLine2}</h6>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-6">
                                        <h6 className="left"><b className='blue-text'>City: </b> {this.props.hire[0].containerPickupCity}</h6>
                                    </div>
                                </div> 
                                <hr/>
                                <div className="row" style={{paddingTop: '40px'}}>
                                    <div className="col-6">
                                        <h6 className="left"><b className='blue-text'>Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                            {this.props.hire[0].hireType === "import" ? 
                                <div>
                                    <br/>
                                    <Card border="primary" className="text-center">
                                        <Card.Header color="blue"><h5>Cargo Details</h5></Card.Header>
                                        <Card.Body>
                                        <div className="row" style={{paddingTop: '40px'}}>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Net Weight: </b> {this.props.hire[0].netWeight}</h6>
                                            </div>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    <Card border="primary" className="text-center">
                                        <Card.Header color="blue"><h5>Unloading Details</h5></Card.Header>
                                        <Card.Body>
                                        <div className="row" style={{paddingTop: '40px'}}>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Unloading Port: </b> {this.props.hire[0].unloadingPort}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Unloading Terminal: </b> {this.props.hire[0].unloadingTerminal}</h6>
                                            </div>
                                        </div>
                                        <hr/><h6>Vessel Details</h6>
                                        <div className="row" style={{paddingTop: '40px'}}>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Vessel: </b> {this.props.hire[0].vessel}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text center'>Vessel Arrival Date: </b> {moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                            </div>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    <Card border="primary" className="text-center">
                                        <Card.Header>Destination Address</Card.Header>
                                        <Card.Body>
                                        <div className="row" style={{paddingTop: '40px'}}>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Address Line 1: </b> {this.props.hire[0].destinationAddressLine1}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Address Line 2: </b> {this.props.hire[0].destinationAddressLine2}</h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>City: </b> {this.props.hire[0].destinationCity}</h6>
                                            </div>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                </div> : 
                                <div>
                                    <br/>
                                    <Card border="primary" className="text-center">
                                        <Card.Header color="blue"><h5>Cargo Details</h5></Card.Header>
                                        <Card.Body>
                                        <h6>Location</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Address Line 1: </b> {this.props.hire[0].cargoLocationAddressLine1}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Address Line 2: </b> {this.props.hire[0].cargoLocationAddressLine2}</h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>City: </b> {this.props.hire[0].cargoLocationCity}</h6>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row" style={{paddingTop: '40px'}}>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Cargo Type(s): </b> {this.props.hire[0].cargoType}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Net Weight: </b> {this.props.hire[0].netWeight}</h6>
                                            </div>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                    <Card border="primary" className="text-center">
                                        <Card.Header color="blue"><h5>Loading Details</h5></Card.Header>
                                        <Card.Body>
                                        <div className="row" style={{paddingTop: '40px'}}>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Loading Terminal: </b> {this.props.hire[0].loadingTerminal}</h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left"><b className='blue-text'>Vessel: </b> {this.props.hire[0].vessel}</h6>
                                            </div>
                                        </div>
                                        </Card.Body>
                                    </Card>
                                </div> 
                            }    
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Customer</h5></Card.Header>
                                <Card.Body>
                                <div className="row" style={{paddingTop: '40px'}}>
                                    <div className="col-3">
                                        <h6 className="left"><b className='blue-text'>Name: </b> {this.props.hire[0].customerName}</h6>
                                    </div>
                                    <div className="col-3">
                                        <h6 className="left"><b className='blue-text'>Mobile: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}</h6>
                                    </div>
                                    <div className="col-4">
                                        <h6 className="left"><b className='blue-text'>Email: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}</h6>
                                    </div>
                                    <div className="col-2">
                                        <h6 className="left"><b className='blue-text'>NIC: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}</h6>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="container">
                            <form onSubmit={this.handleSubmit} >
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Assign Driver</h5></Card.Header>
                                    <Card.Body>
                                    <div className="row" style={{paddingTop: '40px'}} >
                                        <div className="input-field col-6">
                                            <select className="form-control" id="driverId" onFocus={this.availableDrivers} onChange={this.handleDriver} onBlur={this.handleDriver} onInput={this.handleDriver}>
                                                {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                            </select>
                                        </div>
                                        <div className="input-field col-6 center">
                                            <button className="btn orange lighten-1 z-depth-5 btnLong" id="btnLong" onClick={this.handleShowDriver} >Check Activity</button>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>
                                <Modal show={this.state.show} onHide={this.handleClose} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                                <Modal.Header closeButton>
                                    <Modal.Title> <div className="center">Driver Activity</div> </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {this.state.driverDayBefore ? 
                                        <div>
                                            <div className="row">
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
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
                                    <Card.Header color="blue"><h5>Assign Vehicle</h5></Card.Header>
                                    <Card.Body>
                                    <div className="row" style={{paddingTop: '40px'}}>
                                        <div className="input-field col-6">
                                            <select className="form-control" id="vehicleId" onFocus={this.availableVehicles} onChange={this.handleVehicle} onBlur={this.handleVehicle} required>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(-1,'days').format('MMMM Do YYYY')} </h5>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
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
                                                <h5 className='blue-text' style={{paddingRight: '5px'}}>{moment(this.props.hire[0].pickupDatetime).add(1,'days').format('MMMM Do YYYY')} </h5>
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
                                    <Card.Header color="blue"><h5>Remarks</h5></Card.Header>
                                    <Card.Body>
                                    <div className="input-field row col-12" style={{paddingTop: '40px'}}>
                                        <textarea placeholder="Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)" value={this.state.hire[0].remarks} style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                                    </div>
                                    </Card.Body>
                                </Card>
                                <br/><br/>
                                <div className="input-field center">
                                    <button className="btn blue lighten-1 z-depth-5 btn1" type="submit">Add</button>
                                    <button className="btn red lighten-1 z-depth-5 btn1" onClick={this.declineHire}>Decline</button>
                                </div>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )     
        
    }
}

const mapStateToProps = (state) => {
    return{
        customer: state.firestore.ordered.customers,
        drivers: state.firestore.ordered.drivers,
        vehicles: state.firestore.ordered.vehicles,
        hires: state.firestore.ordered.hires
    }
}

// Accepting and declining functions mapped to props
const mapDispatchToProps = (dispatch) => {
    return {
        acceptHireRequest: (id, hireRequest, customerId) => dispatch(acceptHireRequest(id, hireRequest, customerId)),
        declineHireRequest: (id, hireRequest, customerId) => dispatch(declineHireRequest(id, hireRequest, customerId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'customers'},
        {collection: 'drivers'},
        {collection: 'vehicles'},
    ])
)(ManageHireRequest);
