import React, { Component } from "react"
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { NavLink } from "react-router-dom";

export class StatCard extends Component {

  static defaultProps = { // <-- DEFAULT PROPS
    hires: []       
  }

  state = {
    loading: 0
}

UNSAFE_componentWillReceiveProps(nextProps) {
    
    if(this.props.hires){
        this.setState({
            loading: 0
        });
    }
}

  render() {
    const ongoingHires = this.props.hires.filter(item => item.hireStatus === 'ongoing').length
    const completedImportHires = this.props.hires.filter(item => item.hireType === 'import' && item.hireStatus === 'completed' && new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000).getMonth() === new Date().getMonth() && new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000).getFullYear() === new Date().getFullYear()).length
    const completedExportHires = this.props.hires.filter(item => item.hireType === 'export' && item.hireStatus === 'completed' && new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000).getMonth() === new Date().getMonth() && new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000).getFullYear() === new Date().getFullYear()).length
   
    const load = this.state.loading === 0 ? (
      <div className="row container-fluid" >
        <div className="col-lg-4">
          <NavLink to='/admin/ongoinghires'>
            <div className="card-counter primary">
                <i className="fa fa-clock"></i>
                <span className="count-numbers">{ongoingHires}</span>
                <span className="count-name">Ongoing Hires</span>
            </div>
          </NavLink>
        </div>
        <div className="col-lg-4">
            <NavLink to='/admin/hires'>
              <div className="card-counter danger">
                  <i className="fa fa-truck"></i>
                  <span className="count-numbers">{completedImportHires}</span>
                  <span className="count-name">Imports</span>
              </div>
            </NavLink>
        </div>
        <div className="col-lg-4">
            <NavLink to='/admin/hires'>
              <div className="card-counter info">
                  <i className="fa fa-users"></i>
                  <span className="count-numbers">{completedExportHires}</span>
                  <span className="count-name">Exports</span>
              </div>
            </NavLink>
        </div>
      </div>
    ) : <div><br/><br/><br/>Loading</div>
    return <div>{load}</div>
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      hires: state.firestore.ordered.hires,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      {collection: 'hires'},
  ])
)(StatCard)