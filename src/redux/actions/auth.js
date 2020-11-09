import qs from 'qs';
import http from '../../helpers/http';

export default {
  login: (email, password) => ({
    type: 'AUTH_USER',
    payload: http().post('auth/login', qs.stringify({email, password})),
  }),
  logout: () => ({
    type: 'LOGOUT_USER',
  }),
  clearMessage: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
