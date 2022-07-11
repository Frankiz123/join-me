import axios from '../axios/axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';

import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  SET_USER_PENDING,
  SET_USER_SUCCESS,
  SET_USER_ERROR,
  SET_USER_IMAGE_PENDING,
  SET_USER_IMAGE_SUCCESS,
  SET_USER_IMAGE_ERROR,
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ADD_FCMTOKEN_ERROR,
  ADD_FCMTOKEN_SUCCESS,
  ADD_FCMTOKEN_PENDING,
} from './types';
import { setAlert } from './alertActions';
import { refreshToken } from './authActions';
import { apiUrl, apiProfileUrl, notificationUrl } from '../../tools/config';
import { getString } from '../../tools/StringHelper';
export const getProfile = (token1) => async (dispatch) => {
  var token = token1;
  if (token === undefined) {
    token = await AsyncStorage.getItem('token');
  }
   
      token = await AsyncStorage.getItem('token');
    

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: GET_USER_PENDING,
    });
    const res = await axios.get(`${apiUrl}/api/v1/mobil/user`, config);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log('err1', error);
    if (error.response.status === 401) {
      dispatch(refreshToken());
    }
    if (error.response.data.message && error.response.data.message !== 'Validation failed') {
      dispatch({
        type: GET_USER_ERROR,
      });
    } else {
      if (error && error.response && error.response.data && error.response.data.data) {
        const errors = error.response.data.data.errors;
        if (errors) {
          dispatch({
            type: GET_USER_ERROR,
          });
          const properties = Object.getOwnPropertyNames(errors);
          dispatch(setAlert(errors[properties[0]], 'danger'));
        }
      } else {
        dispatch({
          type: GET_USER_ERROR,
        });
      }
    }
    return false;
  }
};

export const update = ({
  firstName,
  lastName,
  yearOfBirth,
  gender,
  profileId,
  phone,
  email,
}) => async (dispatch) => {
  const body = JSON.stringify({
    email,
    phone,
    firstName: firstName.toString(),
    lastName: lastName.toString(),
    yearOfBirth: yearOfBirth,
    gender: gender.toString(),
  });

  const token = await AsyncStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  console.log('ide', profileId);
  try {
    dispatch({
      type: SET_USER_PENDING,
    });

    let url =
      profileId === '00000000-0000-0000-0000-000000000000' || profileId === undefined
        ? `${apiProfileUrl}/api/profile`
        : `${apiProfileUrl}/api/profile/${profileId}`;
    console.log(url);
    const res = await axios.post(url, body, config);
    if (res && res.response && res.response.status === 409) {
      dispatch({
        type: SET_USER_ERROR,
      });
    }
    dispatch({
      type: SET_USER_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    if (error.response.data.message && error.response.data.message !== 'Validation failed') {
      dispatch({
        type: SET_USER_ERROR,
      });
      dispatch(setAlert(error.response.data.message, 'danger'));
    } else {
      if (error && error.response && error.response.data && error.response.data.data) {
        const errors = error.response.data.data.errors;
        if (errors) {
          dispatch({
            type: SET_USER_ERROR,
          });
          const properties = Object.getOwnPropertyNames(errors);
          dispatch(setAlert(errors[properties[0]], 'danger'));
        }
      } else {
        dispatch({
          type: SET_USER_ERROR,
        });
      }
    }
  }
  dispatch({
    type: SET_USER_ERROR,
  });
};

export const updateImage = (image) => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'text/plain',
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: SET_USER_IMAGE_PENDING,
    });
    const res = await axios.post(
      `${apiUrl}/api/v1/Shared/fileUpLoad`,
      createFormData(image),
      config,
    );
    console.log(res)
    // if (res && res.response && res.response.status === 409) {
    //   return dispatch({
    //     type: SET_USER_IMAGE_ERROR,
    //   });
    // }

    dispatch({
      type: SET_USER_IMAGE_SUCCESS,
    });
    return res.data;
  } catch (error) {
    console.log('error unmg', error)
    dispatch({
          type: SET_USER_IMAGE_ERROR,
        });
  }
};

const createFormData = (image) => {
  let data = new FormData();
  console.log('Value of Image in user Actions ====))) ', image);
  try{
  data.append('formFile', {
    //uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
    uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
    name: `${Date.now()}.jpg`,
    type: 'image/jpeg',
  });
  }catch(e){
console.log(e)
  }

  return data;
};

export const updateProfile = (
  { firstName, lastName, yearOfBirth, gender, profileId, phone, email, imageUrl },
  token,
) => async (dispatch) => {
  {
    console.log(' value of imageUrl in actioin : ', imageUrl);
  }
  const body = JSON.stringify({
    email,
    phone,
    firstName: firstName.toString(),
    lastName: lastName.toString(),
    yearOfBirth: yearOfBirth,
    gender: gender.toString(),
    imageUrl: imageUrl,
    firstTimeLogin: false,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: UPDATE_PROFILE_PENDING,
    });
    let url = `${apiProfileUrl}/api/profile/${profileId}`;
    console.log(url);
    const res = await axios.put(url, body, config);

    console.log('suc', res.data);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (error) {
    console.log(error.response.data)
    dispatch({
      type: UPDATE_PROFILE_FAIL,
    });
    dispatch(setAlert(getString('alertMsg'), 'success'));
  }
};

export const addFirebaseToken = (token1, body) => async (dispatch) => {
  var token = token1;
  if (token === undefined) {
    token = await AsyncStorage.getItem('token');
  }
  console.log('send fcm', body);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    dispatch({
      type: ADD_FCMTOKEN_PENDING,
    });
    const res = await axios.post(`${notificationUrl}/api/fireBase/add`, body, config);
    dispatch({
      type: ADD_FCMTOKEN_SUCCESS,
    });
  } catch (error) {
    console.log('errFCM', error);
    dispatch({
      type: ADD_FCMTOKEN_ERROR,
    });
  }
};
