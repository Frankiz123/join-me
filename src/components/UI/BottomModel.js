import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomText } from '@components';
import { getString } from '../../tools/StringHelper';

const BottomModel = (props) => {
  const { colors } = useTheme();
  const {
    iconName,
    iconType,
    isVisible,
    onPressVisible,
    onPressItem1,
    onPressItem2,
    onPressItem3,
    onPressItem4,
    title1,
    title2,
    title3,
    title4,
    icon1,
    icon2,
    icon3,
    icon4,
    onRequestClose,
  } = props;
  const { modelbtntxt, modelbody, slide, modelContainer } = styles(colors);
  return (
    <View>
      <Modal isVisible={isVisible} style={{ justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={{
            height: title4 !== undefined ? hp(48) : title3 !== undefined ? hp(61) : hp(74),
            width: wp(100),
          }}
          onPress={() => onPressVisible(false)}
        />
        <View
          style={{
            ...modelContainer,
            height:
            title4 ? hp(52):
              title3 !== undefined
                ? hp(39)
                : title2 !== undefined
                ? hp(26)
                : hp(14),
          }}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            style={slide}
            onPress={() => onPressVisible(false)}
          />
          {title1 && (
            <TouchableOpacity
              onPress={() => {
                onPressItem1();
              }}
              style={[
                modelbody,
                {
                  marginTop:
                    title3 === undefined && title2 === undefined ? -hp(1.5) : 0,
                },
              ]}>
              <CustomText variant="bold" style={{ color: colors.font }}>
                {title1}
              </CustomText>
              {icon1 && (
                <Icon name={iconName} color={colors.font} type={iconType} />
              )}
            </TouchableOpacity>
          )}
          {title2 && (
            <TouchableOpacity
              onPress={() => {
                onPressItem2();
              }}
              style={modelbtntxt}>
              <CustomText variant="bold" style={{ color: colors.font }}>
                {title2}
              </CustomText>
              {icon2 && (
                <Icon name={iconName} color={colors.font} type={iconType} />
              )}
            </TouchableOpacity>
          )}

          {title3 && (
            <TouchableOpacity
              onPress={() => {
                onPressItem3();
              }}
              style={modelbtntxt}>
              <CustomText variant="bold" style={{ color: colors.font }}>
                {title3}
              </CustomText>
              {icon3 && (
                <Icon name={iconName} color={colors.font} type={iconType} />
              )}
            </TouchableOpacity>
          )}
          {title4 && (
            <TouchableOpacity
              onPress={() => {
                onPressItem4();
              }}
              style={modelbtntxt}>
              <CustomText variant="bold" style={{ color: colors.font }}>
                {title4}
              </CustomText>
              {icon4 && (
                <Icon name={iconName} color={colors.font} type={iconType} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
      marginTop: 20,
    },
    slide: {
      alignSelf: 'center',
      backgroundColor: colors.font,
      width: 40,
      height: hp(1),
      borderRadius: 20,
      marginVertical: 12,
    },
    modelContainer: {
      // height: hp(25),
      width: wp(100),
      marginLeft: wp(-5),
      marginBottom: Platform.isPad ? hp(-3.5) : hp(-2),
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,

      backgroundColor: colors.reverseBg,
    },

    modelbody: {
      paddingHorizontal: 30,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: hp(10),
      // backgroundColor: 'red',
    },

    modelbtntxt: {
      paddingHorizontal: 30,
      // paddingTop: 20,
      // marginTop: 20,
      borderTopWidth: 0.3,
      alignItems: 'center',
      borderColor: colors.mediumGrey,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: hp(13),
      // borderWidth:1
    },
  });

export default BottomModel;
