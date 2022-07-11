import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import CardImage from '../../components/UI/CardImage';
import CustomText from '../../components/UI/CustomText';
import { Icon } from 'react-native-elements';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import ActivityItemPro from '../../components/activity/ActivityItemPro';
import ActivityItemRegular from '../../components/activity/ActivityItemRegular';
import ActivityItemSponsored from '../../components/activity/ActivityItemSponsored';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMySponsorEvents } from '../../redux/actions/activityActions';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import ActivityLoader from '../../components/UI/ActivityLoader';
import MenuIcon from '../../assets/images/MenuIcon';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const PlacesToMeet = (props) => {
  const { navigation, token, getMySponsorEvents, mySponsorEvents, pending,route } = props;
  const [eventsList, setEventsList] = useState('');
  const { colors } = useTheme();
  const {
    dropContainer,
    buttonContainer,
    container,
    daytext,
    image,
    image22,
    latestvw,
    btnBackground,
    greyBackground,
    image11,
    ipadstyle1,
    ipadstyle2,
    ipadstyle3,
    ipadstyle4,
    cardvw,
    Textvw,
    headText,
    emptytxt1,
    emptytxt2,
    emptybutn,
  } = styles(colors);
  const [showData, setShowData] = useState(true);

  const [take, setTake] = useState(10);
  useEffect(() => {
    getEventsHandler(0, 0, 10);
    console.log('params',route);
  }, []);
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
    console.log('bodyList spos',bodyList)
    getMySponsorEvents(token, bodyList);
  };
  const onEndReached = () => {
    getEventsHandler(0, take, take + 10);
    setTake(take + 10);
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
            <View style={{ height: hp('20%') }}>
              <CustomText variant="veryBigTitle" style={headText}>
                {getString('activitiesList.ActivityList.sponsorLink')}
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
            {/* <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
                width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp(90) : wp(85)) : wp(85),
              }}
            ></View> */}
            {pending && mySponsorEvents?.length === 0 ? (
              <ActivityLoader size={'small'} />
            ) : (
              <>
                <View
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  {mySponsorEvents?.length > 0 ? (
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity style={latestvw} onPress={() => {}}>
                        <CustomText variant="label" style={{ color: colors.font }}>
                          {getString('activitiesList.ActivityList.orderBy.near')}
                          {':'}
                        </CustomText>
                      </TouchableOpacity>

                      <View style={ipadstyle3}>
                        {Platform.isPad !== true ? (
                          <FlatList
                            style={{ alignSelf: 'center' }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ alignItems: 'center', paddingBottom: hp(2) }}
                            data={mySponsorEvents}
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
                                {mySponsorEvents
                                  .filter((_, i) => i % 2 !== 0)
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
                              <View>
                                {mySponsorEvents
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

PlacesToMeet.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pending: state.activity.pending,
  mySponsorEvents: state.activity.mySponsorEvents,
});

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
    buttonContainer: {
      alignSelf: 'flex-start',
      margin: hp('0.5%'),
      justifyContent: 'flex-start',
      color: colors.font,
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
      padding: wp('5%'),
      width: wp('80%'),
      marginHorizontal: wp('3%'),
      height: hp('10%'),
      borderWidth: 1,
      borderColor: '#c1c1c1',
      backgroundColor: colors.background,
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: hp(3),
    },
    Textvw: {
      justifyContent: 'center',
      width: wp('70%'),
      alignItems: 'center',
      margin: wp('7%'),
      backgroundColor: colors.background,
    },
    headText: {
      fontSize: height * 0.05,
      color: colors.font,
      marginTop: wp('4%'),
      marginLeft: wp('-1%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('65%') : wp('70%')) : wp('70%'),
      fontWeight: 'bold',
    },
    emptytxt1: {
      fontSize: hp('4%'),
      color: colors.font,
      width: wp('70%'),
      fontWeight: 'bold',
      margin: wp('2%'),
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

    cardvw: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: wp('5%'),
      paddingBottom:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('1%')) : wp('2%'),
      borderRadius: wp('3%'),
      flexDirection: 'column',
      backgroundColor: colors.greyBackground,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('37%') : wp('80%')) : wp('80%'),
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('0%')) : wp('0%'),
      margin: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('3%') : wp('5%')) : wp('5%'),
      marginTop: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('3%') : wp('5%')) : wp('5%'),
    },
    image: {
      height: Platform.OS === 'ios' ? (Platform.isPad === true ? hp('20%') : wp('50%')) : wp('30%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('37%') : wp('80%')) : wp('80%'),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    image11: {
      height: Platform.OS === 'ios' ? (Platform.isPad === true ? hp('18%') : wp('50%')) : wp('40%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('37%') : wp('80%')) : wp('80%'),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    image22: {
      height: Platform.OS === 'ios' ? (Platform.isPad === true ? hp('17%') : wp('40%')) : wp('40%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('37%') : wp('80%')) : wp('80%'),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    contentvw: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('1%')) : wp('5%'),
      margin: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('1%')) : wp('5%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('30%') : wp('80%')) : wp('80%'),
    },
    contentvw2: {
      alignItems: 'flex-start',
      textAlign: 'justify',
      justifyContent: 'flex-start',
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('40%') : wp('80%')) : wp('80%'),
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('5%') : wp('2%')) : wp('5%'),
      margin: wp('1%'),
    },
    daytext: {
      color: colors.font,
      fontSize:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2.5%') : wp('4.5%')) : wp('4.5%'),
      fontWeight: 'bold',
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('2%')) : wp('5%'),
      padding: wp('1%'),
    },
    kmText: {
      color: colors.font,
      fontSize: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2%') : wp('4%')) : wp('4%'),
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('15%') : wp('40%')) : wp('15%'),
      padding: wp('1%'),
    },
    place: {
      color: colors.font,
      padding: wp('0.5%'),
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('1%') : wp('3%')) : wp('5%'),
      fontSize: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('2%') : wp('4%')) : wp('4%'),
    },
    buttonvw: {
      height: hp('6.5%'),
      alignSelf: 'flex-start',
      textAlign: 'center',
      justifyContent: 'center',
      borderWidth:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('0%') : wp('0.2%')) : wp('0.3%'),
      borderColor: '#ffffff',
      borderRadius:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('6%') : wp('8%')) : wp('8%'),
      marginTop:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('-5%') : wp('-7%')) : wp('8%'),
      marginLeft:
        Platform.OS === 'ios' ? (Platform.isPad === true ? wp('3%') : wp('6%')) : wp('8%'),
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('23%') : wp('35%')) : wp('30%'),
    },
    eventnumber: {
      //height: height * 0.08,
      width: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('7%') : wp('9%')) : wp('9%'),
      bottom: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('4%') : wp('5%')) : wp('5%'),
      left: Platform.OS === 'ios' ? (Platform.isPad === true ? wp('20%') : wp('28%')) : wp('40%'),
      //padding: wp('1%'),
      borderColor: '#ffffff',
      backgroundColor: '#efefef',
      borderWidth: 1.5,
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: width * 0.05,
      position: 'absolute',
    },
    eventTxt: {
      justifyContent: 'center',
      alignSelf: 'center',
      padding: wp('1%'),
      textAlign: 'center',
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
      width: wp('80%'),
      alignSelf: 'center',
      marginTop: wp('7%'),
      backgroundColor: colors.greybackground,
    },
  });
export default connect(mapStateToProps, { getMySponsorEvents })(PlacesToMeet);
