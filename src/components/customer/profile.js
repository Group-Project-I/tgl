import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css"
import {connect} from 'react-redux'
import ImageUpload from './imageUpload'
import {storage} from '../../config/fbConfig'
import {addProfileImage} from '../../store/actions/customerActions'
import { Button, Card, Accordion, Row, Col} from 'react-bootstrap'
import {FiArrowDownCircle} from "react-icons/fi"
import {MdCall,MdEmail,MdInsertDriveFile} from "react-icons/md"



class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            loading: 1,
            image:null,
            url:'',
            progress:0,
            showProgressBar:false,
            profileImage:''
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleupdate = this.handleupdate.bind(this)

    }
   

    componentWillMount() {
        const {auth} = this.props

        if(this.props.customer){
            this.setState({
                loading: 0
            });
        }
        

    }

    handlechange (e) {
        if(e.target.files[0]){
            const image= e.target.files[0];
            this.setState(() => ({image}))
        }
    }
    handleupdate () {
       const {image} =this.state
       const {auth} = this.props
       const uploadTask=storage.ref(`images/${auth.uid}`)
        .put(image)
        uploadTask.on('state_changed',
        (snapshot)=>{
           // progress functon
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
            this.setState({progress})
        }
        ,(error=>{
            // error function
            console.log(error)

        }),()=>{
            // complete function
            storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                console.log(url)
                this.setState({url})
                 //save file to the db
                addProfileImage(url)
            })
        })
        this.setState({
            showProgressBar:true
        })
    }
    render() {     
        const load = this.state.loading === 0 ? (
            <div className=" container  " >
                <div className="row">
                
                <img src={this.state.url || require('../../img/profile.png')} class="mx-auto img-fluid img-circle d-block " alt="avatar"  style={{borderRadius:'50%',width:'250px'}}/>
                <br/><br/><br/><br/>
                    <label class="custom-file"><br/>
                    <input type="file" id="file" name='image' onChange={this.handlechange}  class="custom-file-control  btn btn-info"/><br/>
                    <button class="custom-file-control  btn blue lighten-1 z-depth-0" onClick={this.handleupdate}>Upload</button>
                    </label><br/>
                    {/* {
                        this.state.showProgressBar ? <progress value={this.state.progress} max='100'/>:null
                    } */}
                    
                </div>
                <br/><br/><br/>
                <div className='row' >
                <br/><br/>
                <strong><h1 className="blue-text">{this.props.customer.firstName + " " + this.props.customer.lastName}</h1></strong>
                <br/><br/>
                <h5><b className="blue-text"><MdCall/>  </b> {this.props.customer.mobile}</h5><br/><br/>
                <br/><h5><b className="blue-text"><MdEmail/>  </b> {this.props.customer.email}</h5><br/><br/>
                <br/><h5><b className="blue-text"><MdInsertDriveFile/>  </b> {this.props.customer.nic}</h5><br/>
                <br/>{this.props.customer.disabled === false ? <Badge pill variant="success" className="left">Active</Badge> : <Badge pill variant="danger" className="left">Disabled</Badge> }

                </div>

               </div>
        ): <div><br/><br/><br/>Loading</div>
        
        return <div>{load}</div>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addProfileImage: (url) => dispatch(addProfileImage(url))  

    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Profile)