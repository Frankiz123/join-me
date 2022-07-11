import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { validate } from 'uuid';
import { getColors } from '../../colors';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { prefixArray } from '../../tools/helper';
import { RFValue } from 'react-native-responsive-fontsize';

const Input = (props) => {
  const { colors } = useTheme();
  const [prefixs, setPrefix] = useState('47');
  const input = useRef(null);
  const {
    labelText,
    icon,
    labelColor,
    backgroundInput,
    placeholder,
    source,
    prefix,
    onPress,
    onPressPrefix,
    ref2,
    inputHeight,
    border,
    fontLabelSize,
    fontSize
  } = props;
  const {
    label,
    textInput,
    inputContainer,
    textInputWithIcon,
    containerWithIcon,
    prefixText,
    iconContainer,
  } = styles;
  return (
    <View style={inputContainer}>
      {label && (
        <Text
          style={[
            label,
            {
              color: labelColor ? labelColor : getColors('font'),
              fontSize: fontLabelSize ? fontLabelSize : hp(2.5),
            },
          ]}
        >
          {labelText}
        </Text>
      )}
      {!icon && (
        <TextInput
          ref={ref2}
          autoCapitalize="none"
          {...props}
          placeholder={placeholder}
          placeholderTextColor={getColors('grey')}
          style={[
            textInput,
            {
              height: inputHeight ? inputHeight : verticalScale(70),
              borderWidth: border !== false ? 1 : 0,
              backgroundColor: backgroundInput && backgroundInput,
              color: getColors('font'),
              fontSize: fontSize ? fontSize :  RFValue(15),
            },
          ]}
        />
      )}

      {icon && (
        <View style={containerWithIcon}>
          {prefix && (
            <View
              style={{
                alignSelf: 'flex-start',
                width: wp(12),
                paddingRight: 20,
                paddingVertical: hp(1.2),
                alignItems: 'flex-start',
              }}
            >
              <Picker
                enabled={true}
                selectedValue={prefixs}
                style={[
                  prefixText,
                  {
                    backgroundColor: backgroundInput && backgroundInput,
                  },
                ]}
                // itemStyle={{ textAlign: '' }}
                onValueChange={(itemValue, itemIndex) => {
                  setPrefix(itemValue);
                  onPressPrefix(itemValue);
                  input.current.focus();
                }}
              >
                {prefixArray.map((item) => (
                  <Picker.Item label={item.label} value={item.value} />
                ))}
              </Picker>
              {/* <Text style={prefixText}>+47</Text> */}
            </View>
          )}

          <TextInput
            autoCapitalize="none"
            {...props}
            ref={(ref) => (input.current = ref)}
            placeholder={placeholder}
            style={[
              {
                backgroundColor: backgroundInput && backgroundInput,
                borderLeftWidth: prefix ? 1 : 0,
                // backgroundColor:'#000',
              },
              textInputWithIcon,
            ]}
          />

          {source !== undefined && (
            <TouchableOpacity
              style={{
                ...iconContainer,
                backgroundColor:
                  props.value.length >= 8 && props.value.length <= 9
                    ? colors.nextBtnEnabled
                    : colors.nextBtnDisabled,
              }}
              onPress={onPress}
              disabled={props.value.length < 8 || props.value.length > 9}
            >
              <Icon
                name={source}
                style={{ justifyContent: 'center' }}
                size={28}
                color={getColors('white')}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {props.isInputValid == false && (
        <View
          style={[
            containerWithIcon,
            {
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 25,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: getColors('darkGrey2'),
            },
          ]}
        >
          <Text style={{ color: getColors('white'), fontWeight: '500', marginRight: 15 }}>
            {props.inputError}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'justify',
    marginBottom: 5,
    fontWeight: '500',
    // fontFamily: 'Poppins-Regular',
    marginLeft: wp(7),
  },
  textInput: {
    fontWeight: '500',
    maxHeight: verticalScale(60),
    // fontFamily: 'Poppins-Regular',
    borderRadius: 6,
    paddingLeft: 20,
    fontSize: RFValue(15),
    marginHorizontal: wp(7),
    borderColor: getColors('stackaNavBackground'),
  },
  containerWithIcon: {
    backgroundColor: getColors('white'),
    marginHorizontal: wp(7),
    borderWidth: 1,
    borderRadius: 6,
    height: verticalScale(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputWithIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(3),
    height: verticalScale(60),
    width: wp(55),
    color: getColors('font'),
    fontSize: scale(17),
    marginLeft: 1.5,
  },
  inputContainer: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginRight: wp(2),
  },
  prefixText: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    left: 1,
    width: wp(35),
    height: verticalScale(50),
    justifyContent: 'center',
    marginRight: wp(2),
    textAlign: 'left',
  },
});

export default Input;
