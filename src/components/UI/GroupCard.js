import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getColors } from '../../colors';
import CustomText from './CustomText';
const { width, height } = Dimensions.get('window');
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBoxIcon } from '@components';
const GroupCard = ({
  title,
  subTitle,
  show,
  groupId,
  selectItem,
  selcted,
  arrow,
  arrowPress,
  details,
  navPress,
  countMembers,
  bgColor,
  border,
}) => {
  const [checked, setChecked] = React.useState(false);
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        ...styles.con,
        borderBottomWidth: border ? 1 : 0,
        backgroundColor: bgColor
          ? bgColor
          : details && !show
          ? colors.mediumGrey
          : selcted
          ? colors.yellow
          : colors.mediumGrey,
      }}
      onPress={() =>
        arrow ? arrowPress(groupId) : details && !show ? navPress(groupId) : selectItem(groupId)
      }
    >
      {show && (
        <View
          style={{
            marginLeft: Platform.isPad ? wp(5) :  '8.2%',
            height: '29%',
            justifyContent: 'center',
          }}
        >
          <CheckBoxIcon
            value={selcted}
            onValueChange={(val) => {
              selectItem(groupId);
            }}
          />
        </View>
      )}

      <View style={{ ...styles.detailsCon, paddingLeft: subTitle ? wp(2) : wp(3) }}>
        <CustomText variant="boldS" style={{ color: selcted ? '#000' : colors.font }}>
          {title}
        </CustomText>
        {subTitle && (
          <CustomText variant="verySmall" style={styles.subTitle}>
            {subTitle}
          </CustomText>
        )}
        {countMembers !== undefined && (
          <CustomText variant="verySmall" style={styles.subTitle}>
            {countMembers.toString()}
          </CustomText>
        )}
      </View>
      {arrow && (
        <Icon
          name="ios-arrow-forward"
          size={20}
          color={colors.font}
          onPress={() => arrowPress(groupId)}
          style={{ position: 'absolute', alignSelf: 'center', right: '7%' }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  con: {
    backgroundColor: getColors('light'),
    height: hp(10.65),
    width: wp(87),
    borderRadius: width * 0.06,
    borderBottomColor: '#D8D7D3',
    // paddingLeft: 5,
    alignItems: 'center',
    marginVertical: 6,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    height: 25,
  },
  detailsCon: { alignSelf: 'center' },
});
export default GroupCard;
