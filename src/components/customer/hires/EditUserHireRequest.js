import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {editHire} from "../../../store/actions/customerActions";

class EditUserHireRequest extends Component {
    state = {
        containerType: '20',
        pickupLocation: '',
        pickupDatetime: '',
        cargoType: '',
        weight: '',
        unloadingPort: '',
        vesselArrivalDatetime: '',
        loadingPort: '',
        loadingDatetime: '',
        destination: '',
        remarks: '',
        loading: 1,
        redir : 0,
        updated: 1
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    //
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.acceptHireRequest(this.props.hire[0].id, this.state)
    //     this.setState({
    //         redir : 1
    //     })
    // }
    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'datetime-local'
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editHire(this.props.id, this.state, 'hires')
        this.setState({
            updated: 0
        })
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.hires){
            this.setState({
                ...nextProps.hires[0],loading: 0,updated: !this.state.updated
                // loading: 0,
            });
        }

    }

    render() {

        // if(this.state.redir === 1){
        //     return <Redirect to='/User/UserManageTools' />
        // }
        const load = this.state.loading === 0 ? (
        // return (
        //     this.state.loading === 1 ? (
        //             <div className="center"><br/><br/><br/><br/><br/><br/><br/><br/><h1>Loading...</h1></div>
        //         ) :
                <div>
                    <br/><br/><br/><br/><br/>
                    <h1 className="center add_head">Hire <span className="topic">Request</span></h1><hr className="bg-dark mb-4 w-25"/><br/><br/>

                    <div className="container">
                        <div className="green-text center">
                            <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                        <div className="col-4" style={{padding: '20px'}}>
                            {/*<h6><b className='blue-text'>Hire Type: </b> {this.props.hire[0].hireType.toUpperCase()}</h6>*/}
                            <h6 className='blue-text'>Hire Type</h6>
                            <input placeholder="Hire Type" type="text" id="hireType" value={this.state.hireType}  onChange={this.handleChange} required />
                        </div>
                        <div className="col-4" style={{padding: '20px'}}>
                            {/*<h6><b className='blue-text'>Container Type: </b> {this.props.hire[0].containerType}ft</h6>*/}
                            <h6 className='blue-text'>Container Type</h6>
                            <input placeholder="Container Type" type="text" id="containerType" value={this.state.containerType}  onChange={this.handleChange} required />
                        </div>
                        <br/><hr/><h5 className="center">Container Pickup Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                {/*<h6><b className='blue-text right-aligned'>Container Pickup Location: </b> {this.props.hire[0].pickupLocation}</h6>*/}
                                <h6 className="blue-text">Container Pickup Location</h6>
                                <input placeholder="Container Pickup Location" type="text" id="pickupLocation" value={this.state.pickupLocation}  onChange={this.handleChange} required />
                            </div>
                            <div className="col-6">
                                {/*<h6 className="right"><b className='blue-text'>Container Pickup Date: </b> {moment(this.props.hire[0].pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>*/}
                                <h6 className="blue-text">Container Pickup Date</h6>
                                <input placeholder="Container Pickup Date" type="text" id="pickupDatetime" value={moment(this.state.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <br/><hr/><h5 className="center">Cargo Details</h5> <br/>
                        <div className="row" style={{padding: '20px'}}>
                            <div className="col-6">
                                {/*<h6><b className='blue-text'>Cargo Type: </b> {this.props.hire[0].cargoType}</h6>*/}
                                <h6 className="blue-text">Cargo Type</h6>
                                <input placeholder="Cargo Type" type="text" id="cargoType" value={this.state.cargoType}  onChange={this.handleChange} required />
                            </div>
                            <div className="col-6">
                                {/*<h6 className="right"><b className='blue-text'>Cargo Weight: </b> {this.props.hire[0].weight}</h6>*/}
                                <h6 className="blue-text">Cargo Weight</h6>
                                <input placeholder="Cargo Weight" type="text" id="weight" value={this.state.weight}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        {/*{this.props.hireType === "import" ?*/}
                            <div>
                                <br/><hr/><h5 className="center">Unloading Details</h5><br/>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        {/*<h6><b className='blue-text'>Unloading Port: </b> {this.props.hire[0].unloadingPort}</h6>*/}
                                        <h6 className="blue-text">Unloading Port</h6>
                                        <input placeholder="Unloading Port" type="text" id="unloadingPort" value={this.state.unloadingPort}  onChange={this.handleChange} required />
                                    </div>
                                    <div className="col-6">
                                        {/*<h6 className="right"><b className='blue-text center'>Vessel Arrival Date: </b> {moment(this.props.hire[0].vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}</h6>*/}
                                        <h6 className="blue-text">Vessel Arrival Date</h6>
                                        <input placeholder="Vessel Arrival Date" onFocus={this.handleDate} type="text" id="vesselArrivalDatetime" value={moment(this.state.vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')}  onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <div className="row" style={{padding: '20px'}}>
                                    <div className="col-6">
                                        {/*<h6><b className='blue-text'>Destination: </b> {this.props.hire[0].destination}</h6>*/}
                                        <h6 className="blue-text">Destination</h6>
                                        <input placeholder="Destination" type="text" id="destination" value={this.state.destination}  onChange={this.handleChange} required />
                                    </div>
                                </div>
                        {/*    </div> :*/}
                        {/*    <div>*/}
                        {/*        <br/><hr/><h5 className="center">Loading Details</h5><br/>*/}
                        {/*        <div className="row" style={{padding: '20px'}}>*/}
                        {/*            <div className="col-6">*/}
                        {/*                /!*<h6><b className='blue-text'>Loading Port: </b> {this.props.hire[0].loadingPort}</h6>*!/*/}
                        {/*                <h6 className="blue-text">Unloading Port</h6>*/}
                        {/*                <input placeholder="Loading Port" type="text" id="loadingPort" value={this.state.loadingPort}  onChange={this.handleChange} required />*/}
                        {/*            </div>*/}
                        {/*            <div className="col-6">*/}
                        {/*                /!*<h6 className="right"><b className='blue-text'>Loading Date: </b> {this.props.hire[0].loadingDatetime}</h6>*!/*/}
                        {/*                <h6 className="blue-text">Loading Date</h6>*/}
                        {/*                <input placeholder="Loading Date" onFocus={this.handleDate} type="text" id="loadingDatetime" value={this.state.loadingDatetime}  onChange={this.handleChange} required />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*}*/}
                        {/*<br/><hr/><h5 className="center">Customer</h5><br/>*/}
                        {/*<div className="row" style={{padding: '20px'}}>*/}
                        {/*    <div className="col-3">*/}
                        {/*        <h6><b className='blue-text'>Name: </b> {this.props.hire[0].customerName}</h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-3">*/}
                        {/*        <h6><b className='blue-text'>Mobile: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}</h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-4">*/}
                        {/*        <h6><b className='blue-text'>Email: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}</h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-2">*/}
                        {/*        <h6><b className='blue-text'>NIC: </b> {this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}</h6>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <br/><hr/><h5 className="center">Remarks</h5><br/>
                        <div className="input-field row col-12" style={{padding: '20px'}}>
                            <textarea placeholder="Remarks" value={this.state.remarks} style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                        </div>
                        <br/><br/>
                            <div className="input-field center">
                                <button className="btn blue lighten-1 z-depth-5 btn1" type="submit">Update</button>
                                <Link to='/User/UserManageTools'><button className="btn red lighten-1 z-depth-5 btn1">Cancel</button></Link>
                            </div>
                                <br/><br/></div>
                        </form>

                    </div>


                    </div>


        ) : <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>

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
        editHire: (id, hires, records) => dispatch(editHire(id,hires,records))
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
)(EditUserHireRequest);
