import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { getColors } from '../../colors';
import CustomText from './CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '@react-navigation/native';

const SummaryItem = (props) => {
  const { colors } = useTheme();
  const {
    title,editPress
  } = props;
  const { listt, listtText } = styles(
    colors,
  );

  return (
    <TouchableOpacity onPress={editPress} style={listt}>
    <CustomText variant="whiteBody" style={listtText}>{title}</CustomText>
  </TouchableOpacity>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    listt: {
      backgroundColor: colors.yellow,
      padding: 2,
      margin: 10,
      marginHorizontal: 20,
      //marginLeft:40,
      alignSelf: 'flex-start',
    },
    listtText: {
      textAlign: 'left',
      margin: 5,
      color:colors.black
    },
  });

export default SummaryItem;
