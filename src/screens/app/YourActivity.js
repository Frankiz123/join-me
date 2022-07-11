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
} from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyEventsWithFilter } from '../../redux/actions/activityActions';
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
import ActivityLoader from '../../components/UI/ActivityLoader';
import MenuIcon from '../../assets/images/MenuIcon';

const YourActivity = (props) => {
  const {
    navigation,
    token,
    route,
    getMyEventsWithFilter,
    myEventsWithFilter,
    disable,
    pending,
  } = props;
  useEffect(() => {
    getEventsHandler(0, 0, 10);
    async function acesssLocationFirstTime() {
      const accessLocation = await AsyncStorage.getItem('location');
      if (accessLocation === null || accessLocation === 'false') {
        setAlertShow(true);
      }
      if (accessLocation === 'true') {
        setAccessToLocation(false);
      }
    }
    acesssLocationFirstTime();
  }, []);
  const [take, setTake] = useState(10);
  const { colors } = useTheme();
  const {
    container,
    slide,
    latestvw,
    btnBackground,
    greyBackground,
    ipadstyle3,
    cardvw,
    Textvw,
    headText,
    emptytxt1,
    emptytxt2,
    emptybutn,
  } = styles(colors);
  const [showData, setShowData] = useState(true);
  const [alertShow, setAlertShow] = useState(false);
  const [coordinates, setCoodinates] = useState({
    lat: 59.924,
    lng: 10.751,
  });
  const onEndReached = () => {
    getEventsHandler(0, take, take + 10);
    setTake(take + 10);
  };
  const getEventsHandler = (orderBy, skipe, take, x, y) => {
    const bodyList = {
      listToLoad: 0,
      culture: '',
      skipe,
      take: 10,
      y: y || route.params?.y || 0, //lat
      x: x || route.params?.x || 0, //long
      range: 100,
      orderBy: 2,
      filterOn: [],
      deviceTime: new Date(),
    };
    getMyEventsWithFilter(token, bodyList);
  };
  setAccessToLocation = (setAccessToStore) => {
    if (setAccessToStore) {
      AsyncStorage.setItem('location', alertShow.toString());
    }

    Geocoder.init(GOOGLE_API_KEY);
    Geolocation.getCurrentPosition(
      (info) => {
        setCoodinates({ lat: info.coords.latitude, lng: info.coords.longitude });
        getEventsHandler(0, 0, 10, info.coords.latitude, info.coords.longitude);
        // setAddressNameHandler(info.coords.latitude, info.coords.longitude);
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };
  const eventDetailHandler = (id) => {
    navigation.navigate('ActivityDetail', { eventId: id });
  };
  return (
    <View style={container}>

      <ScrollView
        style={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        onMomentumScrollEnd={(event) => {
          onEndReached();
        }}
      >
        <SafeAreaView style={{ flex: 1, color: colors.secondBackground }}>
          <View
            style={{
              width: wp(95),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: hp(2),
            }}
          >
            <Icon
              onPress={() => navigation.goBack()}
              name={'arrow-left'}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
              size={30}
              type={'material-community'}
              color={colors.font}
              style={{
                marginLeft: wp(3.75),
              }}
            />
            <TouchableOpacity
              style={{
                marginHorizontal:
                  Platform.OS === 'ios' ? (Platform.isPad === true ? wp(5) : wp(7.5)) : wp(7.5),
                marginTop:Platform.OS ==='ios'? wp(3): 0,
              }}
              onPress={() => navigation.navigate('Menu')}
            >
              <MenuIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(90) : wp(85)) : wp(85),
            }}
          >
            <View style={{ maxWidth: hp(30) }}>
              <CustomText variant="veryBigTitle" style={headText}>
                {getString('activitiesList.ActivityList.sponsorLink2')}
              </CustomText>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginRight: Platform.isPad ? -wp(7.5) : -wp(11),
                marginTop: Platform.isPad ? -hp(6.5) : -hp(5.5),
                marginBottom: hp(2.5),
                zIndex: 1,
              }}
              onPress={() => navigation.navigate('AddActivity')}
            >
              <Icon
                color={'#FDC63E'}
                size={Platform.OS === 'ios' ? (Platform.isPad === true ? wp('7%') : wp(8)) : wp(8)}
                reverseColor={'black'}
                name="plus-a"
                type="fontisto"
                reverse={true}
              />


            </TouchableOpacity>
            {pending && myEventsWithFilter?.length === 0 ? (
              <ActivityLoader size={'small'} />
            ) : (
              <>
                <View
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {myEventsWithFilter?.length > 0 ? (
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity style={latestvw} onPress={() => {}}>
                        <CustomText variant="label" style={{ color: colors.font }}>
                          {getString('activitiesList.ActivityList.orderBy.nextup')}
                          {':'}
                        </CustomText>
                      </TouchableOpacity>

                      <View style={ipadstyle3}>
                        {Platform.isPad !== true ? (
                          <FlatList
                            style={{ alignSelf: 'center' }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: 'center', paddingBottom: hp(2) }}
                            data={myEventsWithFilter}
                            renderItem={({ item }) => {
                              if (item.eventType === 0) {
                                return (
                                  <ActivityItemRegular
                                    onPress={() => eventDetailHandler(item.id)}
                                    item={item}
                                  />
                                );
                              }
                              if (item.eventType === 1) {
                                return (
                                  <ActivityItemPro
                                    onPress={() => eventDetailHandler(item.id)}
                                    item={item}
                                  />
                                );
                              } else {
                                return (
                                  <ActivityItemSponsored
                                    onPress={() => eventDetailHandler(item.id)}
                                    item={item}
                                  />
                                );
                              }
                            }}
                            keyExtractor={(item, index) => item.id.toString() + index.toString()}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => onEndReached}
                          />
                        ) : (
                          <ScrollView>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                              <View>
                                {myEventsWithFilter
                                  .filter((_, i) => i % 2 !== 0)
                                  .map((item) => {
                                    if (item.eventType === 0) {
                                      return (
                                        <ActivityItemRegular
                                          oonPress={() => eventDetailHandler(item.id)}
                                          item={item}
                                        />
                                      );
                                    }
                                    if (item.eventType === 1) {
                                      return (
                                        <ActivityItemPro
                                          onPress={() => eventDetailHandler(item.id)}
                                          item={item}
                                        />
                                      );
                                    } else {
                                      return (
                                        <ActivityItemSponsored
                                          onPress={() => eventDetailHandler(item.id)}
                                          item={item}
                                        />
                                      );
                                    }
                                  })}
                              </View>
                              <View>
                                {myEventsWithFilter
                                  .filter((_, i) => i % 2 === 0)
                                  .map((item) => {
                                    if (item.eventType === 0) {
                                      return (
                                        <ActivityItemRegular
                                          onPress={() => eventDetailHandler(item.id)}
                                          item={item}
                                        />
                                      );
                                    }
                                    if (item.eventType === 1) {
                                      return (
                                        <ActivityItemPro
                                          onPress={() => eventDetailHandler(item.id)}
                                          item={item}
                                        />
                                      );
                                    } else {
                                      return (
                                        <ActivityItemSponsored
                                          onPress={() => eventDetailHandler(item.id)}
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
                          {getString('activitiesList.ActivityList.emptylist.title')}
                        </CustomText>

                        <CustomText variant="boldS" style={emptytxt2}>
                          {getString('activitiesList.ActivityList.emptylist.body')}
                        </CustomText>
                      </View>
                      <View style={emptybutn}>
                        <ButtonApp
                          buttonTitle={getString('createActivity.Name.title')}
                          onPress={() => navigation.navigate('AddActivity')}
                          btnBackground={colors.buttonBackground}
                          txtColor={{ color: colors.white }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

YourActivity.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  initialListEvents: state.activity.initialListEvents,
  initialListData: state.activity.initialListData,
  myEventsWithFilter: state.activity.myEventsWithFilter,
});

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
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
    Textvw: {
      justifyContent: 'center',
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(85) : wp(85)) : wp(85),
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
      alignSelf: 'flex-start',
      marginLeft: wp(5),
      marginTop: hp('3%'),
      flexDirection: 'row',
    },
    ipadstyle3: {
      marginTop: Platform.OS === 'ios' ? (Platform.isPad === true ? -wp(6) : -hp(2)) : -hp(2),
      margin: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2%') : wp('5%')) : wp('5%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(95) : wp(85)) : wp(85),
      flexDirection: Platform.OS === 'ios' ? (Platform.isPad === true ? 'row' : 'row') : 'row',
    },
  });
export default connect(mapStateToProps, { getMyEventsWithFilter })(YourActivity);
