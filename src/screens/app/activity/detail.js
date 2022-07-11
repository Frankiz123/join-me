import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {
  DetailsHeader,
  CustomText,
  BottomModel,
  ActivityLoader,
  FullWidthButton,
} from '@components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';

import { Icon } from 'react-native-elements';
import { getString } from '../../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  getActivityDetail,
  addAttendiee,
  removeAttendiee,
  reportEvent,
} from '../../../redux/actions/activityActions';
import ButtonApp from '../../../components/UI/ButtonApp';
import { AccessAlert } from '../../../components/UI/AccessAlert';

const ActivityDetail = (props) => {
  const { colors } = useTheme();
  const [isVisible, setModal] = useState(false);
  const [leftPosition, setLeftPostion] = useState(new Animated.Value(100));
  const [calenderStucky, setCalenderStucky] = useState(false);
  const [calenderclose, Setclenderclose] = useState(false);
  const { item } = props.route.params;
  const { token, getActivityDetail, eventDetailData, pending, navigation, reportEvent } = props;
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow2, setAlertShow2] = useState(false);
  const mooveRL = (value) => {
    Animated.timing(leftPosition, {
      toValue: 200 + value - leftPosition._value,
      duration: 100, // the duration of the animation
      easing: Easing.linear, // the style of animation
      // useNativeDriver: true,
    }).start(); // starts this annimation once this method is called
  };
  const eventId = item
    ? item.id
    : props.route.params.eventId !== undefined
    ? props.route.params.eventId
    : '6296e385-125f-4a20-80ad-6fff03ff2788';

  const utcDateToString = (momentInUTC) => {
    //let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    let s = moment
      .utc(eventDetailData?.detaildEvent.period.start)
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };

  // const activityDetailData = activityDetail.data;
  const userProfile = useSelector((state) => state.user.user);
  //Calender

  const TIME_NOW_IN_UTC = moment.utc();
  const [eventTitle, setEventTitle] = useState('Default event');

  function addEventToCalendar(title, startDateUTC) {
    const eventConfig = {
      //title: eventTitle,
      title: eventDetailData.detaildEvent.title,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
      notes: 'Default Event Description',
      location: eventDetailData.detaildEvent.address.title,
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then((eventInfo) => {
        Setclenderclose(true);
        // alert(JSON.stringify(eventInfo));
      })
      .catch((error) => {
        // alert('Error ', error);
      });
  }

  const dispatch = useDispatch();
  const {
    dropContainer,
    container,
    button,
    attendicon,
    bottomContainer2,
    bottomContainer1,
    bottomContainer,
    btnText,
    hiddenRowStyle,
    visibleRowStyle,
    footerSponsored,
    animation_view,
  } = styles(colors);
  const [swp, setswp] = useState(false);
  const onPressItem2 = () => {
    if (ifCreator()) {
      console.log('pres2');
      navigation.navigate('UpdateActivity', { eventId }), setModal(false);
    } else {
      setModal(false);
      setTimeout(() => setAlertShow(true), 500);
    }
  };
  const onPressItem1 = () => {
    if (ifCreator()) {
      console.log('pres2');
      navigation.navigate('UpdateActivity', { eventId }), setModal(false);
    } else {
      setModal(false);
      setTimeout(() => setAlertShow(true), 500);
    }
  };
  useEffect(() => {
    getActivityDetail({ token, eventId: props.route.params?.eventId });
    console.log(token);
  }, [props.route.params?.eventId]);
  const reportEventHandler = () => {
    reportEvent(token, props.route.params?.eventId);
    setAlertShow(false);
    setTimeout(() => setAlertShow2(true), 600);
  };
  const joinEvent = () => {
    dispatch(addAttendiee({ token, eventId })).then((res) => {
      if (res.status === 200) {
        getActivityDetail({ token, eventId: props.route.params?.eventId });
      }
    });
  };
  const notGoing = () => {
    dispatch(removeAttendiee({ token, eventId: props.route.params?.eventId }))
      .then((res) => {
        if (res.status === 200) {
          getActivityDetail({ token, eventId });
          setCalenderStucky(false);
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  const ifAttending = () => {
    const isExist = eventDetailData?.detaildEvent.attendees.attendeeIds.filter(
      (elem) => elem.userId === userProfile.profileId,
    );
    if (isExist?.length > 0) {
      return true;
    }
    return false;
  };
  const ifCreator = () => {
    if (eventDetailData?.detaildEvent) {
      return userProfile.profileId === eventDetailData?.detaildEvent.createdByUser;
    }
  };
  const ifFull = () => {
    if (
      eventDetailData?.detaildEvent.attendees.attendeeIds.length >=
      eventDetailData?.detaildEvent.attendees.max
    ) {
      return true;
    }
    return false;
  };
  const ifCanceled = () => {
    if (eventDetailData?.detaildEvent.joinMeEventStatus === 1) {
      return true;
    }
    return false;
  };
  const isPro = () => {
    if (eventDetailData?.detaildEvent.joinMeEventType === 1) {
      return true;
    }
    return false;
  };
  return (
    <View style={container}>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginBottom: ifCanceled() || ifFull() || ifAttending() ? 0 : 120,
        }}
      >
        <DetailsHeader
          leftIcon={'arrow-left'}
          onLeftPress={() => navigation.popToTop()}
          rightIcon={'dots-three-vertical'}
          rightIconType={'entypo'}
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          onRightPress={() => setModal(true)}
          title={getString('createActivity.Name.title')}
          whoInvited={!pending && eventDetailData?.whoInvited}
          groupsText={!pending && eventDetailData?.groupsText}
          activityDetailData={eventDetailData !== null ? eventDetailData : []}
          attendeesNr={eventDetailData !== null ? eventDetailData.nrOfAttendees : 0}
          pending={pending}
        />
        <AccessAlert
          title={getString('oneActivity.Comments.reasonTextSuccess')}
          btn1Text={getString('oneActivity.Comments.btnOK')}
          visible={alertShow2}
          setVisible={(val) => setAlertShow2(val)}
          allowHandler={() => setAlertShow2(false)}
        />
        <AccessAlert
          title={getString('oneActivity.activity.reasonText')}
          btn1Text={getString('logOn.location.yes')}
          btn2Text={getString('logOn.location.no')}
          visible={alertShow}
          setVisible={(val) => setAlertShow(val)}
          allowHandler={() => reportEventHandler()}
        />
        {pending ? (
          <ActivityLoader size={'small'} />
        ) : eventDetailData?.detaildEvent.joinMeEventType !== 2 ? (
          <>
            <View style={{ margin: wp(5), marginTop: hp(3) }}>
              <CustomText variant="bold" style={{ marginVertical: hp(2), color: colors.font }}>
                {moment(eventDetailData?.detaildEvent.period.start).format('dddd DD. MMM HH:mm')}
              </CustomText>
              {eventDetailData && eventDetailData.detaildEvent.address.title ? (
                <CustomText
                  onPress={() =>
                    navigation.navigate('ActivityDetailMap', {
                      eventTitle: eventDetailData.detaildEvent.title,
                      eventLocation: eventDetailData.detaildEvent.address,
                    })
                  }
                  variant="underlineMedium"
                >
                  {eventDetailData?.detaildEvent.address.title}
                </CustomText>
              ) : null}

              <CustomText style={{ color: colors.font, fontSize: hp(2.2), marginVertical: hp(3) }}>
                {eventDetailData?.detaildEvent.body}
              </CustomText>
              {isPro() && eventDetailData?.detaildEvent.contact.email != '' && (
                <>
                  <CustomText variant="bold">
                    {getString('oneActivity.activity.labelQuestions')}
                  </CustomText>
                  <CustomText variant="underlineMedium">
                    {eventDetailData?.detaildEvent.contact.email}
                  </CustomText>
                </>
              )}
              {eventDetailData?.detaildEvent.updated != null && (
                <CustomText style={{ color: colors.font, fontSize: hp(1.5), marginTop: hp(3) }}>
                  {getString('detail.updated')} {eventDetailData?.detaildEvent.updated}
                </CustomText>
              )}
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Attendees', {
                  eventId: eventDetailData?.detaildEvent?.id,
                  createdBy: eventDetailData?.detaildEvent?.createdByUser,
                  eventTitle: eventDetailData.detaildEvent?.title,
                })
              }
              style={dropContainer}
            >
              <CustomText variant="bold" style={{ color: colors.font }}>
                {eventDetailData?.nrOfAttendees} will
              </CustomText>
              <Icon name="arrow-right" color={colors.font} type="material-community" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Comments', {
                  eventId,
                  attendiee: ifAttending(),
                  title: eventDetailData?.detaildEvent?.title,
                  eventDetailData,
                })
              }
              style={dropContainer}
            >
              <CustomText variant="bold" style={{ color: colors.font }}>
                {eventDetailData?.nrOfComments} comments
              </CustomText>
              <Icon name="arrow-right" color={colors.font} type="material-community" />
            </TouchableOpacity>
          </>
        ) : (
          <View />
        )}
      </ScrollView>
      {eventDetailData?.detaildEvent.joinMeEventType !== 2 ? (
        <>
          {!pending && !calenderclose && ifAttending() && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.calenderbtnBackground,
                padding: 13,
                marginTop: hp('1'),
                justifyContent: 'center',
                alignItems: 'center',
                width: wp('100'),
              }}
              onPress={addEventToCalendar}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp('100'),
                }}
              >
                <MaterialIcon name="arrow-collapse-down" color={colors.fonts} size={18} />
                <Text style={{ fontSize: 20, color: colors.fonts, marginHorizontal: wp('3') }}>
                  Add to calendar
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    width: wp('90'),
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Icons
                    name="ios-close-outline"
                    color={colors.fonts}
                    size={23}
                    onPress={() => {
                      Setclenderclose(true);
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {pending ? (
            <View />
          ) : (!pending && ifFull() && !ifAttending()) || (ifCanceled() && !ifAttending()) ? (
            <FullWidthButton
              buttonTitle={
                ifCanceled()
                  ? getString('activitiesList.ActivityList.card.status.canceled')
                  : getString('activitiesList.ActivityList.card.status.full')
              }
              onPress={() => {}}
              btnBackground={ifFull() ? colors.black : colors.grey}
              txtColor={ifFull() ? colors.white : colors.black}
            />
          ) : ifAttending() ? (
            <SwipeRow
              swipeToClosePercent={50}
              disableRightSwipe={true}
              disableLeftSwipe={
                userProfile.profileId === eventDetailData?.detaildEvent?.createdByUser
                  ? true
                  : false
              }
              onSwipeValueChange={(gesture) => {
                mooveRL(gesture.value);
              }}
              // swipeGestureBegan={mooveRL}
              // swipeGestureEnded={mooveLR}
              forceCloseToRightThreshold={150}
              onForceCloseToRightEnd={() => notGoing()}
            >
              <View style={hiddenRowStyle}>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    backgroundColor: 'black',
                    height: hp(18),
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: colors.white,
                    marginRight: 20,
                  }}
                >
                  <Animated.View
                    style={[
                      animation_view,
                      { left: leftPosition, marginLeft: Platform.isPad ? wp(70) : wp(40) },
                    ]}
                  >
                    <CustomText
                      color={'white'}
                      variant="bold"
                      onPress={() => {
                        setswp(false);
                        notGoing();
                      }}
                      style={{ color: colors.white }}
                    >
                      {getString('createActivity.detail.goingbtn')}
                    </CustomText>
                  </Animated.View>
                </View>
              </View>
              <View style={visibleRowStyle}>
                <CustomText
                  variant="bold"
                  style={{ color: colors.black, paddingLeft: !ifCreator() ? wp(25) : 0 }}
                >
                  {getString('createActivity.detail.attendingbtn')}
                </CustomText>
                {!ifCreator() && (
                  <Icon
                    name="menu"
                    type="metterial-community"
                    color={colors.white}
                    size={40}
                    style={[attendicon, { marginLeft: wp(10) }]}
                  />
                )}
              </View>
            </SwipeRow>
          ) : (
            <View style={bottomContainer}>
              <TouchableOpacity style={button} onPress={joinEvent}>
                <CustomText variant="bold" style={btnText}>
                  {getString('createActivity.detail.joinnow')}
                </CustomText>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={footerSponsored}>
          <ButtonApp
            buttonTitle={getString('oneActivity.activity.SponsoredActivities.btnCreateEvent')}
            onPress={() =>
              navigation.navigate('AddActivity', {
                title2: eventDetailData?.detaildEvent?.title,
                adress2: eventDetailData?.detaildEvent?.address,
              })
            }
            btnBackground={colors.yellow}
            txtColor={{ color: colors.black }}
          />
        </View>
      )}
      <BottomModel
        isVisible={isVisible}
        onPressVisible={setModal}
        onPressItem1={() => onPressItem1()}
        onPressItem2={() => onPressItem2()}
        iconName={'arrow-right'}
        iconType={'material-community'}
        title1={
          ifCreator()
            ? getString('oneActivity.activity.labelEditEvent')
            : getString('oneActivity.activity.labelRepport')
        }
        icon1
      />
    </View>
  );
};
const styles = (colors) =>
  StyleSheet.create({
    visibleRowStyle: {
      alignItems: 'center',
      backgroundColor: colors.yellow,
      justifyContent: 'center',
      height: 150,
      width: '100%',
      flexDirection: 'row',
    },
    hiddenRowStyle: {
      alignItems: 'center',
      height: 150,
      flexDirection: 'row',
      backgroundColor: 'black',
      color: '#ffff',
      justifyContent: 'space-between',
      paddingLeft: 50,
    },
    container: { flex: 1, backgroundColor: colors.secondBackground },
    //container: { flex: 1, backgroundColor: 'red' },
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
    button: {
      borderRadius: hp('10%'),
      backgroundColor: colors.blackYellow,
      height: hp('6%'),
      width: hp('20%'),
      justifyContent: 'center',
    },
    btnText: {
      alignSelf: 'center',
      color: colors.reversColor,
    },
    bottomContainer: {
      width: '100%',
      height: hp(14),
      backgroundColor: colors.secondBackground,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'flex-end',
    },
    bottomContainer1: {
      flex: 8,
      //width: '100%',
      height: hp(15),
      backgroundColor: colors.yellow,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      paddingHorizontal: wp(15),
    },
    bottomContainer2: {
      width: '100%',
      height: hp(15),
      backgroundColor: colors.black,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      paddingHorizontal: wp(15),
    },
    attendicon: {
      //  backgroundColor:'red',
      width: wp(25),

      transform: [{ rotate: '270deg' }],
    },
    footerSponsored: {
      height: hp(12),
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: hp(2),
      borderBottomWidth: 0,
      borderWidth: 0.1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -3 },
      shadowRadius: 3,
      shadowOpacity: 0.1,
      elevation: 1,
      backgroundColor: colors.reverseBg,
    },
    animation_view: {
      // backgroundColor: 'red',
      // width: 200,
      // height: 200,
      justifyContent: 'center',
      alignItems: 'flex-end',
      // padding: 20,
    },
  });
ActivityDetail.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  // initialListEvents: state.activity.initialListEvents,
  // initialListData: state.activity.initialListData,
  eventDetailData: state.activity.eventDetailData,
});
export default connect(mapStateToProps, { getActivityDetail, reportEvent })(ActivityDetail);
