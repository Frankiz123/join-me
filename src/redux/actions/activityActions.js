// import axios from 'axios';
import axios from '../axios/axios'
import {
  CREATE_EVENT_PENDING,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  GET_ALL_EVENTS_WITH_FILTER_PENDING,
  GET_ALL_EVENTS_WITH_FILTER_SUCCESS,
  GET_ALL_EVENTS_WITH_FILTER_FAIL,
  GET_MY_EVENTS_WITH_FILTER_PENDING,
  GET_MY_EVENTS_WITH_FILTER_SUCCESS,
  GET_MY_EVENTS_WITH_FILTER_FAIL,
  GET_MY_SPONSOR_EVENTS_PENDING,
  GET_MY_SPONSOR_EVENTS_SUCCESS,
  GET_MY_SPONSOR_EVENTS_FAIL,
  GET_INIT_EVENT_PENDING,
  GET_INIT_EVENT_SUCCESS,
  GET_INIT_EVENT_FAIL,
  GET_INIT_LIST_PENDING,
  GET_INIT_LIST_SUCCESS,
  GET_INIT_LIST_FAIL,
  CANCEL_EVENT_SUCCESS,
  CANCEL_EVENT_FAIL,
  CANCEL_EVENT_PENDING,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_PENDING,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_PENDING,
  GET_FOR_USER_PENDING,
  GET_FOR_USER_SUCCESS,
  GET_FOR_USER_FAIL,
  UPDATE_SHORTCUTE_PENDING,
  UPDATE_SHORTCUTE_SUCCESS,
  UPDATE_SHORTCUTE_FAIL,
  GET_SHORTCUTE_FAIL,
  GET_SHORTCUTE_SUCCESS,
  GET_SHORTCUTE_PENDING,
  DELETE_SHORTCUTE_PENDING,
  DELETE_SHORTCUTE_SUCCESS,
  DELETE_SHORTCUTE_FAIL,
  GET_ACTIVITY_DETAIL,
  ACTIVITY_DETAIL_SUCCESS,
  ACTIVITY_DETAIL_FAIL,
  GET_COMMENT_PENDING,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  DELETE_COMMENT_PENDING,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  NO_INTERENT,
  INTERENT,
  INIT_LIST_CLEAR,
  REPORT_COMMENT_PENDING,
  REPORT_COMMENT_SUCCESS,
  REPORT_COMMENT_FAIL,
  REPORT_EVENT_PENDING,
  REPORT_EVENT_SUCCESS,
  REPORT_EVENT_FAIL,
  UPDATE_COMMENT_PENDING,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL
} from './types';
import { apiUrl } from '../../tools/config';
import { internetConnection } from '../../tools/InternetConnetion';
import { setAlert } from './alertActions';
import { getString } from '../../tools/StringHelper';
import { refreshToken } from './authActions';
export const removeAttendiee = (params) => async (dispatch) => {
  const { token, eventId } = params;
  const body = {
    eventId: eventId,
  };
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = `${apiUrl}/api/v1/mobil/events/${eventId}/attendiees/RemoveAttendiee`;
  try {
    let res = await axios.delete(url, config);
    // console.log('response in removeAttendiee -------------', res);
    dispatch(getActivityDetail({ token, eventId }));
    return res;
  } catch (error) {
    dispatch(setAlert(getString('alertMsg'), 'success'));
    console.log('err', error);
    return error;
  }
};

export const addAttendiee = (params) => async (dispatch) => {
  const { token, eventId } = params;
  const body = {
    eventId: eventId,
  };
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = `${apiUrl}/api/v1/mobil/events/${eventId}/attendiees/addAttendiee`;
  try {
    let res = await axios.post(url, body, config);

    return res;
  } catch (error) {
    dispatch(setAlert(getString('alertMsg'), 'success'));
    console.log('err', error);
    return error;
  }
};
export const getAttendies = (params) => async (dispatch) => {
  const { token, eventId } = params;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = `${apiUrl}/api/v1/mobil/events/${eventId}/attendiees?Skipe=0&Take=100`;
  try {
    let res = await axios.get(url, config);

    return res;
  } catch (error) {
    dispatch(setAlert(getString('alertMsg'), 'success'));
    console.log('err', error);
    return error;
  }
};
export const getActivityDetail = (params) => async (dispatch) => {
  const { token, eventId } = params;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const net = await internetConnection();
  if (!net) {
    dispatch({
      type: NO_INTERENT,
    });
  } else {
    dispatch({
      type: INTERENT,
    });
  }
  dispatch({
    type: GET_ACTIVITY_DETAIL,
  });
  const url = `${apiUrl}/api/v1/mobil/events/${eventId}/details`;
  console.log('url is -------------', url);
  try {
    const res = await axios.get(url, config);
    dispatch({
      type: ACTIVITY_DETAIL_SUCCESS,
      payload: res.data,
    });
    console.log('det',res.data.detaildEvent.commentSection)
  } catch (error) {
    dispatch({
      type: ACTIVITY_DETAIL_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const createEvent = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: CREATE_EVENT_PENDING,
  });
  try {
    const res = await axios.post(`${apiUrl}/api/v1/mobil/events`, body, config);
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err', error.response.data);
    dispatch({
      type: CREATE_EVENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};
export const getAllEventsWithFilter = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_ALL_EVENTS_WITH_FILTER_PENDING,
  });
  try {
    const res = await axios.post(`${apiUrl}/api/v1/mobil/UserAllEvents`, body, config);
    dispatch({
      type: GET_ALL_EVENTS_WITH_FILTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_ALL_EVENTS_WITH_FILTER_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const getMyEventsWithFilter = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_MY_EVENTS_WITH_FILTER_PENDING,
  });
  try {
    const res = await axios.post(`${apiUrl}/api/v1/mobil/UserMyEvents`, body, config);
    dispatch({
      type: GET_MY_EVENTS_WITH_FILTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_MY_EVENTS_WITH_FILTER_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};
export const getMySponsorEvents = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const net = await internetConnection();
  if (!net) {
    dispatch({
      type: NO_INTERENT,
    });
  } else {
    dispatch({
      type: INTERENT,
    });
  }
  dispatch({
    type: GET_MY_SPONSOR_EVENTS_PENDING,
  });
  try {
    const res = await axios.post(`${apiUrl}/api/v1/mobil/UserMySponsorEvents`, body, config);
    dispatch({
      type: GET_MY_SPONSOR_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_MY_SPONSOR_EVENTS_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const getInitEventList = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const net = await internetConnection();
  if (!net) {
    dispatch({
      type: NO_INTERENT,
    });
  } else {
    dispatch({
      type: INTERENT,
    });
  }
  dispatch({
    type: GET_INIT_EVENT_PENDING,
  });
  try {
    const res = await axios.post(`${apiUrl}/api/v1/mobil/UserAllEvents`, body, config);
    dispatch({
      type: GET_INIT_EVENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_INIT_EVENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const getInitList = (token, obj, refresh) => async (dispatch) => {
  const body = obj;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const net = await internetConnection();
  if (!net) {
    dispatch({
      type: NO_INTERENT,
    });
  } else {
    dispatch({
      type: INTERENT,
    });
  }
  if  (refresh)  {
    dispatch({
      type: GET_INIT_LIST_FAIL,
    });
  }
  dispatch({
    type: GET_INIT_LIST_PENDING,
  });
  try {
    const res = await axios.post(`${apiUrl}/api/v1/mobil/InitListPage`, body, config);
    dispatch({
      type: GET_INIT_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    if (error.response.status === 401) {
      dispatch(refreshToken(obj, refresh));
    }
    dispatch({
      type: GET_INIT_LIST_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
  return true
};

export const updateEvent = (token, body, eventId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: UPDATE_EVENT_PENDING,
  });
  try {
    console.log('send body', body.body);
    const res = await axios.put(`${apiUrl}/api/v1/mobil/events/${eventId}`, body, config);
    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: res.data,
    });
    dispatch(getActivityDetail({ token, eventId }));
    return true;
  } catch (error) {
    console.log('err edit', error.response.data);
    dispatch({
      type: UPDATE_EVENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const cancelEvent = (token, eventId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const body = {};
  const bodyList = {
    listToLoad: 0,
    culture: '',
    skipe: 0,
    take: 10,
    y: 0, //lat
    x: 0, //long
    range: 10,
    orderBy: 0,
    filterOn: [],
    deviceTime: new Date(),
  };
  dispatch({
    type: CANCEL_EVENT_PENDING,
  });
  try {
    const res = await axios.put(`${apiUrl}/api/v1/mobil/events/${eventId}/cancel`, body, config);
    dispatch({
      type: CANCEL_EVENT_SUCCESS,
    });
    dispatch(getActivityDetail({ token, eventId }))
    dispatch(getInitList(token, bodyList, true));
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: CANCEL_EVENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};
export const removeEvent = (token, eventId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const bodyList = {
    listToLoad: 0,
    culture: '',
    skipe: 0,
    take: 10,
    y: 0, //lat
    x: 0, //long
    range: 10,
    orderBy: 0,
    filterOn: [],
    deviceTime: new Date(),
  };
  const body = {};
  dispatch({
    type: DELETE_EVENT_PENDING,
  });
  try {
    const res = await axios.delete(`${apiUrl}/api/v1/mobil/events/${eventId}`, config);
    console.log(res);

    dispatch({
      type: DELETE_EVENT_SUCCESS,
    });
    dispatch(getInitList(token, bodyList));
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: DELETE_EVENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const getAllForUser = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const net = await internetConnection();
  if (!net) {
    dispatch({
      type: NO_INTERENT,
    });
  } else {
    dispatch({
      type: INTERENT,
    });
  }
  dispatch({
    type: GET_FOR_USER_PENDING,
  });
  try {
    const res = await axios.get(`${apiUrl}/api/v1/mobil/shortcute`, config);
    dispatch({
      type: GET_FOR_USER_SUCCESS,
      payload: res.data,
    });
    console.log('filter short', res.data)
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_FOR_USER_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const putUpadteShortcute = (token, body, bodyList, getList) => async (
  dispatch
) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: UPDATE_SHORTCUTE_PENDING,
  });
  try {
    const res = await axios.put(
      `${apiUrl}/api/v1/mobil/shortcute`,
      body,
      config
    );
    dispatch({
      type: UPDATE_SHORTCUTE_SUCCESS,
      payload: res.data,
    });
    if(getList){
dispatch(getInitList(token,  bodyList));
    } 
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: UPDATE_SHORTCUTE_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const getAddShortcute = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_SHORTCUTE_PENDING,
  });
  try {
    const res = await axios.get(`${apiUrl}/api/v1/mobil/shortcute`, config);
    dispatch({
      type: GET_SHORTCUTE_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: GET_SHORTCUTE_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const deleteShortcute = (token, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: DELETE_SHORTCUTE_PENDING,
  });
  try {
    const res = await axios.delete(`${apiUrl}/api/v1/mobil/shortcute/{shortcuteId}`, config);
    dispatch({
      type: DELETE_SHORTCUTE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: DELETE_SHORTCUTE_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const getAllComments = (token, eventId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_COMMENT_PENDING,
  });
  try {
    const res = await axios.get(`${apiUrl}/api/v1/mobil/eventId/${eventId}/comments`, config);
    dispatch({
      type: GET_COMMENT_SUCCESS,
      payload: res.data,
    });
    console.log('commeetns',  res.data);
  } catch (error) {
    console.log('errCom', error);
    dispatch({
      type: GET_COMMENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const addComments = (token, eventId, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: ADD_COMMENT_PENDING,
  });
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/mobil/eventId/${eventId}/comments`,
      body,
      config,
    );
    console.log(res.data)
    dispatch({
      type: ADD_COMMENT_SUCCESS,
    });
    dispatch(getAllComments(token, eventId));
    dispatch(getActivityDetail({ token, eventId }))
    return true;
  } catch (error) {
    console.log('err com', error.response);
    dispatch({
      type: ADD_COMMENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const deletedComments = (token, commentsId, eventId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: DELETE_COMMENT_PENDING,
  });
  try {
    const res = await axios.delete(
      `${apiUrl}/api/v1/mobil/eventId/${eventId}/comments/${commentsId}`,
      config,
    );
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
    });
    dispatch(getAllComments(token, eventId));
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: DELETE_COMMENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const updateComment = (token, commentsId, eventId, body) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: UPDATE_COMMENT_PENDING,
  });
  try {
    const res = await axios.put(
      `${apiUrl}/api/v1/mobil/eventId/${eventId}/comments/${commentsId}`,
      body,
      config,
    );
    dispatch({
      type: UPDATE_COMMENT_SUCCESS,
    });
    dispatch(getAllComments(token, eventId));
    return true;
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: UPDATE_COMMENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
    return false;
  }
};

export const reportComment = (token, commentsId, eventId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: REPORT_COMMENT_PENDING,
  });
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/mobil/eventId/${eventId}/comments/${commentsId}/report`,
      body,
      config,
    );
    dispatch({
      type: REPORT_COMMENT_SUCCESS,
    });
    dispatch(getAllComments(token, eventId));
  } catch (error) {
    console.log('err', error);
    dispatch({
      type: REPORT_COMMENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};
export const reportEvent = (token, eventId) => async (dispatch) => {
  const body = {};
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: REPORT_EVENT_PENDING,
  });
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/mobil/events/${eventId}/report`,
      body,
      config,
    );
    dispatch({
      type: REPORT_EVENT_SUCCESS,
    });
    // dispatch(getAllComments(token, eventId));
  } catch (error) {
    console.log('err2', error);
    dispatch({
      type: REPORT_EVENT_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};
