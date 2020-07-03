import { LOGIN_API_URL } from "../../config/api-urls";
import { asyncPost } from '../common/apis';

import { loginUser, loginSuccess, loginFail } from "../actions";

const apiUrl = LOGIN_API_URL;
const action = loginUser;
const successAction = loginSuccess;
const failureAction = loginFail;

export const login = data => {
  return function (dispatch) {
    return asyncPost(apiUrl, data, dispatch, action, successAction, failureAction)
  };
};
