import React, {Component} from 'react';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Squares } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import moment from 'moment'
import {sendMessage} from '../../../../store/actions/adminActions'

class ViewChat extends Component {
    
    constructor(props){
        super(props)
        // this.setState({
        //     loading: 0
        // })
    }

    state = {
        loading: 1,
        newMessage: '',
        messaged: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.newMessage, this.props.auth.uid, this.props.id)
        this.setState({
            loading: 0,
            messaged: 1
        })
    }

    componentWillMount(){
        this.setState({ ...this.props.messages, loading:0, messaged: 0 });

        // if(this.props.messages){
        //     this.setState({
        //         loading: 0,
        //         ...this.props.messages
        //     })
        // }
    }

    // componentWillReceiveProps(){
    //     if(this.props.messages){
    //         console.log("meow", this.props.messages)
    //         this.setState({
    //             loading: 0,
    //             ...this.props.messages
    //         })
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps.messages != this.props.messages) {
          this.setState({ ...nextProps.messages, loading: 0, messaged: 0, ...nextProps.id });
        }
      }
    render(){
        // const messages = this.state.loading === 0 ? this.props : null
        console.log('view msgs', this.state)
        const load = this.state.loading === 0 ? (
            <div className="mesgs">
                <div className="msg_history">
                    {this.state.messages && this.state.messages.map(message => {
                        return(
                            message.sender === 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2' ?
                            <div className="outgoing_msg">
                            <div className="sent_msg">
                                <p>{message.message}</p>
                                <span className="time_date"> {moment(message.time.toDate()).format('LT') + ' | ' + moment(message.time.toDate()).format('ll')}</span> </div>
                            </div> :
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
                        <input type="text" onChange={this.handleChange} id="newMessage" className="write_msg" placeholder="Type a message" />
                        <button className="msg_send_btn" type="button" onClick={this.handleSubmit}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        ) : <div style={{paddingTop:"300px", paddingLeft:"500px"}}>
                <Squares color="#007bff" size={32} speed={1} animating={true} />
            </div>
        return(
            <div>{load}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        // chats: state.firestore.ordered.chats
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: (message, senderId, receiverId) => dispatch(sendMessage(message, senderId, receiverId)) 
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {collection: 'customers'},
        // {collection: 'chats', doc: props.id}
    ])
)(ViewChat)