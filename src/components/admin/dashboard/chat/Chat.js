import React from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {sendMessage} from '../../../../store/actions/adminActions'
import {readMessage} from '../../../../store/actions/adminActions'
import {MdLens} from 'react-icons/md'

class Chat extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    state = {
        chatData: '',
        newMessage: ''
    }

    updateScroll = () => {
        var element = document.getElementById('myElement');
        element.scrollTop = element.scrollHeight;
        // console.log("scroll")
    }

    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    //     console.log("scroll")
    // }

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.chats !== this.props.chats) {
            var x = nextProps.chats.filter(item => item.id === this.state.chatId)
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

    render() {

        const {chats} = this.props
        // var chatData =this.state.messages

        return(
            <div id="content" className="container-fluid" role="main">
                <h3 className=" text-center" style={{paddingTop:"150px"}}>Messaging</h3>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                            <h4>Recent</h4>
                            </div>
                            <div className="srch_bar">
                            <div className="stylish-input-group">
                                <input type="text" className="search-bar"  placeholder="Search" />
                                <span className="input-group-addon">
                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                            </div>
                        </div>
                        <div className="inbox_chat">
                            {chats && chats.map(chat =>{
                                return(
                                    <div className="chat_list" id={chat.id} onClick={() => this.chatClick(chat)} onMouseDown = {() => this.chatClick(chat)} onMouseUp = {() => this.chatClick(chat)}>
                                    <div className="chat_people">
                                        <div className="chat_img"><img className="chatImg" src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                        <div className="chat_ib">
                                        <h5>{chat.userName}<span className="chat_date">{moment(chat.messages[chat.messages.length - 1].time.toDate()).format('MMM Do YYYY')}</span>{chat.read === 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2' ? <MdLens style={{paddingLeft: '3px', color:'green'}}></MdLens> : null}</h5>
                                        <p>{chat.messages[chat.messages.length - 1].message}</p>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })}
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
                                <input type="text" onChange={this.handleChange} id="newMessage" className="write_msg" placeholder="Type a message" onMouseDown={this.updateScroll}/>
                                <button className="msg_send_btn" type="button" onClick={this.handleSubmit}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
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
)(Chat);