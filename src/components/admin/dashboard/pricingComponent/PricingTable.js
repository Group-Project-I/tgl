import React, {Component} from 'react'
import { Button} from 'reactstrap';
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import { ReactTabulator } from 'react-tabulator'
import Modal from 'react-bootstrap/Modal'
import AddCity from './AddCity'
import EditCity from './EditCity'

// Lists all the prices for cities with sorting and filtering
class PricingTable extends Component {
    state = {
        showAdd: false,
        showEdit: false
    }

    handleCloseAdd = () => {
        // e.preventDefault();
        this.setState({
          showAdd: false,
        })
    }
    
    handleShowAdd = (e) => {
        e.preventDefault()
        this.setState({
          showAdd: true
        })
    }

    handleCloseEdit = () => {
        // e.preventDefault();
        this.setState({
          showEdit: false,
        })
    }
    
    handleShowEdit = (e) => {
        e.preventDefault()
        this.setState({
          showEdit: true
        })
    }

    render () {
        const {priceList} = this.props
        if (!localStorage.getItem('userId')) return <Redirect to='/signin' />

        const columns = [
            { title: "City", field: "city", headerFilter:"input" },
            { title: "Import 20ft", field: "import20ft", headerFilter:"input"},
            { title: "Import 40ft", field: "import40ft", headerFilter:"input"},
            { title: "Export 20ft", field: "export20ft", headerFilter:"input"},
            { title: "Export 40ft", field: "export40ft", headerFilter:"input"},
            
        ];

        var data = []

        // eslint-disable-next-line
        {priceList && priceList.map(item =>{
            data.push({
                id: item.id, 
                city: item.id, 
                import20ft: item.import20ft, 
                import40ft: item.import40ft, 
                export20ft: item.export20ft, 
                export40ft: item.export40ft
            })
        }       
        )} 

        var rowClick = (e, row) => {
            e.preventDefault()
            this.setState({
                showEdit: true,
                data: row.getData()
            })
        };

        return(
            <div id="content" className="container-fluid" role="main">
                <br/><br/><br/><br/>
                <Button color="primary" onClick={this.handleShowAdd} style={{ marginBottom: '1rem' }}>Add City</Button>
                <Modal show={this.state.showAdd} onHide={this.handleCloseAdd} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                    <Modal.Header closeButton>
                        <Modal.Title><h2 className="center">Add City</h2></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddCity></AddCity>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showEdit} onHide={this.handleCloseEdit} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit City - {this.state.data ? this.state.data.id : null}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.data ? <EditCity city={this.state.data}></EditCity> : null}
                    </Modal.Body>
                </Modal>

                <ReactTabulator
                    data={data}
                    ref={ref => (this.ref = ref)}
                    columns={columns}
                    tooltips={true}
                    layout={"fitData"}
                    rowClick={rowClick}
                    options={{ pagination: 'local',paginationSize: 20}}
                />
            </div>
    )
        }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        priceList: state.firestore.ordered.pricing
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'pricing'}
    ])
)(PricingTable)