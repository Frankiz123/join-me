import {
  GET_USER_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  SET_USER_ERROR,
  SET_USER_PENDING,
  SET_USER_SUCCESS,
  SET_USER_IMAGE_PENDING,
  SET_USER_IMAGE_SUCCESS,
  SET_USER_IMAGE_ERROR,
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ADD_FCMTOKEN_PENDING,
  ADD_FCMTOKEN_SUCCESS,
  ADD_FCMTOKEN_FAIL,
} from '../actions/types';

const initialState = {
  user: {},
  pending: false,
  error: false,
  imagePending: false,
  imageError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PENDING:
      return { ...state, pending: true, error: false };

    case GET_USER_SUCCESS:
      return { ...state, pending: false, error: false, user: payload };

    case GET_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };

    case SET_USER_PENDING:
      return { ...state, pending: true, error: false };

    case SET_USER_SUCCESS:
      return { ...state, pending: false, error: false, user: payload };

    case SET_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };

    case SET_USER_IMAGE_PENDING:
      return { ...state, imagePending: true, imageError: false };

    case SET_USER_IMAGE_SUCCESS:
      return { ...state, imagePending: false, imageError: false };

    case SET_USER_IMAGE_ERROR:
      return {
        ...state,
        imagePending: false,
        imageError: true,
      };
    case UPDATE_PROFILE_PENDING:
      return { ...state, pending: true };

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, pending: false, user: payload };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        pending: false,
      };
    case ADD_FCMTOKEN_PENDING:
      return { ...state, pending: true, error: false };

    case ADD_FCMTOKEN_SUCCESS:
      return { ...state, pending: false, error: false };

    case ADD_FCMTOKEN_FAIL:
      return {
        ...state,
        pending: false,
        error: true,
      };

    default:
      return state;
  }
};
