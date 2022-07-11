/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Dimensions,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { loginA } from '../../redux/actions/authActions';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import CustomText from '../../components/UI/CustomText';
import { useTheme } from '@react-navigation/native';
import { useKeyboard } from '@react-native-community/hooks';
const { width, height } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
const aspectRatio = height / width;
import PhoneInput from 'react-native-phone-number-input';
import { Icon } from 'react-native-elements';

const LoginScreen = (props) => {
  const { colors } = useTheme();
  const [enabled, setEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [areaCode, setAreaCode] = useState('+47');
  const keyboard = useKeyboard();

  const loginHandler = async () => {
    const { loginA, navigation } = props;
    if (phoneNumber.length >= 8 && phoneNumber.length <= 9 && enabled) {
      setEnabled(false);
      const success = await loginA(phoneNumber, areaCode.split('+')[1]);
      if (success) {
        navigation.navigate('SmsVerification', {
          phoneNumber,
          areaCode: areaCode.split('+')[1],
        });
      }
      if (success !== undefined) {
        setTimeout(() => setEnabled(true), 500);
      }
    }
  };

  const {
    container,
    imageCloud,
    bottomContainer,
    textInCloud,
    cornerImage,
    contentContainer,
    inputContainer,
    flag,
    code,
    numinput,
    numcontainer,
    labeltext,
  } = styles(colors);
  const countryList = ['NO', 'SE', 'PL'];

  return (
    <View style={[container]}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <ScrollView
          style={{ flex: 1 }}
          scrollEnabled={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always">
          <View
            style={{
              width: '100%',
              height: height,
              paddingBottom: keyboard.keyboardShown ? hp(8) : hp(1),
            }}>
            <View style={{ height: height * 0.6 }}>
              <Image
                source={require('../../assets/images/loginImage.png')}
                style={cornerImage}
                resizeMode={'contain'}
              />

              <ImageBackground
                source={require('../../assets/images/loginImage2.png')}
                resizeMode={Platform.isPad ? undefined : 'contain'}
                style={imageCloud}>
                <CustomText variant="title" style={textInCloud}>
                  {getString('logOn.phoneNr.textIntro')}
                </CustomText>
              </ImageBackground>
            </View>
            <Text style={labeltext}>
              {getString('logOn.phoneNr.labelPhoneNr')}
            </Text>

            <View style={contentContainer}>
              <PhoneInput
                defaultCode={'NO'}
                layout={'second'}
                countryPickerProps={{
                  countryCodes: countryList,
                  preferredCountries: countryList,
                }}
                withDarkTheme={true}
                disableArrowIcon={true}
                flagButtonStyle={flag}
                codeTextStyle={code}
                textInputStyle={numinput}
                textContainerStyle={{ backgroundColor: colors.white }}
                // value={phoneNumber}
                countryPickerProps={{
                  countryCodes: countryList,
                  preferredCountries: countryList,
                }}
                countryPickerButtonStyle={{
                  width: Platform.isPad ? wp(12) : wp(20),
                }}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                // onSubmitEditing={() => loginHandler()}
                onPress={() => loginHandler()}
                keyboardType={'numeric'}
                textInputProps={{
                  returnKeyType: 'done',
                  onSubmitEditing: () => loginHandler(),
                }}
                containerStyle={numcontainer}
                placeholder={''}
                pla
                onChangeFormattedText={(text) => {
                  setAreaCode(text.split(phoneNumber)[0]);
                }}
                // filterProps={'+48', '+46', '+49', '+50'}
              />
              <Icon
                name="arrow-right"
                type="material-community"
                reverse={true}
                color={
                  phoneNumber.length >= 8 && phoneNumber.length <= 10
                    ? colors.nextBtnEnabled
                    : colors.nextBtnDisabled
                }
                reverseColor={colors.white}
                size={hp('2%')}
                onPress={() => loginHandler()}
                // onPress={() => loginHandler()}
                // onPress={() => props.navigation.navigate('AboutYou')}
              />
            </View>
          </View>
          <View style={bottomContainer}>
            <CustomText maxFontSizeMultiplier={1.1} variant="small">
              {getString('logOn.phoneNr.linkGdpr.Text')}{' '}
            </CustomText>
            <CustomText
              maxFontSizeMultiplier={1.1}
              // style={{ position: 'absolute', bottom: hp(1) }}
              variant="underlineDark"
              onPress={() =>
                Linking.openURL('https://joinme.social/personvern/')
              }>
              {getString('logOn.phoneNr.linkGdpr.BtnText')}
            </CustomText>
          </View>
        </ScrollView>

        {!keyboard.keyboardShown && <View style={{ marginVertical: 5 }} />}
      </KeyboardAwareScrollView>
    </View>
  );
};
LoginScreen.propTypes = {
  loginA: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.auth.pending,
  verificationSmsSent: state.auth.verificationSmsSent,
  error: state.auth.error,
});
const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundApp },
    imageCloud: {
      position: 'absolute',
      left: Platform.isPad ? -hp(6) : -wp(30),
      zIndex: -1,
      top: Platform.isPad ? hp(7.5) : height * 0.04,
      borderColor: '#000',
      height: Platform.isPad ? hp(62) : hp(60),
      width: Platform.isPad ? hp(77) : wp(130),
    },
    cornerImage: {
      alignSelf: 'flex-end',
      // width: width * 0.50,
      width: Platform.isPad ? wp(50) : wp(65),
      height: height * 0.25,
    },
    textInCloud: {
      position: 'absolute',
      marginTop: Platform.isPad ? hp(3) : hp(6),
      width: Platform.isPad
        ? wp(65)
        : aspectRatio > 2
        ? width * 0.6
        : width * 0.5,
      // height: height * 0.2,
      left: Platform.isPad ? wp(22) : undefined,
      // backgroundColor: 'red',
      alignSelf: 'center',
      top: height * 0.14,
      color: getColors('white'),
      fontSize: Platform.isPad ? height * 0.055 : hp(4.2),
    },
    bottomContainer: {
      flexDirection: 'row',
      // paddingBottom: '4%',
      marginHorizontal: wp(7),
      alignSelf: 'center',
      // height: height * 0.05,
      position: 'absolute',
      bottom: hp(2),
    },
    contentContainer: {
      height: '9%',
      justifyContent: 'space-between',
      // backgroundColor: "red",
      width: Platform.isPad ? wp(60) : '90%',
      alignSelf: 'center',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: colors.white,
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 0.7,
      borderColor: colors.borderColor,
      paddingRight: 2,
    },
    flag: {
      // height: '9%',
      width: wp(20),
      borderRightWidth: 0.5,
      backgroundColor: 'transparent',
    },
    code: {
      alignSelf: 'center',
      //textAlign:'left',
      fontSize: hp(2),
    },
    numinput: {
      height: hp(6),
      paddingLeft: hp(2),
      fontSize: hp(2),
      alignSelf: 'center',
      width: wp(5),
      backgroundColor: colors.white,
    },
    numcontainer: {
      width: Platform.isPad ? wp(50) : wp(68),
      height: hp(5),
      backgroundColor: colors.white,
    },
    labeltext: {
      marginTop: Platform.isPad ? hp(1.5) : 0,
      marginLeft: Platform.isPad ? wp(19) : wp(3.5),
      padding: 10,
      fontSize: hp(2),
      color: colors.font,
    },
  });

export default connect(mapStateToProps, { loginA })(LoginScreen);
