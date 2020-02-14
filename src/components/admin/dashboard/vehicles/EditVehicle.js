import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUser} from '../../../../store/actions/adminActions'

// Form to edit vehicle details 
class EditCustomer extends Component {

    state = {
        vehicleNo: '',
        trailerNo: '',
        make: '',
        model: '',
        initialMilage: '',
        purchasedFrom: '',
        purchasedDate: '',
        insurer: '',
        engineNo: '',
        chassisNo: '',
        remarks: '',
        loading: 1,
        updated: 1
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editVehicle(this.props.id, this.state, 'vehicles')
        this.setState({
            updated: 1
        })
    }

    componentWillMount(){
        if(this.props.vehicle){
            this.setState({
                ...this.props.vehicle,loading: 0,updated: !this.state.updated
            });
        }
    }

    render() {
        const load = this.state.loading === 0 ? (
            <div className="container">
                    <h2 className="center" style={{paddingTop: '50px'}}>Edit Vehicle</h2><br/><br/>
                    <div className="green-text center">
                        <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Vehicle No</h6>
                                <input placeholder="Vehicle No" type="text" id="vehicleNo" value={this.state.vehicleNo}  onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Trailer No</h6>
                                <input placeholder="Trailer No" type="text" id="trailerNo" value={this.state.trailerNo}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Make</h6>
                                <input placeholder="Make" type="text" id="make" value={this.state.make} onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Model</h6>
                                <input placeholder="Model" type="text" id="model" value={this.state.model} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Engine No</h6>
                                <input placeholder="EngineNo" type="text" id="engineNo" value={this.state.engineNo} onChange={this.handleChange} required />
                            </div>
                            <div className='col-2'></div>
                            <div className="input-field col-5 row">
                                <h6 className='blue-text'>Chassis No</h6>
                                <input placeholder="Chassis No" type="text" id="chassisNo" value={this.state.chassisNo} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-3 row ">
                                <h6 className='blue-text'>initial Milage</h6>
                                <input placeholder="initial Milage" type="text" id="initialMilage" value={this.state.initialMilage}  onChange={this.handleChange} required />
                            </div>
                            <div className='col-1'></div>
                            <div className="input-field col-3 row">
                                <h6 className='blue-text'>Purchased From</h6>
                                <input placeholder="Purchased From" type="text" id="purchasedFrom" value={this.state.purchasedFrom}  onChange={this.handleChange} required />
                            </div>
                            <div className='col-1'></div>
                            <div className="input-field col-3 row">
                                <h6 className='blue-text'>Purchased Date</h6>
                                <input placeholder="Purchased Date" onFocus={this.handleDate} type="text" id="purchasedDate" value={this.state.purchasedDate}  onChange={this.handleChange} required />
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="input-field col-3 row ">
                                <h6 className='blue-text'>Insurer</h6>
                                <input placeholder="Insurer" type="text" id="insurer" value={this.state.insurer}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6 row center">
                                <h6 className='blue-text'>Remarks</h6>
                                <input placeholder="Remarks" type="text" style={{ minHeight: 100 }}  id="remarks" value={this.state.remarks}  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-0">Update</button>
                        </div>
                    </form>
                </div>
                
        ) : <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editVehicle: (id, vehicle, collec) => dispatch(editUser(id, vehicle, collec))
    }
}

export default connect(null, mapDispatchToProps)(EditCustomer)