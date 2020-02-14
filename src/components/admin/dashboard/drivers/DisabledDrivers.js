import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// Lists all the disabled drivers from the system with searching and filtering
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
        </div>
    )
}




export default DisabledDrivers