import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {addImportHires} from '../../store/actions/customerHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class AddHireImport extends Component {
    state = {
        containerType: '20',
        pickupLocation: '',
        pickupDatetime: '',
        cargoType: '',
        weight: '',
        unloadingPort: '',
        vesselArrivalDatetime: '',
        destination: '',
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
            return <Redirect to='/User/Home' />
        }
        return (

            <div className="form wrapper form1 delay-1s">

                <div className="form2  fadeIn animated slow ">

                <div className="row fadeIn animated fast">
                    <div className="bg col-1">
                        {/* <img className="responsive1" src={require('../../img/importreq2.jpg')}/> */}
                    </div>
                    <div className="bg col-11 center">
                        <br/><br/>
                        <h1 className="center fadeIn animated fast add_head">Add Import</h1>
                        <hr className="bg-dark mb-4 w-25"/>

                        <form onSubmit={this.handleSubmit} >
                            <br/>
                            <h6 >Container Type</h6> <br/>
                            <div className="bg col-6">
                                <select className="form-control select1" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                                    <option value="20">20ft</option>
                                    <option value="40">40ft</option>
                                </select>
                            </div>
                            <br/><h6>Container Pickup Details</h6>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="Pickup Location" type="text" id="pickupLocation" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Pickup Date and Time" ref="pickup" onFocus={this.handleDate} type="text" id="pickupDatetime" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <br/><h6>Cargo Details</h6>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="Cargo Type" type="text" id="cargoType" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Weight" type="text" id="weight" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <br/><h6>Unloading Details</h6>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="Unloading Port" type="text" id="unloadingPort" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <input placeholder="Vessel Arrival Date and Time" onFocus={this.handleDate} type="text" id="vesselArrivalDatetime" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="Destination" type="text" id="destination" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <br/><h6>Customer Details</h6>
                            <div className="row">
                                <div className="input-field col-6">
                                    <input placeholder="Customer Name" type="text" id="customerName" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="input-field row col-12">
                                <textarea placeholder="Remarks" style={{ minHeight: 100}} type = "text" id="remarks" onChange={this.handleChange}/>
                            </div>
                            <input type="hidden" id="hireType" value="import"/><br/><br/>
                            <div className="input-field center">
                                <button className="btn blue lighten-1 z-depth-5 btn1">Add</button>
                                <button className="btn red lighten-1 z-depth-5 btn1">Cancel</button>
                            </div>
                            <br/>
                        </form>
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
        addImportHires: (importHire) => dispatch(addImportHires(importHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'hires'}
    ])
)(AddHireImport);

