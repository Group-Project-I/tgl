import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signIn} from '../../store/actions/authActions'

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.signIn(this.state)
    }

    render() {
        const {authError, user} = this.props

        if (user.userType === 'admin'){
            localStorage.setItem('userId', 'admin')
            return <Redirect to='/admin' />
        } 
        if (user.userType === 'customer' && user.disabled === false) return <Redirect to='/' />
        if (user.disabled === true) return <Redirect to='/error' />
        return (
            <div className="loginBody">
                <div className="container-fluid">
                    <div className="d-flex justify-content-center h-100" style={{paddingTop:'300px'}}>
                        <div className="card signin">
                            <div className="card-header">
                                <h3>Sign In</h3>
                                <div className="red-text center">
                                    {authError ? <h6>{authError}</h6> : null}
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} autoComplete='off'>
                                    <div className="input-field">
                                        <input placeholder="Email" type="email" id="email" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <input placeholder="Password" type="password" id="password" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field center">
                                        <button className="btn blue lighten-1 z-depth-0">Login</button>
                                    </div>
                                    
                                </form>
                                
                            </div>
                            <div className="d-flex justify-content-center links" style={{paddingTop: '20px'}}>
                                    <NavLink to='/forgetPassword'><p>Forgot password?</p></NavLink>
                                </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<p><NavLink to='/signup' className="text-blue">Sign Up</NavLink></p><br/>
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
    console.log(state)
    return {
        authError: state.auth.authError,
        user: state.firebase.profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
