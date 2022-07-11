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
  Platform,
} from 'react-native';
import CustomText from '../../../components/UI/CustomText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getString } from '../../../tools/StringHelper';
import { useTheme } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, MapEvent, LatLng } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { GOOGLE_API_KEY } from '../../../tools/config';
import { Icon } from 'react-native-elements';
import { colorsDark, getColorsDark } from '../../../colors';
import { ThemeColors } from 'react-navigation';
export default function ActivityDetailMap(props) {
  const { colors } = useTheme();
  const [coordinates, setCoodinates] = useState({
    lat: 59.924,
    lng: 10.751,
  });

  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY);
    Geolocation.getCurrentPosition(
      (info) => {
        // console.log('info',info);
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const { container, mapsView, LinkTxt, bottomView, bottomview2 } = styles(colors);
  const { navigation, route } = props;
  const { eventLocation, eventTitle } = route.params;
  return (
    <View style={container}>
      <View
        style={{
          top: Platform.OS === 'ios' ? 40 : 0,
          height: Platform.OS === 'ios' ? hp(10) : hp(7),
          width: '100%',
          backgroundColor: { bottomview2 },
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            // margin: wp(5),
            // top: hp(0.9),
            //marginVertical: hp(0),
            bottom: Platform.OS === 'ios' ? hp(0.6) : hp(-1.2),
            left: Platform.OS === 'ios' ? wp(5) : hp(3),
          }}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
          <Icon name="arrow-back" type="meterial-community" size={30} color={colors.font} />
        </TouchableOpacity>
        <View style={{ bottom: Platform.OS === 'ios' ? hp(2.5) : hp(1), left: wp(1) }}>
          <CustomText style={LinkTxt}> {eventTitle}</CustomText>
        </View>
      </View>
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={mapsView}
        region={{
          latitude: eventLocation.coordinates?.lat || 51.9194,
          longitude: eventLocation.coordinates?.long || 19.1451,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: eventLocation.coordinates?.lat || 51.9194,
            longitude: eventLocation.coordinates?.long || 19.1451,
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              resizeMode={'contain'}
              style={styles(colors).customMarker}
              source={require('../../../assets/images/marker3.png')}
            />
          </View>
        </Marker>
      </MapView>
      <View
        style={[
          bottomView,
          {
            backgroundColor: colors.secondBackground,
            height: hp(10),
          },
        ]}
      >
        <CustomText style={[LinkTxt, { marginTop: hp(0) }]}>{eventLocation.title}</CustomText>
      </View>
    </View>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondBackground,
    },
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
    LinkTxt: { padding: wp(5), fontSize: hp(2), color: colors.font, fontWeight: 'bold' },
    customMarker: {
      width: RFValue(30),
      height: RFValue(30),
    },
    bottomView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: hp(20),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      paddingHorizontal: wp(2),
    },
  });
