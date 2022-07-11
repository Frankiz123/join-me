import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { CurveHeader, CancelAlert } from '@components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { getGroupsForUser } from '../../redux/actions/groupActions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GroupCard from '../../components/UI/GroupCard';

const initialState = {
  firstName: '',
  lastName: '',
  yearOfBirth: '2001',
  gender: '',
  image: '',
};

const Group = (props) => {
  const [form, setForm] = useState(initialState);
  const { colors } = useTheme();
  const [alertShow, setAlertShow] = useState(false);
  const { dropContainer, buttonContainer, container } = styles(colors);
  const { navigation, getGroupsForUser, route, user, token } = props;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const success = await getGroupsForUser(token);
  };
  return (
    <View style={container}>

      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => setAlertShow(true)}
        title={getString('createActivity.Groups.title')}
      />

      <View style={{ alignItems: 'center' }} key={'123321'}>
        <GroupCard
          title={getString('createActivity.Groups.Textone')}
          groupId={'252525'}
          details
          navPress={() =>
            navigation.navigate('HowMany', {
              groupArray: [],
              ...route.params,
              groupName: getString('createActivity.Groups.Textone'),
            })
          }
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={user?.memberships}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => {
            console.log('item', item.item.organizationId);
            return (
              <GroupCard
                title={item.item.name}
                groupId={item.item.organizationId}
                arrow
                arrowPress={(id) =>
                  navigation.navigate('Subgroup', {
                    ...route.params,
                    groupName: item.item.name,
                    orgId: item.item.organizationId,
                  })
                }
              />
            );
          }}
        />
      </View>
      <CancelAlert
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        navigation={navigation}
      />
    </View>
  );
};
Group.propTypes = {
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
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
      marginTop: 20,
    },
    tags: {
      // height: hp('4%'),
      backgroundColor: colors.greyBackground,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      borderRadius: 20,
    },
    tagtext: {
      padding: 10,
      fontSize: hp('2%'),
    },
    dropContainer: {
      marginTop: hp('2%'),
      padding: wp('5%'),
      marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.greyBackground,
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: hp(3),
    },
  });
export default connect(mapStateToProps, { getGroupsForUser })(Group);
