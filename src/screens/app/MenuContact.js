import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getString } from '../../tools/StringHelper';
import CustomText from '../../components/UI/CustomText';
import { useTheme } from '@react-navigation/native';
import { CurveHeader } from '../../components/UI/curveHeader';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

const MenuContact = ({ navigation }) => {
  const contactItems = [
    {
      body: getString('Menu.MenuContact.body'),
      mail: getString('Menu.MenuContact.mail'),
    },
  ];
  const { colors } = useTheme();

  const { bodyText, bodyVisetterText, mailHeadingText, mailText } = styles(colors);
  const renderItem = ({ item }) => {
    const { body, mail } = item;
    return (
      <View>
        <View>
          <CustomText variant="bodyL" style={[bodyText, bodyVisetterText]}>
            {body}
          </CustomText>
          <CustomText variant="bodyL" style={[bodyText, mailHeadingText]}>
            {mail}
          </CustomText>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:hello@joinme.social')}>
            <CustomText variant="underlineBigBold" style={[bodyText]}>
              hello@joinme.social
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onPressGoBack = () => navigation.goBack();
  const onPressGoClose = () => navigation.navigate('FindActivity');
  const { container, commonFlex, headerText } = styles(colors);
  return (
    <View style={container}>
      <ScrollView>
        <View style={commonFlex}>
          <CurveHeader
            leftIcon={'arrow-left'}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            rightIcon={'cross'}
            onLeftPress={() => navigation.goBack()}
            onRightPress={() => navigation.goBack()}
            title={getString('Menu.MenuContact.title')}
          />
        </View>
        <View style={commonFlex}>
          <FlatList
            scrollEnabled={true}
            data={contactItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    commonFlex: {
      flex: 1,
    },
    headerText: {
      padding: hp(4),
      position: 'absolute',
      top: hp(8),
    },
    imageBackground: {
      width: wp('100%'),
      height: hp('45%'),
    },
    titleText: {
      marginLeft: hp('3%'),
    },
    bodyText: {
      marginLeft: hp('3%'),
    },
    bodyVisetterText: { paddingRight: hp('5%') },
    mailHeadingText: { paddingVertical: hp('5%') },
  });

export default MenuContact;
