import React from 'react'
import {connect } from 'react-redux'
import {sendMessage} from '../../../store/actions/customerActions'
import {readMessage} from '../../../store/actions/adminActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
// import 'simplebar'
// import 'simplebar/dist/simplebar.css'
import {Chat,addResponseMessage,addUserMessage,badge} from 'react-chat-popup'

export class UserChat extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            chatData: '',
            newMessage: '',
            adminId:'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
            addModelShow:false,
            messages:'',
            name:''
          }   
   }
    componentDidMount() {
        // addResponseMessage("Welcome to Trans Global Logistics!");  
        console.log('messages-> props') 
        console.log(this.props) 
        console.log(this.props.customers.id) 
    }
 
    handleNewUserMessage =(newMessage)=> {
        console.log(`New message incomig! ${newMessage}`);
        var y=this.props.customers.filter(item => item.id === this.props.auth.uid)
        var userName
        y.forEach(function(obj){
            userName = obj.firstName +obj.lastName 
        })
        console.log('username')
        console.log(userName)

// send the message throught the backend API
        this.props.sendMessage(newMessage,this.props.auth.uid, this.state.adminId,userName)
       }
   
    UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.chats !== this.props.chats) {
        var x = nextProps.chats.filter(item => item.id === this.props.auth.uid)
        var msgs
        x.forEach(function(obj){
            msgs = obj.messages
        })
            this.setState({
            messages: msgs,
            loading: 0,
        })
        }
        console.log(this.state.name)    
    }
    render(){
        const {auth} =this.props
        return(
           <div>
                <Chat
                handleNewUserMessage={this.handleNewUserMessage}
                title ={'Trans Global Logistics'}
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
        chats: state.firestore.ordered.chats,
        customers:state.firestore.ordered.customers
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage : (message,senderId, receiverId,userName) => dispatch(sendMessage(message,senderId ,receiverId,userName)),
        readMessage: (messageId) => dispatch(readMessage(messageId))  

    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'chats'},
        {collection : 'customers'}
    ]) 
)(UserChat)