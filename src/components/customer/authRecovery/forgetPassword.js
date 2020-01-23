import React from 'react'
import {Link} from 'react-router-dom'
import {Card,Modal,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {recoverPassword} from '../../../store/actions/customerActions'

 class ForgetPassword extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      updatedState:false
    }
}
 

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
       
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.recoverPassword(this.state);
    this.setState({
      updatedState: true
  })

  }

  render(){
    const {email} =this.props
    // console.log(this.state);
    return(
      <div style={{  backgroundColor: "#dee7e7 ", margin:'0',padding:'0' ,marginBottom:'0'}}>

      <div className='container'>
       <Modal className={'user-card'}
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <h1 style={{float:'left'}}>RESET PASSWORD</h1> 
          </Modal.Title>
        </Modal.Header>
        <div className="green-text center">
                        <h4>{this.state.updatedState ? "Email Sent" : null}</h4>
              </div>
              
      <div className=' sub-section content'>
        <Modal.Body>
          <p style={{textAlign:'justify' }}>Please enter your email address below and we will send you information to recover your account</p>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <input placeholder=' Email Address' id ='email' name='email' type='text' onChange={this.handleChange} required/>
            </div>
           
            {/* <button className='btn d-flex justify-content-center' style={{float:'left'}} type ='submit'>SEND </button> */}
          <Button variant='info' type='submit'  style={{margin:'auto'}}>SEND</Button>
          {/* <Button variant='light' onClick={this.props.onHide} style={{float:'right'}}>Close</Button> */}
        
          </form>
          </Modal.Body>
        </div>
        
        
      </Modal>
 
        </div> 
        </div>   
    )
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return{
       
       recoverPassword : (email) => dispatch(recoverPassword(email))
  }
} 
export default connect(null,mapDispatchToProps)(ForgetPassword);
