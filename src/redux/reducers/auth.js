const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'AUTH_USER_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isLogin: true,
        alertMsg: 'Successfully login',
      };
    }
    case 'LOGOUT_USER': {
      return {
        isLogin: false,
        token: '',
        isError: false,
        alertMsg: 'Logout Successfully',
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
