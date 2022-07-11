import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CurveHeader, CheckBox, CancelAlert } from '@components';

import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import { LeftAndRightHeader } from '../../components/UI/Header';
import bgimage from '../../assets/images/headerBackground.png';
import { Icon } from 'react-native-elements';
import Input from '../../components/UI/Input';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Where(props) {
  const { navigation, route } = props;
  const [freeText, setDescription] = useState('');
  const { colors } = useTheme();
  const [check, setcheck] = useState(false);
  const [placeNameValid, setPlaceNameValid] = useState(true);
  const [alertShow, setAlertShow] = useState(false);
  const { dropContainer, dropContainer2, buttonContainer, container } = styles(colors);

  useEffect(() => {
    if (route.params.other == 10 && route.params.passurl != '') {
      setcheck(true);
    }
    if (route.params.freeText !== '' && route.params.freeText !== undefined) {
      setDescription(route.params.freeText);
    }
    if (route.params.address?.freeText !== '' && route.params.address?.freeText !== undefined) {
      setDescription(route.params.address.freeText);
    }
    if (route.params?.adress2 !== undefined) {
    }
  }, []);
  return (
    <ScrollView style={container}>
      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => setAlertShow(true)}
        title={getString('createActivity.place.title')}
      />

      <KeyboardAwareScrollView>
        <View>
          {route.params?.adress2 !== undefined ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Inviting', {
                  ...route.params,
                  url: route.params?.adress2.url,
                  freeText: route.params?.adress2.url,
                  place: { coordinates: route.params?.adress2.coordinates, freeText: '' },
                  placeName: route.params?.adress2.title,
                })
              }
              style={{ ...dropContainer2, marginBottom: hp(3) }}
            >
              <CustomText variant="bold" style={{ color: colors.font }}>
                {route.params?.adress2.url || route.params?.adress2.title}
              </CustomText>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Places', { ...route.params })}
                style={dropContainer}
              >
                <CustomText variant="bold" style={{ color: colors.font }}>
                  {getString('createActivity.place.BtnSelectMap')}
                </CustomText>
              </TouchableOpacity>

              {route.params.other == 10 && route.params.passurl != '' ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PlacesUrl', { ...route.params, url: route.params.passurl })
                  }
                  style={dropContainer2}
                >
                  <CustomText variant="bold" style={{ color: colors.font }}>
                    {route.params.passurl}
                  </CustomText>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('PlacesUrl', { ...route.params })}
                  style={dropContainer}
                >
                  <CustomText variant="bold" style={{ color: colors.font }}>
                    {getString('createActivity.place.MeetOnline')}
                  </CustomText>
                </TouchableOpacity>
              )}

              <View style={{ marginTop: 30 }}>
                <Input
                  backgroundInput={getColors('white')}
                  value={freeText}
                  fontSize={RFValue(21)}
                  fontLabelSize={RFValue(20)}
                  labelText={getString('createActivity.place.LabelDesc')}
                  labelColor={colors.font}
                  onChangeText={(text) => {
                    setDescription(text);
                    setPlaceNameValid(true);
                  }}
                  isInputValid={placeNameValid}
                  inputError={getString('createActivity.place.missingFreeText')}
                  // icon
                />
              </View>
            </>
          )}
          <View style={buttonContainer}>
            <ButtonApp
              buttonTitle={getString('firstTime.aboutyou.btnNext')}
              onPress={() => {
                if (route.params?.adress2 !== undefined) {
                  navigation.navigate(
                    route.params?.lastScreenName !== undefined
                      ? route.params?.lastScreenName
                      : 'Inviting',
                    { ...route.params, freeText },
                  );
                } else if (freeText === '') {
                  setPlaceNameValid(false);
                } else if (freeText !== '') {
                  navigation.navigate(
                    route.params?.lastScreenName !== undefined
                      ? route.params?.lastScreenName
                      : 'Inviting',
                    { ...route.params, freeText },
                  );
                }
              }}
              btnBackground={colors.btnBackground}
            />
          </View>
          <CancelAlert
            visible={alertShow}
            setVisible={() => setAlertShow(!alertShow)}
            navigation={navigation}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      // padding: 20,
      marginRight: wp(7),
      marginTop: 20,
    },
    tags: {
      // height: hp('4%'),
      backgroundColor: colors.greyBackground,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      borderRadius: 20,
    },
    tagtext: {
      padding: 10,
      fontSize: hp('2%'),
    },
    dropContainer: {
      marginTop: hp('2%'),
      paddingHorizontal: wp('5%'),
      marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.greyBackground,
      borderRadius: 10,
      justifyContent: 'center',
    },
    dropContainer2: {
      marginTop: hp('2%'),
      paddingHorizontal: wp('5%'),
      marginHorizontal: wp('5%'),
      height: hp('10%'),
      backgroundColor: colors.yellow,
      borderRadius: 10,
      justifyContent: 'center',
    },
  });
