import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigationState } from '@react-navigation/native';
import { colors, fontSizes } from '../../../styles/defaults';
import SvgImage from 'react-native-svg/lib/typescript/elements/Image';
import { SvgXml } from 'react-native-svg';
import { svgRightArrowQuaternary } from '../../ui/images/svgs'


const ProfileSettings = ({navigation}) => {
  
  const routesLength = useNavigationState(state => state.routes.length);
  return (
    <View style={styles.pageContainer}>
      
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProfileLanguage')}>
        <Text style={styles.textArea}>Language</Text>
        <SvgXml xml={svgRightArrowQuaternary} width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProfileCommunication')}>
        <Text style={styles.textArea}>Communication preferences</Text>
        <SvgXml xml={svgRightArrowQuaternary} width={24} height={24} />
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

export default ProfileSettings