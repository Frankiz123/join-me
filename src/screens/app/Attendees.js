import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import { getString } from '../../tools/StringHelper';
import {
  getAttendies,
  addAttendiee,
  getActivityDetail,
  removeAttendiee,
} from '../../redux/actions/activityActions';
import { ActivityLoader } from '@components';
import ButtonApp from '../../components/UI/ButtonApp';
import { useDispatch, useSelector } from 'react-redux';
import { RoundedTextIcon } from '../../components';
const Attendees = (props) => {
  const { colors } = useTheme();
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const { createdBy, eventId, eventTitle } = route.params;
  const token = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.user.user);

  const [attendiesData, setAttendiesData] = useState({ isLoading: true });
  const { viewListItem, imgProfile, textName } = styles(colors);

  useEffect(() => {
    dispatch(getAttendies({ token, eventId })).then((res) => {
      if (res.status === 200) {
        setAttendiesData({
          ...attendiesData,
          isLoading: false,
          data: res.data,
          status: res.status,
        });
        console.log('response in attendies', attendiesData);
      } else {
        setAttendiesData({
          ...attendiesData,
          isLoading: false,
          data: null,
          status: res.status,
        });
      }
    });
  }, []);
  const joinEvent = () => {
    setAttendiesData({
      ...attendiesData,
      isLoading: true,
    });
    dispatch(addAttendiee({ token, eventId })).then((res) => {
      if (res.status === 200) {
        setAttendiesData({
          ...attendiesData,
          isLoading: false,
          data: res.data,
          status: res.status,
        });
        dispatch(getActivityDetail({ token, eventId }));
      }
    });
  };
  const notGoing = () => {
    setAttendiesData({
      ...attendiesData,
      isLoading: true,
    });
    dispatch(removeAttendiee({ token, eventId }))
      .then((res) => {
        if (res.status === 200) {
          setAttendiesData({
            ...attendiesData,
            isLoading: false,
            data: res.data,
            status: res.status,
          });
          dispatch(getActivityDetail({ token, eventId }));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  const ifAttending = () => {
    if (attendiesData.data) {
      const isExist = attendiesData.data.attendiees.filter(
        (elem) => elem.profileId === userProfile.profileId,
      );
      if (isExist.length > 0) {
        return true;
      }
      return false;
    }
  };
  const RenderListItem = ({ item }) => {
    console.log('item is', item);
    return (
      <View style={viewListItem}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            width: wp(100),
          }}
        >
          {item?.item?.icon === '' ||
          item?.item?.icon === undefined ||
          item?.item?.icon === null ? (
            <>
              <View
                style={{
                  ...imgProfile,
                  backgroundColor: colors.calenderbtnBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RoundedTextIcon>{item.item.userInitials}</RoundedTextIcon>
                <CustomText
                  variant="small"
                  style={{
                    ...textName,
                    fontWeight: 'bold',
                    fontSize: Platform.isPad ? 20 : 12,
                    right: Platform.isPad ? wp(1.1) : wp(2),
                    bottom: hp(0.2),
                    textAlign: 'center',
                    selfAlign: 'center',
                    paddingTop: Platform.OS == 'ios' ? 5 : 0,
                  }}
                >
                  {item.item.userInitials}
                </CustomText>
              </View>

              <CustomText variant="small" style={textName}>
                {item.item.firstName} {item.item.lastName}
              </CustomText>
            </>
          ) : (
            <>
              <Image
                style={imgProfile}
                source={
                  item.item.icon
                    ? {
                        uri: item.item.icon,
                      }
                    : require('./../../assets/images/myprofilegroup.png')
                }
              />
              <CustomText variant="small" style={textName}>
                {item.item.firstName} {item.item.lastName}
              </CustomText>
            </>
          )}
        </View>
      </View>
    );
  };

  const {
    container,
    viewBottom,
    bottomContainer,
    header,
    headerText,
    button,
    btnText,
    buttonContainer,
    headerContainer,
  } = styles(colors);
  return (
    <View style={container}>
      <View style={headerContainer}>
        <TouchableOpacity
          style={{ marginLeft: Platform.isPad ? wp(4.5) : wp(4) }}
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={Platform.OS === 'ios' ? (Platform.isPad === true ? wp(3.5) : wp(6)) : wp(6)}
            type="material-community"
            color={colors.font}
          />
        </TouchableOpacity>
        <CustomText variant="boldS" style={{ marginLeft: wp(1), width: wp(90) }}>
          {eventTitle}
        </CustomText>
      </View>

      <View style={viewBottom}>
        {attendiesData.isLoading ? (
          <ActivityLoader size={'small'} />
        ) : (
          <FlatList
            data={attendiesData.data.attendiees}
            renderItem={(item) => {
              return <RenderListItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      {userProfile.profileId !== createdBy && (
        <View style={buttonContainer}>
          <ButtonApp
            buttonTitle={
              !attendiesData.isLoading && !ifAttending()
                ? getString('oneActivity.Comments.btnJoinEvent')
                : getString('createActivity.detail.goingbtn')
            }
            onPress={ifAttending() ? notGoing : joinEvent}
            btnBackground={colors.btnBackground}
          />
        </View>
      )}
    </View>
  );
};
Attendees.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.organisation.pending,
  groupDetails: state.group.groupDetails,
  user: state.user.user,
});
const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    viewListItem: {
      flexDirection: 'row',
      borderBottomWidth: 0.3,
      borderBottomColor: colors.lightGrey,
    },
    headerContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(100),
      height: Platform.OS === 'android' ? hp(9) : DeviceInfo.hasNotch() ? hp(11) : hp(10),
      paddingTop: Platform.OS === 'android' ? 0 : DeviceInfo.hasNotch() ? hp(3) : hp(2),
    },
    imgProfile: {
      height: hp('6.9%'),
      width: hp('6.9%'),
      borderWidth: 1,
      borderRadius: hp('5%'),
      marginVertical: hp('2%'),
    },
    textName: {
      // justifyContent: 'center',
      // textAlignVertical: 'center',
      paddingTop: Platform.OS == 'ios' ? 32 : 0,
      paddingLeft: hp('2%'),
      bottom: hp(2.2),
      // backgroundColor:'green',
    },
    viewBottom: {
      flex: 2,
      marginHorizontal: hp('5%'),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20, //   alignSelf: 'flex-end',
      backgroundColor: colors.reverseBg,
      shadowColor: '#c1c1c1',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      shadowOpacity: 5.0,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: hp(12),
      width: wp(100),
    },
    bottomContainer: {
      flex: 0.5,
      // shadowOpacity: 1,
      borderWidth: 0.3,
      borderColor: colors.lightGrey,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      height: Platform.OS == 'ios' ? (DeviceInfo.hasNotch() ? 90 : 70) : 70,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp(5),
      marginTop: hp('3%'),
      borderBottomWidth: 0.3,
      borderBottomColor: colors.lightGrey,
    },
    button: {
      borderRadius: hp('10%'),
      backgroundColor: colors.black,
      padding: 15,
      paddingHorizontal: 20,
      // height: hp('6%'),
      // width: hp('20%'),
      justifyContent: 'center',
    },
    btnText: {
      alignSelf: 'center',
      color: colors.white,
    },
  });
export default connect(mapStateToProps)(Attendees);
