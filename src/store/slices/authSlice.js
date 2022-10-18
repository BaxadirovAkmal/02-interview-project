import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from "js-cookie";
export const authInit = createAsyncThunk('auth/authInit', async(data) => {
    return axios.post('http://localhost:8000/auth/login', data).then((response) => {
        if (response && response.status === 200) {
            return response
        }
    }).catch((error) => {
        return Promise.reject(error)
    })
})

export const authInitSlice = createSlice({
    name: "auth",
    initialState: {
        success: false,
        loading: false,
        error: null,
        token: ''
    },
    extraReducers: {
        [authInit.pending]: (state) => {
            state.loading = true
        },
        [authInit.fulfilled]: (state, action) => {
            state.loading = false
            state.token = action.payload.data
            state.success = action.payload.status === 200
            Cookies.set('access-token', state.token?.access_token)
        },
        [authInit.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default authInitSlice.reducer