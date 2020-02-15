import React, {Component} from 'react'
import {connect} from 'react-redux'
import {disableOrEnableVehicle} from '../../../../store/actions/adminActions'
import Switch from "react-switch";

// Toggle button to diable vehicles
// Once disabled the vehicle will not be shown on the system 
class DisableVehicle extends Component {

    state = {
        loading: 1,
        updated: 1

    }

    handleChange = (e) => {
        this.props.disableOrEnableVehicle(this.props.id, !this.state.disabled)
        this.setState({
            updated: 1,
            disabled: !this.state.disabled
        })
    }

    componentWillMount(){
        if(this.props.vehicle){
            this.setState({
                ...this.props.vehicle,loading: 0,updated: !this.state.updated
            });
        }
    }

    render() {
        const load = this.state.loading === 0 ? (
            <div className="container">
                    <h2 className="center" style={{paddingTop: '50px'}}>{this.state.disabled === false ? "Disable Vehicle" : "Enable Vehicle" }</h2><br/><br/>
                    <div className="green-text center">
                    </div>
                    <div className="row">
                        <h6 className="left col-10">Once you disable the Vehicle, {this.state.vehicleNo} will not be able available for future hires </h6>
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
        disableOrEnableVehicle: (id, stat) => dispatch(disableOrEnableVehicle(id, stat))
    }
}

export default connect(null, mapDispatchToProps)(DisableVehicle)