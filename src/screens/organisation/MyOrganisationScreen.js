import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useTheme } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';

import { getProfile } from '../../redux/actions/userActions';

import CustomText from '../../components/UI/CustomText';
import GroupBackground from '../../assets/images/groupsBackground';
import GroupCard from '../../components/UI/GroupCard';

import { getString } from '../../tools/StringHelper';
import { CurveHeader } from '../../components/UI/curveHeader';

const { width, height } = Dimensions.get('window');

const MyOrganisationScreen = (props) => {
  const { getProfile, user, navigation, token } = props;

  const { colors } = useTheme();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const success = await getProfile();
  };

  const { container, headerText, formView, linkText } = styles(colors);

  return (
    <View style={container}>

      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => navigation.pop()}
        title={getString('myProfile.connectedToOrganisation.title')}
      />

      <View style={formView}>
        <FlatList
          data={user?.memberships}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={(item) => {
            return (
              <GroupCard
                title={item.item.name}
                groupId={item.item.organizationId}
                arrow
                arrowPress={(id) =>
                  navigation.push('MyOranisationGroups', {
                    organizationId: id,
                    organizationName: item.item.name,
                  })
                }
              />
            );
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('FindYourOrganistion')}
          style={linkText}
        >
          <CustomText variant="underlineBold">
            {getString('firstTime.getStarted.linkLabel')}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

MyOrganisationScreen.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.user.pending,
  error: state.user.error,
  user: state.user.user,
  phoneNumber: state.auth.phoneNumber,
});

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(4),
      position: 'absolute',
      top: hp(8),
      // width: wp(50),
    },
    formView: {
      flex: 1,
      alignItems:'center',
      // paddingLeft: wp(9),
      paddingTop: hp(5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
    },
    linkText: {
      alignSelf: 'flex-end',
      margin: hp(4),
      color: colors.font,
      fontSize: hp(2),
      textAlign: 'right',
    },
  });

export default connect(mapStateToProps, { getProfile })(MyOrganisationScreen);
