import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {changeEmail} from '../../../../store/actions/authActions'

// Change email of the admin account using firebase auth 

class ChangeAdminEmail extends Component {
    state = {
        newEmail: '',
        password: '',
        updated: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // Function to change email. current password and the new email are passed to the function
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.changeAdminEmail(this.state.password, this.state.newEmail)
        this.setState   ({
            updated: 1
        })
    }

    render(){
        const {authUpdateError} = this.props
        return(
            <Card border="primary" className="text-center">
                <Card.Body>
                    <div className= { authUpdateError !== 'Email Updated Successfully' ? "red-text" : "green-text"}>
                        {this.state.updated ? authUpdateError : null}
                    </div>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        <div className="input-field row">
                            <input placeholder="New Email" type="email" id="newEmail" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field row">
                            <input placeholder="Password" type="password" id="password"  onChange={this.handleChange} required />    
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
        changeAdminEmail : (currentPassword, newEmail) => dispatch(changeEmail(currentPassword, newEmail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAdminEmail);