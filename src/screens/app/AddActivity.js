import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import CustomText from '../../components/UI/CustomText';
import Input from '../../components/UI/Input';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { CurveHeader } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useKeyboard } from '@react-native-community/hooks';
import { RFValue } from 'react-native-responsive-fontsize';
export default function AddActivity(props) {
  const keyboard = useKeyboard();
  const [eventName, setEventName] = useState('');
  const [eventNameValid, setEventNameValid] = useState(true);
  const { colors } = useTheme();
  const { headerText, tags, buttonContainer, container } = styles(colors);
  const { route, navigation } = props;
  const scrollRef = useRef();
  useEffect(() => {
    console.log(route.params);
    if (route.params?.title !== undefined) {
      setEventName(route.params?.title);
    }
    if (route.params?.title2 !== undefined) {
      setEventName(route.params?.title2);
    }
  }, []);
  if (keyboard.keyboardShown) {
    console.log(scrollRef.current);
    scrollRef.current.scrollTo({ x: 0, y: keyboard.keyboardHeight + hp(10), animated: true });
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
            onLeftPress={() => navigation.goBack()}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            onRightPress={() => {}}
            title={getString('createActivity.Name.title')}
          />
          {/* <View style={{ height: 302 }} /> */}

          <Input
            backgroundInput={getColors('white')}
            value={eventName}
            labelText={getString('createActivity.Name.labelName')}
            labelColor={colors.font}
            onChangeText={(eventName) => {
              setEventName(eventName);
              setEventNameValid(true);
            }}
            isInputValid={eventNameValid}
            fontLabelSize={RFValue(20)}
            fontSize={RFValue(21)}
            inputError={getString('createActivity.Name.missingName')}
            autoCapitalize="sentences"
            // labelColor={getColors('font')}
            onSubmitEditing={() => {
              eventName === '' && setEventNameValid(false);
              eventName !== '' &&
                navigation.navigate('Group', { ...route.params, title: eventName });
            }}
          />

          {route.params?.title2 === undefined && (
            <View style={{ alignItems: 'center' }}>
              <ScrollView
                contentContainerStyle={{
                  width: Platform.isPad ? wp(87.5) : wp(88.5),
                  flexWrap: 'wrap',
                }}
                horizontal={true}
                // bounces={false}
                showsHorizontalScrollIndicator={false}
              >
                {getString('createActivity.suggestList').map((item) => {
                  return (
                    <TouchableOpacity
                      style={tags}
                      onPress={() => {
                        setEventName(item);
                        setEventNameValid(true);
                      }}
                    >
                      <CustomText variant="boldXs" style={headerText}>
                        {item}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
          <View style={buttonContainer}>
            <ButtonApp
              buttonTitle={getString('firstTime.aboutyou.btnNext')}
              // onPress={() => navigation.navigate('HowMany')}
              onPress={() => {
                eventName === '' && setEventNameValid(false);
                eventName !== '' &&
                  navigation.navigate('Group', { ...route.params, title: eventName });
              }}
              btnBackground={colors.btnBackground}
            />
          </View>
        </View>
      </ScrollView>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(1.5),
      color: colors.font,
      marginHorizontal:wp(0.7)
    },
    imageContainer: {
      width: wp('100%'),
      height: hp('45%'),
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      paddingHorizontal: 20,
      marginTop: hp(10),
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
  });
