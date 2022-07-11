import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { getColors } from '../../colors';
import CustomText from './CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
const SearchInput = (props) => {
  const { colors } = useTheme();
  const {
    container,
    labelText,
    icon,
    labelColor,
    backgroundInput,
    placeholder,
    source,
    colorIcon,
    onPress,
    customStyle,
    inputStyle,
    leftIcon,
    backPress,
  } = props;
  const { label, textInputWithIcon, containerWithIcon, iconContainer } = styles(
    colors,
  );
  return (
    <View style={container}>
      {props.label  && (
        <CustomText
          variant="small"
          style={[label, { color: labelColor ? labelColor : getColors('darkGrey2') }]}
        >
          {labelText}
        </CustomText>
      )}
      {icon && (
        <View style={[containerWithIcon, customStyle]}>
          {leftIcon && (
            <TouchableOpacity style={[iconContainer]} onPress={backPress}>
              <Icon2
                name={leftIcon}
                size={25}
                color={colorIcon}
              />
            </TouchableOpacity>
          )}
          <TextInput
            autoCapitalize="none"
            {...props}
            placeholder={placeholder}
            style={[
              {
                backgroundColor: backgroundInput && backgroundInput,
              },
              textInputWithIcon,
              inputStyle,
            ]}
          />
          <TouchableOpacity style={iconContainer} onPress={onPress}>
            <Icon name={source} size={25}  color={colorIcon} onPress={onPress} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    label: {
      textAlign: 'justify',
      marginBottom: hp(1),
    },
    textInput: {
      height: hp(8),
      fontWeight: '500',
      fontFamily: 'Asap-SemiBold',
      borderWidth: 1,
      paddingLeft: 20,
      fontSize: RFValue(21),
      paddingBottom: 10,
      marginHorizontal: wp(6),
      borderColor: getColors('stackaNavBackground'),
    },
    containerWithIcon: {
      backgroundColor: colors.white,
      marginHorizontal: wp(6),
      borderWidth: 1,
      height: verticalScale(68),
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textInputWithIcon: {
      justifyContent: 'flex-start',
      alignSelf: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: wp(2),
      height: verticalScale(60),
      width: wp(55),
      color: getColors('font'),
      fontSize: scale(17),
    },
    iconContainer: {
      width: wp(10),
      height: wp(10),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

export default SearchInput;
