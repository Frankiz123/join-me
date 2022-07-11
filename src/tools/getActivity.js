import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const getActivity = async () => {
  let activity;
  try {
    activity = await AsyncStorage.getItem('activity');
    // console.log('activity:', activity);
  } catch (e) {}

  return activity;
};
