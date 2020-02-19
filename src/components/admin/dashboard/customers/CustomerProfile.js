import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css";
// View the profile of a customer along with the display picture
class CustomerProfile extends Component {

    constructor(props){
        super(props)
        this.state={
            loading: 1,
            url:''
        }
    }
   
    // Get the passed profile pic URL into the state
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.user){
            this.setState({
                url: this.props.user,
                loading: 0
            })
        }
     }

    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row">
                <div className="col-3">
                    <img id='myImg' src={this.state.url !== 1 ? this.state.url : require('../../../../img/profile.png')} class="mx-auto img-fluid img-circle d-block " alt="avatar"  style={{borderRadius:'50%',width:'250px'}}/>
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

export default (CustomerProfile)
