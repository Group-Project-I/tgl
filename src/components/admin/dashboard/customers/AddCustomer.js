import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCustomer} from '../../../../store/actions/adminActions'

// Register customer to the system 
// Admin can register customers


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
class AddCustomer extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        dob: '',
        nic: '',
        errors:{
            email: '',
            nic: '',
            mobile: '',
            password:''     
    }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
// Authenticate customer
        const { name, value } = e.target
        let errors = this.state.errors

        switch (name) {
            case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
            case 'password': 
            errors.password = 
                value.length < 6
                ? 'Password must be 6 characters long!'
                : ''
            break;
            case 'nic': 
                errors.nic = 
                value.length <10 
                ? 'NIC is too short !'
                : value.length === 10 && value[9] !== 'V'
                    ? 'Invalid type for NIC'
                    :value.length >12
                        ?'NIC is too long !'
                        :''
            break;
            case 'mobile': 
            errors.mobile = 
                value.length < 10
                ? 'Too short for Mobile No:!'
                : ''
            break;
            default:
            break;
        }
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
            this.setState({errors, [name]: value})
        })
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCustomer(this.state)
        if(validateForm(this.state.errors)) {
            
            console.info('Valid Form')
          }else{
            console.error('Invalid Form')
          }
    }

    render() {
        const {authError} = this.props
        const {errors} =this.state
       
        return (
                <div className="container">
                    <br/>
                    <h2 className="center">Add Customer</h2><br/><br/>
                    <div className="red-text center">
                        {authError ? <h6>{authError}</h6> : null}
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="First Name" name='firstName' type="text" id="firstName" onChange={this.handleChange} required />
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Last Name" type="text" id="lastName" name="lastName" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Mobile" type="text" id="mobile" name="mobile" onChange={this.handleChange} required noValidate />
                           {
                               errors.mobile.length >0 &&
                               <small><span className='error red-text center'>{errors.mobile}</span></small>
                           }
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Date of Birth" onFocus={this.handleDate} type="text" id="dob" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="NIC No" type="text" id="nic" name="nic" onChange={this.handleChange} required noValidate/>
                                {
                               errors.nic.length >0 &&
                               <small><span className='error red-text center'>{errors.nic}</span></small>
                           }
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Email" type="email" id="email" name="email" onChange={this.handleChange} required noValidate/>
                                {
                               errors.email.length >0 &&
                               <small><span className='error red-text center'>{errors.email}</span></small>
                           }
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Password" type="password" id="password" name="password" onChange={this.handleChange} required noValidate/>
                                {
                               errors.password.length >0 &&
                               <small><span className='error red-text center'>{errors.password}</span></small>
                           }
                            </div>
                        </div>
                        <input type="hidden" id="userType" value="customer"/>
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
        addCustomer: (newCustomer) => dispatch(addCustomer(newCustomer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
