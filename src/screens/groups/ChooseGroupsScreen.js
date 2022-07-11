import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Dimensions, FlatList, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import GroupCard from '../../components/UI/GroupCard';
import ButtonApp from '../../components/UI/ButtonApp';
import { getGroups, saveGroupsToProfile } from '../../redux/actions/groupActions';
import { useTheme } from '@react-navigation/native';
import { getString } from '../../tools/StringHelper';
import GroupBackground from '../../assets/images/groupsBackground';
import CustomText from '../../components/UI/CustomText';
import { CurveHeader } from '../../components/UI/curveHeader';
const { width, height } = Dimensions.get('window');

const ChooseGroupsScreen = (props) => {
  const { colors } = useTheme();
  const {
    navigation,
    getGroups,
    token,
    route,
    groupsList,
    pending,
    saveGroupsToProfile,
    user,
    success,
  } = props;
  const [form, setForm] = useState(0);
  const [helpFrom, setHelpForm] = useState(0);
  const [selectedIdArray, setSelectedIdArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(0);

  useEffect(() => {
    (async function getGroupsHandler() {
      let success = await getGroups(token, route.params.selectedOrgId);
      // setTimeout(() => console.log('lista', groupsList), 2000);
    })();
  }, []);
  const selectedItem = (id, multiple) => {
    let checkedItems = [];
    if (multiple || helpFrom !== form) {
      checkedItems = [...selectedIdArray];
      if (checkedItems.length === 0 || checkedItems.find((item) => item === id) !== id) {
        checkedItems.push(id);
      } else if (checkedItems.find((item) => item === id) === id) {
        checkedItems = checkedItems.filter((i) => i !== id);
      }
    } else {
      checkedItems = [...selectedIdArray];
      if (checkedItems.find((item) => item === id) === id) {
        checkedItems = checkedItems.filter((i) => i !== id);
      } else {
        checkedItems.length > arrayLength && checkedItems.pop();
        checkedItems.push(id);
      }
    }
    setSelectedIdArray(checkedItems);
    setHelpForm(form);
  };
  const isChecked = (id) => {
    if (selectedIdArray.indexOf(id) === -1) {
      return false;
    }
    return true;
  };
  if (success && groupsList.length === 0) {
    navigation.navigate('AboutYou', { afterGroups: true });
  }
  const saveGroupsToProfileHandler = () => {
    saveGroupsToProfile(token, route.params.selectedOrgId, selectedIdArray, user?.profileId);
    navigation.navigate('AboutYou', { afterGroups: true });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 50, backgroundColor: colors.secondBackground }}>
        <View>
          <CurveHeader
            // leftIcon={'arrow-left'}
            // rightIcon={'cross'}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            onLeftPress={() => navigation.goBack()}
            onRightPress={() => navigation.goBack()}
            title={
              getString('myProfile.welcomeChooseGroups.title') +
              ' ' +
              groupsList?.map((item) => item.groupType)[form]
            }
          />

          <FlatList
            style={styles.flatList}
            data={groupsList[form]?.groups}
            renderItem={(item) => (
              <GroupCard
                title={item.item.name}
                groupId={item.item.id}
                selectItem={(id) => {
                  selectedItem(id, item.item.assignmentStrategy === 0 ? false : true);
                }}
                selcted={isChecked(item.item.id)}
                show={item.item.assignmentStrategy === 0 ? false : true}
                subTitle={item.item.description}
              />
            )}
            keyExtractor={(item, index) => 'key' + index}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: hp(15),
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.secondBackground,
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.secondBackground,
          shadowColor: 'black',
          borderTopWidth: 1,
        }}
      >
        <ButtonApp
          style={{ width: 101 }}
          btnBackground={colors.btnBackground}
          buttonTitle={getString('myProfile.welcomeChooseGroups.btnNext')}
          onPress={() => {
            form === groupsList.length - 1 ? saveGroupsToProfileHandler() : setForm(form + 1);
            setArrayLength(selectedIdArray.length);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagebackground: {
    height: height * 0.4,
    width: width * 1,
  },
  mainTitle: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.09,
    maxWidth: width * 0.81,
  },
  cardCon: {
    alignSelf: 'center',
    marginTop: 13,
  },
  flatList: {
    alignSelf: 'center',
    marginTop: 14,
    height: hp(55),
  },
  button: {
    marginRight: 36,
    width: 107,
    height: 44,
    alignSelf: 'flex-end',
    marginVertical: 30,
  },
});
ChooseGroupsScreen.propTypes = {
  token: PropTypes.string,
  pending: PropTypes.bool.isRequired,
  groupsList: PropTypes.array,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.group.pending,
  groupsList: state.group.groupsList,
  user: state.user.user,
  success: state.group.success,
});

const mapDispatchToProps = {
  getGroups,
  saveGroupsToProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGroupsScreen);
