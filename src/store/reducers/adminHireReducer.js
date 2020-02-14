const initState = {
    hires: [
    ]
}

// Hire reducer to manage hire actions performed by the administrator 
const adminHireReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_IMPORT':
            // console.log('Import added', action.importHire)
            return state;
        case 'ADD_IMPORT_ERROR':
            // console.log('Add Import error',action.err)
            return state;
        case 'ADD_EXPORT':
            // console.log('Export added', action.exportHire)
            return state;
        case 'ADD_EXPORT_ERROR':
            // console.log('Add Export error',action.err)
            return state;
        case 'HIRE_REQUEST_UPDATED':
            // console.log('hire request updated')
            return state;
        case 'ERROR_UPDATING_HIRE_REQUEST':
            // console.log('Error updating hire request', action.err)
            return state;
        case 'HIRE_REQUEST_DECLINED':
            // console.log('Hire request declined')
            return state;
        case 'ERROR_DECLINING_HIRE_REQUEST':
            // console.log('Error declining hire request')
            return state;
        case 'HIRE_COMPLETION_RECORDED':
            // console.log('Hire completed')
            return state;
        case 'ERROR_RECORDING_HIRE_COMPLETION':
            // console.log('error recording hire completion')
            return state;
        case 'Notication_Added':
            // console.log('Notification added')
        case 'Notificaton_Add_ERROR':
            // console.log('Error adding notification', action.err)
        default:

            return state
    }
    
}

export default adminHireReducer