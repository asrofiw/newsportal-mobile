const initialState = {
  isSuccess: false,
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',
  isSuccessRegister: false,
  isFailedRegister: false,
  alertMsgRegister: '',
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
        isSuccess: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'AUTH_USER_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isError: false,
        isLoading: false,
        isLogin: true,
        isSuccess: true,
        alertMsg: action.payload.data.message,
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoadingRegister: true,
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoadingRegister: false,
        isFailedRegister: true,
        alertMsgRegister: action.payload.response.data.message,
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoadingRegister: false,
        isSuccessRegister: true,
        alertMsgRegister: action.payload.data.message,
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
    case 'CLEAR_MESSAGE_REGISTER': {
      return {
        ...state,
        isSuccessRegister: false,
        isFailedRegister: false,
        alertMsgRegister: '',
      };
    }
    case 'CLEAR_MESSAGE': {
      return {
        ...state,
        isSuccess: false,
        isError: false,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
