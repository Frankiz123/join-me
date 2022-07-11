import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonApp from '../../components/UI/ButtonApp';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';
import {
  updateEvent,
  cancelEvent,
  removeEvent,
} from '../../redux/actions/activityActions';
import moment from 'moment';
import bg from '../../assets/images/bgin.png';
import bgBlack from '../../assets/images/bginBlack.png';
import { getColors } from '../../colors';
import { Close } from '../../components/UI/Close';
import { color } from 'react-native-reanimated';
import SummaryItem from '../../components/UI/SummaryItem';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { RFValue } from 'react-native-responsive-fontsize';
import { CancelAlert } from '../../components/UI/CancelAlert';
const initialState = {
  title: '',
  body: '',
  address: {
    coordinates: {
      long: null,
      lat: null,
    },
    freeText: '',
    url: '',
    title: '',
    body: '',
  },
  period: {
    start: new Date(),
    end: new Date(),
  },
  attendees: {
    max: 0,
    mine: null,
    attendeeIds: [],
  },
  commentSection: {},
  groups: [],
  contact: {
    name: '',
    email: '',
  },
  joinMeEventType: 0,
  joinMeEventStatus: 0,
  relatedTo: [],
  gender: 0,
};
const UpdateActivity = (props) => {
  const [form, setForm] = useState(initialState);
  const [textForInvitation, setTextForInvitation] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const {
    container,
    txtinput,
    LinkTxt,
    bottomview,
    bgTxt2,
    bgin,
    listt,
    listtText,
    comment,
    buttonContainer,
    curveImageView,
  } = styles(colors);
  const {
    eventDetailData,
    navigation,
    route,
    cancelEvent,
    removeEvent,
    updateEvent,
    token,
  } = props;
  useEffect(() => {
    setData();
  }, [route.params]);
  const goToEditActivity = (screenName) => {
    var param;
    if (route.params === undefined) {
      param = form;
    } else {
      param = route.params;
    }
    console.log(param.freeText);
    navigation.navigate('ActivityModals', {
      screen: screenName,
      params: { ...form, lastScreenName: 'UpdateActivity' },
    });
  };
  const cancelEventHandler = async () => {
    const success = await cancelEvent(token, route.params.eventId);
    success && navigation.goBack();
  };
  const removeEventHandler = async () => {
    const success = await removeEvent(token, route.params.eventId);
    success && navigation.navigate('FindActivity');
  };
  const updateEventHandler = async () => {
    // console.log(form.body)
    const success = await updateEvent(token, form, route.params.eventId);
    if (success) {
      navigation.navigate('Confirmation', {
        eventId: route.params.eventId,
        update: true,
      });
    } else {
      navigation.navigate('Confirmation', {
        eventId: route.params.eventId,
        update: true,
      });
    }
  };
  const setData = () => {
    setTextForInvitation(eventDetailData?.detaildEvent.body === '' ? '' : eventDetailData?.detaildEvent.body); //done
    console.log(
      'set',
      eventDetailData?.detaildEvent.attendees.attendeeIds.map((item) => {
        return item.userId;
      })
    );
    setForm({
      ...form,
      created: eventDetailData?.detaildEvent.created || new Date(),
      canEditTitle:eventDetailData?.detaildEvent.canEditTitle !== undefined ? eventDetailData?.detaildEvent.canEditTitle : true, //done
      title:
        route?.params?.title === undefined
          ? eventDetailData?.detaildEvent.title
          : route.params.title, //done
      body: textForInvitation, //done
      mainImage: eventDetailData?.detaildEvent.mainImage || '',
      iconImage: eventDetailData?.detaildEvent.iconImage || '',
      address: {
        coordinates: {
          long:
            route.params?.place === undefined
              ? eventDetailData?.detaildEvent?.address?.coordinates?.long
              : parseFloat(route.params.place?.coordinates?.lng) || null,
          lat:
            route.params?.place === undefined
              ? eventDetailData?.detaildEvent?.address?.coordinates?.lat
              : parseFloat(route.params.place?.coordinates?.lat) || null,
        },
        freeText:
          route.params?.freeText === undefined
            ? eventDetailData?.detaildEvent.address.freeText
            : route.params.freeText,
        url:
          route.params?.url === undefined
            ? eventDetailData?.detaildEvent.address.url
            : route.params.url || '',
        title: eventDetailData?.detaildEvent.address.title || '',
        icon: eventDetailData?.detaildEvent.address.icon || '',
        body: eventDetailData?.detaildEvent.address.body || '',
      },
      period: {
        start:
          route.params?.startDataTime === undefined
            ? eventDetailData?.detaildEvent.period.start
            : moment(route.params.startDataTime), //done
        end:
          route.params?.endDataTime === undefined
            ? eventDetailData?.detaildEvent.period.end
            : moment(route.params.endDataTime), //done
      },
      attendees: {
        max:
          route.params?.participants === undefined
            ? parseInt(eventDetailData?.detaildEvent.attendees.max) > 5000000
              ? 0
              : parseInt(eventDetailData?.detaildEvent.attendees.max)
            : parseInt(route.params.participants) === Number.MAX_SAFE_INTEGER
            ? 0
            : parseInt(route.params.participants),
        mine: eventDetailData?.detaildEvent.attendees.mine || null, //done
        attendeeIds:
          eventDetailData?.detaildEvent.attendees !== undefined
            ? eventDetailData?.detaildEvent.attendees.attendeeIds.map(
                (item) => {
                  return item.userId;
                }
              )
            : [props.user.profileId],
      },
      commentSection: eventDetailData?.detaildEvent.commentSection || {}, //done
      groups:
        route.params?.groupArray === undefined
          ? eventDetailData?.detaildEvent.groups.map(item=> {return item.id})
          : route.params.groupArray,
      contact: eventDetailData?.detaildEvent.contact || {
        name: '',
        email: '',
      }, //done
      joinMeEventType: eventDetailData?.detaildEvent.joinMeEventType || 0, //done
      joinMeEventStatus: eventDetailData?.detaildEvent.joinMeEventStatus || 0, //done
      relatedTo: eventDetailData?.detaildEvent.relatedTo || [], //done
      gender:
        route.params === undefined
          ? eventDetailData?.detaildEvent.gender
          : route.params.onlyGirl
          ? 2
          : 0,
      id: route.params.eventId,
    });
  };
  // var x = )
  console.log('body text2', eventDetailData?.detaildEvent.body);
  // console.log('body text2', route.params.eventId);

  return (
    <ScrollView style={container} keyboardShouldPersistTaps='handled'>
      <Close onRightPress={() => navigation.goBack()} />
      <View style={{ marginLeft: 20 }}>
        <CustomText
          style={{ color: colors.font }}
          style={{ fontSize: hp(4) }}
          variant="veryBigTitle">
          {getString('createActivity.Summary.edit')}
        </CustomText>
      </View>

      <CustomText
        style={{
          color: colors.font,
          fontSize: hp(1.8),
          marginLeft: 20,
          marginTop: 20,
        }}>
        {eventDetailData?.nrOfAttendees} attendees{' '}
        {eventDetailData?.nrOfAttendees > 1 ? (
          <CustomText
            style={{ color: colors.font, textDecorationLine: 'underline' }}
            onPress={() => setAlertShow(true)}>
            {getString('createActivity.Summary.cancel')}
          </CustomText>
        ) : (
          <CustomText
            style={{ color: colors.font, textDecorationLine: 'underline' }}
            onPress={() => setAlertShow(true)}>
            {getString('createActivity.Summary.delete')}
          </CustomText>
        )}
      </CustomText>

      {route.params?.groupName !== undefined && (
        <SummaryItem
          editPress={() => goToEditActivity('GroupModal')}
          title={
            route.params.groupName !==
            getString('createActivity.Groups.Textone')
              ? route.params.groupArray.length +
                getString('createActivity.Summary.tagGrpSummery') +
                route.params.groupName
              : getString('createActivity.Groups.Textone')
          }
        />
      )}
      <SummaryItem
        editPress={() => goToEditActivity('AddActivityModal')}
        title={form.title}
      />

      <SummaryItem
        editPress={() => goToEditActivity('WhenModal')}
        title={moment(form.period.start).format(`dddd DD MMMM [at] HH:mm`)}
      />
      <SummaryItem
        editPress={() => goToEditActivity('Where')}
        title={
          form.address.freeText ||
          form.address.url ||
          form.address.title ||
          'places'
        }
      />
      <SummaryItem
        editPress={() => goToEditActivity('HowManyModal')}
        title={
          (0 !== form.attendees.max
            ? getString('createActivity.Summary.tagMaxAttendieGender1') +
              form.attendees.max
            : getString('createActivity.howManyAndOwnGender.inerText')) +
          getString('createActivity.Summary.tagMaxAttendieGender2') +
          (form.attendees.gender === 2
            ? getString('createActivity.Summary.tagMaxAttendieGender3')
            : '')
        }
      />

      <View style={{ margin: 20 }}>
        <CustomText variant="smallLabel">
          {getString('createActivity.Summary.labelFreeText')}
        </CustomText>
        <View style={comment}>
          <TextInput
          value={textForInvitation}
            multiline={true}
            style={txtinput}
            onChangeText={(text) =>{console.log('test', text);setForm({
              ...form, body:text}); setTextForInvitation(text)}}
          />
        </View>
      </View>
      <View style={curveImageView}>
        <ImageBackground
          style={bgin}
          source={scheme === 'dark' ? bgBlack : bg}
          resizeMode={'contain'}>
          <CustomText variant="mediumRegular" style={bgTxt2}>
            {getString('createActivity.Summary.body2')}
          </CustomText>
        </ImageBackground>
      </View>

      <CancelAlert
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        navigation={navigation}
        title={ eventDetailData?.nrOfAttendees > 1 ?  getString('createActivity.Update.alertCancel') :  getString('createActivity.Update.alertDelete') }
        customAction={() =>
          eventDetailData?.nrOfAttendees > 1
            ? cancelEventHandler()
            : removeEventHandler()
        }
        btn1text={getString('logOn.location.yes')}
        btn2text={getString('logOn.location.no')}
      />

      <View style={bottomview}>
        <CustomText
          variant="underlineMedium"
          onPress={() => Linking.openURL('https://joinme.social/vilkar/')}
          style={LinkTxt}>
          {getString('createActivity.Summary.linkText')}
        </CustomText>
        <View style={buttonContainer}>
          <ButtonApp
            buttonTitle={getString('createActivity.Summary.Updatebtn')}
            onPress={() => updateEventHandler()}
            btnBackground={colors.btnBackground}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'center',
      marginRight: wp(3),
      // padding: 20,
      marginBottom: hp(2),
    },
    txtinput: {
      backgroundColor: colors.white,
      height: hp(20),
      color: 'black',
      fontSize: RFValue(15),
      padding: 10,
    },

    listt: {
      backgroundColor: colors.yellow,
      padding: 2,
      margin: 10,
      marginHorizontal: 20,
      //marginLeft:40,
      alignSelf: 'flex-start',
    },
    listtText: {
      fontSize: hp(3),
      fontWeight: '600',
      margin: 5,
      color: colors.font,
    },
    comment: {
      borderColor: colors.font,
      borderWidth: 1,
      marginVertical: hp(0.5),
    },
    bgin: {
      height: Platform.isPad ? hp(40) : hp(30),
      width: Platform.isPad ? wp(80) : wp(60),
      paddingHorizontal: wp(3),
      alignSelf: 'flex-end',
      // paddingLeft: Platform.isPad ? wp(6) : wp(2),
      marginRight: Platform.isPad ? -wp(5.5) : wp(1),
      justifyContent: Platform.isPad ? 'center' : null,
    },
    curveImageView: {
      width: wp(100),
      height: hp(30),
      // alignItems: 'center',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      marginTop: Platform.isPad ? hp(10.5) : 0,
      marginBottom: Platform.isPad ? -hp(2.5) : 0,
      // backgroundColor: 'red',
    },
    bgTxt2: {
      width: Platform.isPad ? wp(45) : wp(40),
      paddingTop: Platform.isPad ? 0 : hp(5),
      marginBottom: Platform.isPad ? hp(15) : hp(0),
      fontWeight: '500',
      color: colors.font,
      marginLeft: Platform.isPad ? -wp(5) : wp(0),
      alignSelf: Platform.isPad ? 'center' : undefined,
    },
    bottomview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: wp(2),
    },
    LinkTxt: { padding: wp(10) },
  });
UpdateActivity.propTypes = {
  token: PropTypes.string,
  pending: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  eventDetailData: state.activity.eventDetailData,
  user: state.user.user,
});
const mapDispatchToProps = { updateEvent, cancelEvent, removeEvent };
export default connect(mapStateToProps, mapDispatchToProps)(UpdateActivity);
