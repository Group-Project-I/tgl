import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import {connect } from 'react-redux'
import {resetEmail} from '../../../store/actions/customerActions'
import image from '../../../img/bgImg7.jpg'

class ResetEmail extends React.Component{
  state={
    email:'',
    updated: null,
  }

//   componentWillReceiveProps(nextProps) {
        
//     if(this.props.customer){
//         this.setState({
//             ...nextProps.customer[0],updated: !this.state.updated
//         });
//     }
// }
  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value

    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.resetEmail(this.state);
    this.setState   ({
      updated: 1
  })
 }

  render(){
    const {authUpdateError} = this.props

    return(

    //   <div style={{  backgroundColor: "#dee7e7 ", margin:'0',padding:'0' ,marginBottom:'0'}}>
    <div style={{backgroundImage:"url("+image+")" ,backgroundRepeat:'no' ,Opacity:'0.2' ,margin:'0',padding:'0',height:'1000px'}}>
    <div className='container'>
        <br/><br/><br/><br/>
        <Card className={'user-card'}  >
            <div className='cust-heading' >
              <hr/>
              <div style={{padding:'0 20px '}}>
              <h1 style={{float:'left'}}> EMAIL RECOVERY</h1> 
                <Link to='/User/profile'><button className='btn'  style={{float:'right'}}>BACK</button></Link><br/><br/> 
              </div>
              <hr/>
              <div className= { authUpdateError != 'Email Updated Successfully' ? "red-text" : "green-text"}>
                        {this.state.updated ? authUpdateError : null}
                    </div>
            <div className='row main-section'>
              <div className='col-md-4 sub-section'>
                <img src={require('../../../img/email.png')} style={{width:'400px',height:'500px',opacity:'0.7'}} alt="pwdImage"/>
              </div>
              <div className='col-md-6 sub-section content'style={{paddingLeft:'100px'}} >
                <p style={{textAlign:'justify' }}>Please enter your new email address below to  recover your account</p>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <input placeholder=' Email Address' id ='email' name='email' type='text' onChange={this.handleChange} required/>
                  </div>
                  <button className='btn d-flex justify-content-center' type ='submit'>Reset Email</button>
                </form>
              </div>
            </div>
          </div>
        </Card>
        </div> 
        </div>  
        
    )
  }
}
  
const mapStateToProps = (state) => {
  return {
      authUpdateError: state.auth.authUpdateError
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    resetEmail : (email) => dispatch(resetEmail(email))
  }
} 


 export default connect(mapStateToProps,mapDispatchToProps)(ResetEmail)
