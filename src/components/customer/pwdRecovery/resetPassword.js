import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import {connect } from 'react-redux'
import {recoverPassword} from '../../../store/actions/customerActions'

class ResetPassword extends React.Component{
  state={
    email:''
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(this.state);
    this.props.recoverPassword(this.state)
  }

  render(){
    return(
      <div className='container'>
        <br/><br/><br/><br/>
        <Card >
            <div  style={{backgroundColor:'white' ,opacity:'1'}}>
              <hr/>
              <div style={{padding:'0 20px '}}>
              <h1 style={{float:'left'}}>RESET PASSWORD</h1> 
                <Link to='/'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
              </div>
              <hr/>
            </div>
            <div className='row'>
              <div className='col'>
                <img src={require('../../../img/image1.jpg')} style={{width:'500px',height:'500px'}} alt="pwdImage"/>
              </div>
              <div className='col'>
                <p style={{textAlign:'justify'}}>Please enter your email address below and we will send you information to recover your account</p>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <input placeholder=' Email Address' id ='email' onChange={this.handleChange} />
                  </div>
                  <button className='btn' type ='submit'>Reset Password</button>
                </form>
              </div>
            </div>
          
        </Card>
        </div>    
    )
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return{
    recoverPassword : (email) => dispatch(recoverPassword(email))
  }
} 


 export default connect(null,mapDispatchToProps) (ResetPassword);
