import React from 'react'
import Sidebar from './sidebar'
import ChatList from './chats/chatlist'

import { async } from '@firebase/util'
 
const firebase = require('firebase')

class ChatApp extends React.Component{
    constructor(){
        super()
        this.state={
            selectedChat : null , //index of the chat which we currently in
            newChatFormVisible : false,
            email: null,
            chats: [] 
        }
    }
    render(){
        return(
            <div className='container'>
                 <br/><br/><br/><br/>
                 <hr/>
                <h1>MESSAGES</h1>  
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <Sidebar/>
                    </div>
                    <div className='col'>
                        <ChatList 
                        history={this.props.history}
                        newChatBtnFn ={this.newChatBtnClicked} 
                        selectChatFn={this.selectChat}
                        userEmail={this.state.email}
                        chats={this.state.chats}
                        selectedChatIndex={this.state.selectedChat}
                        />
                    </div>
                </div>

            </div>
        )
    }

    selectChat =(chatIndex)=>{
        console.log('selected chat',chatIndex)
    }
    newChatBtnClicked =()=> this.setState({ 
        newChatFormVisible : true,
        selectedChat : null

     })

     componentDidMount = () =>{
         firebase.auth().onAuthStateChanged(async _usr =>{
             if(!_usr) 
             this.props.history.push('/signin')
             else{
                 await firebase
                 .firestore()
                 .collection('chats')
                 .where('users','array-contains',_usr.email) // selects the chats connected  to the current user
                 .onSnapshot(async result =>{
                     const chats = result.docs.map(_doc => _doc.data())
                     await this.setState({
                         email:_usr.email,
                         chats: chats
                     })
                     console.log(this.state)
                 })
             }
         })
     }
}
export default ChatApp