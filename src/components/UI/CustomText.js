/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import { getColors } from '../../colors';
import { spacing } from '../../tools/theme';
import { useTheme } from '@react-navigation/native';
const CustomText = ({ onPress, children, variant, center, style, size, font, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      {...props}
      onPress={onPress}
      style={[
        styles(colors).defaultColor,
        styles(colors)[variant],
        style,
        center && styles(colors).center,
        size && styles(colors)[size],
        font && styles(colors)[font],
      ]}
    >
      {children}
    </Text>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    defaultColor: {
      color: getColors('black'),
    },
    veryBigTitle: {
      color: colors.font,
      fontFamily: 'Asap-Bold',
      fontSize: RFValue(42),
    },
    bigTitle: {
      color: colors.font,
      fontFamily: 'Asap-Bold',
      fontSize: RFValue(36),
    },
    smallLabel: {
      fontFamily: 'Lato-Regular',
      color: colors.font,
      fontSize: RFValue(14),
    },
    label: {
      textAlign: 'center',
      fontFamily: 'Lato-Regular',
      color: colors.font,
      fontSize: RFValue(18),
    },
    labelIpad: {
      textAlign: 'center',
      fontFamily: 'Lato-Regular',
      color: colors.font,
      fontSize: RFValue(20),
    },
    text: {
      color: getColors('darkBlueFont'),
      fontFamily: 'Poppins-Regular',
    },
    title: {
      color: getColors('white'),
      fontFamily: 'Asap-Bold',
      fontSize: RFValue(36),
    },
    bold: {
      color: colors.font,
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(18),
    },
    boldS: {
      color: colors.font,
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(16),
    },
    boldXs: {
      color: colors.font,
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(15),
    },
    boldXXs: {
      color: colors.font,
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(13),
    },
    boldXXXs: {
      color: colors.black,
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(12),
    },
    body: {
      color: colors.font,
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(12),
    },
    body2: {
      color: colors.font,
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(16),
    },
    bodyBold: {
      color: getColors('black'),
      fontFamily: 'Poppins-SemiBold',
      fontSize: RFValue(18),
    },
    bodyLight: {
      color: colors.font,
      fontFamily: 'Lato-Light',
      fontSize: RFValue(18),
    },
    bodyMediumL: {
      color: getColors('darkBlueFont'),
      fontFamily: 'Poppins-Medium',
      fontSize: RFValue(22),
    },
    bodyMedium: {
      color: getColors('black'),
      fontFamily: 'Poppins-Medium',
      fontSize: RFValue(16),
    },
    bodyMediumItalic: {
      color: colors.font,
      fontFamily: 'Lato-BlackItalic',
      fontSize: RFValue(16),
    },
    bodyL: {
      color: colors.font,
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(22),
    },
    bodyLbold: {
      color: colors.font,
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(22),
    },
    eventTitle: {
      color: colors.white,
      fontFamily: 'Asap-Bold',
      fontSize: RFValue(27),
    },
    eventRegularTitle: {
      color: colors.black,
      fontFamily: 'Asap-Bold',
      fontSize: RFValue(27),
    },
    eventSposnoredTitle: {
      color: colors.white,
      fontFamily: 'Asap-Bold',
      fontSize: RFValue(27),
    },
    mediumLRegular: {
      color: getColors('black'),
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(16),
    },
    mediumRegular: {
      color: colors.font,
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(15),
    },
    small: {
      color: colors.font,
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(14),
    },
    verySmall: {
      color: colors.font,
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(12),
    },
    smallMedium: {
      color: getColors('darkBlueFont'),
      fontFamily: 'Poppins-Medium',
      fontSize: RFValue(14),
    },
    underlineBold: {
      color: colors.font,
      textDecorationLine: 'underline',
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(16),
    },
    underlineMedium: {
      color: colors.font,
      textDecorationLine: 'underline',
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(15),
    },
    underlineBig: {
      color: colors.font,
      textDecorationLine: 'underline',
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(22),
    },
    underlineBigBold: {
      color: colors.font,
      textDecorationLine: 'underline',
      fontFamily: 'Lato-Bold',
      fontSize: RFValue(22),
    },
    smallUnderline: {
      color: colors.font,
      textDecorationLine: 'underline',
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(12),
    },
    underlineDark: {
      color: colors.font,
      textDecorationLine: 'underline',
      fontFamily: 'Lato-Regular',
      fontSize: RFValue(14),
    },
    underlineWhite: {
      color: getColors('white'),
      textDecorationLine: 'underline',
      fontFamily: 'Poppins-SemiBold',
      fontSize: RFValue(20),
    },
    orgitem: {
      fontSize: RFValue(21),
      fontFamily: 'Asap-SemiBold',
      color: colors.font,
    },
    whiteBody: {
      fontSize: RFValue(21),
      fontFamily: 'Asap-SemiBold',
      color: colors.font,
      textAlign: 'center',
    },
    whiteBold: {
      color: '#fff',
      fontFamily: 'Poppins-SemiBold',
      fontSize: RFValue(22),
      padding: hp(2),
      flexWrap: 'wrap',
    },
    light: {
      color: getColors('lightGrey'),
      fontFamily: 'Poppins-Regular',
      fontSize: RFValue(16),
      flexWrap: 'wrap',
    },
    grayBold: {
      color: getColors('darkGrayText'),
      fontFamily: 'Poppins-SemiBold',
      fontSize: RFValue(14),
    },
    regular: { fontFamily: 'Poppins-Regular' },
    medium: { fontFamily: 'Poppins-Medium' },
    semiBold: {
      fontFamily: 'Poppins-SemiBold',
      color: colors.font,
      fontSize: RFValue(14),
    },
    xs: { fontSize: RFValue(13) },
    s: { fontSize: RFValue(14) },
    m: { fontSize: RFValue(16) },
    ml: { fontSize: RFValue(17) },
    l: { fontSize: RFValue(18) },
    xl: { fontSize: RFValue(20) },

    center: {
      textAlign: 'center',
    },
  });

export default CustomText;
