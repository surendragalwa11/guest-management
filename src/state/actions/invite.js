import {
    SEND_INVITES,
    SEND_INVITES_SUCCESS,
    SEND_INVITES_FAIL
} from '../constants';

export const sendInvites = (payload) => ({
    type: SEND_INVITES,
    data: payload,
});

export const sendInvitesSuccess = () => ({
    type: SEND_INVITES_SUCCESS,
});

export const sendInvitesFail = () => ({
    type: SEND_INVITES_FAIL,
})