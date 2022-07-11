import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_SMS_CODE_SENT,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SET_TOKEN_SUCCESS,
  VERIFY_PENDING,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  FIRST_TIME_SUCCESS,
} from '../actions/types';

const initialState = {
  pending: false,
  error: false,
  token: null,
  verificationSmsSent: false,
  firstTimeCompleted: false,
  phoneNumber: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_PENDING:
      return { ...state, pending: true, error: false };

    case LOGIN_SMS_CODE_SENT:
      return {
        ...state,
        verificationSmsSent: true,
        error: false,
        pending: false,
        phoneNumber: payload.phone,
        areaCode: payload.areaCode,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        verificationSmsSent: false,
        pending: false,
        error: true,
      };
    case VERIFY_PENDING:
      return { ...state, pending: true, error: false };
    case VERIFY_FAIL:
      return {
        ...state,
        token: null,
        pending: false,
        error: true,
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        token: payload.token_type + ' ' + payload.access_token,
        refresh_token: payload.refresh_token,
        pending: false,
        error: false,
      };

    case LOGOUT_SUCCESS:
      return { ...state, token: undefined, pending: false };

    case SET_TOKEN_SUCCESS:
      return { ...state, token: payload };
    case FIRST_TIME_SUCCESS:
      return { ...state, firstTimeCompleted: payload };
    default:
      return state;
  }
};
