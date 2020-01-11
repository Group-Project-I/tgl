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

class ManagePendingHires extends Component {
    state = {
        loading: 1,
        freeDrivers: '',
        redir: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.acceptHireRequest(this.props.hire[0].id, this.state) 
        // console.log(this.state)
        this.setState({
            redir : 1
        })     
    }

    declineHire = (e) => {
        e.preventDefault();
        this.props.declineHireRequest(this.props.hire[0].id, this.state)
        this.setState({
            redir : 1
        })
    }

    availableDrivers = (e) => {
        const dateTime = this.props.hire[0].pickupDatetime
        const ListH = this.props.hires.filter(item => item.driverId !== "" && item.hireStatus !== "completed")
        if(dateTime && ListH){
            if(ListH && this.props.drivers){
                const driversOnHire = ListH.filter(item => item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.driverId)

                const allDrivers = this.props.drivers
                const freeDrivers = allDrivers.filter(function(item) {
                    return !driversOnHire.includes(item.id); 
                  })
                this.setState({
                    freeDrivers: freeDrivers
                });
            }
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
        const dateTime = this.props.hire[0].pickupDatetime   
        const ListH = this.props.hires.filter(item => item.vehicleId !== "" && item.hireStatus !== "completed") 
        if(dateTime && ListH){

            if(ListH && this.props.vehicles){
                const vehiclesOnHire = ListH.filter(item => item.pickupDatetime.toString().split('T')[0] === dateTime.toString().split('T')[0]).map(a => a.vehicleId)
               
                const allVehicles = this.props.vehicles
                const freeVehicles = allVehicles.filter(function(item) {
                    return !vehiclesOnHire.includes(item.id); 
                  })
                this.setState({
                    freeVehicles: freeVehicles
                });
            }
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
        
        if(this.props.drivers && this.props.hires){
            this.setState({
                ...nextProps,
                loading: 0,
                driverId: this.props.hire[0].driverId,
                driverName: this.props.hire[0].driverName,
                vehicleId: this.props.hire[0].vehicleId,
                vehicleNo: this.props.hire[0].vehicleNo,
                remarks: this.props.hire[0].remarks
            });
            this.availableDrivers()
        }
        
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
                <Card border="primary">
                    <Card.Body>
                    <br/><br/>
                    <h1 className="center">Hire Request - Driver Pending</h1><br/><br/>
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
                            <div className="row" style={{padding: '20px'}}>
                                <div className="col-6">
                                    <h6><b className='blue-text right-aligned'>Container Pickup Location: </b> {this.props.hire[0].pickupLocation}</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="right"><b className='blue-text'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        {/* <hr/><h5 className="center">Container Pickup Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                <h6><b className='blue-text right-aligned'>Container Pickup Location: </b> {this.props.hire[0].pickupLocation}</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="right"><b className='blue-text'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                            </div>
                        </div> */}
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h5>Cargo Details</h5></Card.Header>
                            <Card.Body>
                            <div className="row" style={{padding: '20px'}}>
                                <div className="col-6">
                                    <h6><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="right"><b className='blue-text'>Cargo Weight: </b> {this.props.hire[0].weight}</h6>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        {/* <hr/><h5 className="center">Cargo Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                <h6><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="right"><b className='blue-text'>Cargo Weight: </b> {this.props.hire[0].weight}</h6>
                            </div>
                        </div> */}
                        {this.props.hire[0].hireType === "import" ? 
                            <div>
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Unloading Details</h5></Card.Header>
                                    <Card.Body>
                                    <div className="row" style={{padding: '20px'}}>
                                        <div className="col-6">
                                            <h6><b className='blue-text'>Unloading Port: </b> {this.props.hire[0].unloadingPort}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="right"><b className='blue-text center'>Vessel Arrival Date: </b> {moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                        </div>
                                    </div>
                                    <div className="row" style={{padding: '20px'}}>
                                        <div className="col-6">
                                            <h6><b className='blue-text'>Destination: </b> {this.props.hire[0].destination}</h6>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>
                                {/* <hr/><h5 className="center">Unloading Details</h5><br/>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Unloading Port: </b> {this.props.hire[0].unloadingPort}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="right"><b className='blue-text center'>Vessel Arrival Date: </b> {moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                    </div>
                                </div>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Destination: </b> {this.props.hire[0].destination}</h6>
                                    </div>
                                </div> */}
                            </div> : 
                            <div>
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Loading Details</h5></Card.Header>
                                    <Card.Body>
                                    <div className="row" style={{padding: '20px'}}>
                                        <div className="col-6">
                                            <h6><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="right"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>
                                {/* <hr/><h5 className="center">Loading Details</h5><br/>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="right"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>
                                    </div>
                                </div> */}
                            </div> 
                        }    
                        <br/>
                        <Card border="primary" className="text-center">
                            <Card.Header color="blue"><h5>Customer</h5></Card.Header>
                            <Card.Body>
                            <div className="row" style={{padding: '20px'}}>
                                <div className="col-3">
                                    <h6><b className='blue-text'>Name: </b> {this.props.hire[0].customerName}</h6>
                                </div>
                                <div className="col-3">
                                    <h6><b className='blue-text'>Mobile: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}</h6>
                                </div>
                                <div className="col-4">
                                    <h6><b className='blue-text'>Email: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}</h6>
                                </div>
                                <div className="col-2">
                                    <h6><b className='blue-text'>NIC: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}</h6>
                                </div>
                            </div>
                            </Card.Body>
                        </Card>
                        {/* <hr/><h5 className="center">Customer</h5><br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-3">
                                <h6><b className='blue-text'>Name: </b> {this.props.hire[0].customerName}</h6>
                            </div>
                            <div className="col-3">
                                <h6><b className='blue-text'>Mobile: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}</h6>
                            </div>
                            <div className="col-4">
                                <h6><b className='blue-text'>Email: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}</h6>
                            </div>
                            <div className="col-2">
                                <h6><b className='blue-text'>NIC: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}</h6>
                            </div>
                        </div> */}
                    </div>
                    <div className="container">
                        <form onSubmit={this.handleSubmit} >
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Change Driver</h5></Card.Header>
                                <Card.Body>
                                <div className="row" style={{padding: '20px'}} >
                                    <div className="input-field col-6">
                                        <select className="form-control" id="driverId" onChange={this.handleDriver} onBlur={this.handleDriver}>
                                            <option selected='selected' selected value={this.props.hire[0].driverId + "_" + this.props.hire[0].driverName.split(" ")[0] + " " + this.props.hire[0].driverName.split(" ")[1]}>{this.props.hire[0].driverName}</option>
                                            {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                        </select>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                            {/* <hr/><h5 className="center">Change Driver</h5><br/>
                            <div className="row" style={{padding: '20px'}} >
                                <div className="input-field col-6">
                                    <select className="form-control" id="driverId" onChange={this.handleDriver} onBlur={this.handleDriver}>
                                        <option selected='selected' selected value={this.props.hire[0].driverId + "_" + this.props.hire[0].driverName.split(" ")[0] + " " + this.props.hire[0].driverName.split(" ")[1]}>{this.props.hire[0].driverName}</option>
                                        {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                    </select>
                                </div>
                            </div> */}
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Change Vehicle</h5></Card.Header>
                                <Card.Body>
                                <div className="row" style={{padding: '20px'}}> 
                                    <div className="input-field col-6">
                                        <select className="form-control" id="vehicleId" onFocus={this.availableVehicles} onChange={this.handleVehicle} onBlur={this.handleVehicle}>
                                            <option selected='selected' value={this.props.hire[0].vehicleId + '_' + this.props.hire[0].vehicleNo} >{this.props.hire[0].vehicleNo}</option>
                                            {this.state.freeVehicles ? this.state.freeVehicles.map((x, i) => {return (<option value={x.id + "_" + x.vehicleNo} key={i}>{x.vehicleNo + " - " + x.trailerNo}</option>)}) : null}
                                        </select>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                            {/* <hr/><h5 className="center">Change Vehicle</h5><br/>
                            <div className="row" style={{padding: '20px'}}> 
                                <div className="input-field col-6">
                                    <select className="form-control" id="vehicleId" onFocus={this.availableVehicles} onChange={this.handleVehicle} onBlur={this.handleVehicle}>
                                        <option selected='selected' value={this.props.hire[0].vehicleId + '_' + this.props.hire[0].vehicleNo} >{this.props.hire[0].vehicleNo}</option>
                                        {this.state.freeVehicles ? this.state.freeVehicles.map((x, i) => {return (<option value={x.id + "_" + x.vehicleNo} key={i}>{x.vehicleNo + " - " + x.trailerNo}</option>)}) : null}
                                    </select>
                                </div>
                            </div> */}
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Remarks</h5></Card.Header>
                                <Card.Body>
                                <div className="input-field row col-12" style={{padding: '20px'}}>
                                    <textarea placeholder="Remarks" value={this.props.hire[0].remarks.toString()} style={{ minHeight: 100 }} type="text" id="remarks" onFocus={this.handleChange} onChange={this.handleChange}/>
                                </div>
                                </Card.Body>
                            </Card>
                            {/* <hr/><h5 className="center">Remarks</h5><br/>
                            <div className="input-field row col-12" style={{padding: '20px'}}>
                                <textarea placeholder="Remarks" value={this.props.hire[0].remarks.toString()} style={{ minHeight: 100 }} type="text" id="remarks" onFocus={this.handleChange} onChange={this.handleChange}/>
                            </div> */}
                            <br/><br/>
                            <div className="input-field center">
                                <button className="btn blue lighten-1 z-depth-5 btn1" type="submit">Update</button>
                                <button className="btn red lighten-1 z-depth-5" type="button" onClick={this.declineHire}>Decline Hire</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        acceptHireRequest: (id, hireRequest) => dispatch(acceptHireRequest(id, hireRequest)),
        declineHireRequest: (id, hireRequest) => dispatch(declineHireRequest(id, hireRequest))
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
)(ManagePendingHires);