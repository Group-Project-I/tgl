import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import image from '../../img/importreq.jpg'
import Sidebar from './sidebar'


const imgStyle={
    borderRadius:'50%',
    height:'100px',
    width:'100px',
}
const rowStyle={
    margin:'0',
    paddingBottom:'0',
    backgroundColor:'red'
}
const hStyle = {
    fontSize: '64px',
    margin:'40px',
    textDecoration:'none',
    color:'black'
}

class Profile extends React.Component {
   render(){
       const {auth,customers} = this.props
      
    return(
        // <div style={{backgroundImage:"url("+image+")" }}>
        <div className='container'>
            <br/><br/><br/><br/>
            <div style={{backgroundColor:''}}>
            <hr/>
            <h1 >MY ACCOUNT</h1>  
            <hr/>
            </div>
           
           <div className='row ' >
              
                 <div className='col-md-4'>
                    <Sidebar/>
                </div>

                <div className="col-md-4"  >
                    <Card style={{ width: '18rem'}}>
                        <Card.Img variant="top"  className='center' src={require('../../img/user.png')} 
                        style={{
                            opacity:'0.5' ,width:'15rem',paddingTop:'1rem', display: 'block',  marginLeft: 'auto' , marginRight: 'auto'
                            }} />
                        <Card.Body>
                            <Card.Title><b>Edit Profile </b> </Card.Title>
                            <Card.Text>
                            Edit your profile and change subscription settings
                            </Card.Text>
                            <Link to={'/cust/profile/' + auth.uid}><Button className='btn btn-info' variant="primary">Edit</Button></Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4" >
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={require('../../img/msg.jpg')} style={{opacity:'0.5',paddingTop:'1rem',}} />
                        <Card.Body>
                            <Card.Title><b>View messages</b></Card.Title>
                            <Card.Text>
                            Get any advice or opinion just by sending a message.
                            </Card.Text>
                            <Link to='/cust/messages'><Button className='btn btn-info' variant="primary">View</Button></Link>
                        </Card.Body>
                    </Card>  
                
                </div>  
            </div>
            <hr/>
            <Link to="/cust/Home"><button type="submit" className="btn btn-warning">Back</button></Link>
        </div> 
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
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'customers'}
    ])
)(Profile)
