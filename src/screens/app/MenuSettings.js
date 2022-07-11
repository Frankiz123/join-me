import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import { CurveHeader, CheckBox, DateAndTimePicker } from '@components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { LeftAndRightHeader } from '../../components/UI/Header';
import bgimage from '../../assets/images/headerBackground.png';
import { Icon } from 'react-native-elements';
import Input from '../../components/UI/Input';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { getGroupsForUser } from '../../redux/actions/groupActions';
import OpenAppSettings from 'react-native-app-settings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GroupCard from '../../components/UI/GroupCard';
import AndroidOpenSettings from 'react-native-android-open-settings';
const Group = (props) => {
  const { colors } = useTheme();
  const { dropContainer, buttonContainer, container, borderBotom } = styles(colors);
  const { navigation, getGroupsForUser, route } = props;
  useEffect(() => {
    // getUser();
  }, []);

  return (
    <View style={container}>
      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => navigation.navigate('FindActivity')}
        title={getString('Menu.SettingScreen.header')}
      />

      <View style={{ alignItems: 'center' }}>
        <GroupCard
          title={getString('Menu.SettingScreen.notification')}
          groupId={''}
          details
          arrowPress={() => {
            OpenAppSettings.open();
          }}
          show={false}
          arrow
          bgColor={colors.secondBackground}
          border={true}
        />
        {/* <View style={borderBotom} /> */}
        <GroupCard
          title={getString('Menu.SettingScreen.Mode')}
          groupId={''}
          details
          arrowPress={() => {
            if (Platform.OS === 'ios') {
              Linking.openURL('App-prefs:root=DISPLAY');
            } else {
              AndroidOpenSettings.displaySettings();
              // Linking.openSettings();
            }
          }}
          show={false}
          arrow
          bgColor={colors.secondBackground}
          border={true}
        />
      </View>
    </View>
  );
};
Group.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.user.pending,
  error: state.user.error,
  user: state.user.user,
  phoneNumber: state.auth.phoneNumber,
});
const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
      marginVertical: 20,
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
      marginTop: 20,
    },
    tags: {
      // height: hp('4%'),
      backgroundColor: colors.greyBackground,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      borderRadius: 20,
    },
    tagtext: {
      padding: 10,
      fontSize: hp('2%'),
    },
    dropContainer: {
      marginTop: hp('2%'),
      padding: wp('5%'),
      marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.greyBackground,
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: hp(3),
    },
    borderBotom: {
      borderBottomColor: '#EAE8E2',
      borderBottomWidth: 3,

      width: '70%',

      // marginHorizontal: 40,
    },
  });
export default connect(mapStateToProps, { getGroupsForUser })(Group);
