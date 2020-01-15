import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {updatePassword} from '../../../store/actions/authActions'

class ChangePassword extends Component {
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
            <div border="primary" className="text-center user-card">
            <div className='cust-heading' >
                <hr/>
                <div style={{padding:'0 20px '}}>
                <h1 style={{float:'left'}}>RESET PASSWORD</h1> 
                </div>
                <hr/>
            </div><br/><br/>
                <Card.Body>
                    <div className= { authUpdateError != 'Password Updated Successfully' ? "red-text" : "green-text"}>
                        {this.state.updated ? authUpdateError : null}
                    </div>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        <div className="input-field row">
                            <input placeholder="Current Password" type="password" id="oldPassword" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field row">
                            <input placeholder="New Password" type="password" id="newPassword"  onChange={this.handleChange} required />    
                        </div><br/>
                        <div className="input-field">
                            <button className="btn blue lighten-1 z-depth-5 btn1">Submit</button>
                        </div>
                    </form>
                </Card.Body>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);