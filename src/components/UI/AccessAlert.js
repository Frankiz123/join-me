import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import GroupBackground from '../../assets/images/groupsBackground';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import CustomText from './CustomText';
import { useColorScheme } from 'react-native-appearance';
import { getString } from '../../tools/StringHelper';
const { height } = Dimensions.get('window');

const AccessAlert = (props) => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const {
    visible,
    navigation,
    setVisible,
    btn1Text,
    btn2Text,
    allowHandler,
    title,
    body,
  } = props;
  const {
    modelbtntxt,
    modelbody,
    modeltitle,
    modelbtnview,
    modelbtn2,
    modelbtn1,
    modelcontainer2,
    modelContainer,
  } = styles(colors);
  return (
    <Modal
      deviceHeight={Platform.OS === 'android' ? height + hp(10) : height}
      transparent={true}
      isVisible={visible}>
      <View style={modelContainer}>
        <View style={modelcontainer2}>
          <CustomText variant="ml" style={modelbody}>
            {title}
          </CustomText>
          {body !== undefined && (
            <CustomText variant="s" style={modelbody}>
              {body}
            </CustomText>
          )}
        </View>
        <View style={modelbtnview}>
          {/* navigation.navigate('Where') */}
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              allowHandler();
            }}
            style={[
              modelbtn1,
              {
                width:
                  btn2Text === undefined
                    ? Platform.isPad
                      ? hp(44)
                      : wp(79)
                    : Platform.isPad
                    ? hp(22)
                    : wp(40),
                borderRightWidth: btn2Text === undefined ? 0 : 1,
              },
            ]}>
            <CustomText variant="m" style={modelbtntxt}>
              {btn1Text}
            </CustomText>
          </TouchableOpacity>
          {btn2Text && (
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={modelbtn2}>
              <CustomText variant="m" style={modelbtntxt}>
                {btn2Text}
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
      //   marginTop: hp("15%")
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
      margin: 5,
    },
    bgin: {
      height: 250,
      width: 300,
      padding: 25,
    },
    curveImageView: {
      width: wp(100),
      height: 300,
      alignItems: 'flex-end',
      justifyContent: 'center',
      // backgroundColor: 'red',
    },
    bgTxt: {
      //padding:30,
      width: wp(50),
      fontSize: hp(2),
      fontWeight: '500',
      color: colors.font,
      //backgroundColor:'red'
      marginVertical: 10,
    },
    bgTxt2: {
      //marginLeft:wp(8),
      width: wp(60),
      fontSize: hp(2),
      fontWeight: '500',
      color: colors.font,
    },
    bottomview: {
      flexDirection: 'row',
      // marginTop: hp(10),
      //backgroundColor:"red",
    },
    LinkTxt: { padding: wp(10), fontSize: 18, color: colors.font },
    modelContainer: {
      height: Platform.isPad ? hp(17) : hp(20),
      marginHorizontal: 1,
      width: Platform.isPad ? hp(44) : wp(80),
      alignSelf: 'center',
      elevation: 3,
      borderRadius: 10,
      backgroundColor: colors.photoRing,
    },
    modelcontainer2: {
      flex: 1,
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modelbtnview: {
      flexDirection: 'row',
      borderTopColor: colors.font,
      borderTopWidth: 1,
    },
    modelbtn1: {
      borderRightColor: colors.font,
      borderRightWidth: 1,
      height: hp(6),
      width: Platform.isPad ? hp(22) : wp(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    modelbtn2: {
      //backgroundColor:'red',
      height: hp(6),
      width: Platform.isPad ? hp(22) : wp(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    modeltitle: {
      fontSize: 21,
      fontWeight: '600',
      color: colors.font,
    },
    modelbody: {
      alignSelf: 'center',
      //fontWeight:"600",
      color: colors.font,
      textAlign: 'center',
    },
    modelbtntxt: {
      alignSelf: 'center',
      //fontWeight:"600",
      color: colors.font,
      fontWeight: 'bold',
    },
  });

export { AccessAlert };
