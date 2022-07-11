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
import { CurveHeader, CheckBox,headText, DateAndTimePicker } from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import bg from '../../assets/images/bgin.png';

import { getColors } from '../../colors';
export default function  Close({ navigation }) {
    const [form, setForm] = useState('');
  const [dateTime, setDateTime] = useState({
    start: new Date(Date.now()),
    end: new Date(Date.now() + 1)
  });
  const [isStartDateShown, showStartDate] = useState(false);
  const [isEndDateShown, showEndDate] = useState(false);
  const [isEndDatePicker, showEndDatePicker] = useState(false);
  const { colors } = useTheme();
  const { container,col,LinkTxt,bottomview,bgTxt,bgTxt2,bgin,listt,listtText,comment, buttonContainer, dateTimeView, mainDateView, dateTimeText, borderView, dropDownView } = styles(colors);

  return (
    <TouchableOpacity style={{alignItems:'flex-end',marginTop:hp(5),paddingRight:20}}>
            <Icon name="close" type="mettrial-community" 
            size={35}
            color={colors.font}
            
            />
        </TouchableOpacity>

  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
    },
    Icol:{color:colors.font}

  });
