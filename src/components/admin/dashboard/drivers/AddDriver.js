import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addDriver} from '../../../../store/actions/adminActions'

// Form to add new driver to the system 


const validEmailRegex = 
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
//  if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
    }

class AddDriver extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        dob: '',
        licenseNo: '',
        nic: '',
        onHire: '0',
        visibility: '1',
        errors:{
            email:'',
            nic:'',
            licenseNo:'',
            dob:'',
            password:'',
            mobile:''
        }

    }

    // Validation for driver form
    handleChange = (e) => {
        const {id,value} = e.target
        let errors = this.state.errors

        switch(id){
            case 'email':
                errors.email =
                validEmailRegex.test(value)
                ?''
                :'Email is not Valid'
            break;         
            case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid';
            break;
            case 'password': 
            errors.password = 
                value.length < 6
                ? 'Password must be at least 6 characters long'
                : ''
            break;
            case 'confPassword':
                errors.confPassword=
                value.length<6
                ? 'Password must be at least 6 characters long'
                : value != this.state.password
                    ?'Password you entered does not match '
                    :''
            break;  
            case 'nic': 
                errors.nic = 
                value.length <10 
                ? 'NIC is too short'
                : value.length === 10 
                    ?  value[9] === 'v' || value[9] ==='V'
                        ? isNaN(value[0] ) || isNaN(value[1] ) || isNaN(value[2] ) || isNaN(value[3] ) || isNaN(value[4] ) || isNaN(value[5] ) || isNaN(value[6] ) || isNaN(value[7] ) || isNaN(value[8] )
                            ?''
                            :'Invalid type for NIC'
                    :'Invalid type for NIC'
                    :value.length >12
                        ?'NIC is too long'
                        :''
            break;
            case 'mobile': 
            errors.mobile =
            isNaN(value)
            ?'Mobile should not contain any characters' 
            : value.length < 10
                ? 'Too short for Mobile No.(Ex: 07xxxxxxxx)'
                : value.length>10
                    ?'Too long for Mobile No.(Ex: 07xxxxxxxx)'
                    :''
            break;
            case 'dob':
                errors.dob=
                new Date(value) > Date.now()
                ?'Invalid Date Of Birth.Check again'
                :''
            break
            
            case 'licenseNo' :
                errors.licenseNo=
                value.length != 8 || isNaN(value[1]) || isNaN(value[2]) || isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5]) || isNaN(value[6]) || isNaN(value[7])
                ?'Invalid License Number'
                :''
            break
            
            default:
            break
            
        }
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
        e.target.max = "2020-01-01"
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        
        if(validateForm(this.state.errors)) {
            this.props.addDriver(this.state)
            console.info('Valid Form')
          }else{
            console.error('Invalid Form')
          }
    }

    render() {
        const {authError} = this.props
        const {errors} = this.state
        return (
                <div className="container">
                    <br/>
                    <h2 className="center">Add Driver</h2><br/><br/>
                    <div className="red-text center">
                        {authError ? <h6>{authError}</h6> : null}
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="First Name" type="text" id="firstName" onChange={this.handleChange} required noValidate/>
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Last Name" type="text" id="lastName" onChange={this.handleChange} required  noValidate/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Mobile" name='mobile' type="text" id="mobile" onChange={this.handleChange} required noValidate/>
                                {
                               errors.mobile.length>0 && 
                               <small><span className='error red-text center'>{errors.mobile}</span></small>
                           }
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Date of Birth" type="text" onFocus={this.handleDate} id="dob"  onChange={this.handleChange} required noValidate/>
                                {
                               errors.dob.length>0 && 
                               <small><span className='error red-text center'>{errors.dob}</span></small>
                           }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="License No" name='licenseNo' type="text" id="licenseNo" onChange={this.handleChange} required noValidate/>
                           {
                               errors.licenseNo.length>0 && 
                               <small><span className='error red-text center'>{errors.licenseNo}</span></small>
                           }
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="NIC" type="text" id="nic" name='nic' onChange={this.handleChange} required noValidate/>
                            {
                                errors.nic.length >0 &&
                                <small><span className='error red-text center'>{errors.nic}</span></small>
                            }
                            </div>
                        </div>
                        <div className="input-field  col-6">
                            <input placeholder="Email" type="email" id="email" name='email' onChange={this.handleChange} required noValidate/>
                        {
                            errors.email.length >0 && 
                            <small><span className='error red-text center'>{errors.email}</span></small>
                        }
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Password" type="password" id="password" name='password' onChange={this.handleChange} required noValidate/>
                                {
                               errors.password.length>0 && 
                               <small><span className='error red-text center'>{errors.password}</span></small>
                           }
                          </div>
                        </div>
                        <input type="hidden" id="userType" value="driver"/>
                        <div className="input-field center">
                            <button className="btn blue lighten-1 z-depth-5 btn1">Register</button>
                        </div>
                    </form>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addDriver: (newDriver) => dispatch(addDriver(newDriver))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddDriver);