import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { getColors } from '../../colors';
import CustomText from './CustomText';
import { useTheme } from '@react-navigation/native';
const FullWidthButton = (props) => {
  const { buttonTitle, onPress, disabled, btnBackground, txtColor } = props;
  const { colors } = useTheme();
  const { textButton, container } = styles(colors);

  return (
    <TouchableOpacity
      style={[container, { backgroundColor: btnBackground ? btnBackground : colors.btnBackground }]}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText variant="bold" style={[textButton, {color: txtColor}]}>
        {buttonTitle}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      // marginVertical: hp(3),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
      padding: 35,
    },
  });

export default FullWidthButton;
