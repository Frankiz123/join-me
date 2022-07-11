import React, { useEffect, useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Keyboard,
} from 'react-native';

import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import Imagpicstatusker from 'react-native-image-crop-picker';

import { updateProfile, updateImage, getProfile } from '../../redux/actions/userActions';
import { isTest } from '../../tools/config';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import Input from '../../components/UI/Input';
import Picker from '../../components/UI/Picker';
import ButtonApp from '../../components/UI/ButtonApp';
import IconButton from '../../components/UI/IconButton';
import CustomText from '../../components/UI/CustomText';
import GroupBackground from '../../assets/images/groupsBackground';
import { scale } from 'react-native-size-matters';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { CurveHeader } from '../../components/UI/curveHeader';
import AsyncStorage from '@react-native-community/async-storage';
import OpenAppSettings from 'react-native-app-settings';
const yearsOfBirth = Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - 20 - i);
const yearsOfBirthArray = yearsOfBirth.map((year) => ({ value: year, text: year }));

const { width, height } = Dimensions.get('window');
const initialState = {
  firstName: '',
  lastName: '',
  yearOfBirth: '2001',
  gender: '',
  image: '',
};

const MyProfileScreen = (props) => {
  const {
    getProfile,
    updateProfile,
    user,
    phoneNumber,
    updateImage,
    navigation,
    route,
    token,
    areaCode,
  } = props;
  const [form, setForm] = useState(initialState);
  const { colors } = useTheme();
  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [isLastNameValid, setLastNameValid] = useState(true);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  useEffect(() => {
    (async function getUserH() {
      await getProfile();

      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        yearOfBirth: user.yearOfBirth,
        image: {
          uri: user.imageUrl}
      });
    })();
    console.log(user.imageUrl)
  }, [user.firstName, user.lastName, user.yearOfBirth, user.imageUrl]);

  const profileHandler = async () => {
    console.log('hand');
    console.log('image Resp === ', form.image);

    if (!form.firstName) {
      setFirstNameValid(false);
      setLastNameValid(true);
    } else if (!form.lastName) {
      setLastNameValid(false);
      setFirstNameValid(true);
    } else {
      setFirstNameValid(true);
      setLastNameValid(true);
      const imageResp = await updateImageHandler(form.image.uri);

      console.log('image Resp === ', form.image);
      const { image } = form;

      const success = await updateProfile(
        {
          firstName: form.firstName,
          lastName: form.lastName,
          yearOfBirth: form.yearOfBirth,
          gender: user?.gender,
          phone: user?.phone || {
            areaCode: areaCode || '47',
            phoneNumber: phoneNumber || '11',
          },
          profileId: user?.profileId,
          email: user?.email || '',
          imageUrl: imageResp ? imageResp?.url : Platform.OS === 'ios'  ? image : image,
        },
        token,
      );
      if (success) {
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          yearOfBirth: user.yearOfBirth,
          //image: user.imageUrl,
          image: form.image,
        });
        navigation.navigate('MyOrganisation');
      }
    }
  };

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
                    onPress: async () => {
                      OpenAppSettings.open();
                      await AsyncStorage.setItem('picstatus', 'allow');
                    },
                  },
                ],
                { cancelable: false }
              );
            } else {
              console.log('ok');

              Imagpicstatusker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              })
                .then(async (image) => {
                  console.log('Value of Image im cameraaaaa ===== ', image);
                  const { path } = image;
                  await AsyncStorage.setItem('picstatus', 'allow');
                  setForm({ ...form,     image: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                  } });
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
                      OpenAppSettings.open(),
                        await AsyncStorage.setItem('galry', 'allow');
                    },
                  },
                ],
                { cancelable: false }
              );
            } else {
              Imagpicstatusker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                includeBase64: false,
              })
                .then(async (image) => {
                  console.log('Value of Image im gallery ===== ', image);
                  const { sourceURL, path } = image;
                  console.log('Value of sourceURL === ', sourceURL);
                  //return;
                  await AsyncStorage.setItem('galry', 'allow');
                  // setForm({ ...form, image: sourceURL });
                  
                  setForm({ ...form,     image: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                  } });
                })
                .catch(async (err) => {
                  await AsyncStorage.setItem('galry', 'deny');
                  console.log(err);
                });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const updateImageHandler = async (image) => {
    if (!image || image === '') {
      return false;
    }
    console.log('Update Image Handler === ', image);
    return updateImage(image);
  };

  const getImagePath = (image) => {
    console.log('image in get Image Path ======', user.imageUrl );
    if (user.imageUrl === null && image?.uri === undefined) {
      console.log('path')
      return require('../../assets/images/camera_icon.png');
    } else if (image.uri !== undefined) {
      console.log('path2')
      return image;
    } else {
      console.log('path3')
      return user.imageUrl;
    }

    // if (Platform.OS === 'ios') {
    //   return { uri: `file://${image.path}` };
    // } else {
    //   return { uri: image.path };
    // }
  };

  const { container, headerText, formView, buttonContainer, photo, photoContainer } = styles(
    colors,
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={container}
      keyboardVerticalOffset={-hp(33)}
    >
      <ScrollView>
        <View style={container}>
          <CurveHeader
            leftIcon={'arrow-left'}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            rightIcon={'cross'}
            onLeftPress={() => navigation.goBack()}
            onRightPress={() => navigation.goBack()}
            title={getString('myProfile.myProfile.title')}
          />

          <View style={formView}>
            <Input
              ref2={(ref) => (firstInput.current = ref)}
              backgroundInput={getColors('white')}
              value={form.firstName}
              labelText={getString('myProfile.myProfile.firstName')}
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
              labelText={getString('myProfile.myProfile.lastName')}
              labelColor={colors.font}
              onChangeText={(lastName) => setForm({ ...form, lastName })}
              isInputValid={isLastNameValid}
              inputError={'Last Name missing'}
              autoCapitalize="sentences"
            />
            <Picker
              selectedValue={form.yearOfBirth}
              onValueChange={(yearOfBirth) => {
                Keyboard.dismiss();
                setForm({ ...form, yearOfBirth });
              }}
              values={yearsOfBirthArray}
              labelText={getString('myProfile.myProfile.yearOfBirth')}
              labelColor={colors.font}
            />
            <IconButton
              label={''}
              labelColor={colors.font}
              labelText={getString('myProfile.myProfile.photo')}
              source={getImagePath(form.image)}
              onPress={setImage}
              containerStyle={photoContainer}
              imageStyle={form.image ? photo : photo}
            />

            <View style={buttonContainer}>
              <ButtonApp
                buttonTitle={getString('myProfile.myProfile.btnSave')}
                onPress={() => profileHandler()}
                btnBackground={colors.btnBackground}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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

MyProfileScreen.propTypes = {
  pending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
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
      paddingHorizontal: hp(4),
      position: 'absolute',
      top: 100,
      width: wp(53),
    },
    imageCloud: {
      position: 'absolute',
      right: wp(17),
      zIndex: -1,
      top: hp(23),
      width: 87,
      height: 100,
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

export default connect(mapStateToProps, { updateProfile, updateImage, getProfile })(
  MyProfileScreen,
);
