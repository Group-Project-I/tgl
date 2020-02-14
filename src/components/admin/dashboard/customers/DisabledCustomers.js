import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// List of disabled customers with sorting and filtering
const DisabledCustomers = ({customers, history}) => {
    if (!customers.length) return <div><br/><br/><h4>No Disabled Customers</h4></div>

    const columns = [
        { title: "Name", field: "name", headerFilter:"input" },
        { title: "Email", field: "email", headerFilter:"input"},
        { title: "Mobile", field: "mobile", headerFilter:"input"},
        { title: "NIC", field: "nic", headerFilter:"input" },          
        { title: "User Since", field: "createdAt", align: "center"},
        
    ];

    var data = []

    // eslint-disable-next-line
    {customers && customers.map(customer =>{
        data.push({
            id: customer.id, 
            name: customer.firstName + ' ' + customer.lastName, 
            nic: customer.nic, 
            mobile: customer.mobile, 
            createdAt: moment(customer.createdAt.toDate()).format("MMM Do YYYY"), 
            email: customer.email
        })
    }       
    )} 

    var rowClick = (e, row) => {
        let path = '/admin/customers/' + row.getData().id;
        history.push(path)
    };
    return(
        <div>
            <br/><br/>
            <ReactTabulator
                data={data}
                columns={columns}
                tooltips={true}
                layout={"fitData"}
                rowClick={rowClick}
                options={{ pagination: 'local',paginationSize: 10}}
            />
        </div>
    )
}




export default DisabledCustomers