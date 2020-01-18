import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {declineHireRequests} from '../../../store/actions/customerHireActions'
import {Link} from "react-router-dom";
import {updateRequest} from "../../../store/actions/customerHireActions";
import {Spinner} from "react-activity";
import Card from "react-bootstrap/Card";

// function topFunction() {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// }

class ManageHireRequest1 extends Component {

    state = {
        containerType : '',
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
        remarks: '',
        loading: 1,
        updated: 1,
        redir: 0
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.hires){
            this.setState({
                ...nextProps.hire[0],
                loading: 0,
                updated: !this.state.updated
            });
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    //
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateRequest(this.props.hire[0].id, this.state, 'hires')
        this.setState({
            updated: 0
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
    handleUnloadingPort= (e) => {
        if(e.target.value){
            this.setState({
                unloadingPort: e.target.value
            })
        }
    }
    // handleHireType = (e) => {
    //     if(e.target.value){
    //         this.setState({
    //             hireType: e.target.value
    //         })
    //     }
    // }

    declineHire = (e) => {
        e.preventDefault();
        this.props.declineHireRequests(this.props.hire[0].id, this.state)
        this.setState({
            redir : 1
        })
    }



    render() {

        if(this.state.redir === 1){
            return <Redirect to='/User/UserManageTools' />
        }

        const load = this.state.loading === 0 ? (



                <div className="container-fluid managehire_form2">
                    <br/><br/><br/><br/><br/><br/><br/><br/>

                    <div className=" container www fadeIn animated slow delay-1s">


                        <Card border="primary">
                            <Card.Body>
                                <h1 className="center add_head "><span className="topic1">Hire</span> <span className="topic">Request</span><hr className="bg-dark mb-4 w-25"/></h1><br/><br/>
                        <form onSubmit={this.handleSubmit} autoComplete='off'>
                            <div className="green-text center">
                                <h3>{this.state.updated ? "Updated Successfully" : null}</h3><br/><br/>
                            </div>
                            <Card border="primary" className="text-center">
                                <Card.Body>
                        <div className="row">
                        <div className="col-6">

                            <h6 className="left container-fluid"><b className='blue-text left'>Hire Type </b><br/><br/>
                                <input type="text" id="hireType" value={this.state.hireType.toUpperCase()}  required/></h6>
                            {/*<select className="form-control select1" id="hireType" value={this.state.hireType} onChange={this.handleHireType} required>*/}
                            {/*    <option value="import">import</option>*/}
                            {/*    <option value="export">export</option>*/}
                            {/*</select></h6>*/}
                        </div>
                        <div className="col-6">
                            <h6 className="left container-fluid">
                                <b className='blue-text left'>Container Type </b><br/><br/><br/>
                                {/*<input type="text" id="containerType" value={this.state.containerType} onChange={this.handleChange} required/></h6>*/}
                            <select className="form-control select1" id="containerType" value={this.state.containerType} onChange={this.handleContainerType} required>
                                <option value="20">20ft</option>
                                <option value="40">40ft</option>
                            </select></h6>
                        </div>
                        </div>
                                </Card.Body>
                            </Card>
                        <br/>
                            <Card border="primary" className="text-center">
                        <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                                <Card.Body>
                                    <br/>
                        <div className="row" >

                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text left'>Container Pickup Date </b> <input type="text" id="pickupDatetime" onFocus={this.handleDate} value={this.state.pickupDatetime} onChange={this.handleChange} required/></h6>
                            </div>
                        </div>
                                    <h5>Location</h5><br/>
                                    <div className="row" >
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text left'>Address Line 1 </b> <input type="text" id="containerPickupAddressLine1" value={this.state.containerPickupAddressLine1} onChange={this.handleChange} required/></h6>
                            </div>
                                        <div className="col-6">
                                            <h6 className="left container-fluid"><b className='blue-text left'>Address Line 2 </b> <input type="text" id="containerPickupAddressLine2" value={this.state.containerPickupAddressLine2} onChange={this.handleChange} required/></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="left container-fluid"><b className='blue-text left'>City </b> <input type="text" id="containerPickupCity" value={this.state.containerPickupCity} onChange={this.handleChange} required/></h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                        <br/>

                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h4>Cargo Details</h4></Card.Header>
                                <Card.Body> <br/>
                        <div className="row" >
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text left'>Cargo Type </b> <input type="text" id="cargoType" value={this.state.cargoType} onChange={this.handleChange} required/></h6>
                            </div>
                            <div className="col-6">
                                <h6 className="left container-fluid"><b className='blue-text left'>Net Weight </b> <input type="text" id="netWeight" value={this.state.netWeight} onChange={this.handleChange} required/></h6>
                            </div>
                        </div>
                                </Card.Body>
                            </Card>
                        {/*{this.state.hireType === "import" ?*/}
                            <div>
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h4>Unloading Details</h4></Card.Header>
                                    <Card.Body><br/>
                                <div className="row" >
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text left'>Unloading Port </b><br/><br/>
                                            <select className="form-control col-6"id="unloadingPort" value={this.state.unloadingPort} onChange={this.handleUnloadingPort} required>
                                                <option value="Colombo">Colombo</option>
                                            </select></h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text left'>Unloading Terminal </b> <input type="text" id="unloadingTerminal" value={this.state.unloadingTerminal} onChange={this.handleChange} required/></h6>
                                    </div>
                                </div>
                                        <hr/><h5>Vessel Details</h5><br/>
                                        <div className="row" >
                                            <div className="col-6">
                                                <h6 className="left container-fluid"><b className='blue-text left'>Vessel</b> <input type="text" id="vessel" value={this.state.vessel} onChange={this.handleChange} required/></h6>
                                            </div>
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text left '>Vessel Arrival Date </b> <input type="text" id="vesselArrivalDatetime" onFocus={this.handleDate} value={this.state.vesselArrivalDatetime} onChange={this.handleChange} required/></h6>
                                        {/*moment(this.state.vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')*/}
                                    </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <br/>
                                <Card border="primary" className="text-center">
                                    <Card.Header color="blue"><h4>Destination Address</h4></Card.Header>
                                    <Card.Body>
                                        <div className="row" >
                                            <div className="col-6">
                                                <h6 className="left container-fluid"><b className='blue-text left'>Address Line 1 </b> <input type="text" id="destinationAddressLine1" value={this.state.destinationAddressLine1} onChange={this.handleChange} required/></h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="left container-fluid"><b className='blue-text left'>Address Line 2 </b> <input type="text" id="destinationAddressLine2" value={this.state.destinationAddressLine2} onChange={this.handleChange} required/></h6>
                                            </div>
                                        </div>
                                <div className="row" >
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text left'>Destination City</b> <input type="text" id="destinationCity" value={this.state.destinationCity} onChange={this.handleChange} required/></h6>
                                    </div>
                                </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        {/*    :*/}
                        {/*    <div>*/}
                        {/*        <br/><hr/><h5 className="center">Loading Details</h5><br/>*/}
                        {/*        <div className="row" >*/}
                        {/*            <div className="col-6">*/}
                        {/*                <h6 className="left"><b className='blue-text'>Loading Port </b> <input type="text" id="loadingPort" value={this.state.loadingPort} onChange={this.handleChange} required/></h6>*/}
                        {/*            </div>*/}
                        {/*            <div className="col-6">*/}
                        {/*                <h6 className="left"><b className='blue-text'>Loading Date </b> <input type="text" id="loadingDatetime" onFocus={this.handleDate} value={this.state.loadingDatetime} onChange={this.handleChange} required/></h6>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*}*/}
                        {/*<br/><hr/><h5 className="center">Customer</h5><br/>*/}
                        {/*<div className="row">*/}
                        {/*    <div className="col-3">*/}
                        {/*        <h6 className="left"><b className='blue-text'>Name: </b> <input type="text" value={this.props.hire[0].customerName}/></h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-3">*/}
                        {/*        <h6 className="left"><b className='blue-text'>Mobile: </b> <input type="text" value={this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.mobile)[0]}/></h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-4">*/}
                        {/*        <h6 className="left"><b className='blue-text'>Email: </b> <input type="text" value={this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.email)[0]}/></h6>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-2">*/}
                        {/*        <h6 className="left"><b className='blue-text'>NIC: </b> <input type="text" value={this.props.customer.filter(item => item.id === this.props.hire[0].customerId).map(a => a.nic)[0]}/></h6>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h4>Remarks</h4></Card.Header>
                                <Card.Body><br/>
                        <div className="input-field row col-12" >
                            <textarea type="text" id="remarks" placeholder="Remarks" value={this.state.remarks} style={{ minHeight: 100 }}  onChange={this.handleChange} required/>
                        </div>
                                </Card.Body>
                            </Card>
                        <br/><br/>


                            <div className="input-field center">
                                <button className="btn blue lighten-1 z-depth-5 btn1" type="submit" >Update</button>
                                <button className="btn red lighten-1 z-depth-5 btn1" onClick={this.declineHire}>Delete</button>
                                <Link to="/User/UserManageTools"><button className="btn orange lighten-1 z-depth-5 btn1">Back</button></Link>
                            </div>
                            <br/><br/>
                        </form>
                            </Card.Body>
                        </Card>

                    </div>
                </div>


        ):<div className="text-center" style={{paddingTop:"400px"}}><Spinner color="#007bff" size={32} speed={1} animating={true} /></div>
        return <div>{load}</div>


    }
}

const mapStateToProps = (state) => {

    return{

        customer: state.firestore.ordered.customers,
        hires: state.firestore.ordered.hires
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRequest: (id,hires, hireRequest) => dispatch(updateRequest(id,hires,hireRequest)),
        declineHireRequests: (id, hireRequest) => dispatch(declineHireRequests(id, hireRequest))
    }
}



export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(props => [
        {collection: 'hires'},
        {collection: 'customers'}
        ])
)(ManageHireRequest1);



