import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
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
import ButtonApp from '../../components/UI/ButtonApp';
import { useKeyboard } from '@react-native-community/hooks';

import {
  addComments,
  updateComment,
} from '../../redux/actions/activityActions';

const CreateComment = (props) => {
  const { colors } = useTheme();
  const [mymodel, setmymodel] = useState(false);
  const keyboard = useKeyboard();
  const scrollView = useRef(null);
  const { width, height } = Dimensions.get('window');

  const [textForInvitation, setTextForInvitation] = useState('');

  const { navigation, addComments, updateComment, token, route } = props;
  useEffect(() => {
    console.log(route);
    if (route.params?.contentComment) {
      setTextForInvitation(route.params?.contentComment);
    }
  }, []);
  const addCommentHandler = async () => {
    const body = { text: textForInvitation };
    const success = addComments(token, route.params?.eventId, body);
    success && navigation.goBack();
  };
  const updateCommentHandler = async () => {
    const body = { text: textForInvitation };
    const success = await updateComment(
      token,
      route.params?.idComment,
      route.params?.eventId,
      body
    );
    success && navigation.goBack();
  };
  if (keyboard.keyboardShown) {
    console.log('scrol');
    scrollView.current !== null &&
      scrollView.current.scrollTo({
        x: 0,
        y: keyboard.keyboardHeight + hp(5),
        animated: true,
      });
  } else {
    scrollView.current !== null &&
      scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }
  const {
    container,
    txtinput,
    comment,
    viewBottom,
    buttonContainer,
    header,
    headerText,
    button,
    btnText,
    headerContainer,
  } = styles(colors);
  return (
    // <View style={container}>
    <ScrollView
      style={container}
      scrollEnabled={keyboard.keyboardShown}
      contentContainerStyle={{ flexGrow: 1 }}
      ref={scrollView}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: '100%',
          height: keyboard.keyboardShown
            ? height - keyboard.keyboardHeight
            : height,
          // flexGrow: 1,
         
        }}>
        <View style={headerContainer}>
          <TouchableOpacity
            style={{ marginLeft: Platform.isPad ? wp(4.5) : wp(4) }}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={
                Platform.OS === 'ios'
                  ? Platform.isPad === true
                    ? wp(3.5)
                    : wp(6)
                  : wp(6)
              }
              type="material-community"
              color={colors.font}
            />
          </TouchableOpacity>
          <CustomText
            variant="boldS"
            style={{ marginLeft: wp(1), width: wp(90) }}>
            {route.params?.title}
          </CustomText>
        </View>

        <View style={viewBottom}>
          <View style={comment}>
            <TextInput
              multiline={true}
              onChangeText={(text) => setTextForInvitation(text)}
              value={textForInvitation}
              keyboardType={'default'}
              style={txtinput}
            />
          </View>
        </View>
        <View style={buttonContainer}>
          <ButtonApp
            buttonTitle={getString('oneActivity.Comments.btnPostComment')}
            //  onPress={() => navigation.navigate('Update')}
            onPress={() => {
              if (route.params?.update) {
                updateCommentHandler();
              } else {
                addCommentHandler();
              }
            }}
            btnBackground={colors.btnBackground}
          />
        </View>
      </View>
    </ScrollView>
    //   {!keyboard.keyboardShown && <View style={{ marginVertical: hp(0.5) }} />}
    // </View>
  );
};
CreateComment.propTypes = {
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
    comment: {
      borderColor: colors.font,
      borderBottomWidth: 1,
      margin: wp('5%'),
    },
    txtinput: {
      backgroundColor: colors.secondBackground,
      height: 'auto',
      color: colors.font,
      fontSize: 20,
      padding: 10,
      textAlignVertical: 'top',
      // text
    },
    headerContainer: {
      flexDirection: 'row',
      borderBottomWidth: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(100),
      height: Platform.OS === 'android'? hp(9): DeviceInfo.hasNotch() ? hp(11) : hp(10),
      paddingTop: Platform.OS === 'android' ? 0 : DeviceInfo.hasNotch() ? hp(3) : hp(2),
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
      marginBottom: Platform.OS === 'android' ? -hp(6.5) : 0,
    },

    header: {
      flexDirection: 'row',
      borderBottomWidth: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(100),
      height: DeviceInfo.hasNotch() ? hp(11) : hp(9),
      paddingTop: DeviceInfo.hasNotch() ? hp(2.5) : hp(1),
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
      margin: wp('2%'),
    },
  });
export default connect(mapStateToProps, { addComments, updateComment })(
  CreateComment
);
