import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigationState } from '@react-navigation/native';
import { colors, fontSizes } from '../../../styles/defaults';



const ProfileLanguage = () => {
  
  const routesLength = useNavigationState(state => state.routes.length);
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.textArea}>{routesLength}</Text>
      <Text style={styles.textArea}>Hello</Text>
    </View>
  )
}



const styles = StyleSheet.create({
pageContainer: {
  flex: 1,
  backgroundColor: colors.primary
},

container: {
},

textArea: {
  fontSize: fontSizes.l,
  color: colors.quaternary
}
})

export default ProfileLanguage