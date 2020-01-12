export const addImportHires = (importHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const state= getState();
        const auth= state.firebase.auth;
        firestore.collection('hires').add({
            containerType: importHire.containerType,
            containerPickupAddressLine1: importHire.containerPickupAddressLine1,
            containerPickupAddressLine2: importHire.containerPickupAddressLine2,
            containerPickupCity: importHire.containerPickupCity,
            pickupDatetime: importHire.pickupDatetime,
            cargoType: importHire.cargoType,
            neyWeight: importHire.netWeight,
            unloadingPort: importHire.unloadingPort,
            unloadingTerminal: importHire.unloadingTerminal,
            vessel: importHire.vessel,
            vesselArrivalDatetime: importHire.vesselArrivalDatetime,
            destinationAddressLine1: importHire.destinationAddressLine1,
            destinationAddressLine2: importHire.destinationAddressLine2,
            destinationCity: importHire.destinationCity,
            customerId: auth.uid,
            customerName: importHire.customerName,
            remarks: importHire.remarks,
            hireType: 'import',
            hireStatus: 'request',
            createAt: new Date(),

        }).then(() => {
            dispatch({type: 'ADD_IMPORT', importHire});
        }).catch((err) => {
            dispatch({type: 'ADD_IMPORT_ERROR', err});
        })

    }
};

export const addExportHires = (exportHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const state= getState();
        const auth= state.firebase.auth;
        firestore.collection('hires').add({
            containerType: exportHire.containerType,
            containerPickupAddressLine1: exportHire.containerPickupAddressLine1,
            containerPickupAddressLine2: exportHire.containerPickupAddressLine2,
            containerPickupCity: exportHire.containerPickupCity,
            pickupDatetime: exportHire.pickupDatetime,
            cargoLocationAddressLine1: exportHire.cargoLocationAddressLine1,
            cargoLocationAddressLine2: exportHire.cargoLocationAddressLine2,
            cargoLocationCity: exportHire.cargoLocationCity,
            cargoType: exportHire.cargoType,
            netWeight: exportHire.netWeight,
            loadingPort: exportHire.loadingPort,
            loadingTerminal: exportHire.loadingTerminal,
            vessel: exportHire.vessel,
            loadingDatetime: exportHire.loadingDatetime,
            customerId: auth.uid,
            customerName: exportHire.customerName,
            remarks: exportHire.remarks,
            hireType: 'export',
            hireStatus: 'request',
            createAt: new Date()
        }).then(() => {
            dispatch({type: 'ADD_EXPORT', exportHire});
        }).catch((err) => {
            dispatch({type: 'ADD_EXPORT_ERROR', err});
        })

    }
};

export const declineHireRequests = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('hires').doc(id).update({
            hireStatus: 'declined'
        }).then(() => {
            dispatch({type: 'HIRE_REQUEST_DECLINED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_DECLINING_HIRE_REQUEST', err})
        })
    }
};

export const updateRequest = (id,data,hireRequest) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection(hireRequest).doc(id).update({
            ...data
        }).then(() => {
            dispatch({type: 'DOCUMENT_UPDATED'});
        }).catch((err) => {
            dispatch({type: 'ERROR_UPDATING_DOCUMENT', err});
        })
    }
};

