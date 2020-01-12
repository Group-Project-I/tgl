import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {completeHire} from '../../../store/actions/adminHireActions'
import {Spinner} from "react-activity";

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
            return <Redirect to='/User/UserManageTools' />
        }
        return (
            this.state.loading === 1 ? (
                    <div className="text-center" style={{paddingTop:"400px"}}><Spinner color="#007bff" size={32} speed={1} animating={true} /></div>
                ) :
                <div className="container-fluid managehire_form1">
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <h1 className="center add_head fadeInLeft animated fast"><span className="topic1">Ongoing</span> <span className="topic">Hire</span><hr className="bg-dark mb-4 w-25"/></h1><br/><br/>
                    <div className="www fadeIn animated slow delay-1s">
                    <div className="container">
                        <div className="row">
                        <div className="col-6">
                            <h6 className="left container-fluid"><b className='blue-text'>Hire Type </b> <input type="text" value={this.props.hire[0].hireType.toUpperCase()}/></h6>
                        </div>
                        <div className="col-6">
                            <h6 className="left container-fluid"><b className='blue-text'>Container Type </b> <input type="text" value={this.props.hire[0].containerType + " ft"}/></h6>
                        </div>
                        </div>
                        <br/><hr/><h5 className="center">Container Pickup Details</h5> <br/>
                        <div className="row">
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text'>Container Pickup Location </b> <input type="text" value={this.props.hire[0].pickupLocation}/></h6>
                            </div>
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text'>Container Pickup Date </b> <input type="text" value={moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}/></h6>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Cargo Details</h5> <br/>
                        <div className="row">
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text'>Cargo Type </b> <input type="text" value={this.props.hire[0].cargoType}/></h6>
                            </div>
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text'>Cargo Weight </b> <input type="text" value={this.props.hire[0].weight}/></h6>
                            </div>
                        </div>
                        {this.props.hire[0].hireType === "import" ?
                            <div>
                                <br/><hr/><h5 className="center">Unloading Details</h5><br/>
                                <div className="row" >
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text'>Unloading Port </b> <input type="text" value={this.props.hire[0].unloadingPort}/></h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text center'>Vessel Arrival Date </b> <input type="text" value={moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}/></h6>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text'>Destination </b> <input type="text" value={this.props.hire[0].destination}/></h6>
                                    </div>
                                </div>
                            </div> :
                            <div>
                                <br/><hr/><h5 className="center">Loading Details</h5><br/>
                                <div className="row" >
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text'>Loading Port </b> <input type="text" value={this.props.hire[0].loadingPort}/></h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text'>Loading Date </b> <input type="text" value={moment(this.props.hire[0].loadingDatetime).format('MMMM Do YYYY, h:mm:ss a')}/></h6>
                                    </div>
                                </div>
                            </div>
                        }
                        {/*<br/><hr/><h5 className="center">Customer</h5><br/>*/}
                        {/*<div className="row" >*/}
                        {/*    <div className="col-3">*/}
                        {/*        <h6 className="left"><b className='blue-text'>Name </b> <input type="text" value={this.props.hire[0].customerName}/></h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-3">*/}
                        {/*        <h6 className="left"><b className='blue-text'>Mobile </b> <input type="text" value={this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}/></h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-4">*/}
                        {/*        <h6 className="left"><b className='blue-text'>Email </b> <input type="text" value={this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}/></h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-2">*/}
                        {/*        <h6 className="left"><b className='blue-text'>NIC </b> <input type="text" value={this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}/></h6>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <br/><hr/><h5 className="center">Driver On Hire</h5><br/>
                        <div className="row">
                            <div className="col-3">
                                <h6 className="left container-fluid"><b className='blue-text'>Name </b> <input type="text" value={this.props.hire[0].driverName}/></h6>
                            </div>
                            <div className="col-3">
                                <h6 className="left container-fluid"><b className='blue-text'>Mobile </b> <input type="text" value={this.props.drivers.filter(item => item.id === this.props.hire[0].driverId).map(a => a.mobile)[0]}/></h6>
                            </div>
                            <div className="col-4">
                                <h6 className="left container-fluid"><b className='blue-text'>License No </b> <input type="text" value={this.props.drivers.filter(item => item.id === this.props.hire[0].driverId).map(a => a.licenseNo)[0]}/></h6>
                            </div>
                            <div className="col-2">
                                <h6 className="left container-fluid"><b className='blue-text'>NIC </b> <input type="text" value={this.props.drivers.filter(item => item.id === this.props.hire[0].driverId).map(a => a.nic)[0]}/></h6>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Vehicle On Hire</h5><br/>
                        <div className="row">
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text'>Vehicle </b> <input type="text" value={this.props.hire[0].vehicleNo}/></h6>
                            </div>
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text'>Trailer </b> <input type="text" value={this.props.vehicles.filter(item => item.id === this.props.hire[0].vehicleId).map(a => a.trailerNo)[0]}/></h6>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Special Notes</h5><br/>
                        <div className="row">
                            <div className="input-field row col-12">
                                <textarea placeholder="Remarks" value={this.props.hire[0].remarks} style={{ minHeight: 100 }} type="text" id="remarks"/>
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Hire Status</h5><br/>


                        <div className="input-field center">
                            <h6><b className='blue-text'>Status </b> <b className="orange badge1">{this.props.hire[0].hireStatus}</b></h6>
                        </div>
                        <br/><br/>
                        <div className="input-field right">
                            <Link to="/User/UserManageTools"><button className="btn orange lighten-1 z-depth-5 btn1" style={{marginRight: '50px'}}>Back</button></Link>
                        </div>
                        <br/><br/>
                    </div>
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
