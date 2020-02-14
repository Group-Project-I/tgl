import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaBuffer, FaTruck, FaUserCog, FaPlusSquare, FaUserSlash, FaPrint} from "react-icons/fa";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Badge from 'react-bootstrap/Badge'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      update: 0
    };
  }

  handleRoute = (e) => {
    var arr = ['customers','drivers','hires','vehicles','hirerequests','ongoinghires','addhire','reports','disabled']

    for (let index = 0; index < arr.length; index++) {
      document.getElementById(arr[index]).className = "list-group-item list-group-item-action"
    }
  }

  handleClick = (e) => {
    var arr = ['customers','drivers','hires','vehicles','hirerequests','ongoinghires','addhire','reports','disabled']

    for (let index = 0; index < arr.length; index++) {
      document.getElementById(arr[index]).className = "list-group-item list-group-item-action"
    }
    document.getElementById(e.target.id).className = "list-group-item list-group-item-hover list-group-item-action"
  }

  componentDidUpdate(){
  
    var arr = ['customers','drivers','hires','vehicles','hirerequests','ongoinghires','addhire','reports','disabled']

    for (let index = 0; index < arr.length; index++) {
      document.getElementById(arr[index]).className = "list-group-item list-group-item-action"
    }
    
    if(this.props.path.length && arr.includes(this.props.path)){
      // console.log(this.props.path,"hmmm")
      document.getElementById(this.props.path).className = "list-group-item list-group-item-hover list-group-item-action"
    }
    
  }

  render() {
    let hireRequests
    let ongoingHires

    if(this.props.hires){
      hireRequests = this.props.hires.filter(item => item.hireStatus === "request").length
      ongoingHires = this.props.hires.filter(item => item.hireStatus ==="ongoing").length
    }
    return (
      <div className="bg-dark border-right" id="sidebar-wrapper">
      <div className="sticky-top">
        <div className="sidebar-heading center" style={{paddingTop: "30px"}}><NavLink to='/admin' onClick={this.handleRoute} className="text-decoration-none">DASHBOARD</NavLink></div>
        <div className="list-group list-group-flush">
          <ul className="align-self-center">
            <NavLink to='/admin/customers' className="text-decoration-none"><li id="customers" className="list-group-item list-group-item-action " ><FaUsers/> Customers</li></NavLink>
            <NavLink to='/admin/hires' className="text-decoration-none"><li id="hires" onClick={this.handleClick} className="list-group-item list-group-item-action "><FaBuffer/> Hires</li></NavLink>
            <NavLink to='/admin/drivers' className="text-decoration-none"><li id="drivers" className="list-group-item list-group-item-action "><FaUserCog/> Drivers</li></NavLink>
            <NavLink to='/admin/vehicles' className="text-decoration-none"><li id="vehicles" className="list-group-item list-group-item-action "><FaTruck/> Vehicles</li></NavLink>
          </ul>
        </div>
        <div className="list-group list-group-flush" style={{paddingTop: "50px"}}>
          <ul className="align-self-center">
            <NavLink to='/admin/hirerequests' className="text-decoration-none"><li id="hirerequests" onClick={this.handleClick} className="list-group-item list-group-item-action ">Hire Requests <Badge style={{float: 'none'}} pill variant="light">{hireRequests}</Badge></li></NavLink>
            <NavLink to='/admin/ongoinghires' className="text-decoration-none"><li id="ongoinghires" onClick={this.handleClick} className="list-group-item list-group-item-action ">Ongoing Hires<Badge style={{float: 'none', marginLeft: '10px'}} pill variant="light">{ongoingHires}</Badge></li></NavLink>
            <NavLink to='/admin/addhire' className="text-decoration-none"><li id="addhire" className="list-group-item list-group-item-action "><FaPlusSquare/> Add Hire</li></NavLink>
          </ul>
        </div>
        <div className="list-group list-group-flush" style={{paddingTop: "50px"}}>
          <ul className="align-self-center">
            <NavLink to='/admin/reports' className="text-decoration-none"><li id="reports" className="list-group-item list-group-item-action "><FaPrint/> Reports</li></NavLink>
            <NavLink to='/admin/disabled' className="text-decoration-none"><li id="disabled" className="list-group-item list-group-item-action "><FaUserSlash/> Disabled</li></NavLink>
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      // auth: state.firebase.auth,
      hires: state.firestore.ordered.hires,
      path: state.path
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      {collection: 'hires'}
  ])
)(Sidebar)
