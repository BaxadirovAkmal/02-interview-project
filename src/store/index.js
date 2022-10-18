import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import authReducer from "./slices/authSlice";
import logger from 'redux-logger';

export default configureStore({
    reducer: {
        dashboard: dashboardReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
