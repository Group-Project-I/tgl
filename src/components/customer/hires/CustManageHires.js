import React, {Component} from 'react'
import "react-tabs/style/react-tabs.css";
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ManageCompletedHire from './CustManageCompletedHires'
import ManageHireRequests from './CustManageHireRequest'
import ManageDeclinedHire from './CustManageDeclinedHires';
import ManageOngoingHires from './CustManageOngoingHire';


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
                    <ManageCompletedHire hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageCompletedHire>
                </div>

            ) : this.props.hire.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "request" ? (
                <div id="content" className="container-fluid" role="main">
                    <ManageHireRequests hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageHireRequests>
                </div>
            ) : this.props.hire.filter(item => item.id === this.props.id ).map(a => a.hireStatus)[0] === "ongoing" ? (
                <div id="content" className="container-fluid" role="main">
                    <ManageOngoingHires hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageOngoingHires>
                </div>
            ) : (
                <div id="content" className="container-fluid" role="main">
                    <ManageDeclinedHire hire={this.props.hire.filter(item => item.id === this.props.id)}></ManageDeclinedHire>
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
