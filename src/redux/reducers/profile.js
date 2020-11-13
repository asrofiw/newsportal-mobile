const initialState = {
  isSuccess: false,
  isError: false,
  dataUserDetail: {},
  alertMsg: '',
  isFailedUpdate: false,
  isLoadingUpdate: false,
  isSuccessUpdate: false,
  alertMsgUpdate: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_DETAIL_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_PROFILE_DETAIL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_PROFILE_DETAIL_FULFILLED': {
      return {
        ...state,
        dataUserDetail: action.payload.data.results,
        isLoading: false,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        isLoadingUpdate: true,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        isLoadingUpdate: false,
        isFailedUpdate: true,
        alertMsgUpdate: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        isFailedUpdate: false,
        isLoadingUpdate: false,
        isSuccessUpdate: true,
        alertMsgUpdate: action.payload.data.message,
      };
    }
    case 'UPDATE_AVATAR_PENDING': {
      return {
        ...state,
        isLoadingUpdate: true,
      };
    }
    case 'UPDATE_AVATAR_REJECTED': {
      return {
        ...state,
        isLoadingUpdate: false,
        isFailedUpdate: true,
        alertMsgUpdate: action.payload.response.data.message,
      };
    }
    case 'UPDATE_AVATAR_FULFILLED': {
      return {
        ...state,
        isFailedUpdate: false,
        isLoadingUpdate: false,
        isSuccessUpdate: true,
        alertMsgUpdate: action.payload.data.message,
      };
    }
    case 'CLEAR_UPDATE_STATE': {
      return {
        ...state,
        isFailedUpdate: false,
        isLoadingUpdate: false,
        isSuccessUpdate: false,
        alertMsgUpdate: '',
      };
    }
    default: {
      return state;
    }
  }
};
