import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import { CheckBox, CheckBoxIcon } from '@components';
import CustomText from '../UI/CustomText';
import { getString } from '../../tools/StringHelper';
const SubGroupItem = (props) => {
  const { colors } = useTheme();
  const [prefixs, setPrefix] = useState('47');
  const [checked, setChecked] = useState(false);
  const input = useRef(null);
  const { checkedLabel, id } = props;
  const { dropContainer, yellowContainer, buttonContainer, container } = styles(colors);
  return (
    <TouchableOpacity
      style={checked ? yellowContainer : dropContainer}
      onPress={() => {
        checkedLabel(!checked, id);
        setChecked(!checked);
      }}
    >
      <View
        style={{
          // width: wp(8),
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CheckBoxIcon
          onValueChange={(val) => {
            setChecked(val);
            checkedLabel(val, id);
          }}
          value={checked}
        />
      </View>
      <CustomText
        variant="boldS"
        style={{ color: checked ? colors.black : colors.font, alignSelf: 'center' }}
      >
        {props.title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 30,
      marginTop: 20,
    },
    dropContainer: {
      marginTop: hp('1%'),
      paddingVertical: hp(1),
      paddingLeft: wp(3),
      marginHorizontal: wp('5%'),
      height: hp(7.7),
      backgroundColor: colors.mediumGrey,
      borderRadius: 10,
      //justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    yellowContainer: {
      marginTop: hp('1%'),
      paddingVertical: hp(1),
      paddingLeft: wp(3),
      marginHorizontal: wp('5%'),
      height: hp(7.7),
      backgroundColor: colors.yellow,
      borderRadius: 10,
      alignItems: 'center',
      //justifyContent: 'center',
      flexDirection: 'row',
    },
  });

export default SubGroupItem;
