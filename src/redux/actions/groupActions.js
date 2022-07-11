import axios from '../axios/axios';

import {
  GET_DETAILS_GROUP_FAIL,
  GET_DETAILS_GROUP_PENDING,
  GET_DETAILS_GROUP_SUCCESS,
  GET_GROUPS_FAIL,
  GET_GROUPS_FOR_USER_FAIL,
  GET_GROUPS_FOR_USER_PENDING,
  GET_GROUPS_FOR_USER_SUCCESS,
  GET_GROUPS_PENDING,
  GET_GROUPS_SUCCESS,
  SAVED_GROUPS_FAIL,
  SAVED_GROUPS_PENDING,
  SAVED_GROUPS_SUCCESS,
  UPDATE_GROUPS_PENDING,
  UPDATE_GROUPS_SUCCESS,
  UPDATE_GROUPS_FAIL,
  REMOVE_GROUPS_PENDING,
  REMOVE_GROUPS_SUCCESS,
  REMOVE_GROUPS_FAIL

} from './types';
import { setAlert } from './alertActions';
import { serverAddress, apiProfileUrl, apiUrl } from '../../tools/config';
import { getString } from '../../tools/StringHelper';
export const getGroups = (token, orgId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_GROUPS_PENDING,
  });
  try {
    const res = await axios.get(
      `${serverAddress}/api/v1/mobil/UserGetGroupsOfOrg/${orgId}`,
      config,
    );
    dispatch({
      type: GET_GROUPS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_GROUPS_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const saveGroupsToProfile = (token, orgId, listGroups, profileId) => async (dispatch) => {
  let grps = [];
  for (var i = 0; i < listGroups.length; i++) {
    grps.push({ grpId: listGroups[i], grpAccessLevel: 'READER' });
  }
  console.log('token',token);
  const body =
    listGroups.length > 1
      ? {
          orgs: [
            {
              orgId: orgId,
              orgAccessLevel: 'READER',
              grps: grps,
            },
          ],
        }
      : {};
  console.log(body);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: SAVED_GROUPS_PENDING,
  });
  var grpId= listGroups[0];
  try {
    let url =
      listGroups.length === 1
        ? `${apiProfileUrl}/api/profile/${profileId}/organizations/${orgId}/groups/${grpId}`
        : `${apiProfileUrl}/api/profile/${profileId}/addMultipleOrgAndGrps`;
    const res = await axios.post(url, body, config);
    console.log('res',res.data);
    dispatch({
      type: SAVED_GROUPS_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: SAVED_GROUPS_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const updateGroupsToProfile = (token, orgId, listGroups, profileId) => async (dispatch) => {
  let grps = [];
  for (var i = 0; i < listGroups.length; i++) {
    grps.push({ grpId: listGroups[i], grpAccessLevel: 'READER' });
  }

  const body = {
    orgs: [
      {
        orgId: orgId,
        orgAccessLevel: 'READER',
        grps: grps,
      },
    ],
  };
console.log(orgId)
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: UPDATE_GROUPS_PENDING,
  });
  try {
    let url = `${apiProfileUrl}/api/profile/${profileId}/addMultipleOrgAndGrps`;
    const res = await axios.put(url, body, config);
    console.log('res', res);
    dispatch({
      type: UPDATE_GROUPS_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: UPDATE_GROUPS_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};


export const removeGroupsFromProfile = (token, orgId, listGroups, profileId) => async (dispatch) => {
  const body = {};
  console.log('token',token);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: REMOVE_GROUPS_PENDING,
  });
  var grpId= listGroups[0];
  try {
    let url =`${apiProfileUrl}/api/profile/${profileId}/organizations/${orgId}/groups/${grpId}`
    const res = await axios.delete(url, config);
    console.log('res',res.data);
    dispatch({
      type: REMOVE_GROUPS_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('erre', error.response);
    dispatch({
      type: REMOVE_GROUPS_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const detailsGroup = (token, groupId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_DETAILS_GROUP_PENDING,
  });
  try {
    const res = await axios.get(`${apiUrl}/api/v1/admin/groups/${groupId}`, config);
    console.log(groupId);
    dispatch({
      type: GET_DETAILS_GROUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_DETAILS_GROUP_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const getGroupsForUser = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_GROUPS_FOR_USER_PENDING,
  });
  try {
    const res = await axios.get(`${apiUrl}/api/v1/mobil/userGrps`, config);
    console.log(res.data);
    dispatch({
      type: GET_GROUPS_FOR_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err gr', error.response.status, token);
    dispatch({
      type: GET_GROUPS_FOR_USER_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};


