import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonApp from '../../components/UI/ButtonApp';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { getGroupsForUser, saveGroupsToProfile } from '../../redux/actions/groupActions';
import {
  getAddShortcute,
  getInitList,
  putUpadteShortcute,
} from '../../redux/actions/activityActions';
import { getUserGroupsOfOrg } from '../../redux/actions/organisationActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Close } from '../../components/UI/Close';
import { CurveHeader } from '../../components/UI/curveHeader';
import GroupCard from '../../components/UI/GroupCard';
import SubGroupItemsList from '../../components/groups/SubGroupItemsList';
import CustomText from '../../components/UI/CustomText';
import { CancelAlert } from '@components';
var tab = [];
var groupIds = [];
const CreateShortcutsScreen = (props) => {
  const [hideList, setHideList] = useState(false);
  const [grpIds, setGrpIds] = useState([]);
  const {
    getGroupsForUser,
    token,
    navigation,
    getInitList,
    groupsForUserList,
    userGroupsOfOrg,
    initialListData,
    saveGroupsToProfile,
    route,
    getAddShortcute,
    shortcutsList,
    updateShortcute,
    putUpadteShortcute,
    getUserGroupsOfOrg,
  } = props;

  useEffect(() => {
    getGroupsForUserHandler();
  }, []);

  const getGroupsForUserHandler = async () => {
    console.log('token', { token });
    //  console.log('ids', getAddShortcute.groupIds)
    const success = await getGroupsForUser(token);
    // getInitList(token);
    const success2 = await getAddShortcute(token, route.params?.groupId);
    if (route.params?.groupArray !== undefined) {
      tab = route.params.groupArray;
      groupIds = route.params.groupArray;
    }
    var arr = [];
    if(success2){
      shortcutsList[0]?.shortCutes.map((item) => {
        arr.push(item.groupId);
      });
      setSelectedIdArray(arr);
    }
  
    console.log('shortcutlis', shortcutsList[0]?.shortCutes);
    // setSelectedIdArray(shortcutsList[0].shortCutes);
    console.log('all ids', groupsForUserList[0]?.groupIds);
  };
  const updateShortcuteHandler = async () => {
    console.log(selectedIdArray);
    const body = { grpId: selectedIdArray };
    const success = await putUpadteShortcute(token, body, route.params?.bodylist,route.params?.getList );
    success && navigation.goBack();
  };

  const { colors } = useTheme();
  const [selectedIdArray, setSelectedIdArray] = useState([]);
  const { formView, labelText, linkText22, linkText, buttonContainer, container } = styles(colors);
  // const [alertShow, setAlertShow] = useState(false);
  // checkAllHandler = (label) => {
  //   setHideList(label);
  //   tab = [];
  //   groupIds = [];
  //   label &&
  //     groupsForUserList[0]?.groupIds?.map((itemG) => {
  //       itemG.groups.filter((item) => {
  //         tab.push([item.ids]);
  //         grouIds.push({ groupId: groupIds });

  //         return item.id;
  //       });
  //     });
  //   if (!label) {
  //     tab = [];
  //   }
  // };
  console.log('tab', selectedIdArray);

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

  const saveGroupsToProfileHandler = async () => {
    //  console.log(selectedIdArray);
    const success = await saveGroupsToProfile(
      token,
      route.params?.groupId,
      selectedIdArray,
      //  user?.groupId,
    );
    success && navigation.goBack();
  };
  return (
    <View style={container}>
      <ScrollView>
        <CurveHeader
          rightIcon={'cross'}
          onRightPress={() => navigation.goBack()}
          title={getString('createActivity.createShortcuts.title')}
        />
        <View>
          <CustomText variant="label" style={labelText}>
            {getString('createActivity.createShortcuts.text')}
          </CustomText>
          {/* {groupsForUserList.map((value, key) => (
             {value.name ? <Text>{value.name}</Text> : null} 
              <View>
                <Text>{value.name}</Text>
              </View>
           ))} */}
          {groupsForUserList[0]?.groupIds?.map((item, index) => {
            return (
              <View style={formView} key={index.toString()}>
                {item.groups.map((item, index) => (
                  <GroupCard
                    title={item.name}
                    groupId={item.id}
                    selectItem={(id) => {
                      selectedItem(id);
                    }}
                    selcted={isChecked(item.id)}
                    show={true}
                    // subTitle={item.item.description}
                  />
                ))}
              </View>
            );
          })}

          <TouchableOpacity
            style={linkText22}
            onPress={() => navigation.navigate('MyOrganisation')}
          >
            <CustomText variant="underlineMedium">
              {getString('createActivity.createShortcuts.mineGroup')}
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={buttonContainer}>
        <ButtonApp
          buttonTitle={getString('createActivity.createShortcuts.btnOK')}
          onPress={() => updateShortcuteHandler()}
          btnBackground={colors.btnBackground}
        />
      </View>
    </View>
  );
};

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
    },
    buttonContainer: {
      //   alignSelf: 'flex-end',
      backgroundColor: colors.reverseBg,
      shadowColor: '#c1c1c1',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      shadowOpacity: 5.0,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: hp(12),
      width: wp(100),
    },
    dropContainer: {
      marginTop: hp('1%'),
      padding: wp('5%'),
      marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.greyBackground,
      borderRadius: 10,
      //justifyContent: 'center',
      flexDirection: 'row',
    },
    labelText: {
      marginLeft: wp(11),
      // color: colors.font,
      // fontSize: hp(3),
      alignSelf: 'flex-start',
      paddingBottom: hp(1.5),
    },
    formView: {
      flex: 1,
      paddingLeft: wp(1),
      alignItems: 'center',
    },
    yellowContainer: {
      marginTop: hp('1%'),
      padding: wp('5%'),
      marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.yellow,
      borderRadius: 10,
      //justifyContent: 'center',
      flexDirection: 'row',
    },
    linkText: {
      alignSelf: 'center',
      marginBottom: hp(2),
      color: colors.font,
      fontSize: hp(2),
      textAlign: 'right',
      marginRight: wp(10),
    },
    linkText22: {
      alignSelf: 'flex-start',
      marginBottom: hp(2),
      color: colors.font,
      fontSize: hp(1.5),
      margin: wp(7),
    },
  });
CreateShortcutsScreen.propTypes = {
  token: PropTypes.string,
  pending: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.group.pending,
  groupsForUserList: state.group.groupsForUserList,
  shortcutsList: state.activity.shortcutsList,
  user: state.user.user,
  success: state.group.success,
  initialListData: state.activity.initialListData,
  updateShortcute: state.activity.updateShortcute,
});

const mapDispatchToProps = {
  getGroupsForUser,
  saveGroupsToProfile,
  getAddShortcute,
  putUpadteShortcute,
  getInitList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateShortcutsScreen);
