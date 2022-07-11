import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import { verifyPhone, loginA, setCompleteFirstTime } from '../../redux/actions/authActions';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { useTheme } from '@react-navigation/native';
import { useKeyboard } from '@react-native-community/hooks';
const SmsVerificationScreen = (props) => {
  const [code, setCode] = useState('');
  const keyboard = useKeyboard();
  const [wrongCode, setWrongCode] = useState(false);
  const { colors } = useTheme();
  const { verifyPhone, user, setCompleteFirstTime } = props;
  useEffect(() => {}, []);
  const loginHandler = async () => {
    const { verifyPhone, route, navigation } = props;

    const response = await verifyPhone(
      code,
      route.params.phoneNumber,
      route.params.areaCode,
      navigation,
    );
    if (response === true) {
    } else if (response === 'invalid_grant') {
      setWrongCode(true);
    }
  };

  const sendSmsAgain = async () => {
    const { loginA, route } = props;
    var success = await loginA(route.params.phoneNumber, route.params.areaCode);
  };

  const {
    container,
    titleStyle,
    bottomContainer,
    inputContainer,
    wrongCodeText,
    cellStyle,
    linkStyle,
    containerContent,
    buttonStyle,
  } = styles(colors);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -hp(3) : - keyboard.keyboardHeight - hp(25)}
    >
      <View style={container}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="ios-arrow-back" size={35} color={colors.font} />
        </TouchableOpacity>
        <View style={containerContent}>
          <CustomText variant={Platform.isPad ? 'labelIpad' : 'label'}>
            {getString('logOn.code.TextIntro')}
          </CustomText>
          <View
            style={[
              inputContainer,
              {
                backgroundColor: wrongCode ? getColors('blackBlur') : null,
                marginBottom: wrongCode ? hp(2) : 0,
              },
            ]}
          >
            <SmoothPinCodeInput
              value={code}
              onTextChange={(code) => setCode(code)}
              autoFocus={true}
              cellSpacing={13}
              cellStyle={[cellStyle, { borderWidth: wrongCode ? 2 : 0 }]}
              containerStyle={{ width: wp(56) }}
              animationFocused={null}
              inputProps={{
                onSubmitEditing: () => loginHandler(),
              }}
            />
            {wrongCode && (
              <CustomText variant="verySmall" style={wrongCodeText}>
                {getString('logOn.code.ErrorText')}
              </CustomText>
            )}
          </View>
          {!wrongCode && (
            <View style={bottomContainer}>
              <CustomText variant="verySmall">{getString('logOn.code.linkHelp.Text')} </CustomText>
              <TouchableOpacity onPress={() => sendSmsAgain()}>
                <CustomText variant="smallUnderline">
                  {getString('logOn.code.linkHelp.BtnText')}
                </CustomText>
              </TouchableOpacity>
            </View>
          )}
          <View style={buttonStyle}>
            <ButtonApp
              btnBackground={colors.btnBackground}
              disabled={code.length < 4}
              buttonTitle={
                wrongCode ? getString('logOn.code.btnTryAgain') : getString('logOn.code.btnNext')
              }
              onPress={() => loginHandler()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
SmsVerificationScreen.propTypes = {
  verifyPhone: PropTypes.func.isRequired,
  loginA: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.auth.pending,
  token: state.auth.token,
  refresh_token: state.auth.refresh_token,
  user: state.user.user,
  areaCode: state.auth.areaCode,
});
const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundApp,
      width: wp(100),
      padding: moderateScale(25),
    },
    containerContent: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    bottomContainer: {
      flexDirection: 'row',
      // backgroundColor:"white",
      marginTop: hp(1),
      marginBottom: hp(2),
      marginHorizontal: wp(7),
      alignItems: 'center',
    },
    inputContainer: {
      paddingHorizontal: wp(1),
      paddingTop: hp(3),
      paddingBottom: hp(2),
      borderRadius: 10,
      width: Platform.isPad ? wp(56.5) : wp(66),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp(2),
    },
    wrongCodeText: {
      fontSize: hp(1.8),
      marginTop: hp(2),
      color: colors.white,
    },
    cellStyle: {
      backgroundColor: colors.white,
      borderColor: colors.backgroundApp,
      height: hp(8),
      width: Platform.isPad ? wp(12) : wp(13),
      marginHorizontal: wp(8),
      borderRadius: 5,
    },
    buttonStyle: {
      alignSelf: 'center',
    },
  });

export default connect(mapStateToProps, { verifyPhone, loginA, setCompleteFirstTime })(
  SmsVerificationScreen,
);
