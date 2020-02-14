import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addExportHires} from '../../store/actions/customerHireActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SelectSearch from 'react-select-search'

class AddHireExport extends Component {
    state = {
        containerType: '20',
        containerPickupAddressLine1: '',
        containerPickupAddressLine2: '',
        containerPickupCity: '',
        pickupDatetime: '',
        cargoLocationAddressLine1: '',
        cargoLocationAddressLine2: '',
        cargoLocationCity: '',
        cargoType: '',
        netWeight: '',
        loadingPort: 'Colombo',
        loadingTerminal: '',
        vessel: '',
        loadingDatetime: '',
        customerId: '',
        customerName: '',
        remarks: '',
        loading: 1,
        redir: 0
    }

    handleClosePrice = () => {
        // e.preventDefault();
        this.setState({
            show: false,
        })
    }

    handleShowPrice = (e) => {
        e.preventDefault()
        if(this.props.pricing){
            var city = this.props.pricing.filter(item => item.id === this.state.cargoLocationCity.toUpperCase())
            if(city.length && this.state.containerType === '20'){
                this.setState({
                    show: true,
                    cost: city[0].export20ft
                })
            }else if(city.length && this.state.containerType === '40'){
                this.setState({
                    show: true,
                    cost: city[0].export40ft
                })
            }else{
                this.setState({
                    show: true,
                    cost: null
                })
            }

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        var tag = e.target.id+"Tag"
        document.getElementById(tag).style.display = "block"
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.addExportHires(this.state);
        this.setState({
            redir : 1
        })
    }

    handleDate = (e) => {
        e.preventDefault();
        e.target.type = 'datetime-local'
        var tag = e.target.id+"Tag"
        document.getElementById(tag).style.display = "block"
    }

    handleContainerType = (e) => {
        if(e.target.value){
            this.setState({
                containerType: e.target.value
            })
        }
    }
    componentWillReceiveProps(nextProps) {

        if(this.props.customers && this.props.drivers){
            this.setState({
                loading: 0,
            });
        }

    }

    render() {
        if(this.state.redir === 1){
            return <Redirect to='/' />
        }

        return (
            <div className="container-fluid delay-1s ">
                <div className="form1 fadeIn animated slow">

                    <div className="row fadeIn animated slow">
                        <div className="bg col-12" >
                            <br/><br/>
                            <Card border="primary lighten-1 z-depth-12" >
                                <Card.Body color="blue">
                                    <Card.Header color="blue"><h1 className="center fadeIn animated slow add_head">Add <span className="topic1">Export</span></h1>
                            {/*<hr className="bg-dark mb-4"/>*/}
                                    </Card.Header>
                <form onSubmit={this.handleSubmit} autoComplete='off'>
                    <br/>
                    <Card border="primary" className="text-center">
                        <Card.Header color="blue"><h4>Container Type</h4></Card.Header>
                        <Card.Body><br/>

                            <div className="bg col-6">
                                <select className="form-control select1" placeholder="Container Type" id="containerType" onChange={this.handleContainerType} required>
                                    <option value="20">20ft</option>
                                    <option value="40">40ft</option>
                                </select>
                            </div>
                        </Card.Body>
                    </Card>
                    <br/>
                    <Card border="primary" className="text-center">
                        <Card.Header color="blue"><h4>Container Pickup Details</h4></Card.Header>
                        <Card.Body>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <p className="fadeIn animated slow" id="containerPickupAddressLine1Tag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Address Line 1</p>
                                    <input placeholder="Address Line 1" type="text" id="containerPickupAddressLine1" onChange={this.handleChange} required />
                                </div>
                                <div className="input-field col-6">
                                    <p className="fadeIn animated slow" id="containerPickupAddressLine2Tag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Address Line 2</p>
                                    <input placeholder="Address Line 2" type="text" id="containerPickupAddressLine2" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <p className="fadeIn animated slow" id="containerPickupCityTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>City</p>
                                    <input placeholder="City" type="text" id="containerPickupCity" onChange={this.handleChange} required />
                                </div>
                            </div>



                        </Card.Body>
                    </Card>
                    <br/>
                    <Card border="primary" className="text-center">
                    <Card.Header><h4>Cargo Details</h4></Card.Header>
                    <Card.Body>
                        <br/>
                        <h5>Pick up Date and Time</h5>
                        <div className="row" style={{paddingTop: '40px'}}>
                            <div className="input-field col-6">
                                <p className="fadeIn animated slow" id="pickupDatetimeTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Cargo Pickup Date and Time(01/25/2001 01:00:PM)</p>
                                <input placeholder="Cargo Pickup Date and Time" onFocus={this.handleDate} ref="pickup" type="text" id="pickupDatetime"  onChange={this.handleChange} required />
                            </div>
                        </div>
                        <hr/><h5>Location</h5>
                        <div className="row" style={{paddingTop: '40px'}}>
                            <div className="input-field col-6">
                                <p className="fadeIn animated slow" id="cargoLocationAddressLine1Tag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Address Line 1</p>
                                <input placeholder="Address Line 1" type="text" id="cargoLocationAddressLine1" onChange={this.handleChange} required />
                            </div>
                            <div className="input-field col-6">
                                <p className="fadeIn animated slow" id="cargoLocationAddressLine2Tag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Address Line 2</p>
                                <input placeholder="Address Line 2" type="text" id="cargoLocationAddressLine2" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <p className="fadeIn animated slow" id="cargoLocationCityTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>City</p>
                                <input placeholder="City" type="text" id="cargoLocationCity" onChange={this.handleChange} required />
                            </div>
                        </div>

                        {/*start price*/}

                        <Button color="primary" className={this.state.cargoLocationCity ? "btn " : "invisible"}  id="btnLong" onClick={this.handleShowPrice} style={{ marginBottom: '1rem' }}>Get Estimated Hire Cost <i
                            className="fas fa-cog fa-spin"></i></Button>


                        <Modal show={this.state.show} onHide={this.handleClosePrice} size="md" backdrop={false} aria-labelledby="contained-modal-title-vcenter" centered style={{overflow:'unset'}}>
                            <Modal.Header closeButton>
                                <Modal.Title className="center"><h2 >Cost Estimation</h2></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Card border="primary" className="text-center">
                                    <Card.Body>
                                        {/*<div className= { cityEdited != 'Updated Successfully' ? "red-text" : "green-text"}>*/}
                                        {/*    {this.state.updated ? cityEdited : null}*/}
                                        {/*</div>*/}
                                        <form >
                                            <div className="input-field row">
                                                <h6 className='blue-text'>Container Type </h6>

                                                <input type="text" id="containerType" value={this.state.containerType + " ft"} required />
                                            </div>
                                            <div className="input-field row">
                                                <h6 className='blue-text'>Cargo Location City</h6>

                                                <input type="text" id="cargoLocationCity" value={this.state.cargoLocationCity} required />
                                            </div>
                                            <div className="input-field row">
                                                <h6 className='blue-text'>Estimated Cost for Hire</h6>
                                                {this.state.cost ?
                                                    <div>
                                                        <input type="text" id="cost"
                                                               value={"RS. " + this.state.cost + " /="}
                                                               required/>
                                                        <hr/>
                                                        <b className="red-text">Note that the estimated cost may subject to change. Contact the administrator for inquiries.</b>
                                                    </div>:
                                                    <div>
                                                        No cost estimation available for the provided cargo Location address. Please contact the administrator for inquiries.
                                                    </div>
                                                }
                                            </div>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </Modal.Body>
                        </Modal>

                        {/*end price*/}


                        <hr/>
                        <div className="row" style={{paddingTop: '40px'}}>
                            <div className="input-field col-6">
                                <p className="fadeIn animated slow" id="cargoTypeTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Cargo Type(s)</p>
                                <input placeholder="Cargo Type(s)" type="text" id="cargoType" onChange={this.handleChange} required/>
                            </div>
                            <div className="input-field col-6">
                                <p className="fadeIn animated slow" id="netWeightTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Net Weight</p>
                                <input placeholder="Net Weight" type="text" id="netWeight" onChange={this.handleChange} required/>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                    <br/>
                    <Card border="primary" className="text-center">
                        <Card.Header><h4>Loading Details</h4></Card.Header>
                        <Card.Body>
                            <br/>
                            <hr/><h5>Loading Port</h5>
                            <div className="row" style={{paddingTop: '50px'}}>
                                <div className="col-4"></div>
                                <select className="form-control col-4" placeholder="Loading Port" id="loadingPort" onChange={this.handleLoadingPort} required>
                                    <option value="Colombo">Colombo</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <p className="fadeIn animated slow" id="loadingTerminalTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Loading Terminal</p>
                                    <input placeholder="Loading Terminal" type="text" id="loadingTerminal" onChange={this.handleChange} required/>
                                </div>
                            </div>
                            <hr/><h5>Vessel Details</h5>
                            <div className="row" style={{paddingTop: '40px'}}>
                                <div className="input-field col-6">
                                    <p className="fadeIn animated slow" id="vesselTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Vessel</p>
                                    <input placeholder="Vessel" type="text" id="vessel" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field col-6">
                                    <p className="fadeIn animated slow" id="loadingDatetimeTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Loading Date and Time(01/25/2000 10:00:AM)</p>
                                    <input placeholder="Loading Date and Time" onFocus={this.handleDate} type="text" id="loadingDatetime" onChange={this.handleChange} required />
                                </div>

                            </div>
                        </Card.Body>
                    </Card>

                    <br/>
                    <Card border="primary" className="text-center">
                        <Card.Header><h4>Customer Details</h4></Card.Header>
                        <Card.Body>
                    <div className="row">
                        <div className="input-field col-6">
                            <p className="fadeIn animated slow" id="customerNameTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Customer Name</p>
                            <input placeholder="Customer Name" type="text" id="customerName" onChange={this.handleChange} required />
                        </div>
                    </div>
                        </Card.Body>
                    </Card>
                    <br/>

                    <Card border="primary" className="text-center">
                        <Card.Header><h4>Remarks</h4></Card.Header>
                        <Card.Body>
                            <div className="input-field row col-12">
                                <p className="fadeIn animated slow" id="remarksTag" style={{display:'none',fontFamily:'Times New Roman',color:'red'}}>Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)</p>
                                <textarea placeholder="Mention any Additional Information(Perishable goods, Reefer temperature, Number and kind of packages etc.)" style={{ minHeight: 100 }} type="text" id="remarks" onChange={this.handleChange} />
                            </div>
                        </Card.Body>
                    </Card>
                    <input type="hidden" id="hireType" value="export"/><br/><br/>
                    <div className="input-field center">
                        <button className="btn blue lighten-1 z-depth-5 btn1">Add</button>
                        <Link to='/'><button className="btn red lighten-1 z-depth-5 btn1">Cancel</button></Link>
                    </div>
                    <br/>
                </form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>


    )
    }
}

const mapStateToProps = (state) => {
    return{

        hires: state.firestore.ordered.hires,
        pricing: state.firestore.ordered.pricing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addExportHires: (exportHire) => dispatch(addExportHires(exportHire))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'hires'},
        {collection: 'pricing'}
    ])
)(AddHireExport);
