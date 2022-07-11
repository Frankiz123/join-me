import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { CurveHeader, CancelAlert } from '@components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from '../../components/UI/CustomText';
import Input from '../../components/UI/Input';
import { getColors } from '../../colors';
import { useKeyboard } from '@react-native-community/hooks';
import { RFValue } from 'react-native-responsive-fontsize';

export default function PlacesUrl(props) {
  const [url, setUrl] = useState('');
  const { colors } = useTheme();
  const [placeNameValid, setPlaceNameValid] = useState(true);
  const { navigation, route } = props;
  const [alertShow, setAlertShow] = useState(false);
  const keyboard = useKeyboard();
  const scrollRef = useRef();

  useEffect(() => {
    if (route.params.url !== undefined) {
      setUrl(route.params.url);
    }
    if (route.params.address?.url !== '' && route.params.address?.url !== undefined) {
      setDescription(route.params.url);
    }
  }, []);
  const { container, buttonContainer } = styles(colors);
  if (keyboard.keyboardShown) {
    console.log('scrol', scrollRef.current );
  
    scrollRef.current.scrollTo({
        x: 0,
        y: keyboard.keyboardHeight+hp(10),
        animated: true,
      });
  }
  return (
    <View style={container}>
        <ScrollView
        style={{ flex: 1 }}
        // scrollEnabled={false}
        ref={scrollRef}
      >
         <View style={{ height: '100%', paddingBottom: hp(2) }}>
      <CurveHeader
        leftIcon={'arrow-left'}
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        rightIcon={'cross'}
        onLeftPress={() => navigation.navigate('Where', { passurl: url, other: 10 })}
        onRightPress={() => setAlertShow(true)}
        title={getString('createActivity.place.placeURL.title')}
      />

      <View style={{ marginHorizontal: wp('6%'), marginTop: hp('5%') }}>
        <Input
          backgroundInput={getColors('white')}
          value={url}
          fontSize={RFValue(21)}
          fontLabelSize={RFValue(20)}
          labelText={getString('createActivity.place.placeURL.labelUrl')}
          labelColor={colors.font}
          onChangeText={(text) => {
            setUrl(text);
            setPlaceNameValid(true);
          }}
          value={url}
          //isInputValid={isFirstNameValid}
          inputError={'First Name missing'}
          isInputValid={placeNameValid}
          inputError={getString('createActivity.place.missingFreeText')}
          // icon
          // placeholder={'http://'}
        />
        <View style={buttonContainer}>
          <ButtonApp
            buttonTitle={getString('firstTime.aboutyou.btnNext')}
            onPress={() => {
              url === '' && setPlaceNameValid(false);
              url !== '' &&
                navigation.navigate(
                  route.params?.lastScreenName !== undefined
                    ? route.params?.lastScreenName
                    : 'Inviting',
                  { ...route.params, url },
                );
            }}
            btnBackground={colors.btnBackground}
          />
        </View>
      </View>
      <CancelAlert
        visible={alertShow}
        setVisible={(val) => setAlertShow(val)}
        navigation={navigation}
      />
      </View>
      </ScrollView>
    </View>
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
      padding: 20,
      marginTop: hp('15%'),
    },
    mainDateView: {
      justifyContent: 'flex-end',
      height: hp('10%'),
      borderWidth: 1,
      borderColor: colors.font,
    },

    borderView: {
      width: wp('5%'),
      height: hp('6%'),
      borderRightColor: colors.font,
      borderRightWidth: 1,
      // backgroundColor: 'red'
    },
    headText: {
      color: colors.font,
      marginVertical: hp('1%'),
      fontWeight: 'bold',
    },
    dropDownView: {
      height: hp('10%'),
      width: wp('18%'),
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'green'
    },
  });
