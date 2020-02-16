import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authActions'

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
          
class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
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
                password:'' ,
                confPassword:'' 
        }
    }
}   
    handleChange = (event) => {
        event.preventDefault();
        // this.setState({
        //     [event.target.id]: event.target.value
        // })

        const { name, value } = event.target
        let errors = this.state.errors
        
        switch (name) {
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
                : value != errors.password
                    ?'Password you entered does not match '
                    :''
                
            case 'nic': 
                errors.nic = 
                value.length <10 
                ? 'NIC is too short'
                : value.length === 10 && value[9] !== 'v'
                    ? 'Invalid type for NIC'
                    :value.length >12
                        ?'NIC is too long'
                        :''
            break;
            case 'mobile': 
            errors.mobile = 
                value.length < 10
                ? 'Too short for Mobile No.(Ex: 07xxxxxxxx)'
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

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state);
        if(validateForm(this.state.errors)) {
            
            console.info('Valid Form')
          }else{
            console.error('Invalid Form')
          }
        // this.props.signUp(this.state)

    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
    }

    render() {
        const {auth, authError} = this.props
        const {errors} = this.state

        if (auth.uid) return <Redirect to='/signin' />
        return (
            <div className="loginBody">
                <div className="container">
                    <br/>
                    <div className="d-flex justify-content-center h-100">
                        <div className="card signup">
                            <div className="card-header">
                                <h3>Sign Up</h3>
                                <div className="red-text center">
                                    {authError ? <h6>{authError}</h6> : null}
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} >
                                    <div className="input-field">
                                        <input placeholder="First Name" name='firstName' type="text" id="firstName" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Last Name" name='lastName' type="text" id="lastName" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                    
                                    <input placeholder="Mobile" name='mobile' type="text" id="mobile" onChange={this.handleChange} required  noValidate/>
                                    {errors.mobile.length > 0 && 
                                    <small><span className='error red-text center'>{errors.mobile}</span></small>
                                    }
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="NIC No" name='nic' type="text" id="nic" onChange={this.handleChange} required noValidate/>
                                    {errors.nic.length > 0 && 
                                    <small><span className='error red-text center' >{errors.nic}</span></small>
                                    }
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Date of Birth" name='dob' onFocus={this.handleDate} type="text" id="dob" onChange={this.handleChange} required noValidate/>
                                    </div>
                                    <div className="input-field">
                                    <input placeholder="Email" type="email" name='email' id="email" onChange={this.handleChange} required noValidate/>
                                    {errors.email.length > 0 && 
                                    <small><span className='error red-text center'>{errors.email}</span></small>
                                    }
                                    </div>
                                    <div className="input-field">
                                    <input placeholder="Password" type="password" name='password' id="password" onChange={this.handleChange} required noValidate/>
                                    {errors.password.length > 0 && 
                                    <small><span className='error red-text center'>{errors.password}</span></small>
                                    }
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Confirm Password" type="password" name='confPassword' id="confPassword" onChange={this.handleChange} required noValidate/>
                                    {errors.password.length > 0 && 
                                    <small><span className='error red-text center'>{errors.confpassword}</span></small>
                                    }
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn blue lighten-1 z-depth-0">Register</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer center">
                                <div className="d-flex justify-content-center links">
                                   <br/> Already have an account?<p><NavLink to='/signin' className="text-blue">Sign In</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);