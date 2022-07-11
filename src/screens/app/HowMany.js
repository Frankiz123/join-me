import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { CurveHeader } from '@components';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { CheckBoxIcon, CancelAlert, CheckBox } from '@components';
import Input from '../../components/UI/Input';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { set } from 'react-native-reanimated';
import { getColors } from '../../colors';
import { Platform } from 'react-native';

export default function HowMany(props) {
  const [participants, setParticipants] = useState(Number.MAX_SAFE_INTEGER);
  const [onlyGirl, setOnlyGirl] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const { colors } = useTheme();
  const { dropContainer, buttonContainer, container, headText } = styles(colors);
  const { navigation, route } = props;
  useEffect(() => {
    if (route.params.participants !== undefined && route.params.onlyGirl !== undefined) {
      setOnlyGirl(route.params.onlyGirl);
      setParticipants(route.params.participants);
    }
  }, []);
  return (
    <View style={container}>
      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => setAlertShow(true)}
        title={getString('createActivity.howManyAndOwnGender.title')}
      />
      <View style={{ marginHorizontal: wp(4) }}>
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            marginLeft: Platform.isPad ? wp(3.2) : wp(3.7),
            alignItems: 'center',
          }}
        >
          <CheckBoxIcon onValueChange={(val) => setOnlyGirl(val)} value={onlyGirl} />
          <CustomText style={{ color: colors.font }}>
            {getString('createActivity.howManyAndOwnGender.checkBoxText')}
          </CustomText>
        </View>
        <View style={dropContainer}>
          <Input
            labelText={getString('createActivity.howManyAndOwnGender.labelHowMany')}
            backgroundInput={getColors('white')}
            fontLabelSize={RFValue(19)}
            value={participants === Number.MAX_SAFE_INTEGER ? '' : participants}
            keyboardType={'numeric'}
            fontSize={RFValue(21)}
            placeholder={getString('createActivity.howManyAndOwnGender.inerText')}
            labelColor={colors.font}
            returnKeyType="done"
            onSubmitEditing={() =>
              navigation.navigate('When', { ...route.params, onlyGirl, participants })
            }
            onChangeText={(value) => {
              console.log(value);
              setParticipants(value);
            }}
            //isInputValid={isFirstNameValid}
            inputError={'First Name missing'}
          />
        </View>

        <View style={{ marginTop: hp(20) }}>
          <View style={buttonContainer}>
            <CustomText
              style={{
                color: colors.font,
                width: wp(65),
                marginLeft: Platform.isPad ? wp(3.2) : wp(3.5),
              }}
            >
              {getString('createActivity.howManyAndOwnGender.labelInfo')}
            </CustomText>
            <ButtonApp
              buttonTitle={getString('firstTime.aboutyou.btnNext')}
              onPress={() => {
                navigation.navigate('When', { ...route.params, onlyGirl, participants });
              }}
              btnBackground={colors.btnBackground}
            />
          </View>
        </View>
      </View>
      <CancelAlert
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    buttonContainer: {
      // alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      justifyContent: 'space-between',
      width: Platform.isPad ? wp(88.7) : wp(89),
      // padding: 20,
      // marginTop: 20,
    },
    dropContainer: {
      width: wp(60),
      // height: hp('10%'),
      alignSelf: 'flex-start',
      marginLeft: -wp(4),
      // borderColor: colors.font,
      // justifyContent: 'center',
      justifyContent: 'center',
      // alignItems: 'flex-start',
      // marginBottom: hp(2),
    },
    headText: {
      color: colors.font,
      marginLeft: wp(2),
    },
  });
