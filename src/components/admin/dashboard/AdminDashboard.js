import React from 'react'
import StatCard from '../stats/StatCard'
import Chart from '../stats/Chart'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const AdminDashboard = (props) => {
    const {auth} = props
    if (!localStorage.getItem('userId')) return <Redirect to='/signin' />
    return (
            <div id="content" className="container-fluid" role="main">
                <div>
                    <div style={{paddingTop:'70px'}}>
                        <h2>This Month</h2>
                    </div>
                    <StatCard></StatCard>
                    <br/><br/>
                    <h2>Performance - This Year</h2>
                    <Chart></Chart>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(AdminDashboard)