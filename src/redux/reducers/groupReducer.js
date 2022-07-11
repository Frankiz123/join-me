import {
  GET_DETAILS_GROUP_FAIL,
  GET_DETAILS_GROUP_PENDING,
  GET_DETAILS_GROUP_SUCCESS,
  GET_GROUPS_FAIL,
  GET_GROUPS_PENDING,
  GET_GROUPS_SUCCESS,
  SAVED_GROUPS_FAIL,
  SAVED_GROUPS_PENDING,
  SAVED_GROUPS_SUCCESS,
  GET_GROUPS_FOR_USER_FAIL,
  GET_GROUPS_FOR_USER_PENDING,
  GET_GROUPS_FOR_USER_SUCCESS,  
  UPDATE_GROUPS_PENDING,
  UPDATE_GROUPS_SUCCESS,
  UPDATE_GROUPS_FAIL,
    REMOVE_GROUPS_PENDING,
  REMOVE_GROUPS_SUCCESS,
  REMOVE_GROUPS_FAIL
 
} from '../actions/types';

const initialState = {
  pending: false,
  groupsList: [],
  idFromAccessKey: null,
  success: false,
  groupDetails: null,
  groupsForUserList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUPS_PENDING:
      return { ...state, pending: true, success: false };

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
        groupsList: payload,
        success: true,
      };

    case GET_GROUPS_FAIL:
      return {
        ...state,
        pending: false,
        groupsList: [],
        success: false,
      };

    case SAVED_GROUPS_PENDING:
      return { ...state, pending: true };

    case SAVED_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case SAVED_GROUPS_FAIL:
      return {
        ...state,
        pending: false,
      };
    case UPDATE_GROUPS_PENDING:
      return { ...state, pending: true };

    case UPDATE_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case UPDATE_GROUPS_FAIL:
      return {
        ...state,
        pending: false,
      };
    case REMOVE_GROUPS_PENDING:
      return { ...state, pending: true };

    case REMOVE_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case REMOVE_GROUPS_FAIL:
      return {
        ...state,
        pending: false,
      };
    case GET_DETAILS_GROUP_PENDING:
      return { ...state, pending: true, success: false };

    case GET_DETAILS_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        groupDetails: payload,
        success: true,
      };

    case GET_DETAILS_GROUP_FAIL:
      return {
        ...state,
        pending: false,
        groupDetails: null,
      };

      case GET_GROUPS_FOR_USER_PENDING:
        return { ...state, pending: true, success: false };
  
      case GET_GROUPS_FOR_USER_SUCCESS:
        return {
          ...state,
          pending: false,
          groupsForUserList: payload,
          success: true,
        };
  
      case GET_GROUPS_FOR_USER_FAIL:
        return {
          ...state,
          pending: false,
          groupDetails: null,
        };  
        
    
    default:
      return state;
  }
};
