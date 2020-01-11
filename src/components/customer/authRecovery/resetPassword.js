import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import {connect} from 'react-redux'
import {recoverPassword} from '../../../store/actions/customerActions'

class ResetPassword extends React.Component{
  state={
    email:'',
    updatedState:'1'
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
      updated: 0
  })

  }

  render(){
    const {email} =this.props
    // console.log(this.state);
    return(
      <div style={{  backgroundColor: "#dee7e7 ", margin:'0',padding:'0' ,marginBottom:'0'}}>

      <div className='container'>
        <br/><br/><br/><br/>
        <Card className={'user-card'}  >
            <div className='cust-heading' >
              <hr/>
              <div style={{padding:'0 20px '}}>
              <h1 style={{float:'left'}}>RESET PASSWORD</h1> 
                <Link to='/'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
              </div>
              <hr/>
              <div className="green-text center">
                        <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
              </div>
            </div>
            <div className='row main-section'>
              <div className='col-md-4 sub-section'>
                <img src={require('../../../img/image1.jpg')} style={{width:'400px',height:'500px',opacity:'0.7'}} alt="pwdImage"/>
              </div>
              <div className='col-md-6 sub-section content'
              style={{paddingLeft:'100px'}}
              >
                <p style={{textAlign:'justify' }}>Please enter your email address below and we will send you information to recover your account</p>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <input placeholder=' Email Address' id ='email' name='email' type='text' onChange={this.handleChange} required/>
                  </div>
                  <button className='btn d-flex justify-content-center' type ='submit'>Reset Password</button>
                </form>
              </div>
            </div>
          
        </Card>
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
export default connect(null,mapDispatchToProps)(ResetPassword);
