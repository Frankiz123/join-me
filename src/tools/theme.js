import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const spacing = {
  v: {
    xxs: hp(0.025),
    xs: hp(0.5),
    s: hp(1),
    m: hp(2),
    l: hp(4),
    xl: hp(8),
  },
  h: {
    xxs: wp(0.025),
    xs: wp(0.5),
    s: wp(1),
    m: wp(2),
    l: wp(4),
    xl: wp(8),
  },
  r: {
    xxs: RFValue(2),
    xs: RFValue(4),
    s: RFValue(8),
    m: RFValue(16),
    l: RFValue(24),
    xl: RFValue(40),
  },
};
