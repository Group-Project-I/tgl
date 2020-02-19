import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addVehicle} from '../../../../store/actions/adminActions'
import {Redirect} from 'react-router-dom'

// Form to add vehicles to the system
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
//  if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
    }
class AddVehicle extends Component {
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
        visibility: '1',
        valid:null,
        errors:{
            chassisNo:'',
            vehicleNo:'' 
    }

    }

    // Validations for vehicle no and chassis number
    handleChange = (e) => {
        const { name, value } = e.target
        let errors = this.state.errors
        
        switch (name) {
            case 'vehicleNo': 
            errors.vehicleNo = 
            value.length != 7 
                ? 'Invalid vehicle No(ex: LY-0000)' 
                : value[0] >='A' && value[0] <='Z' && value[1] >='A' && value[1] <= 'Z' && value[2] == '-' && !isNaN(value[3]) && !isNaN(value[4]) && !isNaN(value[5]) && !isNaN(value[6])
                    ?''
                    :'Invalid vehicle No(ex: LY-0000)';
            break;
            case 'chassicNo': 
            errors.chassicNo = 
                value.length < 6
                ? ''
                : ''
            break;
            default:
            break;
        }
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm(this.state.errors)) {
            this.setState({
                valid:'valid'
            })
            console.info('Valid Form')
            this.props.addVehicle(this.state)
          }else{
            if(this.state.valid)return <Redirect to='/admin' />

            console.error('Invalid Form')
          }
        //   this.props.addVehicle(this.state)

    }

    render() {
        const{errors}=this.state
        if(this.state.valid)return <Redirect to='/admin/vehicles' />

        return (
                <div className="container">
                    <br/>
                    <h2 className="center">Add Vehicle</h2><br/><br/>
                    <form onSubmit={this.handleSubmit} >
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Vehicle No" type="text" id="vehicleNo" name='vehicleNo' onChange={this.handleChange} required noValidate />
                                {errors.vehicleNo.length > 0 && 
                                    <small><span className='error red-text center'>{errors.vehicleNo}</span></small>
                                    }
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Trailer No" type="text" id="trailerNo" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col-4"> 
                                <input placeholder="Make" type="text" id="make" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-field col-4">
                                <input placeholder="Model" type="text" id="model" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-field col-4">
                                <input placeholder="Engine No" type="text" id="engineNo" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="input-field row col-4">
                            <input placeholder="Chassis No" type="text" id="chassisNo"  name='chassisNo' onChange={this.handleChange} required noValidate/>
                            {
                            errors.chassisNo.length > 0 && 
                                    <small><span className='error red-text center'>{errors.chassisNo}</span></small>
                                    }
                        </div>
                        <div className="input-field row col-4">
                            <input placeholder="Initial Milage" type="text" id="initialMilage" onChange={this.handleChange} required />
                        </div>
                        <div className="row">
                            <div className="input-field col-4">
                                <input placeholder="Purchased From" type="text" id="purchasedFrom" onChange={this.handleChange} required />
                            </div>
                            <div className="input-field col-4">
                                <input placeholder="Purchased Date" type="text" id="purchasedDate" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-field col-4">
                                <input placeholder="Insurer" type="text" id="insurer" onChange={this.handleChange} />
                            </div>
                        </div>    
                        <div className="input-field row col-6">
                            <textarea placeholder="Remarks" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange}/>
                        </div>
                        <br/><br/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-5 btn1">Register</button>
                        </div>
                    </form>
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addVehicle: (vehicle) => dispatch(addVehicle(vehicle))
    }
}

export default connect(null,mapDispatchToProps)(AddVehicle);