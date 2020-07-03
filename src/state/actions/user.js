import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../constants';

export const loginUser = (payload) => ({
    type: LOGIN,
    payload,
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
});

export const loginFail = (payload) => ({
    type: LOGIN_FAIL,
    payload,
});

export const logout = (payload) => ({
    type: LOGOUT,
    payload
});