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
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { CurveHeader, CheckBox, DateAndTimePicker, CancelAlert, CheckBoxIcon } from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

export default function When(props) {
  const { navigation, route } = props;
  const [dateTime, setDateTime] = useState({
    start: new Date(Date.now()),
    end: new Date().setHours(new Date().getHours() + 1),
  });
  const [isStartDateShown, showStartDate] = useState(false);
  const [isEndDateShown, showEndDate] = useState(false);
  const [isEndDatePicker, showEndDatePicker] = useState(false);
  const [lang, setLang] = useState('en');
  const [alertShow, setAlertShow] = useState(false);
  const { colors } = useTheme();
  const {
    container,
    buttonContainer,
    dateTimeView,
    mainDateView,
    dateTimeText,
    borderView,
    dropDownView,
  } = styles(colors);
  useEffect(() => {
    async function updateLang() {
      const getLanguage = await AsyncStorage.getItem('language');
      if (getLanguage !== null) {
        setLang(getLanguage.toString());

        if (getLanguage === 'en') {
          moment.locale('en');
        } else {
          moment.locale('nb');
        }
      }
    }
    updateLang();
  });
  useEffect(() => {
    if (route.params.startDataTime !== undefined) {
      setDateTime({ start: route.params.startDataTime });
    }
    if (route.params.endDataTime !== undefined && route.params.endDataTime !== null) {
      showEndDate(true);
      setDateTime({ end: route.params.endDataTime, start: route.params.startDataTime });
    }
    if (route.params.period?.start !== undefined) {
      setDateTime({ start: route.params.period.start });
    }
    if (route.params.period?.end !== undefined && route.params.period?.end !== null) {
      showEndDate(true);
      setDateTime({ end: route.params.period.end, start: route.params.period.start });
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
        title={getString('createActivity.startEndtime.title')}
      />
      <View style={{ marginHorizontal: wp('6%'), marginTop: hp('5%') }}>
        <View style={mainDateView}>
          {isStartDateShown ? (
            <DateAndTimePicker
              isVisible={isStartDateShown}
              onDonePress={() => {
                showStartDate(false);
              }}
              value={dateTime.start}
              hideDatePicker={() => showStartDate(false)}
              onValueChange={(updatedDate) => {
                showStartDate(false);
                setDateTime({
                  start: new Date(updatedDate),
                  end: new Date(updatedDate).setHours(new Date(updatedDate).getHours() + 1),
                });
              }}
            />
          ) : (
            <View style={dateTimeView}>
              <CustomText variant="bold" style={dateTimeText}>
                {moment(dateTime.start).format('ddd D MMM h:mm a')}
              </CustomText>
              <View style={borderView} />
              <TouchableOpacity onPress={() => showStartDate(true)} style={dropDownView}>
                <Icon name="chevron-down" size={30} type="material-community" color={colors.font} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: hp(2),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(0.8),
          }}
        >
          <CheckBoxIcon
            onValueChange={(value) => {
              showEndDate(!isEndDateShown);
              // if (value && dateTime.start !== undefined) {
              //   setDateTime({
              //     ...dateTime,
              //     end: new Date().setHours(dateTime.start.getHours() + 1),
              //   });
              // }
            }}
            value={isEndDateShown}
          />
          <CustomText style={{ color: colors.font }}>
            {getString('createActivity.startEndtime.checkBoxText')}
          </CustomText>
        </View>

        {isEndDateShown && (
          <View style={[mainDateView, { marginTop: hp(2) }]}>
            {isEndDatePicker ? (
              <DateAndTimePicker
                isVisible={isEndDatePicker}
                onDonePress={() => {
                  showEndDatePicker(false);
                }}
                value={dateTime.end}
                onValueChange={(updatedDate) => {
                  showEndDatePicker(false);
                  setDateTime({ ...dateTime, end: updatedDate });
                }}
                hideDatePicker={() => showEndDatePicker(false)}
              />
            ) : (
              <View style={dateTimeView}>
                <CustomText variant="bold" style={dateTimeText}>
                  {moment(dateTime.end).format('MMM. Do YY, h:mm a')}
                </CustomText>
                <View style={borderView} />
                <TouchableOpacity onPress={() => showEndDatePicker(true)} style={dropDownView}>
                  <Icon
                    name="chevron-down"
                    size={30}
                    type="material-community"
                    color={colors.font}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <View style={{ ...buttonContainer, marginTop: isEndDateShown ? hp(4) : hp(14) }}>
          <ButtonApp
            buttonTitle={getString('firstTime.aboutyou.btnNext')}
            onPress={() =>
              navigation.navigate('Where', {
                ...route.params,
                startDataTime: dateTime.start,
                endDataTime: isEndDateShown ? dateTime.end : null,
                passurl: getString('createActivity.place.MeetOnline'),
                other: 50,
              })
            }
            btnBackground={colors.btnBackground}
          />
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
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      paddingVertical: 20,
    },
    mainDateView: {
      // height: hp('15%'),
      justifyContent: 'flex-end',
      // backgroundColor: 'red'
    },
    dateTimeView: {
      height: hp('10%'),
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.font,
      justifyContent: 'space-between',
      paddingHorizontal: wp('4%'),
      alignItems: 'center',
    },
    dateTimeText: {
      color: colors.font,
      width: wp('60%'),
      // backgroundColor: 'red'
    },
    borderView: {
      width: wp('5%'),
      height: hp('6%'),
      borderRightColor: colors.font,
      borderRightWidth: 1,
      // backgroundColor: 'red'
    },
    dropDownView: {
      height: hp('10%'),
      width: wp('18%'),
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'green'
    },
  });
{
  /* <View style={{ alignItems: 'center' }}>
        <ScrollView
          contentContainerStyle={{
            width: '90%',
            flexWrap: 'wrap',
          }}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={{ margin: 22, fontSize: hp('1.8%'), fontWeight: '500', marginHorizontal: wp("15%") }} >{getString('createActivity.howManyAndOwnGender.checkBoxText')}</Text>
        </ScrollView>
      </View> */
}
