import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LeftAndRightHeader } from '../../components/UI/Header';
import { leaveGroupOfOrganisation } from '../../redux/actions/organisationActions';
import { detailsGroup } from '../../redux/actions/groupActions';
import { useTheme } from '@react-navigation/native';
import CustomText from '../../components/UI/CustomText';
import { getString } from '../../tools/StringHelper';

const headingText = [
  'Bioteknologi',
  'For alle som har valgt Geo-fag som hoved',
  'Forlat gruppen',
  'medlemmer',
  'Hanne Viksun',
];

const MyProfileGroup = (props) => {
  const { colors } = useTheme();
  const { viewListItem, imgProfile, textName } = styles(colors);
  const RenderListItem = ({ item }) => {
    return (
      <View style={viewListItem}>
        <Image
          style={imgProfile}
          source={
            item.item.logoImg !== null
              ? {
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }
              : require('./../../assets/images/myprofilegroup.png')
          }
        />
        <CustomText variant="small" style={textName}>
          {item.item.firstName} {item.item.lastName}
        </CustomText>
      </View>
    );
  };
  const {
    leaveGroupOfOrganisation,
    token,
    route,
    user,
    detailsGroup,
    navigation,
    groupDetails,
  } = props;
  const onPressGoBack = () => navigation.goBack();
  const onPressGoClose = () => navigation.navigate('FindActivity');

  useEffect(() => {
    detailsGroup(token, route.params.groupId);
    console.log('details', groupDetails, route.params.groupId);
  }, []);

  const leaveGroupOfOrganisationHandler = () => {
    leaveGroupOfOrganisation(token, route.params.orgId, user?.profileId, route.params.groupId);
  };

  const {
    container,
    viewTop,
    textTopHeading,
    textForAlle,
    textForlat,
    textMedlemmer,
    viewBottom,
  } = styles(colors);
  return (
    <View style={container}>
      <ScrollView>
        <LeftAndRightHeader
          onPressBack={onPressGoBack}
          onPressClose={onPressGoClose}
        />
        <View style={viewTop}>
          <CustomText variant="bigTitle" style={textTopHeading}>
            {groupDetails?.name}
          </CustomText>
          <CustomText variant="small" style={textForAlle}>
            {groupDetails?.description}
          </CustomText>
          <TouchableOpacity onPress={() => leaveGroupOfOrganisationHandler()}>
            <CustomText variant="small" style={textForlat}>
              {getString('myProfile.myProfileMyGroups–4.linkLeaveGrp')}
            </CustomText>
          </TouchableOpacity>
          <CustomText variant="small" style={textMedlemmer}>
            {groupDetails?.nrOfMembers}{' '}
            {getString('myProfile.myProfileMyGroups–4.nrOfMembers')}
          </CustomText>
        </View>
        <View style={viewBottom}>
          <FlatList
            data={groupDetails?.members || ['1', '2', '3', '4']}
            renderItem={(item) => {
              return <RenderListItem item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};
MyProfileGroup.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.organisation.pending,
  groupDetails: state.group.groupDetails,
  user: state.user.user,
});
const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    viewListItem: {
      flexDirection: 'row',
      marginLeft: hp('3%'),
      marginRight: hp('3%'),
    },
    imgProfile: {
      height: hp('10%'),
      width: hp('10%'),
      borderWidth: 1,
      borderRadius: hp('5%'),
      marginVertical: hp('2%'),
    },
    textName: {
      fontSize: 25,
      fontWeight: '500',
      textAlignVertical: 'center',
      paddingTop: Platform.OS == 'ios' ? 45 : 0,
      paddingLeft: hp('2%'),
    },
    viewTop: {
      flex: 1.5,
    },
    viewBottom: {
      flex: 2,
    },
    textTopHeading: {
      fontSize: 40,
      marginLeft: hp('3%'),
      fontFamily: 'Asap-Bold',
    },
    textForAlle: {
      fontSize: 20,
      marginLeft: hp('3%'),
      marginRight: hp('3%'),
      fontFamily: 'Lato-Regular',
    },
    textForlat: {
      fontSize: 20,
      marginLeft: hp('3%'),
      marginRight: hp('3%'),
      paddingVertical: hp('5%'),
      fontFamily: 'Lato-Regular',
      textAlign: 'right',
      textDecorationLine: 'underline',
    },
    textMedlemmer: {
      fontSize: 20,
      marginLeft: hp('3%'),
      fontFamily: 'Lato-Regular',
    },
  });
export default connect(mapStateToProps, { leaveGroupOfOrganisation, detailsGroup })(MyProfileGroup);
