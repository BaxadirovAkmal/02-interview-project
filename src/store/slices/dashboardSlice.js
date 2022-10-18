import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {
    addNewUserHandler,
    changePageHandler,
    deleteSelectedUserHandler,
    editModalVisibleHandler,
    editSelectedUserHandler,
    selectByGenderHandler,
    selectByLocationHandler,
    selectByNationHandler,
    setToDeleteUserHandler,
    setToEditUserHandler,
    viewModalVisibleHandler,
    viewSelectedUserHandler
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
        modalVisible: false,
        viewModalVisible: false
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
        [setToEditUserHandler]: (state, {payload}) => {
            state.item = {
                first: payload.name.split(' ')[0],
                last: payload.name.split(' ')[1],
                ...payload
            }
            state.modalVisible = !state.modalVisible
        },
        [editSelectedUserHandler]: (state, {payload}) => {
            state.users = state.users.map(user => {
                if (user.id?.value === payload.id) {
                    user.name = payload.name;
                    user.email = payload.email;
                    user.gender = payload.gender;
                    user.location = { city: payload.location};
                    user.nation = payload.nation;
                }
                return user
            })
            state.item = {}
        },
        [setToDeleteUserHandler]: (state, action) => {
            state.item = action.payload
        },
        [deleteSelectedUserHandler]: (state) => {
            state.users = state.users.filter(item => (item.id?.value !== state.item.id))
            state.item = {}
        },
        [editModalVisibleHandler]: (state) => {
            state.modalVisible = false
            state.item = {}
        },
        [selectByGenderHandler]: (state, action) => {
            state.users = (state.users || []).filter(user => user.gender === action.payload)
        },
        [selectByNationHandler]: (state, action) => {
            state.users = (state.users || []).filter(user => user.nat === action.payload)
        },
        [selectByLocationHandler]: (state, action) => {
            state.users = (state.users || []).filter(user => user.location.city === action.payload)
        },
        [viewSelectedUserHandler]: (state, action) => {
            state.item = action.payload
            state.viewModalVisible = !state.viewModalVisible
        },
        [viewModalVisibleHandler]: (state) => {
            state.viewModalVisible = false
            state.item = {}
        }
    }
})


export default dashboardSlice.reducer