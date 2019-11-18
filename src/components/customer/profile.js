import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'


// const imgStyle={
//     borderRadius:'50%',
//     height:'100px',
//     width:'100px',
// }
// const rowStyle={
//     margin:'0',
//     paddingBottom:'0',
//     backgroundColor:'red'
// }
// const hStyle = {
//     fontSize: '64px',
//     margin:'40px',
//     textDecoration:'none',
//     color:'black'
// }

class Profile extends React.Component {
   render(){
       const {auth,customers} = this.props
      
    return(
        // <div style={{backgroundImage:"url("+image+")" ,backgroundRepeat:'no' ,Opacity:'0.5' ,margin:'0',padding:'0'}}>
        <div style={{  backgroundColor: "#dee7e7", margin:'0',padding:'0' ,marginBottom:'0'}}>

        <div className='container' style={{backgroundColor:'',opacity:'1'}} >
            <br/><br/><br/><br/>
            <Card className={'user-card'}>
            <div className='cust-heading' >
                <hr/>
                <div style={{padding:'0 20px '}}>
                <h1 style={{float:'left'}}>MY ACCOUNT</h1> 
                {/* <i class="fas fa-bell"  style={{float:'right'}}></i> */}
                 <Link to='/'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
                
                </div>
                <hr/>
            </div>
           
           <div className='row main-section ' >
          
                 <div className='col-md-4 col-sm-12' style={{paddingLeft:'40px'}}>
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
                            <Link to={'/cust/profile/' + auth.uid}><Button className='btn btn-info' variant="primary" style={{ width: '15rem'}}>Edit</Button></Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4  col-sm-12"  >
                    <Card style={{ width: '18rem'}}>
                        <Card.Img variant="top"  className='center' src={require('../../img/mail.jpg')} 
                        style={{
                            opacity:'0.5' ,width:'15rem',paddingTop:'1rem', display: 'block',  marginLeft: 'auto' , marginRight: 'auto'
                            }} />
                        <Card.Body>
                            <Card.Title><b>Email Recovery </b> </Card.Title>
                            <Card.Text>
                            Change your email preferences chvjnhjbvcbdsyefsKAUSG
                            <br/>
                            </Card.Text> 
                            <Link to={'/resetEmail'}><Button className='btn btn-info' variant="primary" style={{ width: '15rem'}}>RECOVER</Button></Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4  col-sm-12" >
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={require('../../img/msg.jpg')} style={{opacity:'0.5',paddingTop:'1rem'}} />
                        <Card.Body>
                            <Card.Title><b>View messages</b></Card.Title>
                            <Card.Text>
                            Get any advice or opinion just by sending a message.
                            </Card.Text>
                            <Link to='/cust/messages'><Button className='btn btn-info' variant="primary" style={{ width: '15rem'}}>View</Button></Link>
                        </Card.Body>
                    </Card>  
                
                </div>  
            </div>
            <hr/>
            </Card>
            
        </div> 
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
 