import { SEND_INVITATION_API_URL } from "../../config/api-urls";
import { asyncPost } from '../common/apis';

import { sendInvites, sendInvitesSuccess, sendInvitesFail } from "../actions";

export const invite = data => {
    return function (dispatch) {
        return asyncPost(
            SEND_INVITATION_API_URL,
            data,
            dispatch,
            sendInvites,
            sendInvitesSuccess,
            sendInvitesFail
        );
    };
};
