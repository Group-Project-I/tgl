import React, {Component} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {addCity} from '../../../../store/actions/adminActions'

// Add city to the pricing component
// A new city will be added to pricing collection with relevant hire charges
class AddCity extends Component {
    state = {
        id: '',
        import20ft: '',
        import40ft: '',
        export20ft: '',
        export40ft: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addCity(this.state)
        this.setState   ({
            updated: 1
        })
    }

    render(){
        const {cityAdded} = this.props
        return(
            <Card border="primary" className="text-center">
                <Card.Body>
                    <div className= { cityAdded !== 'City Added Successfully' ? "red-text" : "green-text"}>
                        {this.state.updated ? cityAdded : null}
                    </div>
                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                        <div className="input-field row">
                            <input placeholder="City Name" type="text" id="id" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field row">
                            <input placeholder="Import 20ft" type="text" id="import20ft"  onChange={this.handleChange} required />    
                        </div>
                        <div className="input-field row">
                            <input placeholder="Import 40ft" type="text" id="import40ft" onChange={this.handleChange} required />
                        </div>
                        <div className="input-field row">
                            <input placeholder="Export 20ft" type="text" id="export20ft"  onChange={this.handleChange} required />    
                        </div>
                        <div className="input-field row">
                            <input placeholder="Export 40ft" type="text" id="export40ft" onChange={this.handleChange} required />
                        </div>
                        <br/>
                        <div className="input-field">
                            <button className="btn blue lighten-1 z-depth-5 btn1">ADD</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        cityAdded: state.admin.cityAdded
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addCity: (details) => dispatch(addCity(details))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);