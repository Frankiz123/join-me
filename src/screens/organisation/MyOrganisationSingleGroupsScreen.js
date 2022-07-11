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

import { getGroups } from '../../redux/actions/groupActions';

import CustomText from '../../components/UI/CustomText';
import GroupCard from '../../components/UI/GroupCard';

import { getString } from '../../tools/StringHelper';
import ButtonApp from '../../components/UI/ButtonApp';
import GroupBackground from '../../assets/images/groupsBackground';
import { CurveHeader } from '../../components/UI/curveHeader';
import { getUserGroupsOfOrg } from '../../redux/actions/organisationActions';
import { saveGroupsToProfile, removeGroupsFromProfile } from '../../redux/actions/groupActions';
const { width, height } = Dimensions.get('window');

const MyOrganisationSingleGroupsScreen = (props) => {
  const {
    userGroupsOfOrg,
    getUserGroupsOfOrg,
    navigation,
    token,
    route,
    leaveOrganisation,
    user,
    saveGroupsToProfile,
    updateGroupsToProfile,
    removeGroupsFromProfile
  } = props;

  const [selectedIdArray, setSelectedIdArray] = useState([]);
    const [removeArrayGrp, setRemoveArrayGrp] = useState([]);
  const [arrayLength, setArrayLength] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    getUserGroupsOfOrgHandler();
  }, []);

  const getUserGroupsOfOrgHandler = async () => {
    const success = await getUserGroupsOfOrg(token, route.params?.organizationId);
    console.log(userGroupsOfOrg, user?.profileId);
    console.log(userGroupsOfOrg);
    var arr = [];
    userGroupsOfOrg.map(item => {
      item.groups.filter(item => {

        if (item.isMember) {
          arr.push(item.id)
        }
      }
      )
    })
    setSelectedIdArray(arr)
    var removeArr = []
    var tmpArr = userGroupsOfOrg.map( (item) => {
      
      if(item.groupType === route.params?.groupType) {
       var is = item.groups.filter(item=>item.isMember)
      removeArr = is.map(item=>item.id)
         return item}}
      )
    setRemoveArrayGrp(removeArr)
    console.log('arr', removeArr)
    if (success) {

    }
  };

  const selectedItem = (id) => {
    let checkedItems = [];
    // if (checkedItems.length === 0 || checkedItems.find((item) => item === id) !== id) {
    //   checkedItems.push(id);
    // } else if (checkedItems.find((item) => item === id) === id) {
    //   checkedItems = checkedItems.filter((i) => i !== id);
    // }
    checkedItems.push(id);
    console.log('checkedItems', checkedItems)
    setSelectedIdArray(checkedItems);
  };
  const isChecked = (id) => {
    if (selectedIdArray.indexOf(id) === -1) {
      return false;
    }
    return true;
  };
  const updateGroupsToProfileHandler = async () => {
    // console.log('selectedIdArray', selectedIdArray);
    
     const success = await removeGroupsFromProfile(
      token,
      route.params?.organizationId,
      removeArrayGrp,
      user?.profileId,
    );
    if(success){
    const success2 = await saveGroupsToProfile(
      token,
      route.params?.organizationId,
      selectedIdArray,
      user?.profileId,
    );
    success2 && navigation.goBack();
    }

  };

  const { container, headerText, formView, buttonContainer } = styles(colors);

  return (
    <View style={container}>
      <CurveHeader
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => navigation.goBack()}
        title={getString('myProfile.welcomeChooseGroups.title') + ' ' + route.params?.groupType}
      />

      <View style={formView}>
        {/* {userGroupsOfOrg.map((item) => (
          <View >{console.log('item', item)}</View>
        ))} */}

        <FlatList
          style={{ height: hp(50) }}
          data={userGroupsOfOrg}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={(item, index) => {
            if (item.item.groupType !== route.params?.groupType) {
              return;
            }
            return (
              <View>
                <FlatList
                  //   style={{ height: hp(50) }}
                  data={item.item.groups}
                  renderItem={(item) => (
                    <GroupCard
                      title={item.item.name}
                      groupId={item.item.id}
                      selectItem={(id) => {
                        selectedItem(id);
                      }}
                      selcted={isChecked(item.item.id)}
                      show={false}
                      subTitle={item.item.description}
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
          onPress={() => updateGroupsToProfileHandler()}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
};

MyOrganisationSingleGroupsScreen.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.organisation.pending,
  userGroupsOfOrg: state.organisation.userGroupsOfOrg,
  user: state.user.user,
  groupsList: state.group.groupsList,
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
    buttonContainer: {
      //   alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: hp(10),
    },
  });

export default connect(mapStateToProps, { getGroups, saveGroupsToProfile, getUserGroupsOfOrg, removeGroupsFromProfile })(MyOrganisationSingleGroupsScreen);
