const initState = {
    
}

const adminReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_VEHICLE':
            console.log('Vehicle added', action.vehicle)
            return state;
        case 'ADD_VEHICLE_ERROR':
            console.log('Add Import error', action.err)
            return state;
        case 'CUSTOMER_ADDED':
            console.log('Customer added successfully')
            return state;
        case 'FAILED_TO_ADD_CUSTOMER':
            console.log('failed to add customer', action.err)
            return state;
        case 'DRIVER_ADDED':
            console.log('Driver added successfully')
            return state;
        case 'FAILED_TO_ADD_DRIVER':
            console.log('failed to add driver', action.err)
            return state;
        case 'DOCUMENT_UPDATED' :
            console.log('document updated')
            return state;
        case 'ERROR_UPDATING_DOCUMENT' :
            console.log('error updating document', action.err)
            return state;
        case 'AVAILABILITY_UPDATED':
            console.log('User availability updated')
            return state;
        case 'FAILED_TO_UPDATE_AVAILABILITY':
            console.log('User availability update failed')
            return state;
        case 'NOTIFICATION READ AND DELETED':
            console.log('notification read and deleted')
            return state;
        case 'FAILED TO DELETE NOTIFICATION':
            console.log('Error deleting notification')
            return state;
        default:
            return state
    }
    
}

export default adminReducer