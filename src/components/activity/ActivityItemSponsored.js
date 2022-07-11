import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ImageBackground } from 'react-native';
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
import ButtonApp from '../UI/ButtonApp';
import { Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import { getColors } from '../../colors';
const { width } = Dimensions.get('window');
const ActivityItemSponsored = (props) => {
  // moment.locale('pl');
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
    label,
  } = styles(colors);
  var a = moment(item.startTime);
  var b = moment(new Date());
  var x = a.diff(b, 'days') >= 0 ? a.diff(b, 'days') : 0;
  useEffect(() => {
    async function updateLang() {
      const getLanguage = await AsyncStorage.getItem('language');
      if (getLanguage !== null) {
        // setLang(getLanguage.toString())

        if (getLanguage === 'en') {
          moment.locale('en');
        } else {
          moment.locale('nb');
        }
      }
    }
    updateLang();
  });
  return (
    <TouchableOpacity onPress={onPress} style={cardvw}>
      <View>
        <ImageBackground
          style={{
            width: Platform.isPad === true ? wp(42) : wp(85),
            height: hp(24),
            resizeMode: 'cover',
          }}
          imageStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={
            item?.imgUrl !== 'string' &&
            item?.imgUrl !== undefined &&
            item?.imgUrl !== ''
              ? {
                  uri: item.imgUrl,
                }
              : require('../../assets/images/fallback_Background.jpg')
          }>
          {item.iconImgUrl !== 'string' && (
            <SvgUri
              style={{ position: 'absolute', right: wp(2.5), top: hp(0) }}
              width={hp(13)}
              height={hp(13)}
              uri={item.iconImgUrl}
            />
          )}

          <View
            style={{
              position: 'absolute',
              bottom: hp(4),
              left:
                Platform.OS === 'ios'
                  ? Platform.isPad === true
                    ? wp(4)
                    : wp(7)
                  : wp(7),
              maxWidth:
                Platform.OS === 'ios'
                  ? Platform.isPad === true
                    ? wp(37)
                    : wp(85)
                  : wp(85),
              // flexShrink: 1,
            }}>
            <CustomText variant="boldXXXs" style={label}>
              {getString(
                'activitiesList.ActivityList.card.SponsoredActivities.tagLabel'
              )}
            </CustomText>
            <CustomText variant="eventSposnoredTitle">{item.title}</CustomText>
          </View>
          <View style={buttonvw}>
            <ButtonApp
              buttonTitle={
                item.nrOfAttendies +
                getString(
                  'oneActivity.activity.SponsoredActivities.btnConncetedEvent'
                )
              }
              onPress={onAttendeesPress}
              btnBackground={colors.yellow}
              txtColor={{ color: colors.black, fontSize: RFValue(13) }}
              buttonStyle={{ minWidth: wp(18), minHeight: hp(4) }}
            />
          </View>
        </ImageBackground>
      </View>
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
        <Text style={place}>{item.maxNrOfAttendies}</Text>
      </View>

      {(item.eventStatus === 1 || item.isFull) && (
        <View
          style={{
            borderTopWidth: 1,
            height: hp(4),
            width:
              Platform.OS === 'ios'
                ? Platform.isPad === true
                  ? wp(42)
                  : wp(85)
                : wp(85),
            marginTop: -hp(1),
            alignSelf: 'center',
            paddingLeft: wp(5),
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
      marginVertical: hp(2),
      paddingBottom: Platform.OS === 'ios' ? wp('1%') : wp('2%'),
      borderRadius: 10,
      backgroundColor: colors.greyBackground,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(42) : wp(85)) : wp(85),
      margin: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(2) : wp('5%')) : wp('5%'),
      minHeight: hp(40),
      maxHeight: hp(48)
    },
    contentvw: {
      //   alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(36) : wp(72)) : wp(72),
      marginTop: hp(4),
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
    label:    {
      backgroundColor: colors.white,
      alignSelf: 'flex-start',
      marginBottom: hp(0.7),
      marginLeft: wp(0.2),
    },
    buttonvw: {
      flex: 1,
      // height: Platform.OS === 'ios' ? (Platform.isPad === true ? hp(6) : hp(7)) : hp(7),
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 3,
      shadowOpacity: 2,
      textAlign: 'center',
      elevation: Platform.OS === 'ios' ? 0 : 35,
      borderColor: colors.white,
      borderRadius:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('6%') : wp('8%')) : wp('8%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('25%') : wp(35)) : wp(35),
      // top: Platform.isPad ? hp(12.7) : hp(0),
      left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(3) : wp(5)) : wp(5),
      justifyContent: 'flex-end',
      marginBottom: Platform.isPad ? -hp(2) : -hp(2),
    },
  });

export default ActivityItemSponsored;
