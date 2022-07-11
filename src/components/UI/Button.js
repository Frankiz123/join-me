import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

const Button = (props) => {
  const { onPress } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[styles(colors).container, { ...props.style }]}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'red',
      height: hp('8'),
      display: 'flex',
      flexDirection: 'row',
      width: wp('100'),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Button;
