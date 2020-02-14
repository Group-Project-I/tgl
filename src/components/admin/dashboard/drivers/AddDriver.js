import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addDriver} from '../../../../store/actions/adminActions'

// Form to add new driver to the system 
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
        visibility: '1'

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
        // console.log(this.state);
        this.props.addDriver(this.state)
    }

    render() {
        const {authError} = this.props
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
                                <input placeholder="First Name" type="text" id="firstName" onChange={this.handleChange} required />
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Last Name" type="text" id="lastName" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Mobile" type="text" id="mobile" onChange={this.handleChange} required />
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="Date of Birth" type="text" onFocus={this.handleDate} id="dob" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="License No" type="text" id="licenseNo" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-field col-6">
                                <input placeholder="NIC" type="text" id="nic" onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="input-field  col-6">
                            <input placeholder="Email" type="email" id="email" onChange={this.handleChange} required/>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input placeholder="Password" type="password" id="password" onChange={this.handleChange} required />
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