import {createAction} from "@reduxjs/toolkit";

export const changePageHandler = createAction('changePageHandler')
export const addNewUserHandler = createAction('addNewUserHandler')
export const setToEditUserHandler = createAction('setToEditUserHandler')
export const editSelectedUserHandler = createAction('editSelectedUserHandler')
export const viewSelectedUserHandler = createAction('viewSelectedUserHandler')
export const viewModalVisibleHandler = createAction('viewModalVisibleHandler')
export const setToDeleteUserHandler = createAction('setToDeleteUserHandler')
export const deleteSelectedUserHandler = createAction('deleteSelectedUserHandler')
export const editModalVisibleHandler = createAction('editModalVisibleHandler')
export const selectByGenderHandler = createAction('selectByGenderHandler')
export const selectByNationHandler = createAction('selectByNationHandler')
export const selectByLocationHandler = createAction('selectByLocationHandler')