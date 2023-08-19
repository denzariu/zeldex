import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Map = () => {
  return (
    <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
      //  region={{
      //    latitude: 37.78825,
      //    longitude: -122.4324,
      //    latitudeDelta: 0.015,
      //    longitudeDelta: 0.0121,
      //  }}
      scrollEnabled={true}
      liteMode={true}
     >
      
     </MapView>
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
 });