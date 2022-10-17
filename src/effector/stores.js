import {createStore} from "effector";
import * as effects from './effects';
import * as events from './events';
import Cookies from 'js-cookie';

export const $logIn = createStore({
    loading: false,
    success: false,
    error: null
}).on(effects.loginEffect.pending, (prevStore, pending) => {
    return {
        ...prevStore,
        loading: pending
    }
}).on(effects.loginEffect.finally, (prevStore, response) => {
    if (response?.error) {
        return {
            ...prevStore,
            success: false,
            error: response.error
        }
    } else {
        // set access token
        Cookies.set('access-token', response.result.data.token);
        return {
            ...prevStore,
            success: true,
            error: null
        }
    }
}).reset(events.resetLoginEvent);

export const $randomUsersList = createStore({
    loading: false,
    randomUsersList: [],
    error: null
}).on(effects.getRandomUsersListEffect.pending, (prevStore, pending) => {
    return {
        ...prevStore,
        loading: pending
    }
}).on(effects.getRandomUsersListEffect.finally, (prevStore, response) => {
    console.log(response, 'dsfafd')
    if (response.error) {
        return {
            ...prevStore,
            randomUsersList: [],
            error: response.error
        };
    } else {
        return {
            ...prevStore,
            randomUsersList: response,
            error: null
        };
    }
}).reset(events.resetRandomUsersListEvent)

