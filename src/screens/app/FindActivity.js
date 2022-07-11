import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import CardImage from '../../components/UI/CardImage';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { CheckBox } from '@components';
import Input from '../../components/UI/Input';
import { ActivityLoader } from '@components';
import BottomModel from '../../components/UI/BottomModel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OpenAppSettings from 'react-native-app-settings';
import {
  getInitEventList,
  getInitList,
  getAllForUser,
} from '../../redux/actions/activityActions';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActivityItemPro from '../../components/activity/ActivityItemPro';
import ActivityItemRegular from '../../components/activity/ActivityItemRegular';
import ActivityItemSponsored from '../../components/activity/ActivityItemSponsored';
import { AccessAlert } from '../../components/UI/AccessAlert';
import AsyncStorage from '@react-native-community/async-storage';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { GOOGLE_API_KEY } from '../../tools/config';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import AndroidOpenSettings from 'react-native-android-open-settings';
import MenuIcon from '../../assets/images/MenuIcon';
import { checkNotifications } from 'react-native-permissions';

const FindActivity = (props) => {
  const {
    navigation,
    token,
    route,
    getInitList,
    initialListData,
    disable,
    initEvents,
    pending,
    getAllForUser,
    shortcutForUser,
  } = props;
  const [selectedIdArray, setSelectedIdArray] = useState([]);
  const [orderBy, setOrderBy] = useState(3);
  const [take, setTake] = useState(10);
  const { colors } = useTheme();
  const [mymodel, setmymodel] = useState(false);
  const [selectOne, setSelectOne] = useState(false);
  const {
    dropContainer,
    dropContainer22,
    buttonContainer,
    container,
    latestvw,
    btnBackground,
    greyBackground,
    ipadstyle3,
    Textvw,
    headText,
    emptytxt1,
    emptytxt2,
    emptybutn,
  } = styles(colors);
  const [showData, setShowData] = useState(true);
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow3, setAlertShow3] = useState(false);
  const [locationStatus, setLocationStatus] = useState(3);

  const [coordinates, setCoodinates] = useState({
    lat: 59.924,
    lng: 10.751,
  });
  const notshow = () => {
    setmymodel(true);
  };
  const groupIds = [];
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = () => {};
  const onRefresh = async () => {
    setRefreshing(true);
    const accessLocation = await AsyncStorage.getItem('location');
    if (accessLocation === null || accessLocation === 'false') {
      // setAlertShow(true);
      setAccessToLocation(false, 0, true);
    }
    if (accessLocation === 'true') {
      console.log('seteeer');
      setAccessToLocation(false, 0, true);
    }
    // getEventsHandler(orderBy, 0, 10, coordinates.lng, coordinates.lat, true);
    setRefreshing(false);
  };

  useEffect(() => {
    // getAllForUser(token);
    // getEventsHandler(0, 0, 10);
    async function acesssLocationFirstTime() {
      const accessLocation = await AsyncStorage.getItem('location');
      if (accessLocation === null || accessLocation === 'false') {
        setAlertShow(true);
        // request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        //   // …
        // });
        setAccessToLocation(false);
      }
      if (accessLocation === 'true') {
        setAccessToLocation(false);
      }
    }
    acesssLocationFirstTime();
    askNotificationPermissionHandler();
  }, []);

  askNotificationPermissionHandler = async () => {
    const permissionAskDate = await AsyncStorage.getItem('permissionAskDate');
    checkNotifications().then(({ status, settings }) => {
      if (status !== 'granted') {
        var a = moment(permissionAskDate);
        var b = moment(new Date());
        var x = a.diff(b, 'minutes');
        if (permissionAskDate === null || x < -1) {
          var date = moment(new Date());
          AsyncStorage.setItem('permissionAskDate', date.toString());
          setAlertShow3(true);
        }
      }
    });
  };

  const onEndReached = async () => {
    const accessLocation = await AsyncStorage.getItem('location');
    if (accessLocation === null || accessLocation === 'false') {
      // setAlertShow(true);
      setAccessToLocation(false, 0, false);
    }
    if (accessLocation === 'true') {
      setAccessToLocation(false, take + 10, false);
      setTake(take + 10);
    }
  };
  const getEventsHandler = async (
    orderBy,
    skipe,
    take,
    x,
    y,
    refresh = false,
    filterOn = []
  ) => {
    const bodyList = {
      listToLoad: 0,
      culture: '',
      skipe,
      take: 10,
      y: y || coordinates.lat || 0, //lat
      x: x || coordinates.lng || 0, //long
      range: 100,
      orderBy: orderBy,
      filterOn: filterOn,
      deviceTime: new Date(),
    };
    const success = await getInitList(token, bodyList, refresh);
    return success;
  };
  const selectedItem = (id) => {
    let checkedItems = [];
    checkedItems = [...selectedIdArray];
    if (
      checkedItems.length === 0 ||
      checkedItems.find((item) => item === id) !== id
    ) {
      checkedItems.push(id);
    } else if (checkedItems.find((item) => item === id) === id) {
      checkedItems = checkedItems.filter((i) => i !== id);
    }

    setSelectedIdArray(checkedItems);
    getEventsHandler(
      orderBy,
      0,
      0,
      coordinates.lng,
      coordinates.lat,
      true,
      checkedItems
    );
  };
  const isChecked = (id) => {
    if (selectedIdArray.indexOf(id) === -1) {
      return false;
    }
    return true;
  };
  const clearFilters = () => {
    console.log('clear');
    getEventsHandler(orderBy, 0, 0, coordinates.lng, coordinates.lat, true, []);
    setSelectedIdArray([]);
  };
  const setAccessToLocation = (setAccessToStore, skip = 0, refresh = true) => {
    if (setAccessToStore) {
      AsyncStorage.setItem('location', alertShow.toString());
    }
    Geocoder.init(GOOGLE_API_KEY);
    Geolocation.getCurrentPosition(
      (info) => {
        setCoodinates({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        });
        getEventsHandler(
          orderBy,
          skip,
          0,
          info.coords.longitude,
          info.coords.latitude,
          refresh
        );
        // setAddressNameHandler(info.coords.latitude, info.coords.longitude);
        console.log('status', info);
      },
      (error) => {
        setLocationStatus(error.code);
        console.log('status', error.code);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const onAttendeesPress = (item) => {
    navigation.navigate('Attendees', {
      eventId: item.id,
      createdBy: item.createdById,
      eventTitle: item.title,
    });
  };
  const onCommentPress = (item) => {
    navigation.navigate('Comments', { eventId: item.id, title: item.title });
  };
  const eventDetailHandler = (id) => {
    navigation.navigate('ActivityDetail', { eventId: id });
  };

  return (
    <View style={container}>
      <ScrollView
        style={{ flexGrow: 1, borderWidth: 1 }}
        // onScroll={}
        contentInsetAdjustmentBehavior="automatic"
        onMomentumScrollEnd={(event) => {
          if (event.nativeEvent.contentOffset.y > 0) {
            onEndReached();
          }
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <SafeAreaView style={{ flex: 1, color: colors.secondBackground }}>
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              marginHorizontal:
                Platform.OS === 'ios'
                  ? Platform.isPad === true
                    ? wp(5)
                    : wp(7.5)
                  : wp(7.5),
              marginTop: Platform.OS === 'ios' ? wp(3) : wp(3),
            }}
            onPress={() => navigation.navigate('Menu')}>
            <MenuIcon />
          </TouchableOpacity>

          <View
            style={{
              alignSelf: 'center',
              width:
                Platform.OS === 'ios'
                  ? Platform.isPad === true
                    ? wp(90)
                    : wp(85)
                  : wp(85),
            }}>
            <View style={{ maxWidth: hp(30) }}>
              <CustomText variant="veryBigTitle" style={headText}>
                {getString('activitiesList.ActivityList.title')}
              </CustomText>
    
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginRight: Platform.isPad ? -wp(7.5) : -wp(11),
                marginTop: Platform.isPad ? -hp(6.5) : -hp(5),
                marginBottom: hp(2.5),
                zIndex: 1,
              }}
              onPress={() => navigation.navigate('AddActivity')}>
              <Icon
                color={'#FDC63E'}
                size={
                  Platform.OS === 'ios'
                    ? Platform.isPad === true
                      ? wp('7%')
                      : wp(8)
                    : wp(8)
                }
                reverseColor={'black'}
                name="plus-a"
                type="fontisto"
                reverse={true}
              />
            </TouchableOpacity>

            {pending && initEvents?.length === 0 && refreshing === false ? (
              <ActivityLoader size={'small'} />
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width:
                      Platform.OS === 'ios'
                        ? Platform.isPad === true
                          ? wp(90)
                          : wp(85)
                        : wp(85),
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={buttonContainer}>
                      <ButtonApp
                        buttonTitle={getString('firstTime.aboutyou.btnAll')}
                        onPress={() => clearFilters()}
                        btnBackground={
                          selectedIdArray.length > 0
                            ? colors.greyBackground
                            : colors.btnBackground
                        }
                        txtColor={{
                          color:
                            selectedIdArray.length > 0
                              ? colors.font
                              : colors.btnText,
                        }}
                        buttonStyle={{
                          minWidth:Platform.isPad === true ? wp(12) : wp(17),
                          height: hp(5),
                          paddingHorizontal:
                            Platform.isPad === true ? wp(0.5) : wp(3),

                          marginRight: wp(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 85,
                          marginVertical:hp(0.3)
                        }}
                      />
                    </View>
                    <View>
                      <FlatList
                        data={initialListData.filters}
                        keyExtractor={(item, index) => 'key' + index}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) => {
                          return (
                            <View style={buttonContainer}>
                              <ButtonApp
                                onPress={() => selectedItem(item.item.id)}
                                btnBackground={
                                  !isChecked(item.item.id)
                                    ? colors.greyBackground
                                    : colors.btnBackground
                                }
                                txtColor={{
                                  color: !isChecked(item.item.id)
                                    ? colors.check
                                    : colors.btnText,
                                  paddingHorizontal: 0,
                                  marginHorizontal:wp(2)
                                }}
                                buttonTitle={item.item.name}
                                buttonStyle={{
                                  height: hp(5),
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  minWidth:
                                    Platform.isPad === true ? wp(12) : wp(15),
                                  paddingHorizontal:
                                    Platform.isPad === true ? wp(0.5) : wp(3),
                                  marginRight: wp(2),
                                  borderRadius: 85,
                                  marginVertical:hp(0.3)
                                }}
                              />
                            </View>
                          );
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CreateShortcutsScreen', {
                          getList:locationStatus !== 1 && locationStatus !== 2,
                          bodylist:{
                          listToLoad: 0,
                          culture: '',
                          skipe: 0,
                          take: 10,
                          y: coordinates.lat || 0, //lat
                          x: coordinates.lng || 0, //long
                          range: 100,
                          orderBy: orderBy,
                          filterOn: [],
                          deviceTime: new Date(),
                          }
                        })
                      }
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: -wp(2),
                        height:hp(5)
                      }}>
                      <Icon
                        color={colors.greyBackground}
                        size={
                          Platform.OS === 'ios'
                            ? Platform.isPad === true
                              ? hp(2.35)
                              : hp(2.85)
                            : hp(2.85)
                        }
                        reverseColor={colors.shortcutPlus}
                        name="plus"
                        type="material-community"
                        reverse={true}
                      />
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                  }}>
                  {initialListData?.nrOfMyEvents !== 0 &&
                  initialListData?.nrOfMyEvents != undefined ? (
                    <TouchableOpacity
                      style={dropContainer}
                      onPress={() =>
                        navigation.navigate('YourActivity', {
                          y: coordinates.lat,
                          x: coordinates.lng,
                        })
                      }>
                      <CustomText variant="body2">
                        {getString(
                          'activitiesList.ActivityList.linkTextMyEvents'
                        )}
                        {initialListData?.nrOfMyEvents}
                      </CustomText>
                      <Icon
                        onPress={() =>
                          navigation.navigate('YourActivity', {
                            y: coordinates.lat,
                            x: coordinates.lng,
                          })
                        }
                        size={
                          Platform.OS === 'ios'
                            ? Platform.isPad === true
                              ? wp('4%')
                              : wp('6%')
                            : wp('6%')
                        }
                        name="arrow-right"
                        type="material-community"
                        color={colors.font}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={dropContainer22}>
                      <CustomText
                        variant="body2"
                        style={{ color: colors.darkFont }}>
                        {getString(
                          'activitiesList.ActivityList.emptylist.noevents'
                        )}
                      </CustomText>
                    </TouchableOpacity>
                  )}
                  {initialListData.nrOfSponsors > 0 && (
                    <TouchableOpacity
                      style={dropContainer}
                      onPress={() =>
                        navigation.navigate('PlacesToMeet', {
                          y: coordinates.lat,
                          x: coordinates.lng,
                        })
                      }>
                      <CustomText variant="body2">
                        {getString('activitiesList.ActivityList.sponsorLink')}
                      </CustomText>
                      <Icon
                        name="arrow-right"
                        size={
                          Platform.OS === 'ios'
                            ? Platform.isPad === true
                              ? wp('4%')
                              : wp('6%')
                            : wp('6%')
                        }
                        onPress={() =>
                          navigation.navigate('PlacesToMeet', {
                            y: coordinates.lat,
                            x: coordinates.lng,
                          })
                        }
                        color={colors.font}
                        type="material-community"
                      />
                    </TouchableOpacity>
                  )}
                  <BottomModel
                    onRequestClose={() => setmymodel(false)}
                    isVisible={mymodel}
                    onPressVisible={() => setmymodel(false)}
                    onPressItem1={() => {
                      getEventsHandler(
                        2,
                        0,
                        0,
                        coordinates.lng,
                        coordinates.lat,
                        true
                      );
                      setOrderBy(2);
                      setmymodel(false);
                    }}
                    onPressItem2={() => {
                      getEventsHandler(
                        0,
                        0,
                        0,
                        coordinates.lng,
                        coordinates.lat,
                        true
                      );
                      setOrderBy(0);
                      setmymodel(false);
                    }}
                    onPressItem3={() => {
                      getEventsHandler(
                        1,
                        0,
                        0,
                        coordinates.lng,
                        coordinates.lat,
                        true
                      );
                      setOrderBy(1);
                      setmymodel(false);
                    }}
                    onPressItem4={() => {
                      getEventsHandler(
                        4,
                        0,
                        0,
                        coordinates.lng,
                        coordinates.lat,
                        true
                      );
                      setOrderBy(4);
                      setmymodel(false);
                    }}
                    iconName={'checkmark'}
                    iconType={'ionicon'}
                    title1={getString(
                      'activitiesList.ActivityList.orderBy.nextup'
                    )}
                    title2={getString(
                      'activitiesList.ActivityList.orderBy.newest'
                    )}
                    title3={getString(
                      'activitiesList.ActivityList.orderBy.distance'
                    )}
                    title4={getString(
                      'activitiesList.ActivityList.orderBy.online'
                    )}
                    icon1={orderBy === 2}
                    icon2={orderBy === 0}
                    icon3={orderBy === 1}
                    icon3={orderBy === 4}
                  />

                  {initEvents?.length > 0 ? (
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity
                        style={latestvw}
                        onPress={() => setmymodel(true)}>
                        <CustomText
                          variant="label"
                          style={{ color: colors.font }}>
                          {orderBy === 1
                            ? getString(
                                'activitiesList.ActivityList.orderBy.distance'
                              )
                            : orderBy == 2
                            ? getString(
                                'activitiesList.ActivityList.orderBy.nextup'
                              )
                            : orderBy == 4
                            ? getString(
                                'activitiesList.ActivityList.orderBy.online'
                              )
                            : getString(
                                'activitiesList.ActivityList.orderBy.newest'
                              )}
                        </CustomText>
                        <TouchableOpacity
                          onPress={() => setmymodel(true)}
                          style={{
                            marginTop:
                              Platform.OS === 'ios'
                                ? Platform.isPad === true
                                  ? wp('0.5%')
                                  : wp('1%')
                                : wp('0.05%'),
                          }}>
                          <Icon
                            name="keyboard-arrow-down"
                            color={colors.font}
                            size={
                              Platform.OS === 'ios'
                                ? Platform.isPad === true
                                  ? wp('4%')
                                  : wp('6%')
                                : wp('6%')
                            }
                            type="material"
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>

                      <View style={ipadstyle3}>
                        {Platform.isPad !== true ? (
                          <FlatList
                            style={{ alignSelf: 'center' }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                              alignItems: 'center',
                              paddingBottom: hp(2),
                            }}
                            data={initEvents}
                            renderItem={({ item }) => {
                              if (item.eventType === 0) {
                                return (
                                  <ActivityItemRegular
                                    onAttendeesPress={() =>
                                      onAttendeesPress(item)
                                    }
                                    onCommentPress={() => onCommentPress(item)}
                                    onPress={() => eventDetailHandler(item.id)}
                                    item={item}
                                  />
                                );
                              }
                              if (item.eventType === 1) {
                                return (
                                  <ActivityItemPro
                                    onAttendeesPress={() =>
                                      onAttendeesPress(item)
                                    }
                                    onCommentPress={() => onCommentPress(item)}
                                    onPress={() => eventDetailHandler(item.id)}
                                    item={item}
                                  />
                                );
                              } else {
                                return (
                                  <ActivityItemSponsored
                                    onAttendeesPress={() =>
                                      onAttendeesPress(item)
                                    }
                                    onCommentPress={() => onCommentPress(item)}
                                    onPress={() => eventDetailHandler(item.id)}
                                    item={item}
                                  />
                                );
                              }
                            }}
                            keyExtractor={(item, index) =>
                              item.id.toString() + index.toString()
                            }
                            onEndReachedThreshold={0.2}
                            onEndReached={() => onEndReached}
                          />
                        ) : (
                          <ScrollView>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                              }}>
                              <View>
                                {initEvents
                                  .filter((_, i) => i % 2 !== 0)
                                  .map((item) => {
                                    if (item.eventType === 0) {
                                      return (
                                        <ActivityItemRegular
                                          onAttendeesPress={() =>
                                            onAttendeesPress(item)
                                          }
                                          onCommentPress={() =>
                                            onCommentPress(item)
                                          }
                                          onPress={() =>
                                            eventDetailHandler(item.id)
                                          }
                                          item={item}
                                        />
                                      );
                                    }
                                    if (item.eventType === 1) {
                                      return (
                                        <ActivityItemPro
                                          onAttendeesPress={() =>
                                            onAttendeesPress(item)
                                          }
                                          onCommentPress={() =>
                                            onCommentPress(item)
                                          }
                                          onPress={() =>
                                            eventDetailHandler(item.id)
                                          }
                                          item={item}
                                        />
                                      );
                                    } else {
                                      return (
                                        <ActivityItemSponsored
                                          onAttendeesPress={() =>
                                            onAttendeesPress(item)
                                          }
                                          onCommentPress={() =>
                                            onCommentPress(item)
                                          }
                                          onPress={() =>
                                            eventDetailHandler(item.id)
                                          }
                                          item={item}
                                        />
                                      );
                                    }
                                  })}
                              </View>
                              <View>
                                {initEvents
                                  .filter((_, i) => i % 2 === 0)
                                  .map((item) => {
                                    if (item.eventType === 0) {
                                      return (
                                        <ActivityItemRegular
                                          onAttendeesPress={() =>
                                            onAttendeesPress(item)
                                          }
                                          onCommentPress={() =>
                                            onCommentPress(item)
                                          }
                                          onPress={() =>
                                            eventDetailHandler(item.id)
                                          }
                                          item={item}
                                        />
                                      );
                                    }
                                    if (item.eventType === 1) {
                                      return (
                                        <ActivityItemPro
                                          onAttendeesPress={() =>
                                            onAttendeesPress(item)
                                          }
                                          onCommentPress={() =>
                                            onCommentPress(item)
                                          }
                                          onPress={() =>
                                            eventDetailHandler(item.id)
                                          }
                                          item={item}
                                        />
                                      );
                                    } else {
                                      return (
                                        <ActivityItemSponsored
                                          onAttendeesPress={() =>
                                            onAttendeesPress(item)
                                          }
                                          onCommentPress={() =>
                                            onCommentPress(item)
                                          }
                                          onPress={() =>
                                            eventDetailHandler(item.id)
                                          }
                                          item={item}
                                        />
                                      );
                                    }
                                  })}
                              </View>
                            </View>
                          </ScrollView>
                        )}
                      </View>
                    </View>
                  ) : (
                    <View style={Textvw}>
                      <View>
                        <CustomText variant="title" style={emptytxt1}>
                          {locationStatus === 2
                            ? getString(
                                'activitiesList.ActivityList.emptylist.titleTurnOffLocation'
                              )
                            : locationStatus === 1
                            ? getString(
                                'activitiesList.ActivityList.emptylist.titlePermission'
                              )
                            : getString(
                                'activitiesList.ActivityList.emptylist.title'
                              )}
                        </CustomText>

                        {locationStatus === 3 && (
                          <CustomText variant="boldS" style={emptytxt2}>
                            {getString(
                              'activitiesList.ActivityList.emptylist.body'
                            )}
                          </CustomText>
                        )}
                      </View>
                      <View style={emptybutn}>
                        <ButtonApp
                          buttonTitle={
                            locationStatus === 2
                              ? getString(
                                  'activitiesList.ActivityList.emptylist.btnTurn'
                                )
                              : locationStatus === 1
                              ? getString(
                                  'activitiesList.ActivityList.emptylist.btnPerm'
                                )
                              : getString('createActivity.Name.title')
                          }
                          onPress={() => {
                            if (locationStatus === 2) {
                              if (Platform.OS === 'ios') {
                                OpenAppSettings.open();
                              } else {
                                AndroidOpenSettings.locationSourceSettings();
                              }
                            } else if (locationStatus === 1) {
                              OpenAppSettings.open();
                            } else {
                              navigation.navigate('AddActivity');
                            }
                          }}
                          btnBackground={colors.buttonBackground}
                          txtColor={{ color: colors.white }}
                          buttonStyle={{
                            minWidth:
                              locationStatus === 2 || locationStatus === 1
                                ? wp(45)
                                : wp(30),
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
                <AccessAlert
                  title={getString('logOn.location.title')}
                  btn1Text={getString('logOn.location.yes')}
                  btn2Text={getString('logOn.location.no')}
                  visible={alertShow}
                  setVisible={(val) => setAlertShow(val)}
                  allowHandler={() => setAccessToLocation(true)}
                />
                <AccessAlert
                  title={getString('logOn.notification.title')}
                  btn1Text={getString('logOn.notification.yes')}
                  btn2Text={getString('logOn.notification.no')}
                  body={getString('logOn.notification.main')}
                  visible={alertShow3}
                  setVisible={(val) => setAlertShow3(val)}
                  allowHandler={() => {
                    OpenAppSettings.open();
                    setAlertShow3(false);
                  }}
                />
              </>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

FindActivity.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  initialListEvents: state.activity.initialListEvents,
  initialListData: state.activity.initialListData,
  initEvents: state.activity.initEvents,
  shortcutForUser: state.activity.shortcutForUser,
});

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    eventdatecontainer: {
      alignItems: 'center',
      backgroundColor: 'red',
      paddingTop: 60,
    },
    eventdatebutton: {
      alignItems: 'center',
      backgroundColor: 'purple',
      padding: 10,
      marginTop: 10,
      borderRadius: 10,
    },
    buttonContainer: {
      alignSelf: 'center',
      marginVertical: hp('0.5%'),
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: colors.font,
      // justifyContent:'center'
      //   flexDirection:'row'
    },
    emptybutn: {
      width: wp('35%'),
      height: hp('7%'),
      alignSelf: 'flex-start',
      marginLeft: wp('6%'),
      margin: wp('3%'),
      justifyContent: 'flex-start',
      color: colors.font,
    },
    dropContainer: {
      marginTop: hp('2%'),
      paddingHorizontal: wp('5%'),
      width: Platform.isPad === true ? wp(90) : wp(85),
      marginHorizontal:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('5%')
            : wp('10%')
          : wp('5%'),
      height: hp(9),
      borderWidth: 1,
      borderColor: colors.grayLine,
      backgroundColor: colors.secondBackground,
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropContainer22: {
      marginTop: hp('2%'),
      paddingHorizontal: wp('5%'),
      width: Platform.isPad === true ? wp(90) : wp(85),
      marginHorizontal:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('5%')
            : wp('10%')
          : wp('5%'),
      height: hp(9),
      // borderWidth: 1,
      borderColor: '#c1c1c1',
      backgroundColor: colors.greyStroke,
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    Textvw: {
      justifyContent: 'center',
      width:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp(85)
            : wp(85)
          : wp(85),
      alignSelf: 'center',
      marginTop: wp('7%'),
      backgroundColor: colors.greybackground,
    },
    headText: {
      maxWidth: wp('60%'),
    },
    emptytxt1: {
      fontSize: hp('4%'),
      color: colors.font,
      width: wp('70%'),
      fontWeight: 'bold',
      margin: wp('2.5%'),
    },
    emptytxt2: {
      fontSize: hp('2.8%'),
      color: colors.greyishFont,
      width: wp('70%'),
      margin: wp('2.5%'),
    },
    latestvw: {
      alignSelf: 'flex-end',
      marginRight: wp(8),
      marginTop: hp('3%'),
      flexDirection: 'row',
      height: Platform.isPad ? hp(6) : hp(5),
      zIndex: 3,
    },
    ipadstyle1: {
      alignItems: 'center',
      justifyContent: 'center',
      width:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp(85)
            : wp(85)
          : wp(85),
      flexDirection:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? 'row'
            : 'column'
          : 'column',
    },
    ipadstyle2: {
      margin:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('3%')
            : wp('5%')
          : wp('5%'),
      width:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('40%')
            : wp(85)
          : wp(85),
      flexDirection:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? 'column'
            : 'row'
          : 'row',
    },
    ipadstyle3: {
      marginTop:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? -wp(8.5)
            : -wp(6)
          : -wp(6),
      margin:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('2%')
            : wp('5%')
          : wp('5%'),
      width:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp(95)
            : wp(85)
          : wp(85),
      flexDirection:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? 'row'
            : 'row'
          : 'row',
    },
    ipadstyle4: {
      marginRight:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('4%')
            : wp('0%')
          : wp('5%'),
      width:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? wp('40%')
            : wp(85)
          : wp(85),
      flexDirection:
        Platform.OS === 'ios'
          ? Platform.isPad === true
            ? 'column'
            : 'row'
          : 'row',
    },
  });
export default connect(mapStateToProps, {
  getInitEventList,
  getInitList,
  getAllForUser,
})(FindActivity);
