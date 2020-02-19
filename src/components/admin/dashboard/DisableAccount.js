import React, {Component} from 'react'
import {connect} from 'react-redux'
import {disableOrEnableUser} from '../../../store/actions/adminActions'
import Switch from "react-switch";

// Disable customers,drivers and vehicles from the system
// A switch button is used to enable/disable users
class DisableAccount extends Component {

    state = {
        loading: 1,
        updated: 1

    }

    // Function to enable or disable users
    handleChange = (e) => {
        this.props.disableOrEnableUser(this.props.id, this.props.type, !this.state.disabled)
        this.setState({
            updated: 1,
            disabled: !this.state.disabled
        })
    }

    componentWillMount(){
        if(this.props.user){
            this.setState({
                ...this.props.user,loading: 0,updated: !this.state.updated
            });
        }
    }

    render() {
        const load = this.state.loading === 0 ? (
            <div className="container">
                    <h2 className="center" style={{paddingTop: '50px'}}>{this.state.disabled === false ? "Disable Account" : "Enable Account" }</h2><br/><br/>
                    <div className="green-text center">
                    </div>
                    <div className="row">
                        <h6 className="left col-10">Once you disable the account, {this.state.firstName + " " + this.state.lastName} will not be able to log in to the system </h6>
                        <Switch
                            onChange={this.handleChange}
                            onColor = "#FF0000"
                            checked={this.state.disabled}
                            className="react-switch right col-2"
                            style={{verticalAlign: 'middle', marginRight: '0px'}}
                        />
                    </div>
                </div>
                
        ) : <div><br/><br/><br/>Loading</div>
        return <div>{load}</div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        disableOrEnableUser: (id, collec, stat) => dispatch(disableOrEnableUser(id, collec, stat))
    }
}

export default connect(null, mapDispatchToProps)(DisableAccount)