import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: '',
        dob: '',
        nic: ''

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.signUp(this.state)
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'date'
    }

    render() {
        const {auth, authError} = this.props
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
                                        <input placeholder="First Name" type="text" id="firstName" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Last Name" type="text" id="lastName" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Mobile" type="text" id="mobile" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="NIC No" type="text" id="nic" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Date of Birth" onFocus={this.handleDate} type="text" id="dob" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Email" type="email" id="email" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Password" type="password" id="password" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Confirm Password" type="password" id="confPassword" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn blue lighten-1 z-depth-0">Register</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer center">
                                <div className="d-flex justify-content-center links">
                                    Already have an account?<p><NavLink to='/signin' className="text-blue">Sign In</NavLink></p>
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