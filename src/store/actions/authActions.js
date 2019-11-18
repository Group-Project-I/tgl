

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        })
    }
}

export const signOut = () => {
    localStorage.removeItem('userId')
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            var docRef = firestore.collection('users').doc(resp.user.uid)
            return docRef.set({
                userType: 'customer',
                disabled: false,
            }).then(() => {
                return firestore.collection('customers').doc(docRef.id).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    mobile: newUser.mobile,
                    dob: newUser.dob,
                    nic: newUser.nic,
                    disabled: false,
                    createdAt: new Date()
                })
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}