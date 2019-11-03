import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Redirect} from 'react-router-dom'
import {acceptHireRequest} from '../../../store/actions/adminHireActions'
import {declineHireRequest} from '../../../store/actions/adminHireActions'

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.acceptHireRequest(this.props.hire[0].id, this.state)
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
        const ListH = this.props.hires.filter(item => item.driverId !== "" && item.hireStatus !== "request")
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
            this.availableDrivers()
        }

    }

    render() {

        if(this.state.redir === 1){
            return <Redirect to='/admin/hires' />
        }
        return (
            this.state.loading === 1 ? (
                    <div><br/><br/><br/><br/><h1>Loading...</h1></div>
                ) :
                <div>
                    <br/><br/><br/><br/>
                    <h2 className="center">Hire Request</h2><br/><br/>
                    <div className="container">
                        <div className="col-4" style={{padding: '20px'}}>
                            <h6><b className='blue-text'>Hire Type: </b> {this.props.hire[0].hireType.toUpperCase()}</h6>
                        </div>
                        <div className="col-4" style={{padding: '20px'}}>
                            <h6><b className='blue-text'>Container Type: </b> {this.props.hire[0].containerType}ft</h6>
                        </div>
                        <br/><hr/><h5 className="center">Container Pickup Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                <h6><b className='blue-text right-aligned'>Container Pickup Location: </b> {this.props.hire[0].pickupLocation}</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="right"><b className='blue-text'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Cargo Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                <h6><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="right"><b className='blue-text'>Cargo Weight: </b> {this.props.hire[0].weight}</h6>
                            </div>
                        </div>
                        {this.props.hire[0].hireType === "import" ?
                            <div>
                                <br/><hr/><h5 className="center">Unloading Details</h5><br/>
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
                            </div> :
                            <div>
                                <br/><hr/><h5 className="center">Loading Details</h5><br/>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        <h6><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="right"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>
                                    </div>
                                </div>
                            </div>
                        }
                        <br/><hr/><h5 className="center">Customer</h5><br/>
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
                    </div>
                    <div className="container">
                        <form onSubmit={this.handleSubmit} >
                            <br/><hr/><h5 className="center">Assign Driver</h5><br/>
                            <div className="row" style={{padding: '20px'}} >
                                <div className="input-field col-6">
                                    <select className="form-control" id="driverId" onChange={this.handleDriver} onBlur={this.handleDriver}>
                                        {this.state.freeDrivers ? this.state.freeDrivers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName + " - " + x.mobile}</option>)}) : null}
                                    </select>
                                </div>
                            </div>
                            <br/><hr/><h5 className="center">Assign Vehicle</h5><br/>
                            <div className="row" style={{padding: '20px'}}>
                                <div className="input-field col-6">
                                    <select className="form-control" id="vehicleId" onFocus={this.availableVehicles} onChange={this.handleVehicle} onBlur={this.handleVehicle}>
                                        {this.state.freeVehicles ? this.state.freeVehicles.map((x, i) => {return (<option value={x.id + "_" + x.vehicleNo} key={i}>{x.vehicleNo + " - " + x.trailerNo}</option>)}) : null}
                                    </select>
                                </div>
                            </div>
                            <br/><hr/><h5 className="center">Remarks</h5><br/>
                            <div className="input-field row col-12" style={{padding: '20px'}}>
                                <textarea placeholder="Remarks" value={this.state.hire[0].remarks} style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                            </div>
                            <br/><br/>
                            <div className="input-field center">
                                <button className="btn blue lighten-1 z-depth-0" type="submit">Add</button>
                                <button className="btn red lighten-1 z-depth-0" onClick={this.declineHireRequest}>Cancel</button>
                            </div>
                        </form>
                    </div>
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
)(ManageHireRequest);
