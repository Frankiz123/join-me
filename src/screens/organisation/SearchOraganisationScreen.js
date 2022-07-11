import React, { useState, useRef, useCallback } from 'react';
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
import { debounce } from 'lodash';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import { findOrganisation, feideVerificaion } from '../../redux/actions/organisationActions';
import { getColors, getColorsDark } from '../../colors';
import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import SearchInput from '../../components/UI/SearchInput';
import { serverAddress, authAddress, isTest } from '../../tools/config';
import { useDebouncedCallback } from 'use-debounce';
import { useKeyboard } from '@react-native-community/hooks';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native';
import CustomText from '../../components/UI/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');
const SearchOraganisationScreen = (props) => {
  const keyboard = useKeyboard();
  const { colors } = useTheme();
  const [searchWord, setSearchWord] = useState('');
  const [search, setSearch] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [showList, setShowList] = useState(false);
  const scrollView = useRef(null);
  const {
    findOrganisation,
    token,
    listOrganisation,
    pending,
    navigation,
    feideVerificaion,
  } = props;
  const searchHandler = (query) => {
    setSearch(true);
    // if(searchWord !== ''){

    // }
    console.log('searchWord', query);
    if (query.length < 2) {
      setShowList(false);
    } else if (!showList || query.length !== searchWord.length) {
      findOrganisation(token, query);
      setShowList(true);
    }
    console.log('eee');
  };
  const handler = useCallback(debounce(searchHandler, 1500), [listOrganisation]);
  const acceptOrganisationHandler = async () => {
    const success = await feideVerificaion(token, selectedOrgId);
    if (success) {
      console.log('slect2');
      console.log();
      navigation.navigate('FeideVerification', { selectedOrgId, orgName });
    }
  };

  const { topContainer, searchContainer, inputText, listStyle, serachHeaderStyle } = styles(colors);
  return (
    <View style={topContainer}>
      <View
        style={{
          width: '100%',
        }}
      >
        {/* <TouchableOpacity
          onPress={() => }
          style={{  width:wp(84),          marginTop: hp(2)}}>
          <Icon name='arrow-left' size={30} color={colors.font} />
        </TouchableOpacity> */}
        <SearchInput
          container={serachHeaderStyle}
          customStyle={searchContainer}
          inputStyle={inputText}
          // labelColor={colors.font}
          value={searchWord}
          onChangeText={(searchWord) => {
            setSearchWord(searchWord);

            handler(searchWord);
          }}
          label={false}
          onPress={() => searchHandler(searchWord)}
          icon
          source={'search'}
          pending={pending}
          colorIcon={colors.font}
          list={listOrganisation}
          showList={false}
          leftIcon={'arrow-left'}
          backPress={() => props.navigation.goBack()}
        />
        {showList && searchWord.length > 2 && (
          <FlatList
            style={listStyle}
            data={listOrganisation}
            keyExtractor={(item) => item.orgId.toString()}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    acceptOrganisationHandler();
                    setSearchWord(item.name);
                    setSelectedOrgId(item.orgId);
                    setOrgName(item.name);
                    setShowList(false);
                  }}
                >
                  <CustomText variant="orgitem">{item.name}</CustomText>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={<Text></Text>}
          />
        )}
      </View>
    </View>
  );
};
SearchOraganisationScreen.propTypes = {
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
    searchContainer: {
      width: wp(100),
      borderWidth: 0,
      marginTop: hp(2),
      // borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: getColors('darkGrey2'),
      paddingHorizontal: wp(2),
      backgroundColor: colors.secondBackground,
    },
    inputText: {
      width: wp(75),
      alignItems: 'center',
      alignSelf: 'center',
      fontSize: RFValue(21),
      paddingLeft: 0,
      fontFamily: 'Asap-SemiBold',
      color: colors.font,
    },
    buttonStyle: {
      alignSelf: 'flex-end',
      bottom: '-5%',
      paddingBottom: wp(1),
    },
    listStyle: {
      marginTop: hp(3),
      paddingHorizontal: wp(2.6),
    },
    serachHeaderStyle: {
      alignSelf: 'center',
      width: wp(100),
      // height:0,
      backgroundColor: colors.secondBackground,
    },
  });

export default connect(mapStateToProps, { findOrganisation, feideVerificaion })(
  SearchOraganisationScreen,
);
