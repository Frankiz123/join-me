import React, { useState, useRef } from 'react';
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
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import { CurveHeader, CheckBox, headText, DateAndTimePicker } from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import bg from '../../assets/images/bgin.png';
import bgBlack from '../../assets/images/bginBlack.png';
import { Close } from '../../components/UI/Close';
import { color } from 'react-native-reanimated';
import SummaryItem from '../../components/UI/SummaryItem';
import { createEvent } from '../../redux/actions/activityActions';
import { CancelAlert } from '../../components/UI/CancelAlert';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useKeyboard } from '@react-native-community/hooks';
const Inviting = (props) => {
  const [textForInvitation, setTextForInvitation] = useState('');
  const keyboard = useKeyboard();
  const scrollRef = useRef();
  const [mymodel, setmymodel] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const { route, navigation, createEvent, token } = props;
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const {
    container,
    modelbtntxt,
    modelbody,
    modeltitle,
    modelbtnview,
    modelbtn2,
    modelbtn1,
    modelcontainer2,
    modelContainer,
    txtinput,
    LinkTxt,
    bottomview,
    bgTxt,
    bgTxt2,
    bgin,
    listt,
    listtText,
    comment,
    buttonContainer,
    curveImageView,
  } = styles(colors);
 const createEventHandler = async () => {
    const body = {
      created: moment(new Date()),
      title: route.params.title,
      body: textForInvitation,
      mainImage: null,
      iconImage: null,
      address: {
        coordinates: {
          long: parseFloat(route.params.place?.coordinates?.lng) || null,
          lat: parseFloat(route.params.place?.coordinates?.lat) || null,
        },
        freeText: route.params.freeText,
        url: route.params.url || '',
        title: route.params.placeName || '',
        icon: '',
        body: '',
      },
      period: {
        start: moment(route.params.startDataTime),
        end: moment(route.params.endDataTime),
      },
      attendees: {
        max:
          parseInt(route.params.participants) === Number.MAX_SAFE_INTEGER
            ? 0
            : parseInt(route.params.participants),
        mine: null,
        attendeeIds: [props.user.profileId],
      },
      commentSection: {},
      groups: route.params.groupArray,
      contact: {
        name: '',
        email: '',
      },
      joinMeEventType: 0,
      joinMeEventStatus: 0,
      relatedTo: [],
      // relatedTo: route.params.relatedTo !== undefined ? route.params.relatedTo : [],
      gender: route.params.onlyGirl ? 2 : 0,
    };
    // console.log(body)
    const success = await createEvent(token, body);
    if (success) {
      navigation.navigate('Confirmation');
    }
  };
  const goToEditActivity = (screenName) => {
    console.log(route.params);
    navigation.navigate('ActivityModals', {
      screen: screenName,
      params: { ...route.params, lastScreenName: 'Inviting' },
    });
  };
  // console.log('ee', props.user.profileId);
  console.log('inv', route.params.relatedTo);
  if (keyboard.keyboardShown) {
    scrollRef.current.scrollTo({ x: 0, y: keyboard.keyboardHeight + hp(5), animated: true });
  }
  return (
    <ScrollView style={container} ref={scrollRef}>
      <Close onRightPress={() => setAlertShow(true)} />
      <View style={{ marginHorizontal: 20 }}>
        <CustomText style={{ color: colors.font }} variant="veryBigTitle">
          {getString('createActivity.Summary.title')}
        </CustomText>
      </View>
      {/* {console.log(route.params)} */}
      <SummaryItem
        editPress={() => goToEditActivity('GroupModal')}
        title={
          route.params.groupName !== getString('createActivity.Groups.Textone')
            ? route.params?.allGroups ? getString('createActivity.Groups.Textfourth') +
            route.params.groupName : route.params.groupArray.length +
              getString('createActivity.Summary.tagGrpSummery') +
              route.params.groupName
            : getString('createActivity.Groups.Textone')
        }
      />
      <SummaryItem
        editPress={() => goToEditActivity('AddActivityModal')}
        title={getString('createActivity.Summary.tagTitle') + route.params.title}
      />
      <SummaryItem
        editPress={() => goToEditActivity('WhenModal')}
        title={moment(route.params.startDataTime).format(`dddd DD MMMM [at] HH:mm`)}
      />
      <SummaryItem
        editPress={() => goToEditActivity('Where')}
        title={route.params.description || route.params.url || route.params.placeName || 'places'}
      />
      <SummaryItem
        editPress={() => goToEditActivity('HowManyModal')}
        title={
          (Number.MAX_SAFE_INTEGER !== route.params.participants
            ? getString('createActivity.Summary.tagMaxAttendieGender1') + route.params.participants
            : getString('createActivity.howManyAndOwnGender.inerText')) +
          getString('createActivity.Summary.tagMaxAttendieGender2') +
          (route.params.onlyGirl ? getString('createActivity.Summary.tagMaxAttendieGender3') : '')
        }
      />

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 18, color: colors.font }}>
          {getString('createActivity.Summary.labelFreeText')}
        </Text>
        <View style={comment}>
          <TextInput
            multiline={true}
            style={txtinput}
            onChangeText={(text) => setTextForInvitation(text)}
          />
        </View>
      </View>
      <View style={curveImageView}>
        <ImageBackground
          style={bgin}
          source={scheme === 'dark' ? bgBlack : bg}
          resizeMode={'contain'}
        >
          <CustomText variant="mediumRegular" maxFontSizeMultiplier={1.1} style={bgTxt}>
            {getString('createActivity.Summary.body1')}
          </CustomText>
          <CustomText variant="mediumRegular" maxFontSizeMultiplier={1.1} style={bgTxt2}>
            {getString('createActivity.Summary.body2')}
          </CustomText>
        </ImageBackground>
      </View>

      <View style={bottomview}>
        <CustomText
            
          onPress={() => Linking.openURL('https://joinme.social/vilkar/')}
          style={LinkTxt}
        >
          {getString('createActivity.Summary.linkText')}
        </CustomText>
        <View style={buttonContainer}>
          <ButtonApp
            buttonTitle={getString('createActivity.Summary.btnSave')}
            onPress={
              () => createEventHandler()
              //  ()=> navigation.navigate('Confirmation')
            }
            // onPress={() => navigation.navigate('Confirmation')}

            btnBackground={colors.btnBackground}
          />
        </View>
      </View>

      <CancelAlert
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        navigation={navigation}
      />
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
      fontSize: 20,
      paddingHorizontal: 10,
      textAlignVertical: 'top',
      // text
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
      // color:'black'
    },
    comment: {
      borderColor: colors.font,
      borderWidth: 1,
      margin: 5,
    },
    bgin: {
      height: Platform.isPad ? hp(40) : hp(30),
      width: Platform.isPad ? wp(80) : wp(70),
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
    bgTxt: {
      width: Platform.isPad ? wp(38) : wp(48),
      marginTop: Platform.isPad ? hp(3) : hp(4.5),
      marginBottom: Platform.isPad ? hp(1) : hp(0),
      fontWeight: '500',
      color: colors.font,
      marginLeft: Platform.isPad ? -wp(10) : wp(2.5),
      alignSelf: Platform.isPad ? 'center' : undefined,
    },
    bgTxt2: {
      width: Platform.isPad ? wp(44) : wp(57),
      // paddingTop: Platform.isPad ? 0:  hp(5),
      marginBottom: Platform.isPad ? hp(15) : hp(0),
      fontWeight: '500',
      color: colors.font,
      marginLeft: Platform.isPad ? -wp(4) : wp(2.5),
      alignSelf: Platform.isPad ? 'center' : undefined,
    },
    bottomview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: wp(2),
    },
    LinkTxt: { padding: wp(10), fontSize: 18, color: colors.font, textDecorationLine: 'underline' },
    modelContainer: {
      height: hp(20),
      marginHorizontal: 1,
      width: wp(80),
      alignSelf: 'center',
      elevation: 3,
      borderRadius: 10,
      backgroundColor: colors.photoRing,
    },
    modelcontainer2: { flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center' },
    modelbtnview: {
      flexDirection: 'row',
      borderTopColor: colors.font,
      borderTopWidth: 1,
    },
    modelbtn1: {
      borderRightColor: colors.font,
      borderRightWidth: 1,
      height: hp(6),
      width: wp(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    modelbtn2: {
      //backgroundColor:'red',
      height: hp(6),
      width: wp(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    modeltitle: {
      fontSize: 21,
      fontWeight: '600',
      color: colors.font,
    },
    modelbody: {
      fontSize: 16,
      alignSelf: 'center',
      //fontWeight:"600",
      color: colors.font,
    },
    modelbtntxt: {
      fontSize: 16,
      alignSelf: 'center',
      //fontWeight:"600",
      color: colors.font,
      fontWeight: 'bold',
    },
  });

Inviting.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.user.pending,
  error: state.user.error,
  user: state.user.user,
});

export default connect(mapStateToProps, { createEvent })(Inviting);
