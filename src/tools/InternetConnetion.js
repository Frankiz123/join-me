import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';

export const internetConnection = async () => {
  let res = await NetInfo.fetch();
 return res.isConnected
};
