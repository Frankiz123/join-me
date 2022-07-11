import {
  FIND_ORGANISATION_FAIL,
  FIND_ORGANISATION_SUCCESS,
  FIND_ORGANISATION_PENDING,
  CONFIRM_ORGANISATION_FAIL,
  CONFIRM_ORGANISATION_SUCCESS,
  CONFIRM_ORGANISATION_PENDING,
  FEIDE_VERIFICATION_PENDING,
  FEIDE_VERIFICATION_SUCCESS,
  FEIDE_VERIFICATION_FAIL,
  GET_USER_GROUPS_OF_ORG_PENDING,
  GET_USER_GROUPS_OF_ORG_FAIL,
  GET_USER_GROUPS_OF_ORG_SUCCESS,
} from '../actions/types';

const initialState = {
  pending: false,
  listOrganisation: [],
  idFromAccessKey: null,
  userGroupsOfOrg: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FIND_ORGANISATION_PENDING:
      return { ...state, pending: true };

    case FIND_ORGANISATION_SUCCESS:
      return {
        ...state,
        pending: false,
        listOrganisation: payload,
      };

    case FIND_ORGANISATION_FAIL:
      return {
        ...state,
        pending: false,
        listOrganisation: [],
      };

    case CONFIRM_ORGANISATION_PENDING:
      return { ...state, pending: true };

    case CONFIRM_ORGANISATION_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case CONFIRM_ORGANISATION_FAIL:
      return {
        ...state,
        pending: false,
      };

    case FEIDE_VERIFICATION_PENDING:
      return { ...state, pending: true };

    case FEIDE_VERIFICATION_SUCCESS:
      return {
        ...state,

        pending: false,
        idFromAccessKey: payload.id,
      };

    case FEIDE_VERIFICATION_FAIL:
      return {
        ...state,
        pending: false,
        idFromAccessKey: null,
      };
    case GET_USER_GROUPS_OF_ORG_PENDING:
      return { ...state, pending: true };

    case GET_USER_GROUPS_OF_ORG_SUCCESS:
      return {
        ...state,

        pending: false,
        userGroupsOfOrg: payload,
      };

    case GET_USER_GROUPS_OF_ORG_FAIL:
      return {
        ...state,
        pending: false,
        userGroupsOfOrg: [],
      };

    default:
      return state;
  }
};
