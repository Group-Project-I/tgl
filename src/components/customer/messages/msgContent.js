import React from 'react'
import {connect} from 'react-redux'
import { Card} from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar'



const adminStyle ={
    backgroundColour:' #a7ead0 '

}
const custStyle ={
    backgroundColour:' #a7ead0 ',
    colour:'',
    textAlign:'right'
}

class MsgContent extends React.Component {
    state={
        clickedChat :'false'

    }
    handleClick =(e)=>{
        return(
            // this.props.messages.content
            this.setState.clickedChat='true'
        )
    }
    render(){
        const {auth,messages,type} = this.props
        let name= auth.uid && type.userType === 'admin' ? 'Admin' : 'You' ;
        let cardStyle = name==='Admin' ? adminStyle :custStyle;

        if(auth.uid === messages.from || auth.uid == messages.to){
                return(
                    <Card className='card' bg="light" text='black' style={{   
                        cardStyle
                         }}>
                        <Card.Body>
                        <Avatar alt="Remy Sharp" >{ name === 'admin'? 'A' : 'Y'   }</Avatar>
                         <div onClick={this.handleClick}>{messages.content.substring(0, 30)}</div>
                        </Card.Body>
                        <div>
{                            this.state.clickedChat === true?messages.content:null
}                        </div>
                    </Card>
                )
        }
        else{
            return(
                <div>
                   </div>
            )
        }

    }

}
const mapStateToProps=(state)=>{
    console.log(state);
    return{
        auth: state.firebase.auth,
        type: state.firebase.profile
    }
}
export default connect(mapStateToProps)(MsgContent);
