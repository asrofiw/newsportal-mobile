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
  searchNews: (token, search = '', sort = 'desc') => ({
    type: 'SEARCH_NEWS',
    payload: http(token).get(`private/news?search=${search}&sort=${sort}`),
  }),
  searchNext: (token, nextLink) => ({
    type: 'SEARCH_NEXT',
    payload: http(token).get(nextLink),
  }),
  clearMsg: () => ({
    type: 'CLEAR_MESSAGE',
  }),
};
