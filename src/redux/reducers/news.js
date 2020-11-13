const initialState = {
  isSuccess: false,
  isError: false,
  dataAllNews: [],
  pageInfo: {},
  alertMsg: '',
  dataNewsDetail: {},
  isLoadDetailSuccess: false,
  isLoadDetailFailed: false,
  alertMsgLoadDetail: '',
  isPostNewsSuccess: false,
  isPostNewsFailed: false,
  alertMsgPostNews: '',
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
        dataAllNews: [...initialState.dataAllNews, action.payload.data.results],
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
    case 'CLEAR_MESSAGE_POST': {
      return {
        ...state,
        isPostNewsSuccess: false,
        isPostNewsFailed: false,
        alertMsgPostNews: '',
      };
    }
    default: {
      return state;
    }
  }
};
