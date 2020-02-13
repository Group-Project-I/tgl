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
import image from '../../img/index4.jpg'
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
        <div className="container-fluid" 
        style={{backgroundColor:'#bbe8ec' ,height:'100%', backgroundImage:"url("+image+")"}}
         >
                <br/><br/>
        {/* Display update  success message */}
                <div className="green-text center">
                    <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                </div>
                <UserChat/>
        {/* Display user detail  */}
        <br/><br/><br/>
           {/* <Card>
               <Row>
                   <Col>                     
                   <img src={require('../../img/user.png')} class="mx-auto img-fluid img-circle d-block " alt="avatar"  style={{borderRadius:'50%'}}/>
                   <label class="custom-file">
                        <h6 class="">Upload new photo</h6>
                        <input type="file" id="file" class="custom-file-input" />
                        <button class="custom-file-control  btn blue lighten-1 z-depth-0" >Choose file</button>
                    </label>
                   </Col>
                   <Col>
                   <Profile customer={this.props.customer[0]} id={this.props.id}></Profile>
                   </Col>
                   <Col>
                   <div className='row'>
     {/* Edit profile preview */}
               
               
         {/* Change user Password  */}
           
         {/* Change user Email */}
                  
                {/* </div>
                   </Col>
               </Row> */}
           {/* </Card> */} 

                <div className='col' style={{width:'2000px', height:'500px' }}>
                <div className='' style={{display:'block',margin:'0 auto ',paddingTop:'35px',opacity:'0.8'}}> */}
                <Profile customer={this.props.customer[0]} id={this.props.id}></Profile>
                </div> 
                 </div>
                       
               
                 <div className='conatainer row'>      

                
     {/* Show profile settings */}
                <div className='col'>
     {/* Edit profile preview */}
                <Accordion >
                    <Card  >
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{backgroundColor:' #1f618d '}}>
                        EDIT PROFILE  <FiArrowDownCircle/> 
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0" >
                        <Card.Body>
                        <EditProfile customer={this.props.customer[0]} id={this.props.id}></EditProfile>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </div>
                <div className='col'>
         {/* Change user Password  */}
                <Accordion >
                    <Card >
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{backgroundColor:' #1f618d '}}>
                        CHANGE PASSWORD  <FiArrowDownCircle/> 
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <ChangePassword/>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </div>
                <div className='col'>
         {/* Change user Email */}
                  <Accordion>
                    <Card >
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{backgroundColor:' #1f618d '}}>
                        CHANGE EMAIL  <FiArrowDownCircle/> 
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <ResetEmial/>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
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