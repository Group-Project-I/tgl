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
import './../../style.css'


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
            
            <div className="container">
                 <br/><br/><br/><br/>
                 <hr/>
                 <div style={{padding:'0 20px '}}>
                <h1 style={{float:'left'}} >MESSAGES</h1> 
                <Link to='/cust/profile'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
                </div>
                <hr/>

                <div className='row'>
                {/* view msg */}
                    <div className='col-md-4 msg-display' data-simplebar style={{
                        width: '18rem', 
                        height:'500px',
                        }}>
                        <Card >
                            {/* <Card.Header style={{position:'fixed'}}> </Card.Header> */}
                            <Card.Body> <ViewMessage messages ={messages} /></Card.Body>
                           
                        </Card>
                    </div>
       
                    <div className='col-md-6' style={{ width: '18rem'}}>
                        <Card>
                        <form onSubmit={this.handleSubmit}>
                            <div className='row card-body'>
                            {/* <input placeholder='Type your message' id="content" className='col-md-9' c ol-md-4 style={{float:'left',margin:'5px', border:'2px solid grey' ,borderRadius:'10%'}}></input> */}
                            <textarea className="form-control col-md-10" rows="5" id="content" onChange={this.handleChange} 
                            style={{float:'left',width: '15rem',height:'40px',padding:'10px'}}></textarea>            
                            <button type="submit" className="btn btn-info col-md-2" style={{float:'right',paddingLeft:'10px',width:'5rem'}}>Send</button>
                            </div>
                        </form>                        
                        </Card>
                    </div>
                </div>
                <hr/>
            </div>
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