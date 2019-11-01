import React, {Component} from 'react'
import "react-tabs/style/react-tabs.css";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ManageCompletedHires from './CustManageCompletedHires'
import ManageHireRequest from './CustManageHireRequest'
import ManagePendingHires from './CustManageDeclinedHires';
import ManageOngoingHire from './CustManageOngoingHire';


class ManageHires extends Component {

    static defaultProps = { // <-- DEFAULT PROPS
        hire: []
    }

    state = {
        load: 1
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.hire){
            this.setState({
                // ...nextProps.hire[0],
                load: 0,
            });
        }

    }

    render() {

        const load = this.state.load === 0 ? (
            this.props.hire.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "completed" ?  (
                <div>
                    <ManageCompletedHires hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageCompletedHires>
                </div>

            ) : this.props.hire.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "request" ? (
                <div id="content" className="container-fluid" role="main">
                    <ManageHireRequest hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageHireRequest>
                </div>
            ) : this.props.hire.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "driverPending" ? (
                <div id="content" className="container-fluid" role="main">
                    <ManagePendingHires hire={this.props.hire.filter(item => item.id === this.props.id)}></ManagePendingHires>
                </div>
            ) : (
                <div id="content" className="container-fluid" role="main">
                    <ManageOngoingHire hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageOngoingHire>
                </div>
            )

        ) : null

        return <div>{load}</div>


    }
}

const mapStateToProps = (state, ownProps) => {

    let id = ownProps.match.params.id;
    return{
        auth: state.firebase.auth,
        id: id,
        hire: state.firestore.ordered.hires,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'hires',
        // doc: props.id,
    }])
)(ManageHires)
