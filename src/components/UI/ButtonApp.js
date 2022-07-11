import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Platform, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { getColors } from '../../colors';
import CustomText from './CustomText';
import { useTheme } from '@react-navigation/native';
const ButtonApp = (props) => {
  const { buttonTitle, onPress, disabled, btnBackground, txtColor } = props;
  const { colors } = useTheme();
  const { textButton, container } = styles(colors);

  return (
    <TouchableOpacity
      style={[
        container,
        { backgroundColor: btnBackground ? btnBackground : colors.btnBackground },
        props.buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText variant="bold" style={[textButton, txtColor]}>
        {buttonTitle}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    textButton: {
      color: colors.btnText,
      paddingVertical:
        Platform.OS === 'ios' ? (Platform.isPad === true ? hp(0) : hp(0.4)) : hp(0.4),
      paddingHorizontal:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp(0) : wp(1.5)) : wp(1.5),
      // fontSize: Platform.OS === 'ios' ? (Platform.isPad === true ? hp(1.5) : hp(2.7)) : hp(2.7),
      textAlign: 'center',
      //  paddingVertical: hp(1.4),
      // paddingHorizontal: wp(2),
      // color:'white'
    },
    container: {
      alignItems: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      paddingVertical: Platform.OS === 'ios' ? (Platform.isPad === true ? hp(1) : hp(1)) : hp(1),
      paddingHorizontal: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(1) : wp(1)) : wp(1),
      minWidth: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(15) : wp(20)) : wp(20),
      minHeight: Platform.OS === 'ios' ? (Platform.isPad === true ? hp(5.5) : hp(6.5)) : hp(6.5),
    },
  });

export default ButtonApp;
