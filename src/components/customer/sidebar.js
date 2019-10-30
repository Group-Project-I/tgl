import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import {connect} from 'react-redux'

class Sidebar extends React.Component{
    render(){
        const {auth,customers} = this.props

        return(
            <Card  bg="info" style={{ width: '18rem'}}>

                        <Card.Body><Link style={{color:' #d7ebeb',textDecoration:'none'}} to={'/cust/profile/' + auth.uid}><hr/>Edit Profile<hr/></Link></Card.Body>
                        <Card.Body><Link style={{color:'#d7ebeb',textDecoration:'none'}} to={'/cust/resetPassword'}>Change Password <hr/></Link></Card.Body>
                        <Card.Body><Link style={{color:'#d7ebeb',textDecoration:'none'}} to ={'/cust/messages'}>View Messages <hr/></Link></Card.Body>
                        <Card.Body><Link style={{color:'#d7ebeb',textDecoration:'none'}} to={'/cust/custManageTools'}>Manage Hires <hr/></Link></Card.Body>

            </Card>
        )
    }
}
const mapStateToProps=(state)=>{
    console.log(state);
    return{
        auth: state.firebase.auth,
        customers: state.firestore.ordered.customers
    }
}
export default connect(mapStateToProps) (Sidebar)
