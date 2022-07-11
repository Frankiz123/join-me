import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import Input from './Input';
import { getString } from '../../tools/StringHelper';
import CustomText from '../../components/UI/CustomText';
import ButtonApp from '../../components/UI/ButtonApp';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { getColors } from '../../colors';
import { useKeyboard } from '@react-native-community/hooks';
import { Platform } from 'react-native';
const MapBottomView = (props) => {
  const { colors } = useTheme();
  const keyboard = useKeyboard();
  const refInput = useRef();
  const { onSelectPress, addressName, addressNameCD, onChangeText } = props;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.secondBackground,
          bottom:
            Platform.OS === 'ios'
              ? keyboard.keyboardShown && refInput.current.isFocused()
                ? keyboard.keyboardHeight
                : 0
              : 0,
        },
      ]}
    >
      <View
        style={{
          width: wp(100),
          paddingLeft: wp(4),
          paddingVertical: hp(0.4),
          borderBottomWidth: 0.3,
          borderColor: colors.check,
        }}
      >
        <CustomText variant="small" style={{ color: colors.font }}>
          {getString('createActivity.place.addressTitle')}
        </CustomText>
      </View>
      <View style={styles.bottomView}>
        <View style={{ width: wp(70) }}>
          <TextInput
            // variant="bold"
            ref={refInput}
            numberOfLines={5}
            multiline
            style={[styles.headText, { color: colors.font }]}
            value={addressName}
            onFocus={() => console.log('aa')}
            onChangeText={onChangeText}
          />

          {addressNameCD && (
            <CustomText variant="mediumRegular" style={styles.headText}>
              {addressNameCD}
            </CustomText>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <ButtonApp
            buttonTitle={getString('createActivity.place.btnNext')}
            onPress={onSelectPress}
            btnBackground={colors.btnBackground}
          />
        </View>
      </View>
      {props.isInputValid == false && (
        <View
          style={[
            // containerWithIcon,
            {
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignSelf: 'center',
              position: 'absolute',
              left: 0,
              right: 0,

              height: 25,
              width: wp(100),
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: getColors('darkGrey2'),
            },
          ]}
        >
          <Text style={{ color: getColors('white'), fontWeight: '500', marginRight: 15 }}>
            {getString('createActivity.place.missingFreeText')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  bottomView: {
    height: hp(17),
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  headText: {
    marginTop: hp(2),
    fontFamily: 'Lato-Bold',
    fontSize: RFValue(18),
    width: wp(65),
    flexWrap: 'wrap',
    flexShrink: 1,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: hp(3),
    width: wp(25),
    // padding: 20,
  },
});

export { MapBottomView };
