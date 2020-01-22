import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {editUser} from '../../store/actions/adminActions'
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
import {PopUp} from './popUp'
import { Button } from 'react-bootstrap'
import {TiMessages} from "react-icons/ti";


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
            <div className="container-fluid"  style={{margin:'0',padding:'0'}}>
                <br/><br/>
                <div className="green-text center">
                    <h4>{this.state.updated ? "Updated Successfully" : null}</h4>
                </div>
                <div className='row' style={{padding:'30px 30px',backgroundImage:"url("+image+")"}}>
                <Profile customer={this.props.customer[0]} id={this.props.id}></Profile>
                </div>
               
               
               <div className='container'style={{backgroundColor:'',width:'40%',margin:'auto'}} >
                <Tabs className="center">
                    <TabList className="left">
                    <Tab>Edit Profile</Tab>
                    <Tab>Messages</Tab>
                    <Tab>Settings</Tab>
                    </TabList>
                    <Button className={'btn'} style={{margin:'10px',borderRadius:'50%'}} onClick={()=> this.setState({addModelShow:true})}><TiMessages/></Button>   
                <Message     show={this.state.addModelShow} 
                onHide={addModelClose}/>
                    <br/><br/>
                    
                    <TabPanel>
                        <EditProfile customer={this.props.customer[0]} id={this.props.id}></EditProfile>
                    </TabPanel>
                    <TabPanel>
                        <Message/>
                    </TabPanel>
                    <TabPanel>
                        <div className='row container-fluid'>
                        <div className='col-md-6'><ResetEmial/></div>
                        <div className='col-md-6'><ChangePassword/></div>
                        </div>
                    </TabPanel>
                </Tabs>
                </div>  
                <div>
                <Button className={'btn'} style={{marginRight:'10px',marginBottom:'100px',position :'absolute',right:'0px',borderRadius:'50%'}} onClick={()=> this.setState({addModelShow:true})}><TiMessages/></Button>   
                <Message     show={this.state.addModelShow} 
                onHide={addModelClose}/>
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