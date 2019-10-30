import React from 'react'
import ViewMessage from './viewMessage'
import {connect } from 'react-redux'
import {sendMessage} from '../../store/actions/customerActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Sidebar from './sidebar'

class Message extends React.Component{
state={ 
    to:'',
    from:'',
    state:'',
    name:'',
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
                <h1>MESSAGES</h1>  
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <Sidebar/>
                    </div>
                        {/* view msg */}
                    <div className='col' style={{border:'2px solid grey',width: '18rem'}}>
                        <ViewMessage messages ={messages} />
                    </div>
                  
                    <div className='col' style={{ width: '18rem'}}>
                        {/* sending msg */}
                        <form className="contact-forms" onSubmit={this.handleSubmit}  data-spy="scroll" >
                        <br/><br/><br/><br/><br/><br/>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="name" >Name:</label>
                            <div className="col-sm-10">          
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" name="lname" onChange={this.handleChange}/>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="comment">Message:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="5" id="comment" onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                        <div className="form-group">        
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-info">Send</button>
                            </div>
                        </div>
                        </form>
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