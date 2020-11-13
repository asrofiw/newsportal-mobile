import http from '../../helpers/http';

export default {
  getNews: (token) => ({
    type: 'GET_NEWS',
    payload: http(token).get('private/news'),
  }),
  getNewsNext: (token, nextLink) => ({
    type: 'GET_NEWS_NEXT',
    payload: http(token).get(nextLink),
  }),
  getNewsDetail: (token, id) => ({
    type: 'GET_NEWS_DETAIL',
    payload: http(token).get(`private/news/${id}`),
  }),
  postNews: (token, data) => ({
    type: 'POST_NEWS',
    payload: http(token).post('private/news', data),
  }),
  clearMsgPost: () => ({
    type: 'CLEAR_MESSAGE_POST',
  }),
};
