import React, { useState } from 'react';
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
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { CurveHeader, CheckBox, headText, DateAndTimePicker } from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';

export default function Update({ navigation }) {
  const { colors } = useTheme();
  const { container, headText, headText1, buttonContainer } = styles(colors);

  return (
    <View style={container}>
      <CustomText variant="bold" style={headText}>
        {getString('createActivity.Confirmation.Title')}
      </CustomText>
      <CustomText variant="bold" style={headText1}>
        {getString('createActivity.Update')}
      </CustomText>

      <View style={buttonContainer}>
        <ButtonApp
          buttonTitle={getString('createActivity.Confirmation.btnViewEvent')}
           onPress={() => navigation.navigate('SeActivity')}
          // onPress={() => navigation.navigate('ActivityDetail')}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundApp,
    },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'center',
      padding: 20,
      marginTop: hp('7%'),
      width: wp(65),
    },

    headText: {
      color: colors.whiteYellow,
      fontSize: hp(8),
      // fontWeight: 'bold',
    },
    headText1: {
      color: colors.font,
      fontSize: hp(5),
      textAlign: 'center',
      paddingHorizontal: hp(2),

      // fontWeight: 'bold',
    },
  });
