import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css";

// Driver profile component 
class DriverProfile extends Component {

    state = {
        loading: 1,
    }

    componentWillMount() {
        if(this.props.driver){
            this.setState({
                loading: 0
            });
        }
    }

    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row">
                <div className="col-3">
                    <img src={require('../../../../img/profile.jpg')} class="mx-auto img-fluid img-circle d-block left" alt="avatar" />
                    <h6 class="mt-2 left">Upload a different photo</h6>
                    <label class="custom-file">
                        <input type="file" id="file" class="custom-file-input" />
                        <span class="custom-file-control">Choose file</span>
                    </label>
                </div>
                <div className="col-9">
                    <h1>{this.props.driver.firstName + " " + this.props.driver.lastName}</h1>
                    <br/><br/>
                    <h6><b className="blue-text">Mobile: </b> {this.props.driver.mobile}</h6>
                    <h6><b className="blue-text">Email: </b> {this.props.driver.email}</h6>
                    <h6><b className="blue-text">NIC: </b> {this.props.driver.nic}</h6>
                    <h6><b className="blue-text">License: </b> {this.props.driver.licenseNo}</h6>
                    {this.props.driver.disabled === false ? <Badge pill variant="success" className="left">Active</Badge> : <Badge pill variant="danger" className="left">Disabled</Badge> }
                </div>
            </div>
        ): <div><br/><br/><br/>Loading</div>
        
        return <div>{load}</div>
    }
}

export default DriverProfile