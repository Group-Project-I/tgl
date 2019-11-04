export const addImportHires = (importHire) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const state= getState();
        const auth= state.firebase.auth;
        firestore.collection('hires').add({
            containerType: importHire.containerType,
            pickupLocation: importHire.pickupLocation,
            pickupDatetime: importHire.pickupDatetime,
            cargoType: importHire.cargoType,
            weight: importHire.weight,
            unloadingPort: importHire.unloadingPort,
            vesselArrivalDatetime: importHire.vesselArrivalDatetime,
            destination: importHire.destination,
            customerId: auth.uid,
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
            pickupLocation: exportHire.pickupLocation,
            pickupDatetime: exportHire.pickupDatetime,
            cargoType: exportHire.cargoType,
            weight: exportHire.weight,
            loadingPort: exportHire.loadingPort,
            loadingDatetime: exportHire.loadingDatetime,
            customerId: auth.uid,
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


