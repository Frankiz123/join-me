import React from 'react';
import {
  View,
  Dimensions,
  Linking,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getString } from '../../tools/StringHelper';
import CustomText from '../../components/UI/CustomText';
import { useTheme } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { CurveHeader } from '../../components/UI/curveHeader';
const { width, height } = Dimensions.get('window');

const AboutMe = ({ navigation }) => {
  const aboutMeItems = [
    {
      id: '1',
      title: getString('Menu.MenuAbout.local.title'),
      body: getString('Menu.MenuAbout.local.body'),
    },
    // {
    //   id: '2',
    //   title: getString('Menu.MenuAbout.pro.title'),
    //   body: getString('Menu.MenuAbout.pro.body'),
    // },
    {
      id: '3',
      title: '',
      body: getString('Menu.MenuAbout.body'),
    },
  ];
  const { colors } = useTheme();

  const renderItem = ({ item }) => {
    const { title, body, id } = item;

    return (
      <View>
        <CustomText
          variant="bodyLbold"
          style={id == 2 ? headingSecondText : headingTopText}>
          {title}
        </CustomText>
        <View>
          <CustomText variant="bodyL" style={bodyText}>
            {body}
          </CustomText>
        </View>
      </View>
    );
  };

  const onPressGoBack = () => navigation.goBack();
  const onPressGoClose = () => navigation.navigate('FindActivity');

  const {
    headingSecondText,
    headingTopText,
    bodyText,
    container,
    commonFlex,
    headerText,
    versionText,
  } = styles(colors);
  return (
    <View style={container}>
      <ScrollView>
        <View style={commonFlex}>
          <CurveHeader
            leftIcon={'arrow-left'}
            rightIcon={'cross'}
            onLeftPress={onPressGoBack}
            onRightPress={onPressGoClose}
            title={getString('Menu.MenuAbout.title')}
          />
        </View>
        <View style={commonFlex}>
          <FlatList
            scrollEnabled={true}
            data={aboutMeItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: hp(2) }}
          />
          <CustomText variant="bodyL" style={{ ...bodyText }}>
            {getString('Menu.MenuAbout.org')}
          </CustomText>
          <CustomText
            variant="bodyL"
            style={{ ...bodyText, marginBottom: hp(2) }}>
            925145196
          </CustomText>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:hello@joinme.social')}>
            <CustomText variant="underlineBig" style={bodyText}>
              hello@joinme.social
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: hp(0.7), marginBottom: hp(2) }}
            onPress={() => Linking.openURL('https://joinme.social')}>
            <CustomText variant="underlineBig" style={bodyText}>
              www.joinme.social
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://joinme.social/vilkar/')}>
            <CustomText variant="bodyL" style={versionText}>
              {getString('Menu.MenuAbout.Condtion')}
              <CustomText variant="underlineBig" style={versionText}>
                {getString('Menu.MenuAbout.Condtion2')}
              </CustomText>
              {getString('Menu.MenuAbout.Condtion3')}
            </CustomText>
          </TouchableOpacity>

          <CustomText variant="bodyL" style={versionText}>
            {getString('Menu.MenuAbout.appVersion') +
              ' : ' +
              DeviceInfo.getVersion()}
          </CustomText>

          <CustomText variant="bodyL" style={versionText}>
            {getString('Menu.MenuAbout.buildVersion') +
              ' : ' +
              DeviceInfo.getBuildNumber()}
          </CustomText>
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
    headingSecondText: {
      paddingTop: hp('5%'),
      marginLeft: hp('3%'),
    },
    headingTopText: {
      marginLeft: hp('3%'),
    },
    bodyText: {
      marginHorizontal: hp('3%'),
    },
    versionText: {
      marginLeft: hp('3%'),
      // fontFamily: 'Lato-Regular',
      paddingBottom: hp(2),
    },
    mailText: {
      paddingTop: hp('4%'),
      textDecorationLine: 'underline',
    },
  });

export default AboutMe;
