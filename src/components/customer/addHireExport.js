import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addExportHires} from '../../store/actions/customerHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class AddHireExport extends Component {
    state = {
        containerType: '20',
        pickupLocation: '',
        pickupDatetime: '',
        cargoType: '',
        weight: '',
        loadingPort: '',
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
                            <h1 className="center fadeIn animated slow add_head">Add <span className="topic">Export</span></h1>
                            <hr className="bg-dark mb-4"/>

                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    <br/>
                    <h5>Container Type</h5> <br/>
                    <div className="row col-6">
                        <select className="form-control select1" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                            <option value="20">20ft</option>
                            <option value="40">40ft</option>
                        </select>
                    </div>
                    <br/><h5> Container Pickup Details</h5>
                    <div className="row">
                        <div className="input-field col-6">
                            <input className="placeholder" placeholder="Pickup Location" type="text" id="pickupLocation" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input className="placeholder" placeholder="Pickup Date and Time" onFocus={this.handleDate} ref="pickup" type="text" id="pickupDatetime"  onChange={this.handleChange} required />
                        </div>
                    </div>
                    <br/><h5>Cargo Details</h5>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Cargo Type" type="text" id="cargoType" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input placeholder="Weight" type="text" id="weight" onChange={this.handleChange} required />
                        </div>
                    </div>

                    <br/><h5>Loading Details</h5>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Loading Port" type="text" id="loadingPort" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input placeholder="Loading Date and Time" onFocus={this.handleDate} type="text" id="loadingDatetime" onChange={this.handleChange} required />
                        </div>

                    </div>

                    <br/><h5>Customer Details</h5>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Customer Name" type="text" id="customerName" onChange={this.handleChange} required />
                        </div>
                    </div>


                    <div className="input-field row col-12">
                        <textarea placeholder="Remarks" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                    </div>
                    <input type="hidden" id="hireType" value="import"/><br/><br/>
                    <div className="input-field center">
                        <button className="btn blue lighten-1 z-depth-5 btn1">Add</button>
                        <Link to='/User/Home'><button className="btn red lighten-1 z-depth-5 btn1">Cancel</button></Link>
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
        addExportHires: (exportHire) => dispatch(addExportHires(exportHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'hires'}
    ])
)(AddHireExport);
