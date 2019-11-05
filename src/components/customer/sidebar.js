import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import {connect} from 'react-redux'

class Sidebar extends React.Component{
    render(){
        const {auth} = this.props

        return(
            <Card  bg="dark" style={{ width: '18rem',height:'420px'}}>
                        
            <Card.Body><Link style={{color:' #d7ebeb',textDecoration:'none'}} to={'/cust/profile/' + auth.uid}>Edit Profile <i class="fas fa-user-circle"></i></Link></Card.Body><hr/>
            <Card.Body><Link style={{color:'#d7ebeb',textDecoration:'none'}} to={'/cust/resetPassword'}>Change Password </Link></Card.Body><hr/>
            <Card.Body><Link style={{color:'#d7ebeb',textDecoration:'none'}} to ={'/cust/messages'}>View Messages </Link></Card.Body><hr/>
            <Card.Body><Link style={{color:'#d7ebeb',textDecoration:'none'}} to={'/cust/custManageTools'}>Manage Hires </Link></Card.Body>

            </Card>
        )
    }
}
const mapStateToProps=(state)=>{
    console.log(state);
    return{
        auth: state.firebase.auth,
    }
}
export default connect(mapStateToProps) (Sidebar)
