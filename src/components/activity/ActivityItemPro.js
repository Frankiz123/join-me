import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import CustomText from '../UI/CustomText';
import { getString } from '../../tools/StringHelper';
import { Platform } from 'react-native';
import moment from 'moment';
import 'moment/min/locales';
import ButtonApp from '../UI/ButtonApp';
import { Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';
import { Image } from 'react-native';
const { width } = Dimensions.get('window');
const ActivityItemPro = (props) => {
  const { colors } = useTheme();
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
  var a = moment(item.startTime);
  var b = moment(new Date());
  var x = a.diff(b, 'days') >= 0 ? a.diff(b, 'days') : 0;
  console.log(item.maxNrOfAttendiesText);
  return (
    <TouchableOpacity onPress={onPress} style={cardvw}>
      <View style={{}}>
        <Image
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: Platform.isPad === true ? wp(42) : wp(85),
            height: hp(24),
            resizeMode: 'cover',
          }}
          source={
            item?.imgUrl !== 'string' &&
            item?.imgUrl !== undefined &&
            item?.imgUrl !== ''
              ? {
                  uri: item.imgUrl,
                }
              : require('../../assets/images/fallback_Background.jpg')
          }
        />

        {/* {item.iconImgUrl !== 'string' &&
          item?.iconImgUrl !== undefined &&
          item?.iconImgUrl !== '' && (
            <SvgUri
              style={{ position: 'absolute', right: wp(2.5), top: hp(0) }}
              width={hp(13)}
              height={hp(13)}
              uri={item.iconImgUrl}
            />
          )} */}
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
          <CustomText variant="eventTitle">{item.title}</CustomText>
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
          <Text style={place}>{item.locationText}</Text>
          <Text style={place}>
            {moment(item.startTime).format('ddd DD. MMM HH:mm')}
          </Text>
          <Text style={place}>{item.maxNrOfAttendiesText}</Text>
        </View>
      </View>
      {item.eventStatus !== 1 && (
        <View style={buttonvw}>
          <ButtonApp
            buttonTitle={
              getString(
                'activitiesList.ActivityList.card.btnNrOfAttendieesImAttending'
              ) + item.nrOfAttendies?.toString()
            }
            onPress={onAttendeesPress}
            btnBackground={colors.activityProBtn}
            txtColor={{ color: colors.white }}
            buttonStyle={{
              height: hp(5),
              // justifyContent: 'center',
              // alignItems: 'center',
              // minWidth:
              //   Platform.isPad === true ? wp(12) : wp(15),
              // paddingHorizontal:
              //   Platform.isPad === true ? wp(0.5) : wp(3),
              // marginRight: wp(2),
            }}
          />
          {item.nrOfComments > 0 && (
            <View style={eventnumber}>
              <CustomText style={eventTxt}>{item.nrOfComments}</CustomText>
            </View>
          )}
        </View>
      )}
      {(item.eventStatus === 1 || item.isFull) && (
        <View
          style={{
            height: hp(4),
            width:
              Platform.OS === 'ios'
                ? Platform.isPad === true
                  ? wp(42)
                  : wp(85)
                : wp(85),
            marginTop: hp(1),
            alignSelf: 'center',
            paddingHorizontal: wp(7),
            paddingTop: hp(0.6),
            borderBottomEndRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: item.isFull ? colors.black : colors.greyStroke,
            zIndex: -1,
          }}>
          <CustomText variant="mediumLRegular">
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
      borderRadius: 10,
      backgroundColor: colors.greyBackground,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(42) : wp(85)) : wp(85),
      margin: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(2) : wp('5%')) : wp('5%'),
     minHeight: hp(40),
     maxHeight: hp(46)
    },
    contentvw: {
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
      marginTop: hp(1),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(36) : wp(72)) : wp(72),
    },

    place: {
      color: colors.font,
      fontSize: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2%') : wp('4%')) : wp('4%'),
      marginBottom: hp(0.5),
    },
    buttonvw: {
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: colors.white,
      borderRadius: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(8) : wp('8%')) : wp('8%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('25%') : wp(35)) : wp(35),
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? (Platform.isPad === true ? -hp(2.5) : -hp(2.5)) : -hp(2.5),
    },
    eventnumber: {
      //height: height * 0.08,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(5.5) : wp(9)) : wp(9),
      bottom: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('4%') : wp(8.5)) : wp(8.5),
      left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(22) : wp(28)) : wp(28),
      //padding: wp('1%'),
      borderColor: '#ffffff',
      backgroundColor: '#efefef',
      borderWidth: 1.5,
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: width * 0.05,
      position: 'absolute',
    },

    eventTxt: {
      justifyContent: 'center',
      alignSelf: 'center',
      padding: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(0.5) : wp(1)) : wp(1),
      fontSize: hp('2.5%'),
      textAlign: 'center',
      color: colors.black,
    },
  });

export default ActivityItemPro;
