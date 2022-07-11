import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import { findOrganisation, feideVerificaion } from '../../redux/actions/organisationActions';
import { getColors, getColorsDark } from '../../colors';
import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import SearchInput from '../../components/UI/SearchInput';
import { serverAddress, authAddress, isTest } from '../../tools/config';
import CustomText from '../../components/UI/CustomText';
import { useKeyboard } from '@react-native-community/hooks';
import { useTheme } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const FindYourOrganistionScreen = (props) => {
  const keyboard = useKeyboard();
  const { colors } = useTheme();
  const [searchWord, setSearchWord] = useState('');
  const [search, setSearch] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [searchLength, setSearchLength] = useState(2);
  const scrollView = useRef(null);
  const {
    findOrganisation,
    token,
    listOrganisation,
    pending,
    navigation,
    feideVerificaion,
  } = props;
  const searchHandler = () => {
    setSearch(true);
    findOrganisation(token, searchWord);
  };
  const acceptOrganisationHandler = async () => {
    console.log('accept');
    const success = await feideVerificaion(token, selectedOrgId);
    if (success) {
      navigation.navigate('FeideVerification', { selectedOrgId, orgName });
    }
  };

  const { topContainer, containerContent, buttonStyle } = styles(colors);

  if (searchWord.length > 2 && searchWord.length !== searchLength) {
    setTimeout(() => searchHandler(), 3200);
    if (search === false) {
      setSearch(true);
    }
    setSearchLength(searchWord.length);
  }
  if (keyboard.keyboardShown) {
    console.log('scrol');
    scrollView.current !== null && scrollView.current.scrollTo({ x: 0, y: hp(95), animated: true });
  } else {
    scrollView.current !== null && scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }
  return (
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   style={{ flex: 1, backgroundColor: getColors('white'), justifyContent: 'center' }}
    //   contentContainerStyle={{ backgroundColor: getColors('white') }}
    //   keyboardVerticalOffset={hp(50)}
    // >

    <View style={topContainer}>
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={keyboard.keyboardShown}
        contentContainerStyle={{ flexGrow: 1 }}
        ref={(ref) => (scrollView.current = ref)}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: '100%',
            height: height * (moderateScale(1.15) > 1.5 ? 1.18 : moderateScale(1.15)),
            // flexGrow: 1,
            paddingBottom: keyboard.keyboardShown ? hp(8) : hp(1),
            paddingVertical: hp(4.1),
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ alignSelf: 'flex-end' }}
          >
            <Icon name="close" size={30} color={colors.font} />
          </TouchableOpacity>
          <View style={containerContent}>
            <CustomText variant="bigTitle">
              {getString('firstTime.connectToOrganisation.findYourOrg.firstTitle')}
            </CustomText>
            <CustomText variant="bigTitle">
              {getString('firstTime.connectToOrganisation.findYourOrg.secoundTitle')}
            </CustomText>
          </View>
          <View style={{ marginTop: hp(10) }}>
            <SearchInput
              label
              labelText={getString('firstTime.connectToOrganisation.findYourOrg.labelSearch')}
              labelColor={colors.font}
              value={searchWord}
              onChangeText={(searchWord) => setSearchWord(searchWord)}
              onPress={() => searchHandler()}
              icon
              source={'search'}
              pending={pending}
              onFocus={() => navigation.navigate('SearchOrganisation')}
              list={listOrganisation}
              showList={search}
              selectItem={(item) => {
                console.log('select');
                setSearchWord(item.item.name);
                setSearch(false);
                setSelectedOrgId(item.item.orgId);
                setOrgName(item.item.name);
                acceptOrganisationHandler();
              }}
            />
            {/* <View style={buttonStyle}>
              <ButtonApp
                btnBackground={colors.btnBackground}
                buttonTitle={getString('firstTime.connectToOrganisation.findYourOrg.btn')}
                onPress={() => acceptOrganisationHandler()}
              />
            </View> */}
          </View>
        </View>
      </ScrollView>
      {!keyboard.keyboardShown && <View style={{ marginVertical: hp(0.8) }} />}
    </View>

    // </KeyboardAvoidingView>
  );
};
FindYourOrganistionScreen.propTypes = {
  // verifyPhone: PropTypes.func.isRequired,
  // loginA: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.organisation.pending,
  token: state.auth.token,
  listOrganisation: state.organisation.listOrganisation,
  idFromAccessKey: state.organisation.idFromAccessKey,
});
const styles = (colors) =>
  StyleSheet.create({
    topContainer: {
      flex: 1,
      width: wp(100),
      paddingHorizontal: wp(9.6),

      backgroundColor: colors.secondBackground,
    },
    containerContent: {
      height: height * 0.4,
      justifyContent: 'space-between',
    },
    bottomContainer: {
      flexDirection: 'row',
      marginTop: hp(1),
      marginBottom: hp(2),
      marginHorizontal: wp(7),
    },
    inputContainer: {
      paddingHorizontal: wp(1),
      paddingTop: hp(2),
      paddingBottom: hp(2),
      borderRadius: 10,
      width: wp(68),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: {
      alignSelf: 'flex-end',
      bottom: '-5%',
      // marginTop: hp(6),
      // position: 'absolute',
      // bottom: hp(-13),
      paddingBottom: wp(1),
    },
  });

export default connect(mapStateToProps, { findOrganisation, feideVerificaion })(
  FindYourOrganistionScreen,
);
