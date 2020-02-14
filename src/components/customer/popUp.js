import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


// function MyVerticallyCenteredModal(props) {
export class PopUp extends React.Component{
   
    constructor(props){
        super(props)
        
    }
    static defaultProps = { // <-- DEFAULT PROPS
        hire: []
    }
    render(){
        const {auth,hire} =this.props
        // const completedImportHires = this.props.hires.filter(item => item.hireStatus === 'completed' && item.customerId === auth.uid )

    return (
      <Modal
        {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Show Hire state 
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        { hire && hire.map(hire => {
                
                return(
                    {hire}
                    // <MsgContent messages ={messages} key ={messages.id} />
                )
            })}
        
             yefguy
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id: id,
        auth: state.firebase.auth,
        hire: state.firestore.ordered.hires.hireStatus,
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'hires'}
    ])
)(PopUp)