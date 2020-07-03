import { clearUser, getUser, setUser } from '../common/storage';

const user = getUser();

// load/persist the localStorage state in initial state
const initialState = {
    username: user ? user.username : null,
    token: user ? user.access : null,
    logintimeStamp: user ? user.loginTimestamp : null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            setUser(action.payload)
            return { ...state, ...action.payload, token: action.payload ? action.payload.access : '' };
        case 'LOGOUT':
        case 'LOGIN_FAIL':
            clearUser();
            return { ...state, username: null, token: null, logintimeStamp: null };
        default: return state;
    }
}

export default userReducer;