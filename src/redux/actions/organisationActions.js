import axios from '../axios/axios';

import {
  FIND_ORGANISATION_PENDING,
  FIND_ORGANISATION_SUCCESS,
  FIND_ORGANISATION_FAIL,
  CONFIRM_ORGANISATION_SUCCESS,
  CONFIRM_ORGANISATION_PENDING,
  CONFIRM_ORGANISATION_FAIL,
  FEIDE_VERIFICATION_FAIL,
  FEIDE_VERIFICATION_SUCCESS,
  FEIDE_VERIFICATION_PENDING,
  GET_USER_GROUPS_OF_ORG_PENDING,
  GET_USER_GROUPS_OF_ORG_FAIL,
  GET_USER_GROUPS_OF_ORG_SUCCESS,
  LEAVE_ORGANISATION_PENDING,
  LEAVE_ORGANISATION_SUCCESS,
  LEAVE_ORGANISATION_FAIL,
  LEAVE_GROUP_OF_ORGANISATION_FAIL,
  LEAVE_GROUP_OF_ORGANISATION_PENDING,
  LEAVE_GROUP_OF_ORGANISATION_SUCCESS,
} from './types';
import { setAlert } from './alertActions';
import { serverAddress, apiProfileUrl, isTest, webVerificationAddress } from '../../tools/config';
import { getProfile } from './userActions';

export const findOrganisation = (token, searchWord) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: FIND_ORGANISATION_PENDING,
    });
    const res = await axios.get(
      `${serverAddress}/api/v1/mobil/UserSearchOrgs/${searchWord}`,
      config,
    );
    dispatch({
      type: FIND_ORGANISATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: FIND_ORGANISATION_FAIL,
    });
  }
};

export const getUserGroupsOfOrg = (token, organizationId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: GET_USER_GROUPS_OF_ORG_PENDING,
    });
    const res = await axios.get(
      `${serverAddress}/api/v1/mobil/UserGetGroupsOfOrg/${organizationId}`,
      config,
    );
    // console.log('res user gr of org', res.data);
    dispatch({
      type: GET_USER_GROUPS_OF_ORG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_USER_GROUPS_OF_ORG_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const confirmOrganisation = (token, orgId, profileId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: CONFIRM_ORGANISATION_PENDING,
    });
    const res = await axios.post(
      `${apiProfileUrl}/api/profile/${profileId}/organizations/${orgId}`,
      body,
      config,
    );
    dispatch({
      type: CONFIRM_ORGANISATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: CONFIRM_ORGANISATION_FAIL,
    });
  }
};
export const leaveOrganisation = (token, orgId, profileId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: LEAVE_ORGANISATION_PENDING,
    });
    const res = await axios.delete(
      `${apiProfileUrl}/api/profile/${profileId}/organizations/${orgId}`,
      config,
    );
    dispatch({
      type: LEAVE_ORGANISATION_SUCCESS,
      payload: res.data,
    });
    dispatch(getProfile());
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: LEAVE_ORGANISATION_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const leaveGroupOfOrganisation = (token, orgId, profileId, groupId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: LEAVE_GROUP_OF_ORGANISATION_PENDING,
    });
    const res = await axios.delete(
      `${apiProfileUrl}/api​/profile​/${profileId}​/organizations​/${orgId}​/groups​/${groupId}`,
      body,
      config,
    );
    dispatch({
      type: LEAVE_GROUP_OF_ORGANISATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: LEAVE_GROUP_OF_ORGANISATION_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};
export const feideVerificaion = (token, orgId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: FEIDE_VERIFICATION_PENDING,
    });
    console.log('rews001');
    const res = await axios.post(
      `${webVerificationAddress}/api/Access/create?OrgId=${orgId}`,
      body,
      config,
    );
    console.log('rews', res);
    dispatch({
      type: FEIDE_VERIFICATION_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err', error.response);
    dispatch({
      type: FEIDE_VERIFICATION_FAIL,
    });
  }
};

