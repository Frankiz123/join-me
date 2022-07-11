import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { getString } from '../../tools/StringHelper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import CustomText from './CustomText';
import { getColors } from '../../colors';
import { useColorScheme } from 'react-native-appearance';
const CheckBoxIcon = (props) => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const { container, headText } = styles(colors);
  const { onValueChange, title, value, size } = props;
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (value !== undefined) {
      setChecked(value);
    }
  }, [value]);

  // const StyledIcon = Icon.getStyledIconSet(style);
  return (
    <View style={{ ...container }}>
   {checked ?   <Icon
        name={'ios-checkbox-outline'}
        onPress={() => {
          setChecked(!checked);
          onValueChange(!checked);
        }}
        size={size || 29}
        style={{margin:-3.8, height:size +1.5 ||30.5}}
        // iconStyle={{ margin: 0 ,  alignSelf:'center' , justifyContent:'center',  }}
      />
         : <Icon2
        name={'square'}
        onPress={() => {
          setChecked(!checked);
          onValueChange(!checked);
        }}
        size={size || 29}
        style={{margin:-4, height:size +1.5 ||30.5}}
        // iconStyle={{ margin: 0 ,  alignSelf:'center' , justifyContent:'center',  }}
      />}
    </View>
  );
};
export { CheckBoxIcon };
const styles = (colors) =>
  StyleSheet.create({
    container: {
      marginRight: wp(3),
      // textAlign:'center',
      backgroundColor: getColors('white'),
    },
    headText: {
      color: colors.font,
      marginTop: hp('1%'),
    },
  });
