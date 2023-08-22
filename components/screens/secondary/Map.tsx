import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated as AnimatedMap, Region, Marker, MarkerAnimated } from 'react-native-maps'
import { useAnimatedRegion } from '../../ui/components/useAnimatedRegion'
import { colors, fontSizes } from '../../../styles/defaults'
import { mapsApiKey } from '../../ui/utils/secrets'
import Geocoder from 'react-native-geocoding'

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



const Map = ({ route, navigation } : MapProps) => {
  
  Geocoder.init(mapsApiKey);

  const { locationProp } = route.params;
  const [LATITUDE, setLATITUDE] = useState(locationProp.latitude);
  const [LONGITUDE, setLONGITUDE] = useState(locationProp.longitude);
  const [fullAddress, setAddress] = useState('');
  const marker = useRef<MarkerAnimated>(null);

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

  console.log(locationProp)
  
  // const state = useAnimatedRegion({
  //     latitude: locationProp.latitude,
  //     longitude: locationProp.longitude,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   }, markersData)
  
  // const { markers, region, panY} = state;

  // const onRegionChange = (_region : any) => {
  //   region.setValue(_region);
  // }

  const fetchLocation = async (coords : any) => {
    Geocoder.from(coords.latitude, coords.longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent)
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
    backgroundColor: colors.primary,
    // borderTopWidth: 0,
    // borderWidth: 2,
    // borderColor: colors.quaternary,
    paddingHorizontal: 20,
    paddingVertical: 24,
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
    fontWeight: '500'
  }
 });

function getInitialState() {
  throw new Error('Function not implemented.')
}
