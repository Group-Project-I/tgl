import React from 'react'
import StatCard from '../stats/StatCard'
import ChartCurrentYear from '../stats/ChartCurrentYear'
import ChartLastYear from '../stats/ChartLastYear'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'

const AdminDashboard = (props) => {
    const {auth} = props
    if (!localStorage.getItem('userId')) return <Redirect to='/signin' />

    return (
            <div id="content" className="container-fluid" role="main">
                <div>
                    <div style={{paddingTop:'100px'}}>
                        <Card bg='light' text="white" border="dark" className="text-center">
                            <Card.Header style={{background:"#343a40"}}>
                                <h4>This Month</h4>
                            </Card.Header>
                            <Card.Body>
                                <StatCard></StatCard>
                            </Card.Body>
                        </Card>
                    </div>
                
                    <div style={{paddingTop:'50px'}} className="row">
                        <div className='col-6'>
                            <Card bg='dark' text="white" border="dark" className="text-center">
                                <Card.Header><h4>This Year</h4></Card.Header>
                                <Card.Body>
                                    <ChartCurrentYear></ChartCurrentYear>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-6'>
                            <Card bg='dark' text="white" border="primary" className="text-center">
                                <Card.Header><h4>Last Year</h4></Card.Header>
                                <Card.Body>
                                    <ChartLastYear></ChartLastYear>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
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