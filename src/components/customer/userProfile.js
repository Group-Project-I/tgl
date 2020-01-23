import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import EditProfile from './editProfile'
import Profile from './profile'
import Message from './message'
import ResetEmial from './authRecovery/resetEmail'
import ChangePassword from './authRecovery/changePassword'
import {Redirect} from 'react-router-dom'
import { Squares } from 'react-activity'
import image from '../../img/index4.jpg'
import { Button} from 'react-bootstrap'
import {TiMessages} from "react-icons/ti"
import {FiArrowDownCircle} from "react-icons/fi"
import Particles from 'react-particles-js';



class UserProfile extends Component {

    constructor(props){
        super(props)
        
    }

    state = {
        loading: 1,
        addModelShow:false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if(this.props.customer){
            this.setState({
                loading: 0
            });
        }
    }
    render() {
        const {auth} = this.props

        let addModelClose =()=>this.setState({addModelShow:false})

        if (!auth.uid) return <Redirect to='/signin' />

        const load = this.state.loading === 0 ? (
            <div className="container-fluid"  style={{}}>
                <br/><br/>
                <div className="green-text center">
                    <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                </div>
                <div className='row' style={{width:'2000px', height:'400px',backgroundImage:"url("+image+")"}}>
                    <div className='container-fluid jumbotron' style={{display:'block',marginLeft:'auto ',marginRight:'auto',padding:'35px',opacity:'0.8'}}>
                    <Profile customer={this.props.customer[0]} id={this.props.id}></Profile>
                    
                    </div>
                  
                </div>
                <div className='row'>
                    <button class="btn btn-info left" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <FiArrowDownCircle/> OPTIONS
                    </button>
                    <div className='right' style={{float:"left"} }>
                    <Button className={'btn'} style={{margin:'10px',borderRadius:'50%'}} onClick={()=> this.setState({addModelShow:true})}><TiMessages/></Button>   
                    <Message     show={this.state.addModelShow} 
                        onHide={addModelClose}/>
                    </div>

                </div>
                
             
                {/* <Popup trigger={<button> Trigger</button>} position="right center">
                    <div>Popup content here !!</div>
                    <Message/>
                </Popup> */}
   
            <div class="collapse" id="collapseExample">
            <div class="card card-body center">
               <div className='container jumbotron'style={{backgroundColor:'',width:'50%',marginLeft:'auto ',marginRight:'auto'}} >
                <Tabs className="center">
                    <TabList className="left">
                    <Tab>Edit Profile</Tab>
                    <Tab>Email Recover</Tab>
                    <Tab>Password Recover</Tab>
                    </TabList>
                    {/* /////// */}
                    <br/>
                  <TabPanel>
                        <EditProfile customer={this.props.customer[0]} id={this.props.id}></EditProfile>
                    </TabPanel>
                    <TabPanel>
                    <div className='row container-fluid'>
                    <div className='col'><ResetEmial/></div>
                    </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='row container-fluid'>
                        <div className='col'><ChangePassword/></div>

                        </div>
                    </TabPanel>
                </Tabs>
                </div>  
              </div>
              </div>
         </div>       
        ) : <div className="text-center" style={{paddingTop:"500px"}}><Squares color="#007bff" size={32} speed={1} animating={true} /></div>
        return <div>{load}</div>
    }
}
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id: id,
        auth: state.firebase.auth,
        customer: state.firestore.ordered.customers
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {collection: 'customers', doc: props.id}
    ])
)(UserProfile)