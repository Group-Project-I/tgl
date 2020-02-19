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
            valid:'',
            errors:{
                email: '',
                nic: '',
                mobile: '',
                dob:'',
                password:'' ,
                confPassword:'',
                dob: ''
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
                : value != this.state.password
                    ?'Password you entered does not match '
                    :''
            break;  
            case 'nic': 
                errors.nic = 
                value.length <10 || (value.length <10 && isNaN(value))
                ? 'Invalid NIC number'
                : value.length === 10 && value[9] !== 'v' || isNaN(value[0] ) || isNaN(value[1] ) || isNaN(value[2] ) || isNaN(value[3] ) || isNaN(value[4] ) || isNaN(value[5] ) || isNaN(value[6] ) || isNaN(value[7] ) || isNaN(value[8] )
                    ? 'Invalid NIC number'
                    :value.length >12
                        ?'NIC is too long'
                        :''
                var i;
                for(i = 0; i<value.length; i++){
                    
                }
            break;
            case 'mobile': 
            errors.mobile = 
                value.length != 10 || isNaN(value) || value[0] != 0 || value[1] != 7
                ? 'Invalid Mobile No.(Ex: 07xxxxxxxx)'
                : ''
            break;
            case 'dob':
                errors.dob=
                new Date(value) > Date.now()
                ?'Invalid Date Of Birth.Check again'
                :''
            break
            default:
            break;
        }

        this.setState({errors, [name]: value}, ()=> {
            // console.log(errors)
            this.setState({errors, [name]: value})

        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state);
        if(validateForm(this.state.errors)) {
            console.info('Valid Form')
            this.setState({
                valid:'valid'
            })
            this.props.signUp(this.state)
          }else{
            console.error('Invalid Form')
          }
        // this.props.signUp(this.state)

    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
        e.target.max = "2020-01-01"
    }

    render() {
        const {auth, authError} = this.props
        const {errors} = this.state

        if (auth.uid) return <Redirect to='/signin' />
        // if(this.state.valid)return <Redirect to='/' />

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
                                        <input placeholder="Date of Birth" name='dob' onFocus={this.handleDate} max={new Date()} type="text" id="dob" onChange={this.handleChange} required noValidate/>
                                    </div>
                                    {errors.dob.length > 0 && 
                                    <small><span className='error red-text center'>{errors.dob}</span></small>
                                    }
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
                                    {errors.confPassword.length > 0 && 
                                    <small><span className='error red-text center'>{errors.confPassword}</span></small>
                                    }
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn blue lighten-1 z-depth-0">Register</button>
                                    </div>
                                </form>
                            </div>
                            {/* <div className="card-footer center"> */}
                                <div className="d-flex justify-content-center links">
                                   Already have an account?<p><NavLink to='/signin' className="text-blue">Sign In</NavLink></p>
                                </div>
                            {/* </div> */}
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