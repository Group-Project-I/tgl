import React from 'react' 
import {Link} from 'react-router-dom'
import CustHome from './custHome'

const hStyle = {
    fontSize: '64px',
    margin:'40px'
}
const imgStyle={
    // borderRadius:'30%',
    height:'100px',
    width:'150px',
}

class Dashboard extends React.Component{
    
    render(){
        return(
            <div >
                <br/><br/>

                <h3 className="display-4 text-center" style={ hStyle}><strong> Welcome to Trans Global Logistics </strong></h3>
                <hr className="bg-dark mb-4 w-25"/>
                <br/><br/>
                <div className="homeoption image3">
                <div className="row container" style={{margin: ' 0 auto'}} >
                    <div className="col" >
                            <div className="card fadeIn animated fast" >
                                <div className="card-body">
                                <img className="card-img-top " src={require('../../img/import.png')} alt="Card cap" style={ imgStyle}/>
                                <h5 className="card-title text-right">Add Your Hire Here</h5>
                                <p className="card-text text-right"><Link to='/User/addHire'><button className="btn btn-info">ADD HIRE</button> </Link></p>
                                </div>
                            </div>
                    </div>
                    <div className="col " >
                        <div className="card fadeIn animated fast" >
                            <div className="card-body">
                            <img className="card-img-top" src={require('../../img/manage.png')} alt="Card cap" style={ imgStyle}/>
                            <h5 className="card-title text-right">Manage Your Hires Here</h5>
                            <p className="card-text text-right"><Link to='/User/UserManageTools'><button className="btn btn-info ">Manage Hires</button></Link></p>
                            </div>
                        </div>
                 </div>

            </div>
                </div>
               
            <CustHome/>
            </div>
        )
    }
}
export default Dashboard;
