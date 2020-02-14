
// Sign in to the system with email and password
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

// Sign out from the system 
export const signOut = () => {
    localStorage.removeItem('userId')
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}

// Register to the system
// Only customers can register as an external party to the system 
// User type is updated as customer in the users collection and customers collection is updated with user details
// Notification is sent to the administrator at each user registration 
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
                }).then(() => {
                    let data={
                        to: 'Yk1pyMHhAQhk3PhGS6JRxcNSHdT2',
                        from: docRef.id,
                        data: 'New user registered to the system',
                        link: '/admin/customers/' + docRef.id,
                        type: 'new user',
                        createdAt: new Date()
                    }
                    return firestore.collection('notifications').add(data)
                })
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}

// Change signin email 
export const changeEmail = (currentPassword, newEmail) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword); 
        
        user.reauthenticateWithCredential(cred).then(() => {
            user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {
                dispatch({type: 'EMAIL_UPDATED'})
            }).catch((err) =>{
                dispatch({type: 'FAILED_TO_UPDATE_EMAIL', err})
            })
        }).catch((err) => {
            dispatch({type: 'FAILED_TO_REAUTHENTICATE', err})
        })
    }
}

// Change authentication password 
export const updatePassword = (oldPassword, newPassword) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword); 
        
        user.reauthenticateWithCredential(cred).then(() => {
            user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                dispatch({type: 'PASSWORD_UPDATED'})
            }).catch((err) =>{
                dispatch({type: 'FAILED_TO_UPDATE_PASSWORD', err})
            })
        }).catch((err) => {
            dispatch({type: 'FAILED_TO_REAUTHENTICATE', err})
        })
    }
}
// reset customer email
export const resetEmail =(newEmail,password) =>{
    return(dispatch ,getState,{getFirebase})=>{
      var firebase=getFirebase()
      var user = firebase.auth().currentUser;
      var credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
      console.log(credentials)
      user.reauthenticateWithCredential(credentials).then(() => {
        var user = firebase.auth().currentUser;
        user.updateEmail(newEmail).then(()=> {
          // Update successful.
            dispatch ({type: 'EMAIL_UPDATED'})
        }).catch((error)=> {
          // An error happened.
          dispatch ({type: 'Failed to update email',error})
        });
      }).catch((err) => {
        dispatch({type: 'FAILED_TO_REAUTHENTICATE', err})
    })
    }
  }
  
  /*action creator for  forget passsword*/
  export const recoverPassword =(creds) => {
    return(dispatch ,getState,{getFirebase,getFirestore})=>{
      var firebase=getFirebase();
      var auth =firebase.auth();
      //test the function
      // var email='thilini96ucsc@gmail.com';
      var state = getState();
      console.log(state)
      auth.sendPasswordResetEmail(creds.email).then(() =>{
              }).catch((error) => {
           dispatch({type:'PASSWORD_RESET_ERROR',error})
       })
    }
  }
