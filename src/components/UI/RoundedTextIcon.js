import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RoundedTextIcon = (props) => {
  const { detaildEvent, itemImg } = props;
  const { colors } = useTheme();
  const { roundedImage } = styles(colors);
  return (
    <View
      style={{
        ...roundedImage,
        ...props.style,
      }}
    >
      {detaildEvent?.iconImage != '' ||
      detaildEvent?.iconImage != undefined ||
      itemImg !== '' ||
      itemImg !== null ||
      itemImg !== undefined ? (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text
          style={{
            // position: 'absolute',
            // marginTop: 10,
            fontSize: 30,
            color: '#333333',
            fontWeight: '600',
            ...props.style,
          }}
        >
          {props.children}
        </Text>
      ) : (
        <SvgUri
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ position: 'absolute', top: hp(0), right: wp(0) }}
          uri={detaildEvent?.iconImage ? detaildEvent?.iconImage : ''}
          // uri={''}
        />
      )}
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    roundedImage: {
      height: 80,
      width: 80,
      resizeMode: 'contain',
      borderRadius: 300,
      position: 'absolute',
      backgroundColor: colors.calenderbtnBackground,
      right: wp(80),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textfont: {},
  });

export default RoundedTextIcon;
