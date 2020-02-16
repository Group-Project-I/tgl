import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css";
import {firestoreConnect} from 'react-redux-firebase'  
import {connect} from 'react-redux'


// View the profile of a customer along with the display picture
class CustomerProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            loading: 1,
            url:''
            // 'https://firebasestorage.googleapis.com/v0/b/trans-global-logistics-969a7.appspot.com/o/images%2Ftest.png?alt=media&token=ff29813a-c714-4e81-b696-9d5325d7655a'   
         }
    }
   
    UNSAFE_componentWillReceiveProps(nextProps) {
        //get image url from db and set the state
        var x = nextProps.users.filter(item => item.id === this.props.customer.id)
        var user
        x.forEach(function(obj){
            user = obj.profilePic
        })
        // console.log(this.state)
        this.setState({
            url: 'https://firebasestorage.googleapis.com/v0/b/trans-global-logistics-969a7.appspot.com/o/images%2Ftest.png?alt=media&token=ff29813a-c714-4e81-b696-9d5325d7655a',
            loading: 0
        })
     }
    componentWillMount() {
        if(this.props.customer){
            this.setState({
                loading: 0
            });           
        }
        console.log(this.props.customer.id)
    }

    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row">
                <div className="col-3">
                    {/* <img src={this.state.url } class="mx-auto img-fluid img-circle d-block left" alt="avatar" /> */}
                    <img id='myImg' src={this.state.url ||require('../../../../img/profile.png')} class="mx-auto img-fluid img-circle d-block " alt="avatar"  style={{borderRadius:'50%',width:'250px'}}/>
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
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users:state.firestore.ordered.users  
    }
}
export default (
    connect(mapStateToProps),
    firestoreConnect([
    { collection:'users'}
    ]) 
)(CustomerProfile)