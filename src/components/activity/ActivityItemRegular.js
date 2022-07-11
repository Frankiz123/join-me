import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import { CheckBox } from '@components';
import CustomText from '../UI/CustomText';
import { getString } from '../../tools/StringHelper';
import { Platform } from 'react-native';
import moment from 'moment';
import 'moment/min/locales';
import ButtonApp from '../UI/ButtonApp';
import { Dimensions } from 'react-native';
import { SvgUri, Rect } from 'react-native-svg';
import { useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { Image } from 'react-native';
import { getColors } from '../../colors';
const { width } = Dimensions.get('window');
const ActivityItemRegular = (props) => {
  const scheme = useColorScheme();
  const [lang, setLang] = useState('en');
  const { colors } = useTheme();
  const input = useRef(null);
  const { item, onPress, onAttendeesPress, onCommentPress } = props;
  const {
    cardvw,
    contentvw,
    daytext,
    kmText,
    contentvw2,
    place,
    buttonvw,
    eventnumber,
    eventTxt,
  } = styles(colors);

  var a = moment(item.startTime);
  var b = moment(new Date());
  var x = a.diff(b, 'days') >= 0 ? a.diff(b, 'days') : 0;
  useEffect(() => {
    async function updateLang() {
      const getLanguage = await AsyncStorage.getItem('language');
      if (getLanguage !== null) {
        // setLang(getLanguage.toString());

        if (getLanguage === 'en') {
          moment.locale('en');
        } else {
          moment.locale('nb');
        }
      }
    }
    updateLang();
  });
  var wid = wp(75);
  var hei = Platform.isPad === true ? hp(1.35) : hp(0.1)
  console.log(item)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...cardvw,
        minHeight:
          item?.imgUrl !== 'string' &&
          item?.imgUrl !== undefined &&
          item?.imgUrl !== ''
            ? hp(40)
            : hp(30),
      }}>
      <View style={{}}>
        <View
          style={{
            backgroundColor:
              item.eventStatus === 0 ? colors.yellow : colors.greyStroke,
            height: hp(19),
            width:
              Platform.OS === 'ios'
                ? Platform.isPad === true
                  ? wp(42)
                  : wp(85)
                : wp(85),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            //   borderRadius: 10,
          }}>
          {/* <View
            style={{
              height: hp(19),
              width:
                Platform.OS === 'ios'
                  ? Platform.isPad === true
                    ? wp(42)
                    : wp(85)
                  : wp(85),
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderRadius: 10,
            }}> */}
            {item.iconImgUrl !== 'string' && (
              <SvgUri
                style={{
                  justifyContent: 'flex-end',
                  marginRight: -wp(0),
                  top: 0,
                  alignSelf: 'flex-end',
                  maxHeight:hp(19)
                }}
                viewBox={`0 ${hei} 374 198.724`}
                width={Platform.isPad === true ? wp(37.5):  wp(75)}
                // height={hp(19)}
                uri={item.iconImgUrl}
              />
            )}
            {console.log(item.iconImgUrl)}
          {/* </View> */}
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: hp(3),
            left:
              Platform.OS === 'ios'
                ? Platform.isPad === true
                  ? wp(3)
                  : wp(7)
                : wp(7),
            maxWidth:
              Platform.OS === 'ios'
                ? Platform.isPad === true
                  ? wp(37)
                  : wp(77)
                : wp(77),
            // flexShrink: 1,
          }}>
          <CustomText variant="eventRegularTitle">{item.title}</CustomText>
        </View>
      </View>
      <View style={{ paddingHorizontal: wp(4), paddingVertical: wp(4) }}>
        <View style={contentvw}>
          <Text style={daytext}>
            {getString('activitiesList.ActivityList.card.labelTimeToEvent')} {x}
            {getString('activitiesList.ActivityList.card.labelTimeToEvent2')}
          </Text>
          <Text style={kmText}>{item.distance}</Text>
        </View>
        <View style={contentvw2}>
          {item.locationText !== '' && (
            <Text style={place}>{item.locationText}</Text>
          )}
          <Text style={place}>
            {/* {moment(item.startTime).format('ddd DD. MMM HH:mm')} */}
            {item.periodText}
          </Text>
          {item.maxNrOfAttendies !== 0 && item.maxNrOfAttendies !== null && (
            <Text style={[place, { marginBottom: hp(3.5) }]}>
              {getString(
                'activitiesList.ActivityList.card.labelMaxNrOfAttendees'
              )}
              {item.maxNrOfAttendies}
              {getString(
                'activitiesList.ActivityList.card.labelMaxNrOfAttendees2'
              )}
            </Text>
          )}
        </View>
      </View>
      {item.eventStatus !== 1 && (
        <View style={buttonvw}>
          <ButtonApp
            buttonTitle={
              item.nrOfAttendies?.toString() +
              getString('activitiesList.ActivityList.card.btnNrOfAttendiees')
            }
            onPress={onAttendeesPress}
            btnBackground={colors.activityRglBtn}
            txtColor={{ color: colors.black }}
            buttonStyle={{
              height: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: scheme === 'dark' ? 0 : 1.5,
              borderColor:colors.light
            }}
          />
          {item.nrOfComments > 0 && (
            <TouchableOpacity
              onPress={onCommentPress}
              style={{
                ...eventnumber,
                borderWidth: scheme === 'dark' ? 0.7 : 0,
              }}>
              <CustomText style={eventTxt}>{item.nrOfComments}</CustomText>
            </TouchableOpacity>
          )}
        </View>
      )}
      {(item.eventStatus === 1 || item.isFull) && (
        <View
          style={{
            borderTopWidth: 1,
            height: hp(5.5),
            width:
              Platform.OS === 'ios'
                ? Platform.isPad === true
                  ? wp(42)
                  : wp(85)
                : wp(85),
            marginTop: hp(1),
            alignSelf: 'center',
            paddingLeft: wp(5),
            paddingTop: hp(0.6),
            borderBottomEndRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: item.isFull ? colors.black : colors.greyStroke,
            zIndex: -1,
          }}>
          <CustomText
            variant="mediumLRegular"
            style={{
              color: item.isFull ? getColors('white') : getColors('black'),
            }}>
            {item.isFull
              ? getString('activitiesList.ActivityList.card.status.full')
              : getString('activitiesList.ActivityList.card.status.canceled')}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    cardvw: {
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: hp(4),
      // paddingBottom: Platform.OS === 'ios' ? wp('1%') : wp('2%'),
      borderRadius: 10,
      backgroundColor: colors.greyBackground,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(42) : wp(85)) : wp(85),
      margin: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('3%') : wp('5%')) : wp('5%'),
    },
    contentvw: {
      //   alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(36) : wp(72)) : wp(72),
      marginTop: hp(1),
    },
    daytext: {
      color: colors.font,
      fontSize:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2.5%') : wp('4.5%')) : wp('4.5%'),
      fontWeight: 'bold',
    },
    kmText: {
      color: colors.font,
      fontSize: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2%') : wp('4%')) : wp('4%'),
    },
    contentvw2: {
      textAlign: 'justify',
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(36) : wp(72)) : wp(72),
      justifyContent: 'flex-start',
      minHeight: hp(10),
      marginTop: hp(1),
    },

    place: {
      color: colors.font,
      fontSize:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2%') : RFValue(16)) : RFValue(16),
      fontFamily: 'Lato-Light',
    },
    buttonvw: {
      height: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(9) : hp(7)) : hp(7),
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      // shadowColor: Platform.OS === 'ios' ? colors.black : colors.light,
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // elevation: Platform.OS === 'ios' ? 0 : 60,
      // shadowRadius: 3,
      // shadowOpacity: 0.1,
      // borderWidth:
      //   Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('0.2%')) : wp(0.2),
      borderColor: '#ffffff',
      borderRadius:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('6%') : wp('8%')) : wp('8%'),
      // marginBottom:
      //   Platform.OS === 'ios' ? (Platform.isPad === true ? wp('-5%') : wp('-10%')) : wp('8%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('25%') : wp(35)) : wp(35),
      position: 'absolute',
      bottom:Platform.isPad ? hp(-2.5) : hp(-3),
    },
    eventnumber: {
      //height: height * 0.08,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(5.5) : wp(9)) : wp(9),
      bottom: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('4%') : wp(8.5)) : wp(8.5),
      left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(22) : wp(28)) : wp(28),
      //padding: wp('1%'),
      backgroundColor: colors.black,
      // borderWidth: 1.5,
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: width * 0.05,
      position: 'absolute',
      borderColor: colors.white,
    },

    eventTxt: {
      justifyContent: 'center',
      alignSelf: 'center',
      padding: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(0.5) : wp(1)) : wp(1),
      fontSize: hp('2.5%'),
      textAlign: 'center',
      color: colors.white,
    },
  });

export default ActivityItemRegular;
