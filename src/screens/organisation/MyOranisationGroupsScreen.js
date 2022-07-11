import React, { useEffect, useState } from 'react';
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

import { getUserGroupsOfOrg, leaveOrganisation } from '../../redux/actions/organisationActions';
import { saveGroupsToProfile, updateGroupsToProfile } from '../../redux/actions/groupActions';
import CustomText from '../../components/UI/CustomText';
import GroupCard from '../../components/UI/GroupCard';

import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';

const { width, height } = Dimensions.get('window');

const MyOranisationGroupsScreen = (props) => {
  const {
    userGroupsOfOrg,
    getUserGroupsOfOrg,
    navigation,
    token,
    route,
    leaveOrganisation,
    user,
    saveGroupsToProfile,
    updateGroupsToProfile
  } = props;

  const [selectedIdArray, setSelectedIdArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    getUserGroupsOfOrgHandler();
  }, []);

  const getUserGroupsOfOrgHandler = async () => {
    const success = await getUserGroupsOfOrg(token, route.params?.organizationId);
    // console.log(userGroupsOfOrg.groups);
    var arr = [];
    userGroupsOfOrg.map(item=>{ item.groups.filter(item=> {
      if(item.isMember){
      arr.push(item.id)
    }}
    )
  })
  setSelectedIdArray(arr)
    if (success) {
  
    }
  };

  const selectedItem = (id) => {
    let checkedItems = [];
    checkedItems = [...selectedIdArray];
    if (checkedItems.length === 0 || checkedItems.find((item) => item === id) !== id) {
      checkedItems.push(id);
    } else if (checkedItems.find((item) => item === id) === id) {
      checkedItems = checkedItems.filter((i) => i !== id);
    }
    setSelectedIdArray(checkedItems);
  };
  const isChecked = (id) => {
    if (selectedIdArray.indexOf(id) === -1) {
      return false;
    }
    return true;
  };
  const leaveOrganisationHandler = async () => {
    const success = await leaveOrganisation(token, route.params?.organizationId, user?.profileId);
    success && navigation.goBack();
  };
  const saveGroupsToProfileHandler = async () => {
    // console.log(selectedIdArray);
    const success = await updateGroupsToProfile(
      token,
      route.params?.organizationId,
      [],
      user?.profileId,
    );
    success && navigation.goBack();
  };
  const { container, headerText, formView, linkText, buttonContainer } = styles(colors);

  return (
    <View style={container}>
      <CustomText variant="veryBigTitle" style={headerText}>
        {route.params?.organizationName}
      </CustomText>
      <Feather
        name="x"
        size={28}
        style={{ position: 'absolute', top: height * 0.04, left: width * 0.848 }}
        onPress={() => navigation.pop(2)}
        color={colors.font}
      />

      <Icon
        name="ios-arrow-back"
        size={28}
        color={colors.font}
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: height * 0.04, right: width * 0.848 }}
      />

      <View style={formView}>
        {/* {userGroupsOfOrg.map((item) => (
          <View >{console.log('item', item)}</View>
        ))} */}
        <TouchableOpacity onPress={() => leaveOrganisationHandler()} style={linkText}>
          <CustomText variant="underlineBold">
            {getString('myProfile.myOrganisationsMyGroups–1.linkLeaveOrg')}
          </CustomText>
        </TouchableOpacity>
        <FlatList
          style={{ height: hp(50) }}
          data={userGroupsOfOrg}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={(item, index) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: wp(80),
                    marginVertical: wp(3),
                    alignItems: 'center',
                  }}
                >
                  <CustomText variant="bodyLight">{item.item.groupType}</CustomText>
                  {item.item.groups[0].assignmentStrategy === 0 && (
                    <Icon
                      name="ios-arrow-forward"
                      size={18}
                      color={colors.font}
                      onPress={() =>
                        navigation.navigate('MyOrganisationSingleGroups', {
                          groupType: item.item.groupType,
                          organizationId: route.params?.organizationId,
                        })
                      }
                      // style={{ position: 'absolute', top: height * 0.04, right: width * 0.848 }}
                    />
                  )}
                </View>
                <FlatList
                  //   style={{ height: hp(50) }}
                  data={item.item.groups}
                  renderItem={(item) => (
                    <GroupCard
                      title={
                        item.item.assignmentStrategy === 1 && item.item.nrOfMembers > 0
                          ? item.item.name +
                            ' (' +
                            getString('myProfile.myOrganisationsMyGroups–1.nrOfMembers') +
                            ' ' +
                            item.item.nrOfMembers +
                            ')'
                          : item.item.name
                      }
                      groupId={item.item.id}
                      selectItem={(id) => {
                        selectedItem(id);
                      }}
                      selcted={isChecked(item.item.id)}
                      show={item.item.assignmentStrategy === 0 ? false : true}
                      subTitle={item.item.description}
                      countMembers={
                        item.item.assignmentStrategy === 0
                          ? getString('myProfile.myOrganisationsMyGroups–1.nrOfMembers') +
                            ' ' +
                            item.item.nrOfMembers
                          : undefined
                      }
                      details
                      navPress={(groupId) =>
                        navigation.navigate('MyProfileGroup', {
                          groupId,
                          orgId: route.params?.organizationId,
                        })
                      }
                    />
                  )}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={buttonContainer}>
        <ButtonApp
          buttonTitle={getString('myProfile.myProfile.btnSave')}
          onPress={() => saveGroupsToProfileHandler()}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
};

MyOranisationGroupsScreen.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.organisation.pending,
  userGroupsOfOrg: state.organisation.userGroupsOfOrg,
  user: state.user.user,
});

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      paddingHorizontal: hp(4),
      marginTop: hp(12.7),
      // width: wp(50),
    },
    formView: {
      //   height: hp(80),
      flex: 1,
      paddingLeft: wp(9),
      paddingTop: hp(5),
      //   paddingBottom: hp(10),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
    },
    linkText: {
      alignSelf: 'flex-end',
      marginBottom: hp(2),
      color: colors.font,
      fontSize: hp(2),
      textAlign: 'right',
      marginRight: wp(10),
    },
    buttonContainer: {
      //   alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: hp(10),
    },
  });

export default connect(mapStateToProps, {
  getUserGroupsOfOrg,
  leaveOrganisation,
  saveGroupsToProfile,
  updateGroupsToProfile
})(MyOranisationGroupsScreen);
