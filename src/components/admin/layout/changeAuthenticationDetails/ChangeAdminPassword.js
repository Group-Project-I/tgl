import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {updatePassword} from '../../../../store/actions/authActions'

// Change password of the admin account using firebase auth

class ChangeAdminPassword extends Component {
    state = {
        newPassword: '',
        oldPassword: '',
        updated: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // Function to change the admin password, current password and new password are passed to the function
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.updateAdminPassword(this.state.oldPassword, this.state.newPassword)
        this.setState   ({
            updated: 1
        })
    }

    render(){
        const {authUpdateError} = this.props
        return(
            <Card border="primary" className="text-center">
                <Card.Body>
                    <div className= { authUpdateError !== 'Password Updated Successfully' ? "red-text" : "green-text"}>
                        {this.state.updated ? authUpdateError : null}
                    </div>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        <div className="input-field row">
                            <input placeholder="Old Password" type="password" id="oldPassword" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field row">
                            <input placeholder="New Password" type="password" id="newPassword"  onChange={this.handleChange} required />    
                        </div><br/>
                        <div className="input-field">
                            <button className="btn blue lighten-1 z-depth-5 btn1">Submit</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authUpdateError: state.auth.authUpdateError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateAdminPassword : (currentPassword, newPassword) => dispatch(updatePassword(currentPassword, newPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAdminPassword);