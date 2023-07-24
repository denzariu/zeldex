import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigationState } from '@react-navigation/native';
import { colors, fontSizes } from '../../../styles/defaults';
import Input from '../../ui/components/Input';



const ProfilePromoCodes = () => {
  
  const [promoCode, setPromoCode] = useState('');

  const onChangePromoCode = (value: string) => {
    setPromoCode(value);
  }

  return (
    <View style={styles.pageContainer}>
      <Input 
        keyboardType='default'
        autoComplete={undefined}
        upperText='Promo code'
        autoFocus={true}
        maxLength={40}
        onTextChange={onChangePromoCode}
        defaultValue={promoCode}
        disabled={false}/>
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
},

textArea: {
  fontSize: fontSizes.l,
  color: colors.quaternary
}
})

export default ProfilePromoCodes