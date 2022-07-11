import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setToken, setCompleteFirstTime } from '../redux/actions/authActions';
import { getProfile, addFirebaseToken } from '../redux/actions/userActions';
import { useSelector } from 'react-redux';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { AuthNavigator, HomeNavigator } from './Navigators';
import AsyncStorage from '@react-native-community/async-storage';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { colorsDark, colors, getColors } from '../colors';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import { LOGIN_SMS_CODE_SENT } from '../redux/actions/types';
import { View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../components/UI/CustomText';
import { getString } from '../tools/StringHelper';
import messaging from '@react-native-firebase/messaging';
import Alert from '../components/UI/Alert';
const AppNavigator = (props) => {
  const { setToken } = props;
  const dispatch = useDispatch();
  const [net, setNet]=useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const scheme = useColorScheme();
  useEffect(() => {
    requestUserPermission();
  }, [dispatch]);
  useEffect(() => {
    checkToken();
    dispatch(getProfile());
    if (props.user.firstName === undefined || props.user.firstName === null) {
      setFirstTime(true);
      setTimeout(function () {
        SplashScreen.hide();
      }, 1000);
    } else {
      setFirstTime(false);
      sendFcm();
      SplashScreen.hide();
    }
  }, [props.user.firstName]);

const sendFcm=()=>{
  console.log(props.user)
        requestUserPermission();
        messaging()
          .getToken()
          .then((fcmToken) => {
            const body = {
              profileId: props.user.profileId,
              firebaseToken: fcmToken,
              fireBaseProject: 0,
            };
            console.log('fcm', fcmToken);
            dispatch(addFirebaseToken(isAuth, body));
          })
          .catch(() => {
          });
  }

  const requestUserPermission = async () => {
    await messaging().requestPermission({
      sound: true,
      announcement: true,
      alert: true,
    });
  };

  useEffect(() => {
    setNet(props.netProblem)
   
  }, [props.netProblem]);
  const CustomDarkTheme = {
    dark: true,
    colors: colorsDark,
  };
  const CustomDefaultTheme = {
    dark: false,
    colors: colors,
  };
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const firstTimec = await AsyncStorage.getItem('completeFirstTime');
    dispatch(
      setCompleteFirstTime(JSON.parse(firstTimec) === null ? false : JSON.parse(firstTimec)),
    );

    if (token) {
      setToken(token);
      const areaCode = await AsyncStorage.getItem('areaCode');
      const phone = await AsyncStorage.getItem('phone');
      if (phone !== null && areaCode !== null) {
        dispatch({
          type: LOGIN_SMS_CODE_SENT,
          payload: { phone, areaCode },
        });
      }
    } else {
      // setToken(null);
    }
  };

  const isAuth = useSelector((state) => state.auth.token);
  const firstTimeCompleted = useSelector((state) => state.auth.firstTimeCompleted);
  console.log('net',net)
  console.log('props.netProblem',props.netProblem)
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
        {net && (
          <View
            style={{
              paddingTop: DeviceInfo.hasNotch() ? hp(3) : 0,
              height: DeviceInfo.hasNotch() ? hp(8) : hp(5),
              width: wp(100),
              backgroundColor:
                scheme === 'dark' ? getColors('black') : getColors('white'),
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 0.6,
              borderBottomColor: getColors('grayStorke'),
            }}>
            <CustomText
              variant="small"
              style={{
                color:
                  scheme === 'dark' ? getColors('white') : getColors('black'),
              }}>
              {getString('activitiesList.noInternet')}
            </CustomText>
          </View>
        )}
        <Alert />
        {/*isAuth && <HomeNavigator /> */}
        {isAuth !== undefined && isAuth !== null && isAuth !== '' ? (
          <HomeNavigator
            firstTime={firstTime}
            org={props.user?.memberships?.length === 0}
            firstTimeCompleted={firstTimeCompleted}
          />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AppearanceProvider>
  );
};

AppNavigator.propTypes = {};

const mapStateToProps = (state) => ({ user: state.user.user, netProblem: state.activity.internetProblem });

export default connect(mapStateToProps, { setToken, setCompleteFirstTime })(AppNavigator);
