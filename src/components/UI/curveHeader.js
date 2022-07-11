import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import GroupBackground from '../../assets/images/groupsBackground';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import CustomText from './CustomText';
import { useColorScheme } from 'react-native-appearance';
const { height } = Dimensions.get('window');

const CurveHeader = (props) => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const {
    onLeftPress,
    onRightPress,
    title,
    leftIcon,
    leftIconType,
    rightIconType,
    rightIcon,
  } = props;
  return (
    <View style={styles.container}>
      {/* <GroupBackground color={colors.svgBackground} /> */}
      {/* better way png */}
      <Image
        source={
          scheme === 'dark'
            ? require('../../assets/images/CurveTopBackgroundDark.png')
            : require('../../assets/images/CurveTopBackgroundLight.png')
        }
        style={styles.imageStyle}
      />
      <View style={styles.innerContainer}>
        <Icon
          onPress={onLeftPress}
          name={leftIcon}
          size={30}
          type={leftIconType ? leftIconType : 'material-community'}
          color={colors.font}
        />
        {rightIcon && (
          <Icon
            onPress={onRightPress}
            name={rightIcon}
            size={30}
            type={rightIconType ? rightIconType : 'entypo'}
            color={colors.font}
          />
        )}
      </View>
      <View style={{ position: 'absolute', top: 102, marginLeft: hp('3%') }}>
        <CustomText style={{ color: colors.font }} variant="veryBigTitle">
          {title}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    position: 'absolute',
    width: wp(100),
    top: Platform.OS == 'ios' ? (DeviceInfo.hasNotch() ? 40 : 30) : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: wp(5),
    paddingLeft:wp(6.2),
    // backgroundColor: 'red',
  },
  imageStyle: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'stretch',
  },
});

export { CurveHeader };
