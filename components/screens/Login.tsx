import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Pressable,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { colors, fontSizes, fonts } from '../../styles/defaults';
import { useDispatch, useSelector } from 'react-redux';
import { DarkTheme, useNavigation } from '@react-navigation/native';
import { input } from '../../styles/ui';
import { userSlice } from '../../redux/reducers';
import { UserModel } from '../../redux/actions';
import { _retrieveDataOnStartup, cacheUserDetails } from '../../redux/fetcher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkPhone } from '../behavior/dataCheck';

import PhoneInput from "react-native-phone-number-input";

import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../ui/types'

//Use modal

const Login = () => {

  
  // const [value, setValue] = useState("");
  // const [formattedValue, setFormattedValue] = useState("");
  // const [valid, setValid] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  // const phoneInput = useRef<PhoneInput>(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedin: boolean = useSelector((state:any) => (state.userReducer.isAuthenticated));
  const phone: string = useSelector((state:any) => (state.userReducer.user.phone));


  const [loading, onLoading] = React.useState(true);
  const [fetchLoaded, onFetchLoad] = React.useState(false);
  const [textName, onChangeTextName] = React.useState('Pinzariu');
  const [textGivenName, onChangeTextGivenName] = React.useState('Denis');
  const [textPhone, onChangePhone] = React.useState(phone);
  const [textPassword, onChangePassword] = React.useState('');

  const [countryCode, setCountryCode] = useState<CountryCode>('RO')
  const [country, setCountry] = useState<Country>()
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(false)
 
  const [callingCode, setCountryCallingCode] = useState<string>('40')
  
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    setCountryCallingCode(country.callingCode[0])
  }

  const onUserLogIn = () => {

    //TODO: check data
    console.log('e'+ callingCode + textPhone)
    if (!checkPhone('+' + callingCode + textPhone)) {
      Alert.alert("Phone number has an invalid format.");
      return;
    }
    
    const userLoginData = {
      firstName: textGivenName,
      lastName: textName,
      countryCode: callingCode,
      phone: textPhone,
      password: textPassword
    } as UserModel;

    dispatch(userSlice.actions.login(userLoginData))
    cacheUserDetails(userLoginData, true)
  }

  useEffect(() => {
    onLoading(true)
    _retrieveDataOnStartup().then(res => {
      onFetchLoad(true);
      console.log(fetchLoaded, loggedin)
    });
    
    //TEST PURPOSES - TODELETE
    //AsyncStorage.clear();
  }, [])

  useEffect(() => {
    console.log(fetchLoaded, loggedin)
    if (loggedin)
      navigation.navigate('Home');
    else if (fetchLoaded)
      onLoading(false);

  }, [loggedin, fetchLoaded]);


  //Test Activity Indicator
  //if (true) return (<ActivityIndicator style={styles.loading} color={colors.primary} size="large"/>) 
  
  if (!fetchLoaded || loading)
    return (<ActivityIndicator style={styles.loading} color={colors.primary} size="large"/>)
  else
  return (
    
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Zeldex</Text>
      <View style={styles.container}>
        {/* <Text style={styles.textArea}>Given Name</Text>
        <TextInput
          style={input}
          onChangeText={onChangeTextGivenName}
          value={textGivenName}
          placeholder=""
          autoComplete={"given-name"}>
        </TextInput>  
        <Text style={styles.textArea}>Name</Text>
        <TextInput
          style={input}
          onChangeText={onChangeTextName}
          value={textName}
          placeholder=""
          autoComplete={"name"}>
        </TextInput>   */}
        {/* <Text style={styles.textArea}>Phone</Text> */}
        <View style={[styles.inline]}>
          <CountryPicker containerButtonStyle={styles.containerButtonStyle}
            {...{
              countryCode,
              withFilter:true,
              withFlag:true,
              withCountryNameButton:false,
              withAlphaFilter:true,
              withCallingCode:true,
              withEmoji:true,
              withCallingCodeButton:true,
              onSelect,

            }}
            visible={false}
          />
          {/* <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          /> */}
          <TextInput
            style={[input, {flex: 1, margin: 0}]}
            onChangeText={onChangePhone}
            value={textPhone}
            placeholder=""
            autoComplete={"tel"}
            keyboardType='phone-pad'>
          </TextInput>
        </View>    
        {/* <Text style={styles.textArea}>Password</Text>
        <TextInput
          style={input}
          onChangeText={onChangePassword}
          value={textPassword}
          placeholder=""
          secureTextEntry={true}
          autoComplete={"current-password"}>
        </TextInput>     */}
        <Pressable
          onPress={onUserLogIn}
          style={({pressed}) => [ 
            {backgroundColor: pressed? colors.quaternary : colors.tertiary},
            styles.button,
          ]}>
            <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignContent: 'center',
    justifyContent: 'center',
  },

  title: {
    position: 'absolute',
    top: 10,
    paddingHorizontal: 10,
    fontSize: fontSizes.xxl,
    fontWeight: "600",
    color: colors.primary,
    textAlign: 'center'
  },

  container: {
    borderRadius: 20,
    margin: 10,
    padding: 10,
    backgroundColor: colors.primary
  },

  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8
  },

  textArea: {
    paddingHorizontal: 10,
    fontSize: fontSizes.m,
    //fontFamily: fonts.helveticaBold,
    fontWeight: "600",
    color: colors.quaternary
  },

  loading: {
    flex: 1
  },

  button: {
    padding: 15,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: fontSizes.xl,
    textAlign: 'center'
  },

  containerButtonStyle: {
    padding: 8,
    marginRight: 8,
    borderRadius: 10,
    //borderWidth: 1.5,
    //borderColor: colors.quaternary
    //backgroundColor: colors.quaternary
    
  }

  
})

export default Login