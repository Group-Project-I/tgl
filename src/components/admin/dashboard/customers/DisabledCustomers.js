import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

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
            {/* <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th className="center-align">Name</th>
                    <th className="center-align">Email</th>
                    <th className="center-align">Mobile</th>
                    <th className="center-align">NIC</th>
                    <th className="center-align">User Since</th>
                    <th className="center-align">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers && customers.map(customer => {
                    return(
                        <tr key={customer.id}>
                            <td className="center-align">{customer.firstName + ' ' + customer.lastName}</td>
                            <td className="center-align">{customer.email}</td>
                            <td className="center-align">{customer.mobile}</td>
                            <td className="center-align">{customer.nic}</td>
                            <td className="center-align">{moment(customer.createdAt.toDate()).format("MMM Do YYYY")}</td>
                            <td className="center-align">
                                <Link to={'/admin/customers/' + customer.id}><button type="button" data-toggle="modal" data-id="" class="edit-details btn btn-primary" data-target="#edit">View</button></Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table> */}
        </div>
    )
}




export default DisabledCustomers