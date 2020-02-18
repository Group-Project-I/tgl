import React from 'react'
// import {Badge} from 'react-bootstrap'
import moment from 'moment'
// import {Link} from 'react-router-dom'
import { ReactTabulator } from 'react-tabulator'

// List of import requests with sorting and filtering
const ImportRequests = ({importHireRequests, history}) => {
    if (!importHireRequests.length) return <div><br/><br/><h3>No Import Requests</h3><br/></div>
    global.moment = require("moment");

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input"},
        { title: "Pickup City", field: "containerPickupCity", headerFilter:"input", width: 150},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input"},
        { title: "Destination City", field: "destinationCity", headerFilter:"input", width: 150},

        {title:"Status",align: "center", field:"hireStatus", formatter:"traffic", formatterParams:{
                min:1,
                max:2,
                color:["blue"],
            }}

    ];

    var data = []

    {importHireRequests && importHireRequests.map(imp =>{
            data.push({
                id: imp.id,
                containerType: imp.containerType,
                pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm:ss a'),
                containerPickupCity: imp.containerPickupCity,
                cargoType: imp.cargoType,
                vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm:ss a'),
                destinationCity: imp.destinationCity,
                hireStatus: imp.hireStatus === "request" ? 1 : 2
            })
        }
    )}

    var rowClick = (e, row) => {
        let path = '/User/UserManageTools/' + row.getData().id;
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
                options={{ pagination: 'local',paginationSize: 5}}
            />
        </div>
    )
}




export default ImportRequests
