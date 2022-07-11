import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import { feideVerificaion } from '../../redux/actions/organisationActions';
import { WebView } from 'react-native-webview';
import { useTheme } from '@react-navigation/native';

const FeideVerificationScreen = (props) => {
  const { idFromAccessKey, route } = props;
  const { colors } = useTheme();
  const handleMessage = (data) => {
  };
  const handleNavigationStateChange = (navState) => {
    var result = navState.url.match('Success');

    if (result !== null && result.index == 63) {
      props.navigation.navigate('ConfirmConnectionToOrg', {
        selectedOrgId: route.params.selectedOrgId,
        orgName: route.params.orgName,
      });
    }
  };

  const jsCode = 'window.postMessage(document.getElementsByClassName("pb-3"))';
  return (
    <View style={{ flex: 1 }}>
      <View style={styles(colors).topBarStyle}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="ios-arrow-back" size={32} color={colors.font} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{
          uri: `https://joinme-web-verification.azurewebsites.net/Verification?id=${route.params.selectedOrgId}&accessKey=${idFromAccessKey}`,
        }}
        onNavigationStateChange={handleNavigationStateChange}
        injectedJavaScript={jsCode}
        onMessage={handleMessage}
      />
    </View>
  );
};

FeideVerificationScreen.propTypes = {
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
    topBarStyle: {
      height: DeviceInfo.hasNotch() ? hp(9) : hp(8.75),
      paddingLeft: wp(4),
      backgroundColor: colors.backgroundApp,
      justifyContent: 'center',
      paddingTop: DeviceInfo.hasNotch() ? hp(3) : 0
    },
  });

export default connect(mapStateToProps, { feideVerificaion })(FeideVerificationScreen);
