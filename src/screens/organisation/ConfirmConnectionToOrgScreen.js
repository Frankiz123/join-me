import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { confirmOrganisation } from '../../redux/actions/organisationActions';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { spacing } from '../../tools/theme';

import { useTheme } from '@react-navigation/native';

const ConfirmConnectionToOrgScreen = (props) => {
  const { colors } = useTheme();
  const { confirmOrganisation, token, user, route } = props;

  useEffect(() => {
    confirmOrganisation(token, route.params.selectedOrgId, user?.profileId);
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: spacing.h.l,
        backgroundColor: colors.backgroundApp,
      }}
    >
      <CustomText variant="bigTitle" style={{ marginBottom: spacing.v.l }}>
        {getString('firstTime.connectToOrganisation.ConfirmConnectionToOrg.title')}
        {props.route.params.orgName}
      </CustomText>
      <ButtonApp
        btnBackground={colors.btnBackground}
        buttonTitle={getString('firstTime.connectToOrganisation.ConfirmConnectionToOrg.btn')}
        onPress={() =>
          props.navigation.navigate('ChooseGroups', {
            selectedOrgId: props.route.params.selectedOrgId,
          })
        }
      />
    </View>
  );
};

ConfirmConnectionToOrgScreen.propTypes = {
  // verifyPhone: PropTypes.func.isRequired,
  // loginA: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.organisation.pending,
  token: state.auth.token,
  user: state.user.user,
});
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    width: wp(100),
    paddingHorizontal: wp(9.6),
    paddingVertical: hp(4.1),
  },
  containerContent: {
    height: hp(38.6),
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
  cellStyle: {
    backgroundColor: getColors('white'),
    borderColor: getColors('backgroundApp'),
    height: hp(8),
    width: wp(13),
    marginHorizontal: wp(8),
    borderRadius: 5,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    marginRight: wp(7),
  },
});

export default connect(mapStateToProps, { confirmOrganisation })(ConfirmConnectionToOrgScreen);
