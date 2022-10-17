import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import logger from 'redux-logger';

export default configureStore({
    reducer: {
        dashboard: dashboardReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
