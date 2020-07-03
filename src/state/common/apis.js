import { tokenHeader } from '../../config/constants';
import { getUser } from './storage';
const checkResponseStatus = (response, dispatch) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

export const asyncGet = async (apiUrl, data, dispatch, action, successAction, failureAction) => {
    dispatch(action);
    return new Promise((resolve, reject) => {
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                [tokenHeader]: 'XXXX',
            },
            // mode: 'no-cors',
        })
            .then(res => checkResponseStatus(res, dispatch))
            .then(res => res.json())
            .then((result) => {
                // boolean true and success string check
                if (result.status === 'success' || result.status === true) {
                    dispatch(successAction(result));
                    resolve(true);
                } else {
                    dispatch(failureAction(result));
                    resolve(false);
                }

            })
            .catch((error) => {
                dispatch(failureAction(error));
                resolve(false);
            })
    });
}



export const asyncPost = async (apiUrl, data, dispatch, action, successAction, failureAction) => {
    dispatch((action(data)));
    const user = getUser();
    const token = user ? 'Bearer ' + user.access : '';
    return new Promise((resolve, reject) => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(data)
        })
            .then(res => checkResponseStatus(res, dispatch))
            .then(res => res.json())
            .then((result) => {
                dispatch(successAction(result));
            })
            .catch((error) => {
                dispatch(failureAction(error));
                resolve(false);
            })
    });
}