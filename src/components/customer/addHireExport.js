import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addExportHires} from '../../store/actions/customerHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Card from "react-bootstrap/Card";

class AddHireExport extends Component {
    state = {
        containerType: '20',
        // pickupLocation: '',
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
        customerId: '',
        customerName: '',
        remarks: '',
        loading: 1,
        redir: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.addExportHires(this.state)
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
            <div className="form wrapper form1 delay-1s ">
                <div className="form2 fadeIn animated slow">

                    <div className="row fadeIn animated slow">
                        <div className="bg col-12">
                            <br/><br/>
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Header color="blue"><h1 className="center fadeIn animated slow add_head">Add <span className="topic">Export</span></h1>
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
                        <Card.Body>
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
                    <Card.Header><h4>Cargo Details</h4></Card.Header>
                    <Card.Body>
                        <br/>
                        <h5>Pick up Date and Time</h5>
                        <div className="row" style={{paddingTop: '40px'}}>
                            <div className="input-field col-6">
                                <input placeholder="Cargo Pickup Date and Time" onFocus={this.handleDate} ref="pickup" type="text" id="pickupDatetime"  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <hr/><h5>Location</h5>
                        <div className="row" style={{paddingTop: '40px'}}>
                            <div className="input-field col-6">
                                <input placeholder="Address Line 1" type="text" id="cargoLocationAddressLine1" onChange={this.handleChange} required />
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Address Line 2" type="text" id="cargoLocationAddressLine2" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="City" type="text" id="cargoLocationCity" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <hr/>
                        <div className="row" style={{paddingTop: '40px'}}>
                            <div className="input-field col-6">
                                <input placeholder="Cargo Type(s)" type="text" id="cargoType" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Net Weight" type="text" id="netWeight" onChange={this.handleChange} required/>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

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
                                    <input placeholder="Loading Terminal" type="text" id="loadingTerminal" onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <hr/><h5>Vessel Details</h5>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <input placeholder="Vessel" type="text" id="vessel" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Loading Date and Time" onFocus={this.handleDate} type="text" id="loadingDatetime" onChange={this.handleChange} required />
                                </div>

                            </div>
                        </Card.Body>
                    </Card>

                    <br/>
                    <Card border="primary" className="text-center">
                        <Card.Header><h4>Customer Details</h4></Card.Header>
                        <Card.Body>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Customer Name" type="text" id="customerName" onChange={this.handleChange} required />
                        </div>
                    </div>
                        </Card.Body>
                    </Card>
                    <br/>

                    <Card border="primary" className="text-center">
                        <Card.Header><h4>Remarks</h4></Card.Header>
                        <Card.Body>
                            <div className="input-field row col-12">
                                <textarea placeholder="Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange} />
                            </div>
                        </Card.Body>
                    </Card>
                    <input type="hidden" id="hireType" value="export"/><br/><br/>
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

        hires: state.firestore.ordered.hires
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addExportHires: (exportHire) => dispatch(addExportHires(exportHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'hires'}
    ])
)(AddHireExport);
