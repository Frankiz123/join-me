import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import CustomText from '../../components/UI/CustomText';
import { getAllComments, addComments, deletedComments } from '../../redux/actions/activityActions';
//import { getUserGroupsOfOrg } from '../../redux/actions/organisationActions';
import { getGroupsForUser, saveGroupsToProfile } from '../../redux/actions/groupActions';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import SummaryItem from '../../components/UI/SummaryItem';
import Modal from 'react-native-modal';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const groupMembers = [
  {
    userInitials: 'string',
    name: 'Anfa',
    commentText: 'text and text',
    isAvatar: 'true',
    commentDateTime: '2021-04-01T07:23:10.707Z',
    url:
      'https://bestprofilepix.com/wp-content/uploads/2014/03/cute-stylish-winter-girls-facebook-profile-pictures.jpg',
  },
  {
    userInitials: 'string',
    name: 'Hanna',
    commentText: 'textis text',
    isAvatar: 'true',
    commentDateTime: '2021-04-01T07:23:10.707Z',
    url:
      'https://bestprofilepix.com/wp-content/uploads/2014/08/cute-girl-play-with-hairs-facebook-dispaly-picture.jpg',
  },
  {
    userInitials: 'string',
    name: 'Developer Mia',
    commentText: 'text text',
    isAvatar: 'true',
    commentDateTime: '2021-04-01T07:23:10.707Z',
    url:
      'https://bestprofilepix.com/wp-content/uploads/2014/08/cute-girl-in-uniform-facebook-DPs.jpg',
  },
];

const UpdateComments = (props) => {
  const {
    token,
    route,
    getAllComments,
    addComments,
    deletedComments,
    deleteComments,
    listComments,
    getGroupsForUser,
    groupsForUserList,
  } = props;
  const { colors } = useTheme();
  const [mymodel, setmymodel] = useState(false);
  const notshow = () => {
    setmymodel(true);
  };

  const comments = {
    eventId: [],
  };

  useEffect(() => {
    getAllCommentsHandler();
  }, []);

  const getAllCommentsHandler = async () => {
    console.log({ token });
    getAllComments(token, route.params?.eventId);
    //getGroupsForUser(token,route.params?.groupId);
    // addComments(token, route.params?.eventId);
    console.log('myevent data is', getAllComments);
  };

  const goToEditComment = (screenName) => {
    var param;
    if (route.params === undefined) {
      param = form;
    } else {
      param = route.params;
    }
    console.log(param.freeText);

    console.log(route.params);
    navigation.navigate('ActivityModals', {
      screen: screenName,
      params: { ...route.params, lastScreenName: 'Comments' },
    });
  };

  const addCommentHandler = async () => {
    const success = await addComments(token, route.params.eventId);
    success && navigation.goBack();
  };
  const deletedCommentHandler = async () => {
    const success = await deletedComments(token, route.params.eventId);
    success && navigation.goBack();
  };
  const updateCommentHandler = async () => {
    const success = await updateEvent(token, form, route.params.eventId);
    if (success) {
      navigation.navigate('Confirmation', { eventId: route.params.eventId, update: true });
    }
  };

  const { navigation } = props;
  const RenderListItem = ({ item }) => {
    return (
      <View style={viewListItem}>
        <View>
          <View style={viewListBox}>
            <CustomText variant="small" style={textName}>
              {item.item.commentText}
            </CustomText>

            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                width: wp('20%'),
                margin: hp('5%'),
                marginTop: hp('0.03%'),

                //top: hp('1%'),
                //  left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('86%') : wp(80)) : wp(80),
              }}
              //  onPress={() => navigation.navigate('Comments')}
            >
              <Icon
                onPress={() => setmymodel(true)}
                name="more-vert"
                size={17}
                type="material"
                color={colors.font}
              />
            </TouchableOpacity>
          </View>
          <View style={bubble}></View>
        </View>
        <View style={viewListBox22}>
          <Image
            style={imgProfile}
            source={
              item.item.logoImg !== null
                ? {
                    uri: item.item.url,
                  }
                : require('./../../assets/images/myprofilegroup.png')
            }
          />
          <CustomText variant="small" style={textName}>
            {item.item.name}
          </CustomText>
        </View>
      </View>
    );
  };

  const {
    container,
    commentText,
    modelContainer,
    modelbody,
    modelbtntxt,
    slide,
    triangle,
    bubble,
    viewBottom,
    viewListBox,
    viewListBox22,
    viewListItem,
    textName,
    imgProfile,
    buttonContainer,
    header,
    headerText,
    button,
    btnText,
  } = styles(colors);
  return (
    <View style={container}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          width: wp('19%'),
          top: hp('22%'),
          left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('86%') : wp(80)) : wp(80),
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={() => navigation.navigate('CreateComment')}
      >
        <Icon
          color={'#000000'}
          size={Platform.OS === 'ios' ? (Platform.isPad === true ? wp('7%') : wp('9%')) : wp(9.5)}
          reverseColor={'white'}
          name="create"
          type="material"
          reverse={true}
        />
      </TouchableOpacity>

      <View style={header}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-left"
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          size={30}
          type="material-community"
          color={colors.font}
        />
        <CustomText variant="bold" style={headerText}>
          {' '}
          Football på sletta
        </CustomText>
      </View>

      <View style={viewBottom}>
        <ScrollView>
          <CustomText variant="small" style={commentText}>
            {groupMembers.length}
            {getString('oneActivity.Comments.nrOfComments')}
          </CustomText>

          <FlatList
            data={groupMembers}
            renderItem={(item) => {
              return <RenderListItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>

      <View style={buttonContainer}>
        <ButtonApp
          buttonTitle={getString('oneActivity.Comments.btnJoinEvent')}
          onPress={() => navigation.navigate('Update')}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
};
UpdateComments.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  listComments: state.activity.listComments,
  deleteComments: state.activity.deleteComments,
  addComments: state.activity.addComments,
  user: state.user.user,
});
const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    viewListItem: {
      //  flexDirection: 'row',
      // borderWidth: 1,
      //  borderRadius: hp('2%'),
      margin: hp('0.5%'),
    },
    viewListBox: {
      flexDirection: 'row',
      width: wp('90%'),
      borderRadius: hp('1%'),
      padding: wp(2),
      backgroundColor: colors.greyBackground,
      margin: hp('0%'),
    },

    bubble: {
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 10,
      borderRightWidth: 20,
      borderTopWidth: 30,
      // borderBottomWidth: 40,
      // borderRightWidth: hp('15%'),
      //  borderTopWidth: hp('10%'),
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: colors.greyBackground,
      //  borderBottomColor: colors.greyBackground,
      alignSelf: 'flex-start',
      bottom: height * 0.01,
      //  right: width * 0.01,
      left: width * 0.07,
    },

    viewListBox22: {
      flexDirection: 'row',
      //  borderWidth: 1,
      // borderRadius: hp('2%'),
      marginTop: hp('-1%'),
    },
    imgProfile: {
      height: hp('5%'),
      width: hp('5%'),
      //  borderWidth: 1,
      borderRadius: hp('5%'),
      marginBottom: hp('1%'),
    },
    textName: {
      justifyContent: 'center',
      textAlignVertical: 'center',
      width: wp('60%'),
      padding: Platform.OS == 'ios' ? 12 : 0,
      paddingLeft: hp('2%'),
      // backgroundColor:'green',
    },
    viewBottom: {
      flex: 1,
      marginHorizontal: hp('2%'),
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
    slide: {
      alignSelf: 'center',
      backgroundColor: colors.greyBackground,
      width: 60,
      height: 7,
      borderRadius: 20,
      marginTop: 10,
    },
    modelContainer: {
      height: hp(33),
      width: wp(100),
      marginLeft: wp(-5),
      marginBottom: hp(-2),
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: colors.secondBackground,
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
      padding: 20,
      marginTop: 20,
      borderTopWidth: 0.5,
      borderColor: colors.greyBackground,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      borderRadius: hp('10%'),
      backgroundColor: colors.black,
      height: hp('6%'),
      width: hp('20%'),
      justifyContent: 'center',
    },
    btnText: {
      alignSelf: 'center',
      color: colors.white,
    },
    headerText: {
      alignItems: 'center',
      margin: wp('3%'),
    },
    commentText: {
      alignItems: 'center',
      marginTop: wp('7%'),
      margin: wp('3%'),
    },
  });
export default connect(mapStateToProps, {
  getAllComments,
  deletedComments,
  addComments,
})(UpdateComments);
