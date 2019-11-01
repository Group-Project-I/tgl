import firebase from 'firebase/app';
import 'firebase/firestore';
 

// export const setPassword = () =>{
//  return()=>{
//     var auth = firebase.auth();
//     var emailAddress = "thilinihk96@gmail.com";
    
//     auth.sendPasswordResetEmail(emailAddress).then(function() {
//       // Email sent.
//     }).catch(function(error) {
//       // An error happened.
//     });
    
//  }   
// }
export const sendMessage =(message) => {
  return (dispatch ,getState,{getFirebase,getFirestore})=>{

    const firestore = getFirestore()
     firestore.collection('messages').add({
      ...message,
      to:1234,
      from:4567,
      state:'unread'
      
    }).then(() =>{
         dispatch ({type: 'SEND_MESSAGE',message})
    }).catch((err) => {
      dispatch({type:'SEND_MESSAGE_ERROR',err})
    })
    
  }
}