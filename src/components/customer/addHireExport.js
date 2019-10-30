import React, {Component} from 'react'
import Datetime from 'react-datetime'
// import {connect} from 'react-redux'

class AddHireExport extends Component {
    state = {
        containerType: '20',
        pickupLocation: '',
        pickupDatetime: '',
        cargoType: '',
        weight: '',
        loadingPort: '',
        loadingDatetime: '',
        driverId: '',
        customerId: '',
        vehicleId: '',
        remarks: '',
        completed: '0',
        driverAccepted: '0',
        declined: '0',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.addExportHire(this.state)
    }

    handlePickupDate = (e) => {
        this.setState({
            pickupDatetime: e._d
        })
    }

    handleLoadingDate = (e) => {
        this.setState({
            loadingDatetime: e._d
        })
    }

    handleContainerType = (e) => {
        if(e.target.value){
            this.setState({
                containerType: e.target.value
            })
        }
    }

    render() {
        return (
            <div>
                <br/><br/>
                <h2 className="center">Add Export</h2><br/><br/>
                <form onSubmit={this.handleSubmit} >
                    <div className="row col-4">
                        <select className="form-control" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                            <option value="20">20ft</option>
                            <option value="40">40ft</option>
                        </select>
                    </div>
                    <br/><hr/><h5>Container Pickup Details</h5> <br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Pickup Location" type="text" id="pickupLocation" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <Datetime id="pickupDatetime" onChange={this.handlePickupDate} required></Datetime>
                        </div>
                    </div>
                    <br/><hr/><h5>Cargo Details</h5> <br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="Cargo Type" type="text" id="cargoType" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field col-6">
                            <input placeholder="Weight" type="text" id="weight" onChange={this.handleChange} required />
                        </div>
                    </div>
                    <br/><hr/><h5>Unloading Details</h5><br/>
                    <div className="row">
                        <div className="input-field col-6">
                            <input placeholder="unloading Port" type="text" id="unloadingPort" onChange={this.handleChange} required />
                        </div>

                    </div>


                    <div className="input-field row col-12">
                        <textarea placeholder="Remarks" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                    </div>
                    <input type="hidden" id="hireType" value="import"/><br/><br/>
                    <div className="input-field center">
                        <button className="btn blue lighten-1 z-depth-0">Add</button>
                        <button className="btn red lighten-1 z-depth-0">Cancel</button>
                    </div>
                </form>
            </div>


    )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addExportHire: (exportHire) => dispatch(addExportHire(exportHire))
//     }
// }

export default AddHireExport;
