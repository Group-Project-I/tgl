import React from 'react'
import { Card, Alert } from 'react-bootstrap'
import {connect } from 'react-redux'
import {resetEmail} from '../../../store/actions/authActions'
import image from '../../../img/bgImg7.jpg'

class ResetEmail extends React.Component{
  state={
    email:'',
    password:'',
    updated: null,
  }

//   componentWillReceiveProps(nextProps) {
//
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
    console.log("btn clicked");
    this.props.resetEmail(this.state.email,this.state.password);
    this.setState   ({
      updated: 1
  })
 }

  render(){
    const {authUpdateError} = this.props

    return(

    //   <div style={{  backgroundColor: "#dee7e7 ", margin:'0',padding:'0' ,marginBottom:'0'}}>
    // <div style={{backgroundImage:"url("+image+")" ,backgroundRepeat:'no' ,Opacity:'0.2' ,margin:'0',padding:'0',height:'1000px'}}>
    <div className='container'>
        
        <div className={'user-card text-center' }  >
            <div className='cust-heading' >
            
              <div className= { authUpdateError != 'Email Updated Successfully' ? "red-text" : "green-text"}>
                {this.state.updated ?<Alert varient='success'>Email Updated Successfully </Alert> : null}
              </div>
            <div className='row main-section'>
              
              <div className='col sub-section content' >
                <form onSubmit={this.handleSubmit}>
                  <div className='input-field row'>
                    <input placeholder='New Email Address' id ='email' name='email' type='text' onChange={this.handleChange} required/>
                  </div>
                  <div className="input-field row">
                            <input placeholder="Password" type="password" id="password" onChange={this.handleChange} required />
                        </div><br/>
                  <div className='input-field'>
                  <button className='btn blue lighten-1 z-depth-5 btn1' type ='submit'>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div> 
        //  </div>  
        
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
    resetEmail : (email,password) => dispatch(resetEmail(email,password))
  }
} 
 export default connect(mapStateToProps,mapDispatchToProps)(ResetEmail)
