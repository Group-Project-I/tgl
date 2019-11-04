import React from 'react'
import {connect} from 'react-redux'
import { Card} from 'react-bootstrap'



const adminStyle ={
    backgroundColour:' #a7ead0 '

}
const custStyle ={
    backgroundColour:' #a7ead0 ',
    colour:'',
    textAlign:'right'
}

class MsgContent extends React.Component {

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
                            {name}<hr/>
                            {messages.content}
                        </Card.Body>
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
