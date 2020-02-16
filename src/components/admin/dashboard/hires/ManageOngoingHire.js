import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Redirect} from 'react-router-dom'
import {completeHire} from '../../../../store/actions/adminHireActions'
import { Squares } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import Card from 'react-bootstrap/Card'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

// Ongoing hire page, A hire which is currently in progress
// Admin can mark the hire as completed once it is completed 
class ManageOngoingHire extends Component {
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
        this.props.completeHire(this.props.hire[0].id) 
        this.setState({
            redir : 1
        })     
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.drivers && this.props.hires){
            this.setState({
                ...nextProps,
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
                <div className="text-center" style={{paddingTop:"500px"}}><Squares color="#007bff" size={32} speed={1} animating={true} /></div>
            ) :
            <div style={{padding:"80px"}}>
                <Card border="primary">
                    <Card.Body>
                        <br/><br/>
                        <h1 className="center">Hire in Progress</h1><br/><br/>
                        <div className="container">
                            <div className="col-4" style={{padding: '20px'}}>
                                <h6 className="left"><b className='blue-text'>Hire Type: </b> {this.props.hire[0].hireType.toUpperCase()}</h6>
                            </div>
                            <div className="col-4" style={{padding: '20px'}}>
                                <h6 className="left"><b className='blue-text'>Container Type: </b> {this.props.hire[0].containerType}ft</h6>
                            </div>
                            <br/>
                            {this.props.hire[0].hireType === "import" ? 
                            <div>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Container Pickup Details</h5></Card.Header>
                                    <Card.Body>
                                    <h6>Pickup Date and Time</h6>
                                    <div className="row" style={{paddingTop: '40px'}}>
                                        <div className="col-6">
                                            <h6 className="left"><b className='blue-text right-aligned'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <h6>Location</h6>
                                    <div className="row" style={{paddingTop: '40px'}}>
                                        <div className="col-6">
                                            <h6 className="left"><b className='blue-text right-aligned'>Address Line 1: </b> {this.props.hire[0].containerPickupAddressLine1}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="left"><b className='blue-text right-aligned'>Address Line 2: </b> {this.props.hire[0].containerPickupAddressLine2}</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="left"><b className='blue-text right-aligned'>City: </b> {this.props.hire[0].containerPickupCity}</h6>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Cargo Details</h5></Card.Header>
                                    <Card.Body>
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
                                    <Card.Header color="blue"><h5>Destination Address</h5></Card.Header>
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
                                    <Card.Header color="blue"><h5>Container Pickup Details</h5></Card.Header>
                                    <Card.Body>
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
                                    </Card.Body>
                                </Card>
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Cargo Details</h5></Card.Header>
                                    <Card.Body>
                                    <br/>
                                    <h6>Pick up Date and Time</h6>
                                    <div className="row" style={{paddingTop: '40px'}}>
                                        <div className="col-6">
                                            <h6 className="left"><b className='blue-text'>Cargo Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm a')}</h6>
                                        </div>
                                    </div>
                                    <br/>
                                    <hr/><h6>Location</h6>
                                    <div className="row" style={{paddingTop: '40px'}}>
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
                                    <br/>
                                    <hr/>
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
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Driver On Hire</h5></Card.Header>
                                <Card.Body>
                                <div className="row" style={{paddingTop: '40px'}}>
                                    <div className="col-3">
                                        <h6 className="left"><b className='blue-text'>Name: </b> {this.props.hire[0].driverName}</h6>
                                    </div>
                                    <div className="col-3">
                                        <h6 className="left"><b className='blue-text'>Mobile: </b> {this.props.drivers.filter(item => item.id === this.props.hire[0].driverId).map(a => a.mobile)[0]}</h6>
                                    </div>
                                    <div className="col-4">
                                        <h6 className="left"><b className='blue-text'>License No: </b> {this.props.drivers.filter(item => item.id === this.props.hire[0].driverId).map(a => a.licenseNo)[0]}</h6>
                                    </div>
                                    <div className="col-2">
                                        <h6 className="left"><b className='blue-text'>NIC: </b> {this.props.drivers.filter(item => item.id === this.props.hire[0].driverId).map(a => a.nic)[0]}</h6>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Vehicle On Hire</h5></Card.Header>
                                <Card.Body>
                                <div className="row" style={{paddingTop: '40px'}}>
                                    <div className="col-6">
                                        <h6 className="left"><b className='blue-text'>Vehicle: </b> {this.props.hire[0].vehicleNo}</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="left"><b className='blue-text'>Trailer: </b> {this.props.vehicles.filter(item => item.id === this.props.hire[0].vehicleId).map(a => a.trailerNo)[0]}</h6>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h5>Special Notes</h5></Card.Header>
                                <Card.Body>
                                <div className="row" style={{paddingTop: '40px'}}>
                                    <div className="col-12">
                                        <h6 className="left"><b className='blue-text'>Remarks: </b> {this.props.hire[0].remarks}</h6>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="container" style={{alignItems: "center"}}>
                            
                            <form onSubmit={this.handleSubmit} >
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h5>Hire Status</h5></Card.Header>
                                    <Card.Body>
                                    <Timeline lineColor={'#ddd'} style={{alignItems:"center"}}>

                                        {this.props.hire[0].timeline && Object.values(this.props.hire[0].timeline).sort((a,b) => a.id - b.id).map(item => {
                                            return(
                                                    <TimelineItem
                                                        key={item.id}
                                                        dateText={item.set ? moment(item.at.toDate()).format('MMM Do YYYY, h:mm a') : null}
                                                        dateInnerStyle={item.set ? { background: '#61b8ff', color: '#000' } : { background: '#e86971', color: '#000' }}
                                                        style={item.set ? { color: '#0aa61f' } : { color: '#e86971' }}
                                                    >
                                                    <h3>{item.title}</h3>
                                                </TimelineItem>
                                            )
                                        })}
                                        
                                    </Timeline>
                                    <Card.Footer>
                                    <div className="input-field center" style={{paddingTop: '20px'}}>
                                        <button className="btn green lighten-1 z-depth-0" type="submit">Hire Completed</button>
                                    </div>
                                    </Card.Footer>
                                    </Card.Body>
                                </Card>
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
        completeHire: (id) => dispatch(completeHire(id))
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
)(ManageOngoingHire);