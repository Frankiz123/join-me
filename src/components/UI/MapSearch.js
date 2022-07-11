import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import Input from './Input';
import {
  AddressComponent,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { GOOGLE_API_KEY } from '../../tools/config';
import { getColors } from '../../colors';
import { getString } from '../../tools/StringHelper';
import AsyncStorage from '@react-native-community/async-storage';

const MapsSearch = (props) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState('en');
  const [showList, setShowList] = useState(true);
  const { onBackPress, onLocationPicked } = props;
  const input = useRef(null);
  const googlePlaces = useRef(null);
  useEffect(() => {
    async function updateLang() {
      const getLanguage = await AsyncStorage.getItem('language');
      if (getLanguage !== null) {
        setLang(getLanguage);
      }
    }
    updateLang();
  });
  // console.log(input.current);
  return (
    <View style={styles(colors).placesAutocomplete}>
      <GooglePlacesAutocomplete
        ref={googlePlaces}
        placeholder={getString('createActivity.place.searchPlace')}
        minLength={2}
        autoFocus={true}
        returnKeyType={'search'}
        renderDescription={(row) => {
          // console.log(row);
          return row.description;
        }}
        fetchDetails={true}
        // listViewDisplayed={ showList }
        listViewDisplayed={true}
        keyboardShouldPersistTaps={'always'}
        predefinedPlaces={[]}
        onPress={(data, details = null) => {
          console.log();
          const { lat, lng } = details.geometry.location;
          onLocationPicked(
            lat,
            lng,
            data.description.substring(0, data.description.lastIndexOf(',')),
          );
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GOOGLE_API_KEY,
          language: lang,
          //types: ['(cities)'], // place types https://developers.google.com/places/supported_types
          // types: ['street_address', 'street_number', 'postal_code'],
        }}
        textInputProps={{
          clearButtonMode: 'never',
          ref: (ref) => (input.current = ref),
          placeholderTextColor: colors.darkGrey,
        }}
        enablePoweredByContainer={false}
        renderLeftButton={() => (
          <Icon
            onPress={onBackPress}
            name={'arrow-left'}
            size={25}
            type={'material-community'}
            color={'black'}
            style={{ marginHorizontal: wp(1), marginLeft: wp(3.5) }}
          />
        )}
        renderRightButton={() => (
          <Icon
            onPress={() => {
              googlePlaces.current?.setAddressText('');
            }}
            name={'close'}
            size={25}
            type={'EvilIcons'}
            color={'black'}
            style={{ marginHorizontal: wp(1), marginRight: wp(3.5) }}
          />
        )}
        styles={{
          container: {
            flex: 0,
            padding: 0,
            borderRadius: 10,

            borderColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#000',
          },
          textInputContainer: {
            marginTop: -5,
            backgroundColor: '#fff',
            borderRadius: 10,
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 1,
            color: '#000',
          },
          textInput: styles(colors).textInput,
          listView: { width: wp(87) },
        }}
        debounce={300}
        getDefaultValue={() => ''}
      />
    </View>
  );
};
const styles = (colors) =>
  StyleSheet.create({
    placesAutocomplete: {
      top: hp(6),
      position: 'absolute',
      zIndex: 1,
      width: wp(90),
      alignSelf: 'center',
    },
    textInputContainer: {
      width: '100%',
      marginLeft: 0,
      margin: 0,
      backgroundColor: 'white',
    },
    textInput: {
      height: hp(5),
      color: '#5d5d5d',
      fontSize: 16,
      borderRadius: 10,
      paddingTop: hp(1),
      color: colors.black,
    },
    description: {
      fontFamily: 'Poppins-Regular',
      color: getColors('font'),
    },
  });
export { MapsSearch };
