import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
const LeftAndRightHeader = (props) => {
  const { colors } = useTheme();
  const { onPressBack, onPressClose } = props;
  return (
    <View style={styles.container}>
      <Icon
        onPress={onPressBack}
        name="arrow-left"
        size={30}
        type="material-community"
        color={colors.font}
      />
      <Icon
        onPress={onPressClose}
        name="close"
        size={30}
        type="material-community"
        color={colors.font}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS == 'ios' ? (DeviceInfo.hasNotch() ? 90 : 70) : 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: wp(5),
    // backgroundColor: 'red',
  },
});

export { LeftAndRightHeader };
