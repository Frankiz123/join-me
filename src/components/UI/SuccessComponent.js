import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getColors } from '../../colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonApp from './ButtonApp';
import CustomText from './CustomText';
import HandIcon from '../../assets/images/hand';
import { useTheme } from '@react-navigation/native';

const SuccessComponent = ({ buttonText, linkLabel, onPress, title, linkPress, afterGroups }) => {
  const { colors } = useTheme();
  const { container, imageCloud, imageShapeCloud, headerText, buttonContainer, linkText } = styles(
    colors,
  );
  return (
    <View style={container}>
      <View style={imageShapeCloud}>
        <HandIcon />
      </View>
      <View>
        {title && (
          <CustomText variant="veryBigTitle" style={headerText}>
            {title}
          </CustomText>
        )}
        <View style={buttonContainer}>
          {buttonText && (
            <ButtonApp
              buttonTitle={buttonText}
              onPress={onPress}
              backGroundColor={colors.btnBackground}
            />
          )}
        </View>
      </View>
      {linkLabel && afterGroups === undefined && (
        <TouchableOpacity onPress={linkPress} style={linkText}>
          <CustomText variant="underlineBold">{linkLabel}</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
      justifyContent: 'space-between',
      paddingLeft: wp(9.6),
      paddingRight: wp(6),
    },
    headerText: {
      padding: hp(4),
    },
    linkText: {
      alignSelf: 'flex-end',
      margin: hp(4),
      color: colors.font,
      fontSize: hp(2),
      textAlign: 'right',
    },
    imageCloud: {
      position: 'absolute',
      right: wp(17),
      zIndex: -2,
      top: hp(30),
      width: 87,
      height: 100,
    },
    imageShapeCloud: {
      position: 'absolute',
      right: wp(-2.5),
      zIndex: -1,
      top: hp(28),
    },
    buttonContainer: {
      alignSelf: 'flex-start',
      padding: 20,
    },
  });

export default SuccessComponent;
