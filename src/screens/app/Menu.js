import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import Svg, { G, Rect, Path } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';
import { getString } from '../../tools/StringHelper';
import CustomText from '../../components/UI/CustomText';
import { logout } from '../../redux/actions/authActions';
import { MySettings } from './MenuSettings';
import { setI18nConfig } from '../../tools/StringHelper';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Alert } from 'react-native';
const { height } = Dimensions.get('window');
const Menu = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const [selectedLang, setLanguage] = useState();
  useEffect(() => {
    async function updateLang() {
      const lang = await AsyncStorage.getItem('language');
      setLanguage(lang ? lang : 'en');
    }
    updateLang();
  });

  const menuItems = [
    {
      id: '1',
      label: getString('Menu.labelMyProfile'),
      routeName: 'MyProfile',
    },
    {
      id: '2',
      label: getString('Menu.labelMySettings'),
      routeName: 'MenuSettings',
    },
    {
      id: '3',
      label: getString('Menu.labelMyAccess'),
      routeName: 'MyOrganisation',
    },
    {
      id: '4',
      label: getString('Menu.labelAbout'),
      routeName: 'AboutMe',
    },
    {
      id: '5',
      label: getString('Menu.labelContact'),
      routeName: 'MenuContact',
    },
    {
      id: '6',
      label: getString('Menu.labelSignOut'),
      routeName: 'Logout',
    },
  ];

  const onPressGoBack = () => navigation.goBack();

  const { container, viewList, btnsList, btnTextList, btnTimes } = styles(colors);
  const RenderIcon = ({ onPress }) => {
    return (
      <TouchableOpacity style={btnTimes} onPress={onPress}>
        <Svg width={66} height={62} viewBox="0 0 66 62" {...props}>
          <G data-name="Group 13892" transform="translate(-290 -20)">
            <Rect
              data-name="Rectangle 14123"
              width={66}
              height={62}
              rx={31}
              transform="translate(290 20)"
              fill={colors.closeBackColor}
            />
            <Path data-name="Line 3328" fill="none" stroke="grey" d="M335 63l-23-23" />
            <Path data-name="Line 3500" fill="none" stroke="grey" d="M335 40l-23 23" />
          </G>
        </Svg>
        {/* <Icon name="close" size={55} type="material-community" color="#E2DCE2" style={iconStyle} /> */}
      </TouchableOpacity>
    );
  };

  RenderIcon.propTypes = {
    onPress: PropTypes.func,
  };
  const { logout } = props;
  const renderItem = ({ item }) => {
    const { label, routeName } = item;

    return (
      <TouchableOpacity
        style={btnsList}
        onPress={() =>
          routeName === 'Logout'
            ? logout() &&
            navigation.navigate('AuthNavigator', {
              screen: 'Login',
            })
            : navigation.navigate(routeName)
        }
      >
        <CustomText variant="small" style={btnTextList}>
          {label}
        </CustomText>
      </TouchableOpacity>
    );
  };
  const changeLanguage = async (lang) => {
    const getLanguage = await AsyncStorage.getItem('language');
    if (lang !== getLanguage) {
      Alert.alert(
        getString('Menu.ConfirmLanguage.title'),
        getString('Menu.ConfirmLanguage.body'),
        [
          {
            text: getString('Menu.ConfirmLanguage.BtnNo'),
            onPress: () => { },
            style: 'default',
          },
          {
            text: getString('Menu.ConfirmLanguage.BtnYes'),
            onPress: async () => {
              AsyncStorage.setItem('language', lang);
              setI18nConfig(lang);
              RNRestart.Restart();
            },
          },
        ],
        { cancelable: true },
      );
    }
  };
  return (
    <View style={container}>
      <RenderIcon onPress={onPressGoBack} />
      <View style={viewList}>
        <FlatList
          scrollEnabled={true}
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          width: wp('90%'),
          flex:  1,
          // marginTop: hp('25%'),
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <CustomText variant="bold">{getString('Menu.language')} :</CustomText>
        <TouchableOpacity
          onPress={() => {
            changeLanguage('en');
          }}
        >
          <CustomText
            variant={selectedLang === 'en' ? 'underlineBold' : 'semiBold'}
            style={{ marginHorizontal: 5, margin: 3 }}
          >
            {getString('Menu.LabelLanguage.en')}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('no')}>
          <CustomText
            variant={selectedLang === 'no' ? 'underlineBold' : 'semiBold'}
            style={{ marginHorizontal: 5, margin: 3 }}
          >
            {getString('Menu.LabelLanguage.no')}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({});
const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    btnTimes: {
      marginTop: height * 0.05,
      right: height * 0.03,
      alignSelf: 'flex-end',
    },
    viewList: {
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      width: wp('90%'),
      height:hp(80)
    },
    btnsList: {
      paddingVertical: height * 0.02,
    },
    iconStyle: { paddingTop: Platform.OS == 'ios' ? 8 : 0 },
    btnTextList: {
      fontSize: height * 0.04,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      marginRight: wp('10%'),
      textAlign: 'right',
    },
  });

export default connect(mapStateToProps, { logout })(Menu);
