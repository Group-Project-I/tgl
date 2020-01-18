  import React from 'react'
import ViewMessage from './messages/viewMessage'
import {connect } from 'react-redux'
import {sendMessage} from '../../store/actions/customerActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import image from '../../img/bgImg6.jpg'


class Message extends React.Component{
    
state={ 
    to:'',
    from:'',
    state:'',
    content:''
}

handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.sendMessage(this.state)
}
 
    render(){
        const {messages} =this.props
        return(
            // <div style={{backgroundImage:"url("+image+")" ,backgroundRepeat:'no' ,Opacity:'0.2' ,margin:'0',padding:'0', height:'1000px'}}>

            <div className="container">
                 <br/><br/>
                 <div className={'user-card'} style={{ opacity:'1'}}>
                 <div className='cust-heading ' >
                    <hr/>
                    <div style={{padding:'0 20px '}}>
                    <h1 style={{float:'left'}} >MESSAGES</h1> 
                    <Link to='/User/profile'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
                    </div>
                    <hr/>
                </div>
                <div className='row main-section'>
                {/* view msg */}
                    <div className='col-md-4 msg-display ' data-simplebar style={{
                        width: '18rem', height:'600px', paddingLeft:'30px' }}>
                        <Card style={{backgroundColor:'#aad2d1'}} >
                            {/* <Card.Header style={{position:'fixed'}}> </Card.Header> */}
                            <Card.Body> <ViewMessage messages ={messages} /></Card.Body>
                        </Card>
                    </div>
       {/* sending msg */}
                    <div className='col-md-8 ' style={{ width: '18rem' ,padding:'0 70px'}}>
                        <Card   style={{height:'400px',backgroundColor:'#aad2d1'}}>
                            <Card.Body style={{height:'300px'}}>

                            </Card.Body>
                            <Card.Footer style={{height:'100px'}}>
                            <form onSubmit={this.handleSubmit}>
                            <div className='row card-body'>
                            {/* <input placeholder='Type your message' id="content" className='col-md-9' c ol-md-4 style={{float:'left',margin:'5px', border:'2px solid grey' ,borderRadius:'10%'}}></input> */}
                            <textarea className="form-control col-md-10" rows="5" id="content" onChange={this.handleChange} 
                            style={{float:'left',width: '15rem',height:'40px',padding:'10px'}}></textarea>            
                            <button type="submit" className="btn btn-info col-md-1 offset-1" style={{float:'right',radius:'50%'}}><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </form>   
                            </Card.Footer>
                                             
                        </Card>
                    </div>
                   <hr/>
                </div>
                <hr/>
                </div>
            </div>
            // </div>
        )
    }
}
const mapStateToProps =(state) => {
    console.log(state)
    return{
        messages:state.firestore.ordered.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage : (message) => dispatch(sendMessage(message))
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'messages'}
    ]) 
)(Message)