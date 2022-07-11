import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonApp from '../../components/UI/ButtonApp';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { getGroupsForUser } from '../../redux/actions/groupActions';
import { getUserGroupsOfOrg } from '../../redux/actions/organisationActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Close } from '../../components/UI/Close';
import SubGroupItem from '../../components/groups/SubGroupItem';
import CustomText from '../../components/UI/CustomText';
import { CancelAlert } from '@components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';
var tab = [];
const groups = '2dd2a5d7-1655-431c-a34a-05fd0e262d8b';
const Subgroup = (props) => {
  const [hideList, setHideList] = useState(false);
  const {
    getGroupsForUser,
    token,
    navigation,
    groupsForUserList,
    getUserGroupsOfOrg,
    userGroupsOfOrg,
    route,
  } = props;
  useEffect(() => {
    getGroupsForUser(token);
    getUserGroupsOfOrg(token, route.params?.orgId);
    console.log(route.params.orgId);
    tab = [];
    if (route.params.groupArray !== undefined) {
      tab = route.params.groupArray;
    }
    // console.log(groupsList);
  }, []);
  const { colors } = useTheme();
  const { dropContainer, yellowContainer, labelText, buttonContainer, container } = styles(colors);
  const [alertShow, setAlertShow] = useState(false);
  checkAllHandler = (label) => {
    setHideList(label);
    tab = [];
    label &&
      groupsForUserList[0]?.groupIds?.map((itemG) => {
        itemG.groups.filter((item) => {
          tab.push(item.id);
          return item.id;
        });
      });
    if (!label) {
      tab = [];
    }
  };

  console.log('tab', tab);
  return (
    <ScrollView style={container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp(90),
          alignSelf: 'center',
          height: Platform.OS === 'ios' ? DeviceInfo.hasNotch() ? hp(9): hp(7) : hp(7),
          paddingBottom:hp(1),
          alignItems:'flex-end',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{  }}>
          <Icon
            name={'arrow-left'}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            size={30}
            type={'material-community'}
            color={colors.font}
          />
        </TouchableOpacity>
         <Feather
        name="x"
        size={30}
        style={{ }}
        onPress={() => setAlertShow(true)}
        color={colors.font}
      />
        {/* <Close onRightPress={() => setAlertShow(true)} /> */}
      </View>
      <View>
        <SubGroupItem
          title={getString('createActivity.Subgroups.text')}
          checkedLabel={(label) => checkAllHandler(label)}
        />
        {groupsForUserList[0]?.groupIds?.map((item) => {
          if (hideList) {
            return;
          }
          return (
            <View>
              <CustomText variant="bodyLight" style={labelText}>
                {item.groupType}
              </CustomText>
              {item.groups.map((item, index) => (
                <SubGroupItem
                  title={item.name}
                  id={item.id}
                  checkedLabel={(val, id) => {
                    console.log(val);
                    if (val) {
                      tab.push(id);
                    } else {
                      tab = tab.filter((item) => item !== id);
                    }
                  }}
                />
              ))}
            </View>
          );
        })}
        <View style={buttonContainer}>
          <ButtonApp
            buttonTitle={getString('firstTime.aboutyou.btnNext')}
            onPress={() =>
              navigation.navigate('HowMany', {
                ...route.params,
                groupArray: tab,
                allGroups: hideList,
              })
            }
            btnBackground={colors.btnBackground}
          />
        </View>
      </View>
      <CancelAlert
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        navigation={navigation}
      />
    </ScrollView>
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
      marginTop: 20,
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
      marginLeft: wp(4.5),
      marginTop: hp(2.8),
      // color: colors.font,
      // fontSize: hp(2.5),
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
  });
Subgroup.propTypes = {
  token: PropTypes.string,
  pending: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.group.pending,
  groupsForUserList: state.group.groupsForUserList,
  user: state.user.user,
  success: state.group.success,
  userGroupsOfOrg: state.organisation.userGroupsOfOrg,
});

const mapDispatchToProps = {
  getGroupsForUser,
  getUserGroupsOfOrg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subgroup);
