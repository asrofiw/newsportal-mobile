import qs from 'querystring';
import http from '../../helpers/http';

export default {
  login: (data) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login', qs.stringify(data)),
  }),
  register: (data) => ({
    type: 'REGISTER',
    payload: http().post('auth/register', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessageRegister: () => ({
    type: 'CLEAR_MESSAGE_REGISTER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
