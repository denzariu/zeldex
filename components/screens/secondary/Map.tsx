import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps'

// enableLatestRenderer();

type MapProps = {
  route: any,
  navigation: any
}

const Map = ({ route, navigation } : MapProps) => {
  
  const { locationProp } = route.params;

  console.log(locationProp)
  return (
    
    // <Text>{locationProp?.longitude}</Text>
    <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: locationProp.latitude,
         longitude: locationProp.longitude,
         latitudeDelta: 0.008,
         longitudeDelta: 0.008,
       }}
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