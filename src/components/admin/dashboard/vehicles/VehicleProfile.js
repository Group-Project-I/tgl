import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css";

// Shows details of the vehicle along with a picture
class VehicleProfile extends Component {

    state = {
        loading: 1,
    }

    componentWillMount() {
        if(this.props.vehicle){
            this.setState({
                loading: 0
            });
        }
    }

    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row">
                <div className="col-3">
                    <img src={require('../../../../img/truck.jpg')} class="mx-auto img-fluid img-circle d-block left" alt="avatar" />
                    <h6 class="mt-2 left">Upload a different photo</h6>
                    <label class="custom-file">
                        <input type="file" id="file" class="custom-file-input" />
                        <span class="custom-file-control">Choose file</span>
                    </label>
                </div>
                <div className="col-9">
                    <h1>{this.props.vehicle.vehicleNo}</h1>
                    <br/><br/>
                    <h6><b className="blue-text">Trailer Number: </b> {this.props.vehicle.trailerNo}</h6>
                    <h6><b className="blue-text">Make: </b> {this.props.vehicle.make}</h6>
                    <h6><b className="blue-text">Model: </b> {this.props.vehicle.model}</h6>
                    <h6><b className="blue-text">Engine No: </b> {this.props.vehicle.engineNo}</h6>
                    <h6><b className="blue-text">Chassis No: </b> {this.props.vehicle.chassisNo}</h6>
                    {this.props.vehicle.disabled === false ? <Badge pill variant="success" className="left">Available</Badge> : <Badge pill variant="danger" className="left">Disabled</Badge> }
                </div>
            </div>
        ): <div><br/><br/><br/>Loading</div>
        
        return <div>{load}</div>
    }
}

export default VehicleProfile