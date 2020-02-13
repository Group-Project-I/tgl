import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css"
import ImageUpload from './imageUpload'
import {storage} from '../../config/fbConfig'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            loading: 1,
            image:null,
            url:'',
            progress:0,
            showProgressBar:false
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleupdate = this.handleupdate.bind(this)

    }
   

    componentWillMount() {
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
        const uploadTask=storage.ref(`images/${image.name}`)
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
            })
        })
        this.setState({
            showProgressBar:true
        })
    }
    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row container  " >
                <div className="col-4">
                    
                    
                    <img src={this.state.url || require('../../img/profile.png')} class="mx-auto img-fluid img-circle d-block " alt="avatar"  style={{borderRadius:'50%'}}/>
                    
                    {/* <ImageUpload/> */}
                    <label class="custom-file">
                        <h6 class="mt-2 ">Upload new photo</h6>
                        <input type="file" id="file" name='image' onChange={this.handlechange} />
                        <button class="custom-file-control  btn blue lighten-1 z-depth-0" onClick={this.handleupdate}>Upload</button>
                    </label><br/>
                    {
                        this.state.showProgressBar ? <progress value={this.state.progress} max='100'/>:null
                    }
                </div>
                <div className="col-8 " style={{ }}>
                    <h1>{this.props.customer.firstName + " " + this.props.customer.lastName}</h1>
                    <br/><br/>
                    <h5><b className="blue-text">Mobile: </b> {this.props.customer.mobile}</h5>
                    <h5><b className="blue-text">Email: </b> {this.props.customer.email}</h5>
                    <h5><b className="blue-text">NIC: </b> {this.props.customer.nic}</h5>
                    {this.props.customer.disabled === false ? <Badge pill variant="success" className="left">Active</Badge> : <Badge pill variant="danger" className="left">Disabled</Badge> }
                </div>
            </div>
        ): <div><br/><br/><br/>Loading</div>
        
        return <div>{load}</div>
    }
}

export default Profile