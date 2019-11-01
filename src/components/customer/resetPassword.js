import React from 'react'
// import {setPassword} from '../../store/actions/customerActions'
import Sidebar from './sidebar'

class ResetPassword extends React.Component{
    render(){
        return(
            <div className='container'>
                 <br/><br/><br/><br/>
                 <hr/>
                <h1>CHANGE PASSWORD</h1>  
                <hr/>
                <div className='row'>
                    <div className='col'>
                        <Sidebar/>
                    </div>
                    <div className='col'>
                    <form className="forms" onSubmit={this.handleSubmit}  data-spy="scroll" >
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="name" >Password:</label>
                            <div className="col-sm-10">          
                                <input type="text" className="form-control" id="pwd" placeholder="Current Password" name="pwd" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="name" >New Password:</label>
                            <div className="col-sm-10">          
                                <input type="password" className="form-control" id="newPwd" placeholder="New Password" name="pwd" onChange={this.handleChange}/>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="comment">Confirm Password:</label>
                            <div className="col-sm-10">
                            <input type="password" className="form-control" id="cnfPwd" placeholder="Confirm your new password" name="pwd" onChange={this.handleChange}/>
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
             <button></button>  
            </div>
        )
    }
}
export default ResetPassword;
