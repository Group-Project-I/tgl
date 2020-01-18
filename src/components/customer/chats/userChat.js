import React from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {sendMessage} from '../../../store/actions/adminActions'
import {readMessage} from '../../../store/actions/adminActions'
import {MdLens, MdSend} from 'react-icons/md'
import 'simplebar'
import 'simplebar/dist/simplebar.css'

class UserChat extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
        chatData: '',
        newMessage: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('newMessage').value = ""
        if(this.state.chatId){
            this.props.sendMessage(this.state.newMessage, this.props.auth.uid, this.state.chatId)
        }
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.chats != this.props.chats) {
            var x = nextProps.chats.filter(item => item.id == this.state.chatId)
            var msgs
            x.forEach(function(obj){
                msgs = obj.messages
            })

            this.setState({
                messages: msgs,
                loading: 0
            })
        }
      }
   
      render(){
        const {chats} = this.props

        
        return(
            <div className='container'>
                 <br/><br/>
                 <div className={'user-card'} style={{ opacity:'1'}}>
                 <div className='cust-heading ' >
                    <hr/>
                    <div style={{padding:'0 20px '}}>
                    <h1 style={{float:'left'}} >MESSAGES</h1> 
                    <Link to='/User/profile'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
                    </div>
                    <hr/>
                </div>
            </div>

            <div className="mesgs" id="myElement">
            <div className="msg_history" id="myElement">
                {this.state.messages && this.state.messages.map(message => {
                return(
                    message.sender === 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2' ?
                    <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>{message.message}</p>
                        <span className="time_date"> {moment(message.time.toDate()).format('LT') + ' | ' + moment(message.time.toDate()).format('ll')}</span> </div>
                    </div>
                    :
                    <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img className="chatImg" src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                        <p>{message.message}</p>
                        <span className="time_date">{moment(message.time.toDate()).format('LT') + ' | ' + moment(message.time.toDate()).format('ll')}</span></div>
                    </div>
                    </div>
                    
                )
            })}
        </div>
        <form onSubmit={this.handleSubmit}>
            <div className="type_msg">
                <div className="input_msg_write">
                <input type="text" onChange={this.handleChange} id="newMessage" className="write_msg" placeholder="Type a message" 
                // onMouseDown={this.updateScroll}
                />
                <button className="msg_send_btn" type="button" onClick={this.handleSubmit}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                </div>
            </div>
        </form>
    </div>
 </div>
        )



    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        chats: state.firestore.ordered.chats
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: (message, senderId, receiverId) => dispatch(sendMessage(message, senderId, receiverId)),
        readMessage: (messageId) => dispatch(readMessage(messageId))  
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'chats'}
    ])
)(UserChat);