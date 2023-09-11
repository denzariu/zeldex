import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated as AnimatedMap, Region, Marker, MarkerAnimated } from 'react-native-maps'
import { colors, fontSizes } from '../../../styles/defaults'
import { mapsApiKeyGeo } from '../../ui/utils/secrets'
import Geocoder from 'react-native-geocoding'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { userSlice } from '../../../src/redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { cacheData } from '../../../src/redux/fetcher'

type MapProps = {
  route: any,
  navigation: any
}


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.004;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const ITEM_PREVIEW_HEIGHT = 150;

const MIDSCREEN_CENTER_POINT = screen.width / 2 - 4;

const Map = ({ route, navigation } : MapProps) => {
  
  Geocoder.init(mapsApiKeyGeo);
  const dispatch = useDispatch();

  const { locationProp } = route.params;
  
  const [LATITUDE, setLATITUDE] = useState(locationProp.latitude);
  const [LONGITUDE, setLONGITUDE] = useState(locationProp.longitude);
  const fullAddressCached: string = useSelector((state:any) => (state.userReducer.user.address));
  const [fullAddress, setAddress] = useState(fullAddressCached ? fullAddressCached : '');
  const marker = useRef<any>(null); // | MarkerAnimated unresolved type 
  const [markersData, setMarkersData] = useState([
    {
      id: 0,
      amount: 99,
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    },
    {
      id: 1,
      amount: 99,
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    }
  ])

  const [markerUser, setMarkerUser] = useState({
    id: 0,
    amount: 99,
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE
    }
  })  
  
  const onSelectLocation = () => {
    try {
      dispatch(userSlice.actions.setUserCoordinates({longitude:LONGITUDE, latitude:LATITUDE}));
    } catch (e) {
      console.log('Could not set user coordinates', LONGITUDE, LATITUDE)
    }
    try {
      dispatch(userSlice.actions.setUserLocation(fullAddress));
    } catch (e) {
      console.log('Could not set user address', fullAddress)
    }
    try {
      cacheData('address', fullAddress);
      cacheData('userLatitude', LATITUDE.toString());
      cacheData('userLongitude', LONGITUDE.toString());
    } catch (e) {
      console.log('Could not cache address/coordinates: ', fullAddress, LATITUDE, LONGITUDE);
    }
    navigation.goBack();
  }

  const fetchLocation = async (coords : any) => {
    Geocoder.from(coords.latitude, coords.longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent)
        setLATITUDE(coords.latitude);
        setLONGITUDE(coords.longitude);
      })
      .catch(error => console.warn(error));
  }
  
  const onRegionChangeComplete = (_region : any) => {
    const coords = _region;
    marker.current.animateMarkerToCoordinate(coords);
    fetchLocation(coords)
  }


  return (
    <View style={{flex: 1}}>
      
      <View style={styles.addressView}>
        <View style={styles.addressInput}>
          <Text style={styles.addressField}>{fullAddress}</Text>
        </View>
      </View>

      <View style={{position: 'absolute', top: '50%', left: MIDSCREEN_CENTER_POINT, zIndex: 10, backgroundColor: colors.quaternary, padding: 3, borderRadius: 4, borderWidth: 1, borderColor: colors.primary}}></View>
      
      <View style={{position: 'absolute', flex: 1, bottom: 0, zIndex: 10, backgroundColor: colors.primary, width: '100%', paddingVertical: 12, borderTopLeftRadius: 16, borderTopRightRadius: 16}}>
        <TouchableOpacity 
            onPress={onSelectLocation}
            activeOpacity={0.9}
            style={{backgroundColor: colors.quaternary, marginHorizontal: 12, paddingVertical: 16, borderRadius: 8}}
        >
          <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: fontSizes.l, fontWeight: '700', color: colors.white}}>Set location</Text>
        </TouchableOpacity>
      </View>

      <AnimatedMap
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: locationProp.latitude,
          longitude: locationProp.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // onRegionChange={onRegionChange}
        onRegionChangeComplete={onRegionChangeComplete}
        scrollEnabled={true}
        tintColor={colors.quaternary}
        showsCompass={false}
        showsUserLocation={true}
        
      >
        <MarkerAnimated 
          ref={marker}
          identifier='currentDeliveryLocation'
          coordinate={markerUser.coordinate}
          // pinColor={'tan'}
          image={require('../../ui/images/marker.png')}
        >

        </MarkerAnimated>
      </AnimatedMap>
    
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  addressView: {
    zIndex: 10,
    backgroundColor: colors.quaternary,
    // borderTopWidth: 0,
    // borderWidth: 2,
    // borderColor: colors.quaternary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },

  addressInput: {
    // borderColor: colors.quaternary,
    // borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: colors.white,
    
  },

  addressField: {
    color: colors.quaternary,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontSizes.m,
    fontWeight: '500',
    paddingHorizontal: 8
  }
 });


