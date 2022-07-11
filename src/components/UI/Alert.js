import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getColors } from '../../colors';
import { Alert as ReactAlert } from 'react-native';
import CustomText from './CustomText';
import { useColorScheme } from 'react-native-appearance';
import DeviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Alert = ({ alerts, navigation }) => {
  const scheme = useColorScheme();
  if (navigation && alerts !== null && alerts.length > 0 && alerts[0].alertType === 'danger') {
    navigation.goBack();
  }
  //   if(visible)
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(
      (alert, index) =>
        index === 0 && (
          <View
            style={{
              ...alertStyles.alert,
              backgroundColor: scheme === 'dark' ? getColors('black') : getColors('white'),
            }}
          >
            <CustomText
              variant="small"
              style={{ color: scheme === 'dark' ? getColors('white') : getColors('black') }}
            >
              {alert.msg}
            </CustomText>
          </View>
        ),
    )
  );
};

const alertStyles = StyleSheet.create({
  alert: {
    paddingTop: DeviceInfo.hasNotch() ? hp(3) : 0,
    height: DeviceInfo.hasNotch() ? hp(8) : hp(5),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderBottomColor: getColors('grayStorke'),
  },
  primary: {
    backgroundColor: '#17a2b8',
    color: '#fff',
  },
  light: {
    backgroundColor: '#f4f4f4',
    color: '#333',
  },
  dark: {
    backgroundColor: '#343a40',
    color: '#fff',
  },
  danger: {
    backgroundColor: getColors('bottomBackgroundGradient'),
    color: '#fff',
  },
  success: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  white: {
    backgroundColor: '#fff',
    color: '#333',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
