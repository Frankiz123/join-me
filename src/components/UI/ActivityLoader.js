import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ActivityLoader = (props) => {
  const { size, color, loaderStyle } = props;
  const { colors } = useTheme();
  const { container } = styles(colors);

  return (
    <View style={[container, { ...loaderStyle }]}>
      <ActivityIndicator size={size} color={color ? color : colors.font} />
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: {
      height: hp('50%'),
      justifyContent: 'center',
    },
  });

export default ActivityLoader;
