const initialState = {
  isSuccess: false,
  isError: false,
  dataAllNews: [],
  pageInfo: {},
  alertMsg: '',
  dataNewsDetail: {},
  isLoadDetailSuccess: false,
  isLoadDetailFailed: false,
  isLoadingPostNews: false,
  alertMsgLoadDetail: '',
  isPostNewsSuccess: false,
  isPostNewsFailed: false,
  alertMsgPostNews: '',
  isLoadingSearch: false,
  isErrorSearch: false,
  isSuccessSearch: false,
  dataSearch: [],
  pageInfoSearch: {},
  articlesUser: [],
  pageInfoUser: {},
  isSuccessDelete: false,
  isErrorDelete: false,
  alertMsgDelete: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataAllNews: [],
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_NEWS_FULFILLED': {
      return {
        ...state,
        dataAllNews: action.payload.data.results,
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_NEWS_NEXT_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_NEXT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_NEWS_NEXT_FULFILLED': {
      return {
        ...state,
        dataAllNews: [...state.dataAllNews, ...action.payload.data.results],
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
        pageInfo: action.payload.data.pageInfo,
      };
    }
    case 'GET_NEWS_DETAIL_PENDING': {
      return {
        ...state,
        isLoadingLoadDetail: true,
      };
    }
    case 'GET_NEWS_DETAIL_REJECTED': {
      return {
        ...state,
        isLoadingLoadDetail: false,
        isLoadDetailFailed: true,
        alertMsgLoadDetail: action.payload.response.data.message,
      };
    }
    case 'GET_NEWS_DETAIL_FULFILLED': {
      return {
        ...state,
        dataNewsDetail: action.payload.data.results,
        isLoadingLoadDetail: false,
        isLoadDetailFailed: false,
        isLoadDetailSuccess: true,
        alertMsgLoadDetail: action.payload.data.message,
      };
    }
    case 'POST_NEWS_PENDING': {
      return {
        ...state,
        isLoadingPostNews: true,
      };
    }
    case 'POST_NEWS_REJECTED': {
      return {
        ...state,
        isLoadingPostNews: false,
        isPostNewsFailed: true,
        alertMsgPostNews: action.payload.response.data.message,
      };
    }
    case 'POST_NEWS_FULFILLED': {
      return {
        ...state,
        isLoadingPostNews: false,
        isPostNewsFailed: false,
        isPostNewsSuccess: true,
        alertMsgPostNews: action.payload.data.message,
      };
    }
    case 'SEARCH_NEWS_PENDING': {
      return {
        ...state,
        isLoadingSearch: true,
      };
    }
    case 'SEARCH_NEWS_REJECTED': {
      return {
        ...state,
        isLoadingSearch: false,
        isErrorSearch: true,
        alertMsg: action.payload.response.data.message,
        dataSearch: [],
      };
    }
    case 'SEARCH_NEWS_FULFILLED': {
      return {
        ...state,
        isLoadingSearch: false,
        isErrorSearch: false,
        isSuccessSearch: true,
        alertMsg: action.payload.data.message,
        dataSearch: action.payload.data.results,
        pageInfoSearch: action.payload.data.pageInfo,
      };
    }
    case 'SEARCH_NEXT_PENDING': {
      return {
        ...state,
        isLoadingSearch: true,
      };
    }
    case 'SEARCH_NEXT_REJECTED': {
      return {
        ...state,
        isLoadingSearch: false,
        isErrorSearch: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'SEARCH_NEXT_FULFILLED': {
      return {
        ...state,
        dataSearch: [...state.dataSearch, ...action.payload.data.results],
        isLoadingSearch: false,
        isSuccessSearch: true,
        alertMsg: action.payload.data.message,
        pageInfoSearch: action.payload.data.pageInfo,
      };
    }
    case 'GET_NEWS_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
        articlesUser: [],
      };
    }
    case 'GET_NEWS_USER_FULFILLED': {
      return {
        ...state,
        articlesUser: action.payload.data.results,
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
        pageInfoUser: action.payload.data.pageInfo,
      };
    }
    case 'GET_NEWS_NEXT_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_NEXT_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_NEWS_NEXT_USER_FULFILLED': {
      return {
        ...state,
        articlesUser: [...state.articlesUser, ...action.payload.data.results],
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
        pageInfoUser: action.payload.data.pageInfo,
      };
    }
    case 'DELETE_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'DELETE_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isErrorDelete: true,
        alertMsgDelete: action.payload.response.data.message,
      };
    }
    case 'DELETE_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccessDelete: true,
        alertMsgDelete: action.payload.data.message,
      };
    }
    case 'LOGOUT_USER': {
      return {
        isSuccess: false,
        isError: false,
        dataAllNews: [],
        pageInfo: {},
        alertMsg: '',
        dataNewsDetail: {},
        isLoadDetailSuccess: false,
        isLoadDetailFailed: false,
        isLoadingPostNews: false,
        alertMsgLoadDetail: '',
        isPostNewsSuccess: false,
        isPostNewsFailed: false,
        alertMsgPostNews: '',
        isLoadingSearch: false,
        isErrorSearch: false,
        isSuccessSearch: false,
        dataSearch: [],
        pageInfoSearch: {},
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccess: false,
        isError: false,
        alertMsg: '',
        isLoadDetailSuccess: false,
        isLoadDetailFailed: false,
        isLoadingPostNews: false,
        alertMsgLoadDetail: '',
        isPostNewsSuccess: false,
        isPostNewsFailed: false,
        alertMsgPostNews: '',
        isLoadingSearch: false,
        isErrorSearch: false,
        isSuccessSearch: false,
        isSuccessDelete: false,
        isErrorDelete: false,
        alertMsgDelete: '',
      };
    }
    default: {
      return state;
    }
  }
};
