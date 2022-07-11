import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { colors, Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
// import SvgUri from 'react-native-svg-uri';
import { SvgUri } from 'react-native-svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { CustomText } from '@components';
import { useColorScheme } from 'react-native-appearance';
import { ImageBackground } from 'react-native';
const { height } = Dimensions.get('window');
import { images } from '@images';
import { color } from 'react-native-reanimated';
import { getString } from '../../../tools/StringHelper';
import { getColors } from '../../../colors';
import ButtonApp from '../ButtonApp';
import { RFValue } from 'react-native-responsive-fontsize';
import RoundedTextIcon from '../RoundedTextIcon';

const CurveHeader = (props) => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const {
    onLeftPress,
    onRightPress,
    title,
    leftIcon,
    leftIconType,
    rightIconType,
    rightIcon,
    activityDetailData,
    attendeesNr,
    whoInvited,
    groupsText,
    pending,
  } = props;
  const { detaildEvent } = activityDetailData;
  console.log(
    'Detail Event attendiesID === ',
    detaildEvent?.attendees?.attendeeIds[0]?.userInitials,
  );
  const isRegular = () => {
    return detaildEvent?.joinMeEventType === 0;
  };
  const isPro = () => {
    return detaildEvent?.joinMeEventType === 1;
  };
  const isSponsored = () => {
    return detaildEvent?.joinMeEventType === 2;
  };
  const ifCanceled = () => {
    return detaildEvent?.joinMeEventStatus === 1;
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          ifCanceled()
            ? ''
            : !isRegular()
            ? detaildEvent?.mainImage !== '' && detaildEvent?.mainImage !== 'string'
              ? { uri: detaildEvent?.mainImage }
              : images.fallBackImage
            : images.yellowRectangle
        }
        style={[styles.imageStyle, { backgroundColor: ifCanceled() ? colors.grey : '' }]}
      >
        <View style={{ marginHorizontal: wp(5) }}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={onLeftPress}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
              <Icon
                name={leftIcon}
                size={30}
                type={leftIconType ? leftIconType : 'material-community'}
                color={isRegular() ? colors.black : colors.white}
              />
            </TouchableOpacity>
            {rightIcon && isRegular() && (
              <Icon
                onPress={onRightPress}
                name={rightIcon}
                size={25}
                type={rightIconType ? rightIconType : 'entypo'}
                color={colors.black}
              />
            )}
          </View>
          {/* <View style={{}}> */}
          {!pending && (
            <>
              <View style={styles.rounderImageView}>
                {detaildEvent
                  ? detaildEvent?.iconImage !== 'string' &&
                    detaildEvent?.iconImage !== '' && (
                      <View
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          left: Platform.isPad ? 100 : 0,
                        }}
                      >
                        {detaildEvent?.attendees?.attendeeIds[0]?.avatar !== '' &&
                        detaildEvent?.attendees?.attendeeIds[0]?.avatar !== null ? (
                          <Image
                            source={{ uri: detaildEvent?.attendees?.attendeeIds[0]?.avatar }}
                            height={80}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: 'contain',
                              borderRadius: 300,
                              position: 'absolute',
                              backgroundColor: colors.calenderbtnBackground,
                              right: wp(80),
                              justifyContent: 'center',
                              alignItems: 'center',
                              left: Platform.isPad ? 100 : 0,
                            }}
                            width={80}
                          />
                        ) : (
                          <RoundedTextIcon detaildEvent={detaildEvent}>
                            {detaildEvent?.attendees?.attendeeIds[0]?.userInitials}
                          </RoundedTextIcon>
                        )}
                        <SvgUri
                          // eslint-disable-next-line react-native/no-inline-styles
                          style={{
                            position: 'relative',
                            top: hp(5),
                            right: wp(0),
                          }}
                          uri={detaildEvent?.iconImage ? detaildEvent?.iconImage : ''}
                          // uri={''}
                        />
                      </View>
                    )
                  : null}
              </View>
              {isPro() ? (
                // <CustomText variant="boldXXs" style={styles.label}>
                //   {getString('activitiesList.ActivityList.card.SponsoredActivities.tagLabel')}
                // </CustomText>
                <>
                  <CustomText
                    variant="bodyMedium"
                    style={{ color: isRegular() ? colors.black : colors.white }}
                  >
                    {whoInvited}
                  </CustomText>
                  <CustomText
                    variant="bodyMedium"
                    style={{ color: isRegular() ? colors.black : colors.white }}
                  >
                    {/* {detaildEvent ? 'bioingenior + 3 grupper til' : ''} */}
                    {/* {console.log('detail Events === ', detaildEvent)} */}
                    {groupsText}
                  </CustomText>
                </>
              ) : (
                <>
                  <CustomText
                    variant="bodyMedium"
                    style={{ color: isRegular() ? colors.black : colors.white }}
                  >
                    {whoInvited}
                  </CustomText>
                  <CustomText
                    variant="bodyMedium"
                    style={{ color: isRegular() ? colors.black : colors.white }}
                  >
                    {/* {detaildEvent ? 'bioingenior + 3 grupper til' : ''} */}
                    {/* {console.log('detail Events === ', detaildEvent)} */}
                    {groupsText}
                  </CustomText>
                </>
              )}

              <CustomText
                variant="bigTitle"
                style={{ color: isRegular() ? colors.black : colors.white }}
              >
                {detaildEvent?.title}
              </CustomText>
              {detaildEvent ? (
                <CustomText
                  variant="verySmall"
                  style={{
                    marginTop: hp(2),
                    color: isRegular() ? colors.black : colors.white,
                  }}
                >
                  {detaildEvent?.attendees.max != null
                    ? getString('oneActivity.activity.labelMaxNrOfAttendees')
                    : ''}
                  {detaildEvent?.attendees.max == null
                    ? getString('howManyAndOwnGender.inerText')
                    : detaildEvent?.attendees.max}{' '}
                  {getString('oneActivity.activity.labelMaxNrOfAttendees2')}
                </CustomText>
              ) : null}

              <View
                style={[
                  styles.shareView,
                  {
                    backgroundColor: colors.greyBackground,
                    top: Platform.isPad ? hp(41) : height >= 680 ? hp(38) : hp(39),
                  },
                ]}
              >
                <Icon
                  onPress={() => {}}
                  name={'share'}
                  size={35}
                  type={'entypo'}
                  color={colors.font}
                />
              </View>
            </>
          )}
          {/* </View> */}
        </View>
        {isSponsored() && (
          <View style={styles.buttonvw}>
            <ButtonApp
              buttonTitle={
                attendeesNr +
                getString('oneActivity.activity.SponsoredActivities.btnConncetedEvent')
              }
              // onPress={onAttendeesPress}
              btnBackground={colors.yellow}
              txtColor={{ color: colors.black, fontSize: RFValue(13) }}
              buttonStyle={{ minWidth: wp(18), minHeight: hp(4) }}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    // position: 'absolute',
    width: wp(90),
    // height: hp(10),
    top: Platform.OS == 'ios' ? (DeviceInfo.hasNotch() ? 40 : 30) : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // backgroundColor: 'green',
    zIndex: 1,
  },
  imageStyle: {
    width: '100%',
    height: hp(45),
    resizeMode: 'stretch',
  },
  rounderImageView: {
    height: hp(15),
    width: wp(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    left: wp(25),
    marginTop: hp(5),
    zIndex: -1,
    // backgroundColor: 'red',
  },
  roundedImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 300,
  },
  shareView: {
    height: 80,
    width: 80,
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    position: 'absolute',
    right: -wp(5),
    // top: height >= 680 ? hp(40.4) : hp(39),
    bottom: Platform.isPad ? -hp(12.3) : -hp(13.5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: hp(0.7),
    marginLeft: wp(0.2),
    color: colors.black,
    backgroundColor: colors.white,
  },
  buttonvw: {
    height: Platform.OS === 'ios' ? (Platform.isPad === true ? hp(6) : hp(7)) : hp(7),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 2,
    textAlign: 'center',
    elevation: Platform.OS === 'ios' ? 0 : 35,
    borderColor: getColors('white'),
    borderRadius:
      Platform.OS === 'ios' ? (Platform.isPad === true ? wp('6%') : wp('8%')) : wp('8%'),
    width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('25%') : wp(35)) : wp(35),
    position: 'absolute',
    bottom: Platform.isPad ? -hp(3.5) : -hp(4),
    left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(3) : wp(5)) : wp(5),
  },
});

export default CurveHeader;
