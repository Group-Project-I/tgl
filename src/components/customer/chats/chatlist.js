import React from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import Typography from '@material-ui/core/Typography'
import { Divider, List } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

class ChatList extends React.Component{
    render(){

        const { classes } = this.props
        return(
            <div className='classes.root'>
                <Button className='classes.newChatBtn 'onclick={this.newChat}> New Message
                </Button>
                <List>
                {
                        this.props.chats.map((_chat,_index)=>{
                            return(
                                <div key={_index}>
                                     <ListItem onClick={() => this.selectChat(_index)} 
                                        className='classes.listItem'
                                        selected={this.props.selectedChatIndex === _index} 
                                        alignItems="flex-start">
                                        <ListItemAvatar>
                                        <Avatar alt="Remy Sharp">{_chat.users.filter(_user => _user === this.props.userEmail)[0].split('')[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText 
                                            primary={
                                                _chat.users.filter(_user => _user === this.props.userEmail)[0]
                                            }
                                            secondary={
                                                <React.Fragment>
                                                <Typography  component='span'
                                                    color='textPrimary'>
                                                    {/* {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) } */}
                                                </Typography>
                                                </React.Fragment>
                                            }/>
                                         </ListItem>
                                  <Divider/>
                                </div>
                              )
                            })
                          }
                </List>
                </div>
           )        
    }

    
    newChat = ()=>{
        console.log('new chat clicked')
    }
    selectChat =(index) =>{
        console.log('select chat', index)
    }
}

export default ChatList