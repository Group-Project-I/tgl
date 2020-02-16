import React, {Component} from 'react'
import {Badge} from 'react-bootstrap'
import "react-tabs/style/react-tabs.css"
import {storage} from '../../../../config/fbConfig'
import {getFirestore} from 'redux-firestore'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'  
import {compose} from 'redux'

// Shows details of the vehicle along with a picture
class VehicleProfile extends Component {
constructor(props){
    super(props)
    this.state = {
        loading: 1,
        image:null,
        url:'',
        progress:0,
        showProgressBar:false,
        profileImage:null
    }
    this.handlechange = this.handlechange.bind(this)
    this.handleupdate = this.handleupdate.bind(this)
}
   
    // componentWillMount() {
    //     if(this.props.vehicle){
    //         this.setState({
    //             loading: 0
    //         });
    //     }
  
    // }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        //get image url from db and set the state
        var x = nextProps.vehicles.filter(item => item.id === this.props.id)
        var vehicle
        x.forEach(function(obj){
            vehicle = obj.profilePic 
        })
        // console.log(this.state)
        this.setState({
            url: vehicle,
            loading: 0
        })
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
        
        const firestore = getFirestore()
         // console.log('props')
         // console.log(this.props)
     
     //upload the image 
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
                 this.setState({
                     url:url
                    })
             //save file to the db
                 // addProfileImage(url)
            firestore.collection('vehicles').doc(this.props.id).update({
            profilePic:url
                })
             })
         })
 
         this.setState({
             showProgressBar:true
         })
     }
    render() {     
        const load = this.state.loading === 0 ? (
            <div className="row">
                <div className="col-3">
                    {/* <img src={require('../../../../img/truck.jpg')} class="mx-auto img-fluid img-circle d-block left" alt="avatar" />
                    <h6 class="mt-2 left">Upload a different photo</h6>
                    <label class="custom-file">
                        <input type="file" id="file" class="custom-file-input" />
                        <span class="custom-file-control">Choose file</span>
                    </label> */}
                <div className=''>
                <img id='myImg' src={this.state.url || require('../../../../img/truck.jpg')} class="mx-auto img-fluid img-circle d-block " alt="avatar"  style={{borderRadius:'50%',width:'250px'}}/>
                <br/><br/><br/><br/>
                    <label class="custom-file"><br/>
                    <input type="file" id="file" name='image' onChange={this.handlechange}  class="custom-file-control  btn btn-info"/><br/>
                    <button class="custom-file-control  btn blue lighten-1 z-depth-0" onClick={this.handleupdate}>Upload</button>
                    </label><br/>
                    {
                        this.state.showProgressBar ? <progress value={this.state.progress} max='100'/>:null
                    }
                </div>
                </div>
                <div className="col-9">
                    <h1>{this.props.vehicle.vehicleNo}</h1>
                    <br/><br/>
                    <h6><b className="blue-text">Trailer Number: </b> {this.props.vehicle.trailerNo}</h6>
                    <h6><b className="blue-text">Make: </b> {this.props.vehicle.make}</h6>
                    <h6><b className="blue-text">Model: </b> {this.props.vehicle.model}</h6>
                    <h6><b className="blue-text">Engine No: </b> {this.props.vehicle.engineNo}</h6>
                    <h6><b className="blue-text">Chassis No: </b> {this.props.vehicle.chassisNo}</h6>
                    {this.props.vehicle.disabled === false ? <Badge pill variant="success" className="left">Available</Badge> : <Badge pill variant="danger" className="left">Disabled</Badge> }
                </div>
            </div>
        ): <div><br/><br/><br/>Loading</div>
        
        return <div>{load}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        vehicles: state.firestore.ordered.vehicles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'vehicles'}
    ])
)(VehicleProfile)
