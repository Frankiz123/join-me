import React, { useEffect, useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import Input from '../../components/UI/Input';
import Picker from '../../components/UI/Picker';
import ButtonApp from '../../components/UI/ButtonApp';
import IconButton from '../../components/UI/IconButton';
import OpenAppSettings from 'react-native-app-settings';
import { update, updateImage, getProfile } from '../../redux/actions/userActions';
import { setCompleteFirstTime } from '../../redux/actions/authActions';

import SuccessComponent from '../../components/UI/SuccessComponent';
import HandIcon from '../../assets/images/hand';
import { useTheme } from '@react-navigation/native';
import CustomText from '../../components/UI/CustomText';
import Modal from 'react-native-modal';
import { validate } from 'uuid';
import { isTest } from '../../tools/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import AsyncStorage from '@react-native-community/async-storage';
const yearsOfBirth = Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - 20 - i);
const yearsOfBirthArray = yearsOfBirth.map((year) => ({ value: year, text: year }));

const initialState = {
  firstName: '',
  lastName: '',
  yearOfBirth: '2001',
  gender: 'Female',
  image: '',
};

const ProfileScreen = (props) => {
  const {
    getProfile,
    update,
    user,
    phoneNumber,
    updateImage,
    navigation,
    route,
    areaCode,
    setCompleteFirstTime,
  } = props;
  const [successScreen, setSuccessScreen] = useState(false);
  const [mycamera, setmycamera] = useState(false);
  const [form, setForm] = useState(initialState);
  const { colors } = useTheme();
  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [isLastNameValid, setLastNameValid] = useState(true);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const yearPicker = useRef(null);
  useEffect(() => {
    (async function getUserH() {
      await getProfile();
      if (user.firstName !== null) {
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          yearOfBirth: user.yearOfBirth,
          gender: user.gender || 'Female',
          image: {
            uri: user.imageUrl,
          },
        });
      }
    })();
  }, [user.firstName, user.lastName, user.yearOfBirth, user.imageUrl]);

  const profileHandler = async () => {
    if (!form.firstName) {
      setFirstNameValid(false);
      setLastNameValid(true);
    } else if (!form.lastName) {
      setLastNameValid(false);
      setFirstNameValid(true);
    } else {
      setFirstNameValid(true);
      setLastNameValid(true);

      const success = await update({
        firstName: form.firstName,
        lastName: form.lastName,
        yearOfBirth: form.yearOfBirth,
        gender: form.gender,
        phone: user?.phone || { areaCode: areaCode || '47', phoneNumber: phoneNumber || '11' },
        profileId: user?.profileId,
        email: user?.email || '',
      });

      await updateImageHandler(form.image);

      if (success) {
        setForm(initialState);
        setSuccessScreen(true);
      }
    }
  };

  //image code start from here

  const setImage = async () => {
    console.log('pop up');
    Alert.alert(
      getString('myProfile.alertPhoto.addPhoto'),
      getString('myProfile.alertPhoto.choose'),
      [
        {
          text: getString('myProfile.alertPhoto.useCam'),
          onPress: async () => {
            const currentState = await AsyncStorage.getItem('picstatus');
            if (currentState == 'deny') {
              Alert.alert(
                getString('myProfile.alertPhoto.camera'),
                getString('myProfile.alertPhoto.okSettings'),
                [
                  {
                    text: getString('myProfile.alertPhoto.cancel'),
                    onPress: () => console.log('Cancel Pressed!'),
                  },
                  {
                    text: getString('myProfile.alertPhoto.settings'),
                    onPress: () => {
                      OpenAppSettings.open();
                    },
                  },
                ],
                { cancelable: false },
              );
            } else {
              console.log('ok');

              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              })
                .then(async (image) => {
                  console.log('error');
                  await AsyncStorage.setItem('picstatus', 'allow');
                  setForm({
                    ...form,
                    image: {
                      uri: image.path,
                      width: image.width,
                      height: image.height,
                      mime: image.mime,
                    },
                  });
                })
                .catch(async (err) => {
                  console.log('deny');
                  await AsyncStorage.setItem('picstatus', 'deny');
                  console.log('deny', err);
                });
            }
          },
          style: 'default',
        },
        {
          text: 'Open gallery',
          onPress: async () => {
            const glarytState = await AsyncStorage.getItem('galry');
            if (glarytState == 'deny') {
              Alert.alert(
                getString('myProfile.alertPhoto.accessGallery'),
                getString('myProfile.alertPhoto.settingsGallery'),
                [
                  {
                    text: getString('myProfile.alertPhoto.cancel'),
                    onPress: () => console.log('Cancel Pressed!'),
                  },
                  {
                    text: getString('myProfile.alertPhoto.settings'),
                    onPress: async () => {
                      OpenAppSettings.open(), await AsyncStorage.setItem('galry', 'allow');
                    },
                  },
                ],
                { cancelable: false },
              );
            } else {
              ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                includeBase64: false,
              })
                .then(async (image) => {
                  await AsyncStorage.setItem('galry', 'allow');
                  setForm({
                    ...form,
                    image: {
                      uri: image.path,
                      width: image.width,
                      height: image.height,
                      mime: image.mime,
                    },
                  });
                })
                .catch(async (err) => {
                  await AsyncStorage.setItem('galry', 'deny');
                  console.log(err);
                });
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  //image end here

  const Dimage = 'imggg';

  const updateImageHandler = async (image) => {
    if (!image || image === '') {
      return false;
    }

    return updateImage(image);
  };

  const getImagePath = (image) => {
    console.log('image in get Image Path ======', user.imageUrl);
    if (user.imageUrl === null && image?.uri === undefined) {
      console.log('path');
      return require('../../assets/images/camera_icon.png');
    } else if (image.uri !== undefined) {
      console.log('path2');
      return image;
    } else {
      console.log('path3');
      return user.imageUrl;
    }

    // if (Platform.OS === 'ios') {
    //   return { uri: `file://${image.path}` };
    // } else {
    //   return { uri: image.path };
    // }
  };

  const {
    container,
    imageShapeCloud,
    headerText,
    formView,
    buttonContainer,
    photo,
    photoContainer,
  } = styles(colors);
  if (successScreen || route.params?.afterGroups) {
    return (
      <SuccessComponent
        onPress={() => {
          setCompleteFirstTime(true);
          setTimeout(() => navigation.navigate('FindActivity'), 500);
        }}
        title={getString('firstTime.getStarted.title')}
        buttonText={getString('firstTime.getStarted.btnActivities')}
        linkLabel={getString('firstTime.getStarted.linkLabel')}
        linkPress={() => {
          navigation.navigate('FindYourOrganistion');
        }}
        afterGroups={route.params?.afterGroups}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={container}
      keyboardVerticalOffset={-hp(33)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={container} accessible={false}>
        <ScrollView>
          <View style={container}>
            <View style={imageShapeCloud}>
              <HandIcon />
            </View>
            <CustomText variant="veryBigTitle" style={headerText}>
              {getString('firstTime.aboutyou.title')}
            </CustomText>
            <View style={formView}>
              <Input
                ref2={(ref) => (firstInput.current = ref)}
                backgroundInput={getColors('white')}
                value={form.firstName}
                labelText={getString('firstTime.aboutyou.firstName')}
                labelColor={colors.font}
                onChangeText={(firstName) => {
                  setForm({ ...form, firstName });
                }}
                isInputValid={isFirstNameValid}
                inputError={'First Name missing'}
                returnKeyType="next"
                onSubmitEditing={() => secondInput.current.focus()}
                autoCapitalize="sentences"
              />
              <Input
                ref2={(ref) => (secondInput.current = ref)}
                backgroundInput={getColors('white')}
                value={form.lastName}
                labelText={getString('firstTime.aboutyou.lastName')}
                labelColor={colors.font}
                onChangeText={(lastName) => setForm({ ...form, lastName })}
                isInputValid={isLastNameValid}
                inputError={'Last Name missing'}
                onSubmitEditing={Keyboard.dismiss}
                autoCapitalize="sentences"
              />
              <Picker
                selectedValue={form.yearOfBirth}
                onValueChange={(yearOfBirth) => {
                  Keyboard.dismiss();
                  setForm({ ...form, yearOfBirth });
                }}
                values={yearsOfBirthArray}
                labelText={getString('firstTime.aboutyou.yearOfBirth')}
                labelColor={colors.font}
              />
              <Picker
                selectedValue={form.gender}
                onValueChange={(gender) => setForm({ ...form, gender })}
                values={[
                  { value: 'Female', text: getString('firstTime.aboutyou.gender.options.female') },
                  { value: 'Male', text: getString('firstTime.aboutyou.gender.options.male') },
                  { value: 'Other', text: getString('firstTime.aboutyou.gender.options.Other') },
                ]}
                labelText={getString('firstTime.aboutyou.gender.label')}
                labelColor={colors.font}
              />

              <IconButton
                label={''}
                labelText={getString('firstTime.aboutyou.photo')}
                labelColor={colors.font}
                source={getImagePath(form.image)}
                onPress={setImage}
                containerStyle={photoContainer}
                imageStyle={form.image ? photo : photo}
              />

              <View style={buttonContainer}>
                <ButtonApp
                  buttonTitle={getString('firstTime.aboutyou.btnNext')}
                  onPress={() => profileHandler()}
                  btnBackground={colors.btnBackground}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      {Platform.OS === 'ios' && (
        <KeyboardAccessoryNavigation
          nextDisabled={false}
          previousDisabled={false}
          nextHidden={false}
          previousHidden={false}
          onNext={() => secondInput.current.focus()}
          onPrevious={() => firstInput.current.focus()}
          avoidKeyboard
          androidAdjustResize
        />
      )}
    </KeyboardAvoidingView>
  );
};

ProfileScreen.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  pending: state.user.pending,
  error: state.user.error,
  user: state.user.user,
  phoneNumber: state.auth.phoneNumber,
  areaCode: state.auth.areaCode,
});

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    headerText: {
      padding: hp(4),
    },
    imageShapeCloud: {
      position: 'absolute',
      right: wp(-7),
      zIndex: -1,
      top: hp(17),
      transform: [{ rotate: '8deg' }],
    },
    formView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      padding: 20,
    },
    photo: {
      borderRadius: 29,
      height: 58,
      width: 58,
      borderWidth: 2,
      borderColor: colors.photoRing,
    },
    photoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.greyBackground,
    },
  });

export default connect(mapStateToProps, { update, updateImage, getProfile, setCompleteFirstTime })(
  ProfileScreen,
);
