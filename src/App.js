import AsyncStorage from '@react-native-community/async-storage';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { internetConnection } from './tools/InternetConnetion';

import AppNavigator from './navigation/AppNavigator';
import { store } from './redux/store/store';

import { setI18nConfig } from './tools/StringHelper';
import * as RNLocalize from 'react-native-localize';
import { View } from 'react-native';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {fcmService} from '../FCMService'
import {localNotificationService} from '../LocalNotificationService'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    // setI18nConfig(); // set initial config
    Text.defaultProps = {
      ...Text.defaultProps,
      maxFontSizeMultiplier: 1.2,
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 100);
    const getLanguage = await AsyncStorage.getItem('language');

    await setI18nConfig(getLanguage !== null ? `${getLanguage}` : 'en');
    // SplashScreen.hide();
    internetConnection();
      fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      // alert("Open Notification: " + notify.body)
    }

  //     const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // if (enabled) {
  //   console.log('Authorization status:', authStatus);
  // }
  //   this.forceUpdate();
  //   this.messageListener = messaging().onMessage(async (message) =>
  //     console.log('message received!!!'),
  //   );
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
          fcmService.unRegister()
      localNotificationService.unregister()
    // this.messageListener();
  }


  handleLocalizationChange = () => {
    // setI18nConfig();
    this.forceUpdate();
  };
  render() {
    return <Provider store={store}>{this.state.isLoading ? <View /> : <AppNavigator />}</Provider>;
  }
}
