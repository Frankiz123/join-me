import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { getColors } from '../../colors';
import CustomText from './CustomText';
import { useTheme } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';
const DateAndTimePicker = (props) => {
  const { onDonePress, onValueChange, value, isVisible , hideDatePicker} = props;
  const { colors } = useTheme();
  const { calendarStyles } = styles(colors);
  const [lang, setLang] = useState('en_GB');
  useEffect(() => {
    async function updateLang() {
      const getLanguage = await AsyncStorage.getItem('language');
      if (getLanguage !== null) {
        if (getLanguage === 'en') {
          moment.locale('en');
          setLang('en_GB');
        } else {
          moment.locale('nb');
          setLang('nb');
        }
      }
    }
    updateLang();
  });
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('datetime');
  const [Show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   // setShow(true);
  //   // setDate(currentDate);
  //   onValueChange(currentDate);
  //   // setShow(false);
  // };

  const ShowMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // const ShowDatepicker = () => {
  //   setShow(true);
  //   ShowMode('date');
  // };

  // const ShowTimepicker = () => {
  //   ShowMode('time');
  // };

  return (
    <View style={{ alignItems: 'flex-end' }}>
      <DateTimePickerModal
        testID="dateTimePicker"
        value={value}
        mode={'datetime'}
        locale={lang}
        is24Hour={true}
        display="spinner"
        onConfirm={onValueChange}
        style={calendarStyles}
        isVisible={isVisible}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    calendarStyles: {
      backgroundColor: colors.secondBackground,
      height: hp('15%'),
      width: wp('90%'),
      alignSelf: 'center',
    },
  });

export { DateAndTimePicker };
