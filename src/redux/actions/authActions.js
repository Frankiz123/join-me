import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';
import {
  LOGOUT_SUCCESS,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_SMS_CODE_SENT,
  LOGIN_FAIL,
  SET_TOKEN_SUCCESS,
  SET_TOKEN_FAIL,
  VERIFY_PENDING,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  FIRST_TIME_SUCCESS,
} from './types';
import { setAlert } from './alertActions';
import { getProfile } from './userActions';
import { getInitList } from './activityActions';
import {user} from '../reducers/userReducer'
import { serverAddress, authAddress, isTest } from '../../tools/config'
 
export const SeeActivityA = (param) =>{
  
};

export const loginA = (phone, areaCode) => async (dispatch) => {
  const body = {};
  console.log('logiin')
  const config = {
    headers: {
      Cookie:
        'ARRAffinity=1d5fb298951795712d54b2df0c89d185153c650eca2a3f79345b380a30442d23;',
    },
  };
  try {
    dispatch({
      type: LOGIN_PENDING,
    });
    const res = await axios.get(
      `${authAddress}/api/onetimepassword?areaCode=${areaCode}&phoneNumber=${phone}`,
      config,
    );
    AsyncStorage.setItem('areaCode', areaCode);
    AsyncStorage.setItem('phone', phone);
    if (res && res.response && res.response.status === 409) {
      dispatch({
        type: LOGIN_FAIL,
      });
    } else {
      dispatch({
        type: LOGIN_SMS_CODE_SENT,
        payload: { phone, areaCode },
      });
      return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.message && error.response.data.message !== 'Validation failed') {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(setAlert(error.response.data.message, 'danger'));
    } else {
      if (error && error.response && error.response.data && error.response.data.data) {
        const errors = error.response.data.data.errors;
        if (errors) {
          dispatch({
            type: LOGIN_FAIL,
          });
          const properties = Object.getOwnPropertyNames(errors);
          dispatch(setAlert(errors[properties[0]], 'danger'));
        }
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    }
    return false;
  }
  dispatch({
    type: LOGIN_FAIL,
  });
};

export const verifyPhone = (code, phone, areaCode, navigation) => async (dispatch,getState) => {
  var qs = require('qs');
  const data = qs.stringify({
    grant_type: 'onetime_password',
    client_id: 'JoinMe.App',
    client_secret: 'notsosecret',
    password: code,
    phoneNumber: phone,
    areaCode: areaCode,
  });
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };
  try {
    dispatch({
      type: VERIFY_PENDING,
    });
    const res = await axios.post(`${authAddress}/connect/token`, data, config);
    const token = 'Bearer ' + res.data.access_token;
    var success = await dispatch(getProfile(token));
    if  (success)  {
      if(getState().user?.user?.firstName !== undefined && getState().user?.user?.firstName !== null){
        dispatch(setCompleteFirstTime(true));
        navigation.navigate('HomeNavigator', { screen: 'FindActivity' });
      }

    }
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('refresh_token', res.data.refresh_token);
    dispatch({
      type: VERIFY_SUCCESS,
      payload: res.data,
      // verificationSmsSent: false,
    });
    return true;
    // setTimeout(() => {

    // }, 500);
  } catch (error) {
    console.log(error);
    if (error.response.data.error === 'invalid_grant') {
      dispatch({
        type: VERIFY_FAIL,
      });
      dispatch(setAlert(error.response.data.message, 'danger'));
      return 'invalid_grant';
    } else {
      const errors = error.response.data.data.errors;
      if (errors) {
        dispatch({
          type: VERIFY_FAIL,
        });
        const properties = Object.getOwnPropertyNames(errors);
        dispatch(setAlert(errors[properties[0]], 'danger'));
      }
      dispatch({
        type: VERIFY_FAIL,
      });
    }
  }
};

export const refreshToken = (obj, refresh) => async (dispatch) => {
  const refresh_token = await AsyncStorage.getItem('refresh_token');
  var qs = require('qs');
  const data = qs.stringify({
    grant_type: 'refresh_token',
    client_id: 'JoinMe.App',
    client_secret: 'notsosecret',
    scope: 'joinme.profile.user_access',
    refresh_token,
  });
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };
  try {
    dispatch({
      type: VERIFY_PENDING,
    });
    const res = await axios.post(`${authAddress}/connect/token`, data, config);
     const token = 'Bearer ' + res.data.access_token;
     var success = await dispatch(getProfile(token));
     if (success) {
       if (
         getState().user?.user?.firstName !== undefined &&
         getState().user?.user?.firstName !== null
       ) {
         dispatch(setCompleteFirstTime(true));
         navigation.navigate('HomeNavigator', { screen: 'FindActivity' });
       }
     }
     if(obj !== undefined){
      dispatch(getInitList(token,obj, refresh));
     }
     
     AsyncStorage.setItem('token', token);
     AsyncStorage.setItem('refresh_token', res.data.refresh_token);
     dispatch({
       type: VERIFY_SUCCESS,
       payload: res.data,
       // verificationSmsSent: false,
     });
     return true;
  } catch (error) {
    if (error.response.data.error === 'invalid_grant') {
      dispatch({
        type: VERIFY_FAIL,
      });
      dispatch(setAlert(error.response.data.message, 'danger'));
      return 'invalid_grant';
    } else {
      const errors = error.response.data.data.errors;
      if (errors) {
        dispatch({
          type: VERIFY_FAIL,
        });
        const properties = Object.getOwnPropertyNames(errors);
        dispatch(setAlert(errors[properties[0]], 'danger'));
      }
      dispatch({
        type: VERIFY_FAIL,
      });
    }
  }
};

export const setToken = (token) => async (dispatch) => {
  await AsyncStorage.setItem('mytkn', token);
  try {
    dispatch({
      type: SET_TOKEN_SUCCESS,
      payload: token,
    });
  } catch (error) {
    dispatch(setAlert(error, 'danger'));
    dispatch({
      type: SET_TOKEN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await AsyncStorage.removeItem('token');
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    alert('Wylogowanie nie powiodło się, błąd: ', error);
  }
};
// export const getCompleteFirstTime = () => async (dispatch) => {
//   try {
//     const firstTime = await AsyncStorage.getItem('completeFirstTime');
//     const firstTime1 = await AsyncStorage.getItem('token');
//     console.log('firs', firstTimem, firstTime1);
//     dispatch({
//       type: FIRST_TIME_SUCCESS,
//       payload: firstTime !== null ? firstTime : false,
//     });
//   } catch (error) {}
// };

export const setCompleteFirstTime = (first) => async (dispatch) => {
  console.log('test');
  try {
    AsyncStorage.setItem('completeFirstTime', JSON.stringify(first));
    dispatch({
      type: FIRST_TIME_SUCCESS,
      payload: first,
    });
  } catch (error) {}
};
