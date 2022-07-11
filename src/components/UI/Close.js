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
const Close = (props) => {
  const { colors } = useTheme();
  const { onRightPress } = props;
  return (
    <View style={styles.container}>
      <Icon
        onPress={onRightPress}
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
    alignItems: 'flex-end',
    padding: Platform.isPad ? hp(1) : wp(3),
    marginTop:  Platform.isPad ? hp(1)  :  0,
    //backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
});

export { Close };
