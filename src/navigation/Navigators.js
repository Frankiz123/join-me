import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SmsVerificationScreen from '../screens/auth/SmsVerificationScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';

import FindYourOrganistionScreen from '../screens/organisation/FindYourOrganistionScreen';
import ConfirmConnectionToOrgScreen from '../screens/organisation/ConfirmConnectionToOrgScreen';

import FeideVerificationScreen from '../screens/feide/FeideVerificationScreen';

import ChooseGroupsScreen from '../screens/groups/ChooseGroupsScreen';
import CreateShortcutsScreen from '../screens/app/CreateShortcutsScreen';
import FindActivity from '../screens/app/FindActivity';
import AddActivity from '../screens/app/AddActivity';
import { Icon } from 'react-native-elements';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import MyOranisationGroupsScreen from '../screens/organisation/MyOranisationGroupsScreen';
import Menu from '../screens/app/Menu';
import AboutMe from '../screens/app/AboutMe';
import MyProfileGroup from '../screens/groups/MyProfileGroup';
import MenuContact from '../screens/app/MenuContact';
import HowMany from '../screens/app/HowMany';
import When from '../screens/app/When';
import Where from '../screens/app/Where';
import MyOrganisationSingleGroupsScreen from '../screens/organisation/MyOrganisationSingleGroupsScreen';
import Group from '../screens/app/Group';
import Subgroup from '../screens/app/Subgroup';
import Places from '../screens/app/Places';
import PlacesUrl from '../screens/app/PlacesURL';
import Inviting from '../screens/app/Inviting';
import Confirmation from '../screens/app/Confirmation';
import PlacesToMeet from '../screens/app/PlacesToMeet';

import { ActivityDetail, ActivityDetailMap } from '@screens';
import UpdateActivity from '../screens/app/UpdateActivity';
import Update from '../screens/app/Update';
import Comments from '../screens/app/Comments';
import CreateComment from '../screens/app/CreateComment';
import UpdateComments from '../screens/app/UpdateComments';
import MenuSettings from '../screens/app/MenuSettings';
import Attendees from '../screens/app/Attendees';
import SearchOraganisationScreen from '../screens/organisation/SearchOraganisationScreen';
import YourActivity from '../screens/app/YourActivity';
import MyOrganisationScreen from '../screens/organisation/MyOrganisationScreen';

const defaultNavOptions = {
  headerShown: false,
};

let AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <AuthStackNavigator.Screen
        name="SmsVerification"
        component={SmsVerificationScreen}
        options={{ title: 'SmsVerification' }}
      />

      <AuthStackNavigator.Screen name="HomeNavigator" component={HomeNavigator} />
    </AuthStackNavigator.Navigator>
  );
};
let ActivityStackModal = createStackNavigator();
function ActivityModals() {
  return (
    <ActivityStackModal.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <ActivityStackModal.Screen name="GroupModal" component={Group} />
      <ActivityStackModal.Screen name="AddActivityModal" component={AddActivity} />
      <ActivityStackModal.Screen name="WhenModal" component={When} />
      <ActivityStackModal.Screen name="Where" component={Where} />
      <ActivityStackModal.Screen name="HowManyModal" component={HowMany} />
      <ActivityStackModal.Screen name="CommentsModal" component={Comments} />
    </ActivityStackModal.Navigator>
  );
}
const HomeStackNavigator = createStackNavigator();
export const HomeNavigator = (props) => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
      {props.firstTimeCompleted !== true ? (
        <>
          <HomeStackNavigator.Screen
            name="AboutYou"
            component={ProfileScreen}
            options={{ title: 'About you' }}
          />
        </>
      ) : (
        <>
          <HomeStackNavigator.Screen name="FindActivity" component={FindActivity} />
          {/* <HomeStackNavigator.Screen name="ActivityList" component={ActivityList} /> */}

          <HomeStackNavigator.Screen
            name="AboutYou"
            component={ProfileScreen}
            options={{ title: 'About you' }}
          />
        </>
      )}

      {/* <HomeStackNavigator.Screen name="ActivityList" component={ActivityList} /> */}
      {/* <HomeStackNavigator.Screen name="FindActivity" component={FindActivity} /> */}
      <HomeStackNavigator.Screen
        name="FindYourOrganistion"
        component={FindYourOrganistionScreen}
        options={{ title: 'FindYourOrganistion' }}
      />
      <HomeStackNavigator.Screen
        name="SearchOrganisation"
        component={SearchOraganisationScreen}
        options={{ title: 'SearchOrganisation' }}
      />

      <HomeStackNavigator.Screen
        name="FeideVerification"
        component={FeideVerificationScreen}
        options={{ title: 'FeideVerification' }}
      />
      <HomeStackNavigator.Screen
        name="ConfirmConnectionToOrg"
        component={ConfirmConnectionToOrgScreen}
        options={{ title: 'ConfirmConnectionToOrg' }}
      />

      <HomeStackNavigator.Screen name="Menu" component={Menu} />

      <HomeStackNavigator.Screen
        name="ChooseGroups"
        component={ChooseGroupsScreen}
        options={{ title: 'ChooseGroups' }}
      />
      <HomeStackNavigator.Screen name="AboutMe" component={AboutMe} />
      <HomeStackNavigator.Screen name="MyProfileGroup" component={MyProfileGroup} />
      <HomeStackNavigator.Screen name="MenuContact" component={MenuContact} />
      <HomeStackNavigator.Screen name="MenuSettings" component={MenuSettings} />
      <HomeStackNavigator.Screen name="Comments" component={Comments} />
      <HomeStackNavigator.Screen name="CreateComment" component={CreateComment} />
      <HomeStackNavigator.Screen name="UpdateComments" component={UpdateComments} />

      <HomeStackNavigator.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ title: 'My Profile' }}
      />
       <HomeStackNavigator.Screen
        name="MyOrganisation"
        component={MyOrganisationScreen}
        options={{ title: 'My organisation' }}
      />
      <HomeStackNavigator.Screen
        name="MyOranisationGroups"
        component={MyOranisationGroupsScreen}
        options={{ title: 'My Oranisation My Groups' }}
      />

      <HomeStackNavigator.Screen
        name="MyOrganisationSingleGroups"
        component={MyOrganisationSingleGroupsScreen}
        options={{ title: 'My Organisation Single Groups' }}
      />

      <HomeStackNavigator.Screen name="CreateShortcutsScreen" component={CreateShortcutsScreen} />

      <HomeStackNavigator.Screen name="AddActivity" component={AddActivity} />
      <HomeStackNavigator.Screen name="When" component={When} />
      <HomeStackNavigator.Screen name="HowMany" component={HowMany} />
      <HomeStackNavigator.Screen name="Where" component={Where} />
      <HomeStackNavigator.Screen name="Group" component={Group} />
      <HomeStackNavigator.Screen name="Subgroup" component={Subgroup} />

      <HomeStackNavigator.Screen name="Places" component={Places} />
      <HomeStackNavigator.Screen name="PlacesUrl" component={PlacesUrl} />
      <HomeStackNavigator.Screen name="Inviting" component={Inviting} />
      <HomeStackNavigator.Screen name="Confirmation" component={Confirmation} />

      <HomeStackNavigator.Screen name="ActivityModals" component={ActivityModals} />
      <HomeStackNavigator.Screen name="ActivityDetail" component={ActivityDetail} />
      <HomeStackNavigator.Screen name="ActivityDetailMap" component={ActivityDetailMap} />

      <HomeStackNavigator.Screen name="PlacesToMeet" component={PlacesToMeet} />
      <HomeStackNavigator.Screen name="UpdateActivity" component={UpdateActivity} />
      <HomeStackNavigator.Screen name="Update" component={Update} />
      <HomeStackNavigator.Screen name="Attendees" component={Attendees} />
      <HomeStackNavigator.Screen name="YourActivity" component={YourActivity} />

      <HomeStackNavigator.Screen name="AuthNavigator" component={AuthNavigator} />
    </HomeStackNavigator.Navigator>
  );
};
