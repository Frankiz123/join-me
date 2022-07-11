import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import ButtonApp from '../../components/UI/ButtonApp';
import { getString } from '../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { MapBottomView, MapsSearch } from '@components';
import { RFValue } from 'react-native-responsive-fontsize';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, MapEvent, LatLng } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { GOOGLE_API_KEY } from '../../tools/config';
export default function Places(props) {
  const { colors } = useTheme();
  const [addressName, setAddressName] = useState('');
  const [placeNameValid, setPlaceNameValid] = useState(true);
  const [coordinates, setCoodinates] = useState({
    lat: 59.924,
    lng: 10.751,
  });

  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY);
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('info', info);
        setCoodinates({ lat: info.coords.latitude, lng: info.coords.longitude });
        setAddressNameHandler(info.coords.latitude, info.coords.longitude);
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);
  const setAddressNameHandler = (lat, lng, locationName = '') => {
    Geocoder.from({ lat: lat, lng: lng })
      .then((json) => {
        var addressComponent = json.results[0].address_components[0];
        var addressComponent1 = json.results[0].address_components[1];
        if (
          addressComponent.types[0] !== 'street_number' &&
          addressComponent.types[0] !== 'premise'
        ) {
          setAddressName(addressComponent.long_name);
        } else if (
          addressComponent1.types[0] !== 'street_number' &&
          addressComponent1.types[0] !== 'premise'
        ) {
          setAddressName(addressComponent1.long_name);
        } else {
          setAddressName(locationName);
        }
        setAddressName(locationName);
      })
      .catch((error) => console.warn(error));
  };
  const { container, mapsView } = styles(colors);
  const { navigation, route } = props;
  return (
    <View style={container}>
      <MapsSearch
        onBackPress={() => navigation.goBack()}
        onLocationPicked={(lat, lng, locationName) => {
          setCoodinates({ lat, lng });
          setAddressNameHandler(lat, lng, locationName);
        }}
      />
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={mapsView}
        region={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinates.lat || 50,
            longitude: coordinates.lng || 22,
          }}
          draggable
          onDragEnd={(event) => {
            setCoodinates({
              lat: event.nativeEvent.coordinate.latitude,
              lng: event.nativeEvent.coordinate.longitude,
            });
          }}
          anchor={{ x: 0.51, y: 0.54 }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              resizeMode={'contain'}
              style={styles(colors).customMarker}
              source={require('../../assets/images/marker3.png')}
            />
          </View>
        </Marker>
      </MapView>

      <MapBottomView
        addressName={addressName}
        onSelectPress={() => {
          addressName === '' && setPlaceNameValid(false);
          addressName !== '' &&
            navigation.navigate(
              route.params?.lastScreenName !== undefined
                ? route.params?.lastScreenName
                : 'Inviting',
              {
                ...route.params,
                place: { coordinates: coordinates, freeText: '' },
                placeName: addressName,
              },
            );
        }}
        onChangeText={(text) => {
          setPlaceNameValid(true);
          setAddressName(text);
        }}
        isInputValid={placeNameValid}
      />
    </View>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondBackground },
    mapsView: {
      width: '100%',
      height: '100%',
    },
    searchBarView: {
      position: 'absolute',
      top: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
    },
    customMarker: {
      width: RFValue(30),
      height: RFValue(30),
    },
  });
