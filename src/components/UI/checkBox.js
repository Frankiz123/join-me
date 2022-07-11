import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Checkbox, Icon } from 'react-native-paper';
import { getString } from '../../tools/StringHelper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import CustomText from './CustomText';
import { getColors } from '../../colors';
const CheckBox = (props) => {
  const { colors } = useTheme();
  const { container, headText } = styles(colors);
  const { onValueChange, title, value } = props;
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (value !== undefined) {
      setChecked(value);
    }
  }, [value]);

  return (
    <View style={{ ...container, backgroundColor: checked ? '#000' : '#fff' }}>
      <Checkbox.Item
        // uncheckedColor={{ backgroundColor: '#fff' }}
        color={'#fff'}
        mode={'android'}
        style={{
          alignSelf: 'center',
          marginHorizontal: checked ? -23 : -25,
          height: checked ? 21 : 18,
        }}
        // theme={{ colors: { background: '#012' } }}

        status={checked ? 'checked' : 'unchecked'}
        height={20}
        width={20}
        onPress={() => {
          setChecked(!checked);
          onValueChange(!checked);
        }}
      />
      {/* <CustomText variant="mediumRegular" style={headText}>
        {title}
      </CustomText> */}
    </View>
  );
};
export { CheckBox };
const styles = (colors) =>
  StyleSheet.create({
    container: { marginRight:wp(5), alignSelf:'center', alignItems:'center'},
    headText: {
      color: colors.font,
      marginTop: hp('1%'),
    },
  });
