import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { getColors } from '../../colors';

const Picker = (props) => {
  const { labelText, labelColor, backgroundInput, placeholder, values } = props;
  const { label, inputContainer, pickerInput, container, pickerInnerBorder } = styles;

  return (
    <View style={inputContainer}>
      {labelText && (
        <Text style={[label, { color: labelColor ? labelColor : getColors('font') }]}>
          {labelText}
        </Text>
      )}

      <View style={container}>
        <View style={pickerInnerBorder} />
        <RNPicker
          {...props}
          placeholder={placeholder}
          style={[
            {
              backgroundColor: backgroundInput && backgroundInput,
            },
            pickerInput,
          ]}
        >
          {values.map(({ value, text }) => {
            value = value.toString();
            text = text.toString();
            return <RNPicker.Item key={value} label={text} value={value} />;
          })}
        </RNPicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: hp(2.5),
    textAlign: 'justify',
    marginBottom: 5,
    fontWeight: '500',
    // fontFamily: 'Poppins-Regular',
    marginHorizontal: wp(7),
  },
  container: {
    backgroundColor: getColors('white'),
    marginHorizontal: wp(7),
    borderWidth: 1,
    borderRadius: 10,
    height: verticalScale(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  pickerInput: {
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(3),
    height: verticalScale(50),
    width: wp(85),
    color: getColors('font'),
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  pickerInnerBorder: {
    ...Platform.select({
      ios: {
        width: 0,
      },
      android: {
        width: 2,
      },
    }),
    position: 'absolute',
    height: verticalScale(45),
    backgroundColor: getColors('lightGrey'),
    alignSelf: 'center',
    // top: '7%',
    right: '15%',
  },
});

export default Picker;
