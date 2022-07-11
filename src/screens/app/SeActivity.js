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
import Modal from 'react-native-modal';
import { CurveHeader, CheckBox, DateAndTimePicker } from '@components';

import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { LeftAndRightHeader } from '../../components/UI/Header';
import bgimage from '../../assets/images/headerBackground.png';
import { Icon } from 'react-native-elements';
import Input from '../../components/UI/Input';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomModel from '../../components/UI/BottomModel';
import axios from 'axios';
import { apiUrl } from '../../tools/config';

const initialState = {
  firstName: '',
  lastName: '',
  yearOfBirth: '2001',
  gender: '',
  image: '',
};

export default function SeActivity({ navigation }) {
  const [mymodel, setmymodel] = useState(false);
  const { colors } = useTheme();
  const [check, setcheck] = useState(false);
  const {
    dropContainer,
    dropContainer2,
    buttonContainer,
    container,
    modelbtntxt,
    modelbody,
    slide,
    modelContainer,
  } = styles(colors);

  useEffect(() => {
    const tkn = useSelector((state) => state.auth.token);
    console.log('mytknnnnn', tkn);
  }, []);

  return (
    <ScrollView style={container}>
      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => navigation.navigate('FindActivity')}
        title={getString('createActivity.place.title')}
      />

      <View style={{ margin: hp(2) }}>
        <CustomText variant="bold" style={{ color: colors.font }}>
          Saturday 18 August, at 12: 00-15: 00
        </CustomText>

        <CustomText
          style={{
            color: colors.font,
            fontSize: hp(2.2),
            marginTop: hp(1),
            textDecorationLine: 'underline',
          }}
        >
          The thousand steps, Kongens gate
        </CustomText>
        <CustomText style={{ color: colors.font, fontSize: hp(2.2), marginTop: hp(3) }}>
          On Saturday 18 August, you are invited to a stair race with a colorful twist in Ålesund.
        </CustomText>
        <CustomText style={{ color: colors.font, fontSize: hp(2.2), marginTop: hp(3) }}>
          {getString('SeActivity.link info')}
        </CustomText>
        <CustomText
          style={{ color: colors.font, fontSize: hp(2.2), textDecorationLine: 'underline' }}
        >
          https://docs.google.com/forms/d/1XViRaQCVQmXSIybv4GQa1t3q2m5TdT54F0fSx51NkEA/viewform?edit_requested=true
          Welcome to the city for a different
        </CustomText>
        <CustomText style={{ color: colors.font, fontSize: hp(2.2), marginTop: hp(3) }}>
          {getString('SeActivity.welcome')}
        </CustomText>
        <CustomText style={{ color: colors.font, fontSize: hp(1.5), marginTop: hp(3) }}>
          Updated March 13, 2020 2:32 PM
        </CustomText>
      </View>

      <TouchableOpacity onPress={() => setmymodel(true)} style={dropContainer}>
        <CustomText variant="bold" style={{ color: colors.font }}>
          343 shall
        </CustomText>
        <Icon name="arrow-right" color={colors.font} type="material-community" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setmymodel(true)} style={dropContainer}>
        <CustomText variant="bold" style={{ color: colors.font }}>
          12 comments
        </CustomText>
        <Icon
          name="arrow-right"
          onPress={() => {
            navigation.navigate('Comments');
          }}
          color={colors.font}
          type="material-community"
        />
      </TouchableOpacity>

      <Modal isVisible={mymodel} style={{ justifyContent: 'flex-end' }}>
        <View style={modelContainer}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            style={slide}
            onPress={() => setmymodel(false)}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateActivity'), setmymodel(false);
            }}
            style={modelbody}
          >
            <CustomText variant="bold" style={{ color: colors.font }}>
              {getString('oneActivity.activity.labelRepport')}
            </CustomText>
            <Icon name="arrow-right" color={colors.font} type="material-community" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateActivity'), setmymodel(false);
            }}
            style={modelbtntxt}
          >
            <CustomText variant="bold" style={{ color: colors.font }}>
              {getString('oneActivity.activity.labelEditEvent')}
            </CustomText>
            <Icon name="arrow-right" color={colors.font} type="material-community" />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
      marginTop: 20,
    },
    slide: {
      alignSelf: 'center',
      backgroundColor: colors.greyBackground,
      width: 60,
      height: 7,
      borderRadius: 20,
      marginTop: 10,
    },
    dropContainer: {
      marginTop: hp('1%'),
      padding: wp('5%'),
      // marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.greyBackground,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: hp(3),
    },
    modelContainer: {
      height: hp(25),
      width: wp(100),
      marginLeft: wp(-5),
      marginBottom: hp(-2),
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: colors.photoRing,
    },

    modelbody: {
      marginHorizontal: 30,
      marginTop: hp(4),
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: hp(5),
    },

    modelbtntxt: {
      paddingHorizontal: 30,
      paddingTop: 20,
      marginTop: 20,
      borderTopWidth: 0.5,
      borderColor: colors.greyBackground,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
