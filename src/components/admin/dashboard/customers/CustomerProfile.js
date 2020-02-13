import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css";

class CustomerProfile extends Component {

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
            <div className="row">
                <div className="col-3">
                    <img src={require('../../../../img/profile.jpg')} class="mx-auto img-fluid img-circle d-block left" alt="avatar" />
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

export default CustomerProfile