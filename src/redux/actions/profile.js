import qs from 'querystring';
import http from '../../helpers/http';

export default {
  getProfileDetail: (token) => ({
    type: 'GET_PROFILE_DETAIL',
    payload: http(token).get('/private/users'),
  }),
  updateProfile: (token, data) => ({
    type: 'UPDATE_PROFILE',
    payload: http(token).patch('/private/users', qs.stringify(data)),
  }),
  updateAvatar: (token, data) => ({
    type: 'UPDATE_AVATAR',
    payload: http(token).patch('/private/users', data),
  }),
  clearAlertMsgUpdate: () => ({
    type: 'CLEAR_UPDATE_STATE',
  }),
};
