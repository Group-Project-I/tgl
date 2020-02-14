import React from 'react'
import {connect } from 'react-redux'
import {sendMessage} from '../../../store/actions/customerActions'
import {readMessage} from '../../../store/actions/adminActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import {Chat,addResponseMessage,addUserMessage} from 'react-chat-popup'

export class UserChat extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            chatData: '',
            newMessage: '',
            adminId:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
            addModelShow:false,
            messages:''
          }   
   }
    // componentWillMount() {
    //     addResponseMessage("Welcome to Trans Global Logistics!");
    //     // addResponseMessage(this.state.messages)
    //     // var x =this.state.messages
    //     // var response
    //     // x.forEach(function(obj){
    //     //     response = obj.message
    //     //     addResponseMessage(response)

    //     // })
       
    //   }
 
    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
            this.props.sendMessage(newMessage, this.props.auth.uid, this.state.adminId)
        // }
    
      }
   
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
           <div>
                <Chat
                handleNewUserMessage={this.handleNewUserMessage}
                />
                {this.state.messages && this.state.messages.map(message => {
                    message.sender === auth.uid 
                        ?addUserMessage(message.message)
                        :addResponseMessage(message.message)
               })}
           </div>
         )}
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
)(UserChat)