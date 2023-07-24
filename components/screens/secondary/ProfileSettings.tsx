import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigationState } from '@react-navigation/native';
import { colors, fontSizes } from '../../../styles/defaults';
import SvgImage from 'react-native-svg/lib/typescript/elements/Image';
import { SvgXml } from 'react-native-svg';



const ProfileSettings = ({navigation}) => {
  
  const routesLength = useNavigationState(state => state.routes.length);
  return (
    <View style={styles.pageContainer}>
      
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProfileLanguage')}>
        <Text style={styles.textArea}>Language</Text>
        <SvgXml xml={svgRightArrow} width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProfileCommunication')}>
        <Text style={styles.textArea}>Communication preferences</Text>
        <SvgXml xml={svgRightArrow} width={24} height={24} />
      </TouchableOpacity>

    </View>
  )
}



const styles = StyleSheet.create({
pageContainer: {
  flex: 1,
  backgroundColor: colors.primary,
  padding: 24
},

container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 12,
  borderBottomWidth: 1.5,
  borderBottomColor: colors.grayLight
},

textArea: {
  fontSize: fontSizes.m,
  color: colors.textBlack,
  fontWeight: '400'
}
})

const svgRightArrow = `<svg width="800px" height="800px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M19 12L31 24L19 36" stroke="`+ colors.quaternary +`" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export default ProfileSettings