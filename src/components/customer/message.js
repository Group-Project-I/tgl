import React from 'react'
import ViewMessage from './messages/viewMessage'
import {connect } from 'react-redux'
import {sendMessage} from '../../store/actions/customerActions'
import {readMessage} from '../../store/actions/adminActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Card, Modal,Button} from 'react-bootstrap'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import { async } from '@firebase/util'
import {Redirect} from 'react-router-dom'
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import Popup from "reactjs-popup";
import {MdLens} from 'react-icons/md'

export class Message extends React.Component{
    
    constructor(props){
        super(props)
     
        this.state={
            chatData: '',
            newMessage: '',
            adminId:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
            addModelShow:false
          }   
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

    }

 
handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
    console.log("handelchange")
}

handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    // this.props.sendMessage(this.state)
    document.getElementById('newMessage').value = ""
    if(this.props.auth.uid){
        this.props.sendMessage(this.state.newMessage, this.props.auth.uid, this.state.adminId)
    }
    console.log("handelsumbit")
}
chatClick = (chat) => {
    this.setState({
        chatId: chat.id,
        messages: chat.messages,
    })
    this.props.chats.forEach(function(obj){
        document.getElementById(obj.id).className = "chat_list"
    })
    document.getElementById(chat.id).className = "chat_list active_chat"

    this.props.readMessage(chat.id)
}
// componentDidMount(){
//     const {auth}=this.props
//     firebase.auth().onAuthStateChanged(async _user=>{
//         if(!_user)
//             return <Redirect to='/signin' />
//         else{
//             var docRef = firebase.firestore().collection("chats").doc(auth.uid);

//            docRef.get().then(function(doc) {
//             if (doc.exists){
//             console.log("Document data:", doc.data());
//             console.log(doc.data().messages)
//             this.setState({
//                 chats: doc.data().messages
//             })
//             console.log("chats",this.props.state.chats)
//             } else {
//             //doc.data() will be undefined in this case
//             console.log("No such document!");
//             }
//             }).catch(function(error) {
//             console.log("Error getting document:", error);
//             });
//         }
//     }
//     )
// } 
UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.chats !== this.props.chats) {
        var x = nextProps.chats.filter(item => item.id === this.props.auth.uid)
        var msgs
        x.forEach(function(obj){
            msgs = obj.messages
        })
console.log(this.state)
        this.setState({
            messages: msgs,
            loading: 0
        })
    }
  }
    render(){
        const {auth,chats} =this.props
        return(
            // <div style={{backgroundImage:"url("+image+")" ,backgroundRepeat:'no' ,Opacity:'0.2' ,margin:'0',padding:'0', height:'1000px'}}>
      <div>  
           {/* <Popup trigger={<button> MSG</button>} position="right bottom">
            <div>Popup content here !!
                {
                    this.chats
                }
            </div>
            </Popup> */}
            
            <Modal 
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                        >
              <Modal.Header  >
                <h2>MESSAGES</h2>
              </Modal.Header>
              <hr></hr>
              <Modal.Body>
               
                <div className="mesgs" id="myElement" style={{width:'100%'}}>
                    <div className="msg_history" id="myElement">
                        {this.state.messages && this.state.messages.map(message => {
                            return(
                                message.sender === auth.uid ?
                                <div className="outgoing_msg">
                                <div className="sent_msg">
                                    <p>{message.message}</p>
                                    
                                    <span className="time_date"> {moment(message.time.toDate()).format('LT') + ' | ' + moment(message.time.toDate()).format('ll')}</span> 
                                </div>
                                </div>
                                :
                                <div className="incoming_msg">
                                <div className="incoming_msg_img"> <img className="chatImg" src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                <div className="received_msg">
                                <div className="received_withd_msg">
                                    <p>{message.message}</p>
                                    <span className="time_date">{moment(message.time.toDate()).format('LT') + ' | ' + moment(message.time.toDate()).format('ll')}</span>
                                </div>
                                </div>
                                </div>
                            )
                        })}
                    </div>
                   </div> 
                 
              </Modal.Body>
              <Modal.Footer  style={{position:'relative'}}>
              <form onSubmit={this.handleSubmit}>
                <div className="type_msg">
                    <div className="input_msg_write">
                    <input type="text" onChange={this.handleChange} id="newMessage" className="write_msg" placeholder="Type a message" />
                    <button className="msg_send_btn" type="button" onClick={this.handleSubmit}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </div>
                </div>
            </form>
            <Button variant='light' onClick={this.props.onHide} style={{float:'right'}}>Close</Button>

              </Modal.Footer>
          </Modal> 
            </div>

          
            // </div>
        )
    }
}
const mapStateToProps =(state) => {
    console.log(state)
    return{
        auth:state.firebase.auth,
        chats: state.firestore.ordered.chats
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage : (message, senderId, receiverId) => dispatch(sendMessage(message, senderId, receiverId)),
        readMessage: (messageId) => dispatch(readMessage(messageId))  

    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'chats'}
    ]) 
)(Message)