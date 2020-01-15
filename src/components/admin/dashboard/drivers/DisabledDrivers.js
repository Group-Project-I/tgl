import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

const DisabledDrivers = ({drivers, history}) => {
    if (!drivers.length) return <div><br/><br/><h4>No Disabled Drivers</h4></div>

    const columns = [
        { title: "Name", field: "name", headerFilter:"input" },
        { title: "License No", field: "licenseNo", align: "left", headerFilter:"input"},
        { title: "NIC", field: "nic", headerFilter:"input" },
        { title: "Mobile", field: "mobile", headerFilter:"input"},
        { title: "Email", field: "email", align: "center", headerFilter:"input"},
        { title: "User Since", field: "userSince", align: "center"},
    ];

    var data = []

    // eslint-disable-next-line
    {drivers && drivers.map(driver =>{
        data.push({
            id: driver.id, 
            name: driver.firstName + ' ' + driver.lastName, 
            licenseNo: driver.licenseNo, 
            nic: driver.nic, 
            mobile: driver.mobile, 
            userSince: moment(driver.createdAt.toDate()).format("MMM Do YYYY"), 
            email: driver.email
        })
    }       
    )} 

    var rowClick = (e, row) => {
        let path = '/admin/drivers/' + row.getData().id;
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
                    <th className="center-align">License No</th>
                    <th className="center-align">NIC</th>
                    <th className="center-align">Mobile</th>
                    <th className="center-align">User Since</th>
                    <th className="center-align">Actions</th>
                </tr>
                </thead>
                <tbody>
                {drivers && drivers.map(driver => {
                    return (
                        <tr key={driver.id}>
                            <td className="center-align">{driver.firstName + ' ' + driver.lastName}</td>
                            <td className="center-align">{driver.licenseNo}</td>
                            <td className="center-align">{driver.nic}</td>
                            <td className="center-align">{driver.mobile}</td>
                            <td className="center-align">{moment(driver.createdAt.toDate()).format("MMM Do YYYY")}</td>
                            <td className="center-align">
                                <Link to={"/admin/drivers/" + driver.id}><button type="button" data-toggle="modal" data-id="" class="edit-details btn btn-primary" data-target="#edit">View</button></Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table> */}
        </div>
    )
}




export default DisabledDrivers