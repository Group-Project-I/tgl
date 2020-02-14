import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import EditProfile from './editProfile'
import Profile from './profile'
import Message from './message'
import ResetEmial from './authRecovery/resetEmail'
import ChangePassword from './authRecovery/changePassword'
import {Redirect} from 'react-router-dom'
import { Squares } from 'react-activity'
import image from '../../img/bgImg2.jpg'
import { Button, Card, Accordion, Row, Col} from 'react-bootstrap'
import {TiMessages} from "react-icons/ti"
import {FiArrowDownCircle} from "react-icons/fi"
import {Chat} from 'react-chat-popup'
import UserChat from '../customer/chats/userChat'
import Particles from 'react-particles-js';

class UserProfile extends Component {

    constructor(props){
        super(props)
        
    }

    state = {
        loading: 1,
        addModelShow:false
    }
    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
      }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if(this.props.customer){
            this.setState({
                loading: 0
            });
        }
    }
    render() {
        const {auth} = this.props

        // let addModelClose =()=>this.setState({addModelShow:false})

        if (!auth.uid) return <Redirect to='/signin' />

        const load = this.state.loading === 0 ? (
     <div style={{backgroundColor:' #cde7e9 '}}>
        <div className="container-fluid" 
        style={{backgroundColor:'#cde7e9 ' ,height:'100%',backgroundImage:'{{+Image+}}'}}
         >
        <br/><br/>
        {/* Display update  success message */}
        <div className="green-text center">
            <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
        </div>
        <UserChat/>
        {/* Display user detail  */}
        <br/><br/><br/>
        <div className='container' style={{minHeight:'850px'}}>
        
            <div className='row' style={{marginBottom:'0px'}}>
                <div className='col-md-4'style={{padding:'30px'}}>
                <Profile customer={this.props.customer[0]} id={this.props.id}></Profile>
                </div>
                <div className='col-md-8' style={{padding:'30px',backgroundColor:'white'}}>
                    <Tabs className='center' >
                        <TabList>
                            <Tab>EDIT PROFILE</Tab>
                            <Tab>CHANGE PASSWORD</Tab>
                            <Tab>CHANGE EMAIL</Tab>
                        </TabList>
                        <br/>
                        <TabPanel>
                        <EditProfile customer={this.props.customer[0]} id={this.props.id}></EditProfile>
                        </TabPanel>
                        <TabPanel>
                        <ChangePassword/>
                        </TabPanel>
                        <TabPanel>
                        <ResetEmial/>
                        </TabPanel>

                    </Tabs>

                </div>

            </div>
            </div> 
            
             
          </div> 
        
          </div> 
        ) : <div className="text-center" style={{paddingTop:"500px"}}><Squares color="#007bff" size={32} speed={1} animating={true} /></div>
        return <div>{load}</div>
    }
}
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id: id,
        auth: state.firebase.auth,
        customer: state.firestore.ordered.customers
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'customers', doc: props.id}
    ])
)(UserProfile)