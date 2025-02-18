import { configureStore } from "@reduxjs/toolkit";
import { persistStore , persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";  // local storage for web
import authSlice from "../redux/authslice"
import jobSlice from "../redux/jobslice"
import companySlice from "../redux/companyslice"
import applicationslice from "../redux/applicationslice"

// const store = configureStore({
//     reducer:{
//         auth: authSlice,
//         job:jobSlice
//     }
// });


// Configuration for redux-persist
const persistConfig = {
    key: "root",
    storage, // Use local storage to persist data
};

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company:companySlice,
    application:applicationslice
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig,rootReducer);


// Create the Redux store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
});

// Create the persisted store
export const persistor = persistStore(store);


export default store;