import React from 'react'
import moment from 'moment'
import { ReactTabulator } from 'react-tabulator'

// List of export requests with sorting and filtering
const ExportRequests = ({exportHireRequests, history}) => {
    if (!exportHireRequests.length) return <div><br/><br/><h4>No Export Requests</h4></div>

    global.moment = require("moment");

    const columns = [
        { title: "Type", field: "containerType", width: 75, align: "center"},
        { title: "Pickup Date", field: "pickupDatetime", headerFilter:"input", sorter: "datetime", sorterParams:{format:"MMM Do YYYY, h:mm a"}},
        { title: "Cargo Location", field: "pickupLocation", headerFilter:"input"},
        { title: "Cargo Type", field: "cargoType", headerFilter:"input", width: 150},
        { title: "Loading Date", field: "loadingDatetime", headerFilter:"input", sorter: "datetime", sorterParams:{format:"MMM Do YYYY, h:mm a"}},
        { title: "Customer", field: "customerName", headerFilter:"input"},
    ];

    var data = []

    // eslint-disable-next-line
    {exportHireRequests && exportHireRequests.map(exp =>{
        data.push({
            id: exp.id, 
            containerType: exp.containerType, 

            pickupDatetime: moment(exp.pickupDatetime).format('MMM Do YYYY, h:mm a'), 
            pickupLocation: exp.cargoLocationCity,

            cargoType: exp.cargoType, 
            loadingDatetime: moment(exp.loadingDatetime).format('MMM Do YYYY, h:mm a'), 
            customerName: exp.customerName,
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
            />
        </div>
    )
}

export default ExportRequests 
