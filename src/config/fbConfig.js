import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB0_LTBs3_DdQN17AVfkWKP82oL-2WwXFw",
    authDomain: "trans-global-logistics-969a7.firebaseapp.com",
    databaseURL: "https://trans-global-logistics-969a7.firebaseio.com",
    projectId: "trans-global-logistics-969a7",
    storageBucket: "",
    messagingSenderId: "10690174031",
    appId: "1:10690174031:web:89c7488d5d17566b76de3a"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.firestore().settings({ timestampsInSnapshots: true })

  export default firebase