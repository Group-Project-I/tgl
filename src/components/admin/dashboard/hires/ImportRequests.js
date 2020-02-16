import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// List of import requests with sorting and filtering

const ImportRequests = ({importHireRequests, history}) => {
    if (!importHireRequests.length) return <div><br/><br/><h4>No Import Requests</h4></div>

    global.moment = require("moment");

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input", sorter: "datetime", sorterParams:{format:"MMM Do YYYY, h:mm a"}},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Vessel Arrival Date", field: "vesselArrivalDatetime", headerFilter:"input", sorter: "datetime", sorterParams:{format:"MMM Do YYYY, h:mm a"}},
        { title: "Destination", field: "destination", headerFilter:"input", width: 150},
        { title: "Customer", field: "customerName", headerFilter:"input"},
    ];

    var data = []

    // eslint-disable-next-line
    {importHireRequests && importHireRequests.map(imp =>{
        data.push({
            id: imp.id, 
            containerType: imp.containerType, 
            pickupDatetime: moment(imp.pickupDatetime).format('MMM Do YYYY, h:mm a'), 
            cargoType: imp.cargoType, 
            vesselArrivalDatetime: moment(imp.vesselArrivalDatetime).format('MMM Do YYYY, h:mm a'), 
            destination: imp.destinationCity, 
            customerName: imp.customerName,
        })
    }       
    )} 

    var rowClick = (e, row) => {
        let path = '/admin/hires/' + row.getData().id;
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
                invalidOptionWarnings={false}
                initialSort={[
                    {column: "pickupDatetime", dir:"desc"}
                ]}
            />
        </div>
    )
}




export default ImportRequests