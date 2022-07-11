import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import CustomText from '../../components/UI/CustomText';
import {
  getAllComments,
  deletedComments,
  reportComment,
} from '../../redux/actions/activityActions';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import { addAttendiee, removeAttendiee } from '../../redux/actions/activityActions';
import BottomModel from '../../components/UI/BottomModel';
import { AccessAlert } from '../../components/UI/AccessAlert';
import { RoundedTextIcon } from '../../components';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const Comments = (props) => {
  const {
    token,
    route,
    getAllComments,
    listComments,
    addAttendiee,
    removeAttendiee,
    deletedComments,
    reportComment,
  } = props;
  const { colors } = useTheme();
  const [mymodel, setmymodel] = useState(false);
  const [idComment, setIdComment] = useState(null);
  const [contentComment, getContentComment] = useState('');
  const [attendie, setAttedndie] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow2, setAlertShow2] = useState(false);
  const [owner, setOwner] = useState(false);
  const notshow = () => {
    setmymodel(true);
  };

  useEffect(() => {
    getAllCommentsHandler();
    setAttedndie(route?.params?.attendiee);
  }, []);

  const getAllCommentsHandler = async () => {
    console.log('tokenea', route.params?.eventId);
    getAllComments(token, route.params?.eventId);
    //getGroupsForUser(token,route.params?.groupId);
  };

  const joinToEventHandler = () => {
    addAttendiee({ token, eventId: route.params?.eventId });
    setAttedndie(true);
  };
  const removeCommentHandler = () => {
    deletedComments(token, idComment, route.params?.eventId);
  };
  const reportCommentHandler = () => {
    reportComment(token, idComment, route.params?.eventId);
    setAlertShow(false);
    setTimeout(() => setAlertShow2(true), 600);
  };
  const leaveEventHandler = () => {
    removeAttendiee({ token, eventId: route.params?.eventId });
    setAttedndie(false);
  };

  const { navigation } = props;
  const RenderListItem = ({ item }) => {
    console.log(props.user.profileId)
    return (
      <View style={viewListItem}>
        <View>
          <View style={viewListBox}>
            {item.item.status === 3 ? (
              <CustomText variant="bodyMediumItalic">{getString('oneActivity.Comments.removed')}</CustomText>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  width: wp('90%'),
                }}
              >
                <CustomText variant="small" style={textName}>
                  {item.item.commentText}
                </CustomText>

                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    width: wp(8),
                  }}
                  onPress={() => {
                    setIdComment(item.item.id);
                    getContentComment(item.item.commentText);
                    setmymodel(true);
                    setOwner(item.item.userId === props.user.profileId);
                  }}
                >
                  <Icon
                    name="more-vert"
                    size={Platform.isPad ? 30 : 22}
                    type="material"
                    color={colors.font}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={bubble}></View>
        </View>
        <View style={{ ...viewListBox22 }}>
          {console.log(item.item)}
          {item.item.avatar !== '' && item.item.avatar !== null ? (<Image
                          source={{ uri: item.item.avatar }}
                          height={Platform.isPad ? hp('6') : 40}
                          style={{
                            height: Platform.isPad ? hp('6') : 40,
                            width: Platform.isPad ? hp('6') : 40,
                            top: Platform.isPad ? hp(0.2) : hp(1),
                            padding: Platform.isPad ? wp(3) : wp(1),
                            left: 0,
                            position: 'relative',
                            resizeMode: 'contain',
                            borderRadius: 300,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor:'#000'
                          }}
                          width={ Platform.isPad ? hp('6') : 40}
                        />
          ) : (
            <RoundedTextIcon
              style={{
                height: Platform.isPad ? hp('6') : 40,
                width: Platform.isPad ? hp('6') : 40,
                top: Platform.isPad ? hp(0.2) : hp(1),
                padding: Platform.isPad ? wp(2.2) : wp(1),
                left: 0,
                position: 'relative',
                alignItems:'center'
              }}
              itemImg={item.item.logoImg}
            >
              <CustomText
                variant="small"
                style={{
                  ...textName,
                  fontWeight: 'bold',
                  fontSize: Platform.isPad ? 20 : 12,
                  right: Platform.isPad ? wp(1.4) : wp(2),
                  bottom: hp(0.2),
                  textAlign: 'center',
                  selfAlign: 'center',
                  paddingTop: Platform.OS == 'ios' ? 5 : 0,
                }}
              >
                {item.item.userInitials}
              </CustomText>
            </RoundedTextIcon>
          )}

          <View
            style={{
              flexDirection: 'row',
              width: wp(100),
              left: wp(-1),
              bottom: hp(0.5),
            }}
          >
            <View style={{ width: wp(0), backgroundColor: 'red' }}>
              <CustomText
                variant="small"
                style={{
                  ...textName,
                  left: wp(0),
                  fontSize: Platform.isPad ? 21 : 12,
                  fontWeight: 'bold',
                }}
              >
                {item.item.name}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const {
    container,
    commentText,
    bubble,
    viewBottom,
    viewListBox,
    viewListBox22,
    viewListItem,
    textName,
    imgProfile,
    buttonContainer,
    headerContainer,
  } = styles(colors);
  console.log('para', route.params);
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
          {route.params?.title}
        </CustomText>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          width: wp('19%'),
          top: hp('22%'),
          left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('86%') : wp(80)) : wp(80),
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={() =>
          navigation.navigate('CreateComment', {
            eventId: route.params?.eventId,
            title: route.params?.title,
          })
        }
      >
        <Icon
          color={colors.balckWhite}
          size={Platform.OS === 'ios' ? (Platform.isPad === true ? wp('7%') : wp('9%')) : wp(9.5)}
          reverseColor={colors.reverseBg}
          name="create"
          type="material"
          reverse={true}
        />
      </TouchableOpacity>

      <View style={viewBottom}>
        <ScrollView>
          <CustomText variant="small" style={commentText}>
            {listComments?.length}
            {getString('oneActivity.Comments.nrOfComments')}
          </CustomText>

          <FlatList
            data={listComments}
            renderItem={(item) => {
              return <RenderListItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
      <AccessAlert
        title={getString('oneActivity.Comments.reasonTextSuccess')}
        btn1Text={getString('oneActivity.Comments.btnOK')}
        visible={alertShow2}
        setVisible={(val) => setAlertShow2(val)}
        allowHandler={() => setAlertShow2(false)}
      />
      <AccessAlert
        title={getString('oneActivity.Comments.reasonText')}
        btn1Text={getString('logOn.location.yes')}
        btn2Text={getString('logOn.location.no')}
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        allowHandler={() => reportCommentHandler()}
      />
      <BottomModel
        onRequestClose={() => setmymodel(false)}
        isVisible={mymodel}
        onPressVisible={() => setmymodel(false)}
        onPressItem1={() => {
          setmymodel(false);
          setTimeout(() => setAlertShow(true), 800);
        }}
        onPressItem2={() => {
          navigation.navigate('CreateComment', {
            eventId: route.params?.eventId,
            update: true,
            idComment,
            contentComment,
            title: route.params?.title,
          });
          setmymodel(false);
        }}
        onPressItem3={() => {
          removeCommentHandler();
          setmymodel(false);
        }}
        iconName={'arrow-right'}
        iconType={'material-community'}
        title1={getString('oneActivity.Comments.linkTextRepport')}
        title2={owner ? getString('oneActivity.Comments.linkTextEditComment') : undefined}
        title3={owner ? getString('oneActivity.Comments.linkTextDeleteComment') : undefined}
        icon1
        icon2
        icon3
      />
      <View style={buttonContainer}>
        <ButtonApp
          buttonTitle={
            attendie
              ? getString('createActivity.detail.goingbtn')
              : getString('oneActivity.Comments.btnJoinEvent')
          }
          onPress={() => {
            if (attendie) {
              leaveEventHandler();
            } else {
              joinToEventHandler();
            }
          }}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
};
Comments.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  listComments: state.activity.listComments,
  user: state.user.user,
});
const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    viewListItem: {
      margin: hp('0.5%'),
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
      marginBottom: hp(1.5),
      top: hp(-2),
    },
    imgProfile: {
      height: hp('5%'),
      width: hp('5%'),
      //  borderWidth: 1,
      borderRadius: hp('5%'),
      marginBottom: hp('1%'),
      marginLeft: wp(1),
    },
    textName: {
      justifyContent: 'center',
      textAlignVertical: 'center',
      width: wp(75),
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
  addAttendiee,
  removeAttendiee,
  reportComment,
})(Comments);
