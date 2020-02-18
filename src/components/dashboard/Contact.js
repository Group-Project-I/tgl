import React from 'react'
import {connect } from 'react-redux'
import {sendFeedback} from '../../store/actions/customerActions'


class Contact extends React.Component{

    state ={
        id:'',
        name:'',
        email:'',
        message:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        // this.props.sendInquiries(this.state)
        var variables ={
            message_html: this.state.message, 
            from_name: this.state.name, 
            reply_to: this.state.email
        }
        this.props.sendFeedback(variables)
        // this.setState({
        //    [ e.target.value]:null
        // })
    }

 

    render(){
        return(
            <div>
    
                <br/><br/><br/><br/><br/>
                <div className="container cont">
                    <h3 className="display-4 text-center"><strong>Contact Us</strong></h3>
                    <hr className="bg-dark mb-2 w-25"/>
                    <br/><br/><br/>
                    <div className="row-fluid" >
                        <div className="col-md-8 iframe">
                            <iframe title="map" width="100%" height="350" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1987.6924704747278!2d79.94866297520304!3d6.867467222179532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae250ee317f72df%3A0x5d3e64fc4f0a3f0b!2sKalalgoda+Rd%2C+10230!5e0!3m2!1sen!2slk!4v1561884360789!5m2!1sen!2slk"></iframe>
                        </div>
                        <div className="col-md-4 addr">
                            <h2>Trans Global Logistics</h2>
                            <address>
                                66/22 Fortune Terrace<br/>
                                Kalalgoda Road<br/>
                                Pannipitiya<br/>
                                Sri Lanka<br/>
                                <abbr title="Phone">TP:</abbr> 01234 567 890
                            </address>
                        </div>
                    </div>
                </div>
                <br/><br/><br/><br/>
                <div className="container contactus">
                    <div className="row">
                        <br/><br/>
                        <div className="col-md-3 test">
                            <div className="contact-infos">
                                <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="Mail"/>
                                <h2>Get In Touch</h2>
                                <h4>We would love to hear from you !</h4>
                            </div>
                        </div>
  {/* inquiry form starts from here                     */}
                        <div className="col-md-9 testing">
                            <div className="contact-forms">
                                <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="name">Name:</label>
                                <div className="col-sm-10">          
                                    <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" onChange={this.handleChange}/>
                                </div>
                                </div>
                                <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                                </div>
                                </div>
                                <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="comment">Message:</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="5" id="message" onChange={this.handleChange}></textarea>
                                </div>
                                </div>
                                <div className="form-group">        
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </div>
                                </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        )
    }
    
}
const mapDispatchToProps = (dispatch) => {
    return{
        // sendInquiries : (message) => dispatch(sendInquiries(message)),
        sendFeedback : (variables) =>dispatch(sendFeedback(variables))
    }
}

export default connect(null,mapDispatchToProps)(Contact)