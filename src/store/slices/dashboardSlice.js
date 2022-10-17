import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {
    addNewUserHandler,
    changePageHandler,
    deleteSelectedUserHandler,
    editSelectedUserHandler,
    setToDeleteUserHandler,
    setToEditUserHandler,
    editModalVisibleHandler
} from "../actions/dashboardActions";
import qs from 'qs';

export const getRandomUsers = createAsyncThunk("users/getRandomUsers", async (object) => {
    return axios.get(`https://randomuser.me/api/?${qs.stringify(object)}&seed=abc`).then((response) => {
        return response
    });
});

export const dashboardSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        users: [],
        error: null,
        paginationData: {
            current: 1,
            pageSize: 10,
            start: 0,
            limit: 10
        },
        item: {},
        modalVisible: false
    },
    extraReducers: {
        [getRandomUsers.pending]: (state) => {
            state.loading = true
        },
        [getRandomUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.data.results
        },
        [getRandomUsers.rejected]: (state, action) => {
            state.loading = false
            state.usersList = action.payload.message
        },
        [changePageHandler]: (state, action) => {
            state.paginationData = action.payload
        },
        [addNewUserHandler]: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        [setToEditUserHandler]: (state, action) => {
            state.item = action.payload
            state.modalVisible = !state.modalVisible
        },
        [editSelectedUserHandler]: (state, {payload}) => {
            const {item} = state
            state.users = state.users.map(user => {
                if (user.id?.value === item.id) {
                    user.id = payload.id;
                    user.name = payload.name;
                    user.email = payload.email;
                    user.role = payload.role;
                    user.plan = payload.plan;
                    user.status = payload.status;
                }
                return user
            })
            state.item = {}
        },
        [setToDeleteUserHandler]: (state, action) => {
            state.item = action.payload
        },
        [deleteSelectedUserHandler]: (state, action) => {
            state.users = state.users.filter(item => (item.id?.value !== state.item.id))
            state.item = {}
        },
        [editModalVisibleHandler]: (state, action) => {
            state.modalVisible = false
            state.item = {}
        }
    }
})


export default dashboardSlice.reducer