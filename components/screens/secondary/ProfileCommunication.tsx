import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fontSizes } from '../../../styles/defaults';
import { SvgXml } from 'react-native-svg';


function MyCheckbox() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false); // TODO: set loading until passing the value to state / server
  useEffect(() => {
  }, [checked])

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}>
      {checked && 
        <SvgXml xml={svgRightArrow} width={24} height={24} />}
    </Pressable>
  );
}

const ProfileCommunication = () => {

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.textArea}>We occasionally send you the latest product news & promotional offers. 
                                    In order to benefit, tick the box below. If you don't wish to receive
                                    any newsletters or offers please untick this box. You can always adjust
                                    your preferences here.</Text>
      <View style={styles.checkboxContainer}>
        <MyCheckbox/>
        <Text style={styles.textAreaCheckbox}>I want to receive Zeldex news and offers</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
pageContainer: {
  backgroundColor: colors.primary,
  padding: 24,
  gap: 24,
  flex: 1
},

checkboxContainer: {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: 12,
  borderBottomColor: colors.grayLight,
  borderBottomWidth: 1.5,
  paddingVertical: 8,
},

textArea: {
  fontSize: fontSizes.ml,
  color: colors.gray,
  fontWeight: '400',
  textAlign: 'justify'
},

textAreaCheckbox: {
  flexShrink: 1,
  fontSize: fontSizes.ml,
  color: colors.textBlack,
  fontWeight: '400',
  textAlign: 'justify',
  
},

checkboxBase: {
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderWidth: 2,
  borderColor: colors.quaternary,
  backgroundColor: 'transparent',
},
checkboxChecked: {
  backgroundColor: colors.quaternary,
},
})


const svgRightArrow = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="check" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><polyline id="primary" points="5 12 10 17 19 8" style="fill: none; 
stroke: `+ colors.primary +`; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline></svg>`

export default ProfileCommunication