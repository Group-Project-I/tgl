import authReducer from './authReducer'
import adminHireReducer from './adminHireReducer'
import adminReducer from './adminReducer'
import customerReducer from './customerReducer'
import pathReducer from './pathReducer'

import {combineReducers} from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

// Combined reducer to manage state of the application
const rootReducer = combineReducers({
    auth: authReducer,
    hire: adminHireReducer,
    customer:customerReducer,
    admin: adminReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    path: pathReducer
});

export default rootReducer 
