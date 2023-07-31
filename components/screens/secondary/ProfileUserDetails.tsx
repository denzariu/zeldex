import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigationState } from '@react-navigation/native';
import { colors, fontSizes } from '../../../styles/defaults';
import { input } from '../../../styles/ui';
import Input from '../../ui/components/Input';
import { _retrieveDataOnStartup } from '../../../src/redux/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../../src/redux/reducers';



const ProfileUserDetails = () => {
  
  const dispatch = useDispatch();
  const givenNameState: string = useSelector((state:any) => (state.userReducer.user.firstName));
  const familyNameState: string = useSelector((state:any) => (state.userReducer.user.lastName));
  const emailState: string = useSelector((state:any) => (state.userReducer.user.email));
  const phoneState: string = useSelector((state:any) => ('+' + state.userReducer.user.countryCode + state.userReducer.user.phone));

  //TODO: these intermediaries should be used in order to verify data
  //      before sending it to dispatch 
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onChangeGivenName = (value: string) => {
    setGivenName(value)
    dispatch(userSlice.actions.setFirstName(value));
  }
  const onChangeFamilyName = (value: string) => {
    setFamilyName(value)
    dispatch(userSlice.actions.setLastName(value));
  }
  const onChangeEmail = (value: string) => {
    setEmail(value)
    dispatch(userSlice.actions.setEmail(value));
  }
  const onChangePhone = (value: string) => {
    setPhone(value)
    dispatch(userSlice.actions.setPhone(value));
  }
  useEffect(() => {
    setGivenName(givenNameState);
    setFamilyName(familyNameState);
    setEmail(emailState);
    setPhone(phoneState);
  }, [])
  
  return (
    // <View style={styles.pageContainer}>
    //   <Text style={styles.textArea}>Hello</Text>
    //   <TextInput style={[input, {marginHorizontal: 0}]}/>
    // </View>
    <View style={styles.pageContainer}>
      <Input 
        keyboardType='default'
        autoComplete='given-name'
        upperText='First name'
        autoFocus={false}
        maxLength={30}
        onTextChange={onChangeGivenName}
        defaultValue={givenName}
        disabled={false}/>
      <Input 
        keyboardType='default'
        autoComplete='family-name'
        upperText='Family name'
        autoFocus={false}
        maxLength={30}
        onTextChange={onChangeFamilyName}
        defaultValue={familyName}
        disabled={false}/>
      <Input 
        keyboardType='email-address'
        autoComplete='email'
        upperText='E-mail'
        autoFocus={false}
        maxLength={40}
        onTextChange={onChangeEmail}
        defaultValue={email}
        disabled={false}/>
      <Input 
        keyboardType='phone-pad'
        autoComplete='tel'
        upperText='Phone'
        autoFocus={false}
        maxLength={40}
        onTextChange={onChangePhone}
        defaultValue={phone}
        disabled={true}/>
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

export default ProfileUserDetails