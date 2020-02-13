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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// function topFunction() {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// }

class ManageHireRequest2 extends Component {

    state = {
        containerType : '',
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
        remarks: '',
        loading: 1,
        updated: 1,
        redir: 0
    }



    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClosePrice = () => {
        // e.preventDefault();
        this.setState({
            show: false,
        })
    }

    handleShowPrice = (e) => {
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
    handleLoadingPort= (e) => {
        if(e.target.value){
            this.setState({
                loadingPort: e.target.value
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
    componentWillReceiveProps(nextProps) {

        if(this.props.hires){
            this.setState({
                ...nextProps.hire[0],
                loading: 0,
                updated: !this.state.updated
            });
        }

    }



    render() {

        if(this.state.redir === 1){
            return <Redirect to='/User/UserManageTools' />
        }

        const load = this.state.loading === 0 ? (



            <div className="container-fluid managehire_form2">
                <br/><br/><br/><br/><br/><br/><br/><br/>

                <div className="container www fadeIn animated slow delay-1s">
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
                            <br/><Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                            <Card.Body> <br/>
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
                            <br/><Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Cargo Details</h4></Card.Header>
                            <Card.Body><br/>
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="left container-fluid"><b className='blue-text left'>Cargo Pickup Date and Time </b> <input type="text" id="pickupDatetime" onFocus={this.handleDate} value={this.state.pickupDatetime} onChange={this.handleChange} required/></h6>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-6">
                                    <h6 className="left container-fluid"><b className='blue-text left'>Address Line 1 </b> <input type="text" id="cargoLocationAddressLine1" value={this.state.cargoLocationAddressLine1} onChange={this.handleChange} required/></h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="left container-fluid"><b className='blue-text left'>Address Line 2 </b> <input type="text" id="cargoLocationAddressLine2" value={this.state.cargoLocationAddressLine2} onChange={this.handleChange} required/></h6>
                                </div>

                            </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text left'>City </b> <input type="text" id="cargoLocationCity" value={this.state.cargoLocationCity} onChange={this.handleChange} required/></h6>
                                    </div>
                                </div>
                                {/*start price*/}

                                <Button color="primary" className={this.state.cargoLocationCity ? "btn " : "invisible"}  id="btnLong" onClick={this.handleShowPrice} style={{ marginBottom: '1rem' }}>Get Estimated Hire Cost <i
                                    className="fas fa-cog fa-spin"></i></Button>


                                <Modal show={this.state.show} onHide={this.handleClosePrice} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="center"><h2 >Cost Estimation</h2></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Card border="primary" className="text-center">
                                            <Card.Body>
                                                {/*<div className= { cityEdited != 'Updated Successfully' ? "red-text" : "green-text"}>*/}
                                                {/*    {this.state.updated ? cityEdited : null}*/}
                                                {/*</div>*/}
                                                <form >
                                                    <div className="input-field row">
                                                        <h6 className='blue-text'>Container Type </h6>

                                                        <input type="text" id="containerType" value={this.state.containerType + " ft"} required />
                                                    </div>
                                                    <div className="input-field row">
                                                        <h6 className='blue-text'>Cargo Location City</h6>

                                                        <input type="text" id="cargoLocationCity" value={this.state.cargoLocationCity} required />
                                                    </div>
                                                    <div className="input-field row">
                                                        <h6 className='blue-text'>Estimated Cost for Hire</h6>
                                                        {this.state.cost ?
                                                            <div>
                                                                <input type="text" id="cost"
                                                                       value={"RS. " + this.state.cost + " /="}
                                                                       required/>
                                                                <hr/>
                                                                <b className="red-text">Note that the estimated cost may subject to change. Contact the administrator for inquiries.</b>
                                                            </div>:
                                                            <div>
                                                                No cost estimation available for the provided cargo Location address. Please contact the administrator for inquiries.
                                                            </div>
                                                        }
                                                    </div>
                                                </form>
                                            </Card.Body>
                                        </Card>
                                    </Modal.Body>
                                </Modal>

                                {/*end price*/}
                                <div className="row">
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
                            {/*    <div>*/}
                            {/*        <br/><hr/><h5 className="center">Unloading Details</h5><br/>*/}
                            {/*        <div className="row" >*/}
                            {/*            <div className="col-6">*/}
                            {/*                <h6 className="left"><b className='blue-text'>Unloading Port </b> <input type="text" id="unloadingPort" value={this.state.unloadingPort} onChange={this.handleChange} required/></h6>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-6">*/}
                            {/*                <h6 className="left"><b className='blue-text '>Vessel Arrival Date </b> <input type="text" id="vesselArrivalDatetime" onFocus={this.handleDate} value={this.state.vesselArrivalDatetime} onChange={this.handleChange} required/></h6>*/}
                            {/*                /!*moment(this.state.vesselArrivalDatetime).format('MMMM Do YYYY, h:mm:ss a')*!/*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="row" >*/}
                            {/*            <div className="col-6">*/}
                            {/*                <h6 className="left"><b className='blue-text'>Destination </b> <input type="text" id="destination" value={this.state.destination} onChange={this.handleChange} required/></h6>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div> :*/}
                                <div>
                                    <br/><Card border="primary" className="text-center">
                                    <Card.Header><h4>Loading Details</h4></Card.Header>
                                    <Card.Body><br/>
                                    <div className="row" >
                                        <div className="col-6">
                                        <h6 className="left container-fluid"><b className='blue-text left'>Loading Port </b><br/><br/>
                                            <select className="form-control col-6" placeholder="Loading Port" id="loadingPort" value={this.state.loadingPort} onChange={this.handleLoadingPort} required>
                                            <option value="Colombo">Colombo</option>
                                            </select></h6>
                                        </div>
                                    </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="left container-fluid"><b className='blue-text left'>Loading Terminal </b><input type="text" id="loadingTerminal" value={this.state.loadingTerminal} onChange={this.handleChange} required/></h6>
                                            </div>
                                        </div>
                                        <hr/><h5>Vessel Details</h5>
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="left container-fluid"><b className='blue-text left'>Vessel </b> <input type="text" id="vessel" value={this.state.vessel} onChange={this.handleChange} required/></h6>
                                            </div>
                                        <div className="col-6">
                                            <h6 className="left container-fluid"><b className='blue-text left'>Loading Date </b> <input type="text" id="loadingDatetime" onFocus={this.handleDate} value={this.state.loadingDatetime} onChange={this.handleChange} required/></h6>
                                        </div>
                                    </div>
                                    </Card.Body>
                                </Card>
                                </div>
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

                            <br/><Card border="primary" className="text-center">
                            <Card.Header><h4>Remarks</h4></Card.Header>
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
        hires: state.firestore.ordered.hires,
        pricing: state.firestore.ordered.pricing
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
        {collection: 'customers'},
        {collection: 'pricing'}
    ])
)(ManageHireRequest2);



