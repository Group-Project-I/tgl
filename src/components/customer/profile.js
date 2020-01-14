import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css";

class Profile extends Component {

    state = {
        loading: 1,
    }

    componentWillMount() {
        if(this.props.customer){
            this.setState({
                loading: 0
            });
        }
    }

    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row jumbotron " style={{opacity:'0.7',width:'1450px',margin:'0 auto'}} >
                <div className="col-3">
                    <img src={require('../../img/profile.jpg')} class="mx-auto img-fluid img-circle d-block left" alt="avatar" />
                    
                    <label class="custom-file">
                        <h6 class="mt-2 left">Upload new photo</h6>
                        <input type="file" id="file" class="custom-file-input" />
                        <span class="custom-file-control">Choose file</span>
                    </label>
                </div>
                <div className="col-9">
                    <h1>{this.props.customer.firstName + " " + this.props.customer.lastName}</h1>
                    <br/><br/>
                    <h6><b className="blue-text">Mobile: </b> {this.props.customer.mobile}</h6>
                    <h6><b className="blue-text">Email: </b> {this.props.customer.email}</h6>
                    <h6><b className="blue-text">NIC: </b> {this.props.customer.nic}</h6>
                    {this.props.customer.disabled === false ? <Badge pill variant="success" className="left">Active</Badge> : <Badge pill variant="danger" className="left">Disabled</Badge> }
                </div>
            </div>
        ): <div><br/><br/><br/>Loading</div>
        
        return <div>{load}</div>
    }
}

export default Profile