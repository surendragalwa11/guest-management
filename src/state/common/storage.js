import { localStorageKey } from '../../config/constants';

export const getUser = () => {
    try {
        let user = localStorage.getItem(localStorageKey);
        if (!!user) {
            user = JSON.parse(user);
            const currentTimeStamp = Date.now();
            // login expiration duration: 24 hrs
            if ((currentTimeStamp - user.loginTimestamp) >= 24 * 60 * 60 * 1000) {
                localStorage.removeItem(localStorageKey);
                return null;
            }
            return user;
        }
        return null;
    } catch (err) {
        return null;
    }
}

// store loggedin user info in local storage
export const setUser = (user) => {
    try {
        user = {
            ...user,
            loginTimestamp: Date.now(),
        }
        localStorage.setItem(localStorageKey, JSON.stringify(user))
    } catch (err) {
        // do some stuff
    }
}

export const clearUser = () => {
    try {
        localStorage.removeItem(localStorageKey);
    } catch (err) {
        // do some stuff
    }

}