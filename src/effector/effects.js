import {createEffect} from "effector";
import {api} from '../api';

export const loginEffect = createEffect({
    handler: api.auth.logIn
})

export const getRandomUsersListEffect = createEffect({
    handler: api.dashboard.getRandomUsersList
})