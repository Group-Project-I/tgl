import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {addImportHires} from '../../store/actions/customerHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";

class AddHireImport extends Component {
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
        customerId: '',
        customerName: '',
        remarks: '',
        loading: 1,
        redir : 0,
    }



    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addImportHires(this.state);
        this.setState({
            redir : 1
        })
    }

    // handleCustomer = (e) => {
    //     if(e.target.value){
    //         const x = e.target.value.split('_')
    //         this.setState({
    //             customerId: x[0],
    //             customerName: x[1]
    //         })
    //     }
    // }
    //
    //
    //
    // getCustomer = (e) => {
    //     if(this.props.customer){
    //         const availableCustomers = this.props.customers.sort((a,b) => { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}).reverse();
    //         // const currentUser = this.props.customer.profile;
    //
    //         this.setState({
    //
    //             availableCustomers: availableCustomers.filter(item => item.disabled === false)
    //         })
    //     }
    // }


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



    componentWillReceiveProps(nextProps) {

        if(this.props.customers && this.props.drivers){
            this.setState({
                loading: 0,
            });
        }

    }


    render() {
        if(this.state.redir === 1){
            return <Redirect to='/' />
        }
        return (

            <div className="form wrapper form1 delay-1s">

                <div className="form2  fadeIn animated slow ">

                <div className="row fadeIn animated fast">
                    <div className="bg col-12">
                        <br/><br/>
                        <Card border="primary">
                            <Card.Body>
                                <Card.Header color="blue"><h1 className="center fadeIn animated fast add_head">Add <span className="topic">Import</span></h1>
                        <hr className="bg-dark mb-4"/>
                                </Card.Header>
                        <form onSubmit={this.handleSubmit} autoComplete='off'>
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h4>Container Type</h4></Card.Header>
                                <Card.Body><br/>

                            <div className="bg col-6">
                                <select className="form-control select1" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                                    <option value="20">20ft</option>
                                    <option value="40">40ft</option>
                                </select>
                            </div>
                                </Card.Body>
                            </Card>
                            <br/>
                            <Card border="primary" className="text-center">
                                <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                                <Card.Body><br/>
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
                            <br/>
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
                                </Card.Body>
                            </Card>

                            <br/><Card border="primary" className="text-center">
                            <Card.Header color="blue"><h4>Customer Details</h4></Card.Header>
                            <Card.Body>
                            <div className="row">
                                <div className="input-field col-6">
                                    {/*<input placeholder="Customer Name" type="hidden" value="Tharinda Dilshan" id="customerName" onChange={this.handleChange} required />*/}
                                    <input placeholder="Customer Name" type="text" id="customerName" onChange={this.handleChange} required />
                                    {/*<select className="form-control" id="customerId" onFocus={this.getCustomer} onChange={this.handleCustomer}>*/}
                                    {/*    {this.state.availableCustomers ?  this.state.availableCustomers.map((x, i) => {return (<option value={x.id + "_" + x.firstName + " " + x.lastName} key={i}>{x.firstName + " " + x.lastName}</option>)}) : null}*/}

                                    {/*</select>*/}
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
                            <input type="hidden" id="hireType" value="import"/><br/><br/>
                            <div className="input-field center">
                                <button className="btn blue lighten-1 z-depth-5 btn1">Add</button>
                                <Link to='/'><button className="btn red lighten-1 z-depth-5 btn1">Cancel</button></Link>
                            </div>
                            <br/>
                        </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                </div>
            </div>
        )
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
        addImportHires: (importHire) => dispatch(addImportHires(importHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'hires'},
        {collection: 'customers'}
    ])
)(AddHireImport);

