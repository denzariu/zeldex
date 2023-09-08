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
  TouchableOpacity,
  Dimensions,
  BackHandler
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { colors, fontSizes, fonts } from '../../../styles/defaults';
import { useDispatch, useSelector } from 'react-redux';
import { DarkTheme, ParamListBase, useNavigation } from '@react-navigation/native';
import { input } from '../../../styles/ui';
import { userSlice } from '../../../src/redux/reducers';
import { UserModel } from '../../../src/redux/actions';
import { _retrieveDataOnStartup, cacheUserDetails } from '../../../src/redux/fetcher';
import { checkPhone } from '../../../src/behavior/dataCheck';


import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../../ui/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { store } from '../../../src/redux/store';

const {height, width} = Dimensions.get('window');

const Login = () => {

  
  // const [value, setValue] = useState("");
  // const [formattedValue, setFormattedValue] = useState("");
  // const [valid, setValid] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  // const phoneInput = useRef<PhoneInput>(null);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const isAuthenticated: boolean = useSelector((state:any) => (state.userReducer.isAuthenticated));

  // First screen
  const phone: string = useSelector((state:any) => (state.userReducer.user.phone));
  const user = useSelector((state:any) => (state.userReducer.user));

  const viewPosition = useSharedValue(0);
  
  const loginFirstViewAnimation = useAnimatedStyle(() => {
    const interpolation = interpolate(viewPosition.value, [0, 1], [0, -width])
    return {
      transform: [{translateX: withTiming(interpolation, {duration: 1000})}]
    }
  })

  // Second screen
  const [textName, onChangeTextName] = React.useState('');
  const [textGivenName, onChangeTextGivenName] = React.useState('');

  const loginSecondViewAnimation = useAnimatedStyle(() => {
    const interpolation = interpolate(viewPosition.value, [0, 1], [width, 0])
    return {
      transform: [{translateX: withTiming(interpolation, {duration: 1000})}]
    }
  })

  const [loading, onLoading] = React.useState(true);
  const [fetchLoaded, onFetchLoad] = React.useState(false);
  const [textPhone, onChangePhone] = React.useState(phone);

  const [countryCode, setCountryCode] = useState<CountryCode>('RO')
  const [country, setCountry] = useState<Country>()
 
  const [callingCode, setCountryCallingCode] = useState<string>('40')
  
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    setCountryCallingCode(country.callingCode[0])
  }

  function onUserLogIn(): void {

    
    const userLoginData = {
      ...user,
      firstName: textGivenName,
      lastName: textName,
    } as UserModel;

    store.dispatch(userSlice.actions.login(userLoginData))
    // cacheUserDetails(userLoginData, true)
    cacheUserDetails(userLoginData, true).then(() => {
      console.log('letsgooo?');
      // console.log(isAuthenticated)
    });

    try {

    } catch (e){ 
      throw new Error('Function not implemented.')
    }
  }
  
  const onContinue = () => {

    //TODO: check data
    console.log('e'+ callingCode + textPhone)
    if (!checkPhone('+' + callingCode + textPhone)) {
      Alert.alert("Phone number has an invalid format.");
      return;
    }
    
    const userLoginData = {
      ...user,
      countryCode: callingCode,
      phone: textPhone,
    } as UserModel;

    dispatch(userSlice.actions.setPhone(textPhone))
    dispatch(userSlice.actions.setCountryCode(callingCode))

    // cacheUserDetails(userLoginData, true)
    cacheUserDetails(userLoginData, false).then(() => {
      viewPosition.value = 1;
      // navigation.navigate("LoginUserDetails");
    });
  }
  
  useEffect(() => {
    // MOVED TO 'App.tsx' (protected routing change) 

    // onLoading(true)
    // _retrieveDataOnStartup().then(res => {
    //   onFetchLoad(true);
    //   if (loggedin)
    //     onLoading(false)
    // });


    // Back action overwrite
    function handleBackButtonClick() {
      if (viewPosition.value == 1)
        viewPosition.value = 0;
      //navigation.goBack();
      
      return true;
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  
  }, [])

  useEffect(() => {
    console.log(fetchLoaded, isAuthenticated)
    if (isAuthenticated)
      navigation.navigate('MainTabScreen');
    else if (fetchLoaded)
      onLoading(false);

  }, [isAuthenticated, fetchLoaded]);


  //Test Activity Indicator
  //if (true) return (<ActivityIndicator style={styles.loading} color={colors.primary} size="large"/>) 
  
  return (
    
    <View style={styles.pageContainer}>
      <Text style={styles.title}>Zeldex</Text>
      
      {/* First login screen */}
      <Animated.View style={[styles.container, loginFirstViewAnimation]}>
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
          <TextInput
            style={[input, {flex: 1, margin: 0}]}
            onChangeText={onChangePhone}
            value={textPhone}
            placeholder=""
            autoComplete={"tel"}
            keyboardType='phone-pad'>
          </TextInput>
        </View>    
        <Pressable
          onPress={onContinue}
          style={({pressed}) => [ 
            {backgroundColor: pressed? colors.quaternary : colors.tertiary},
            styles.button,
          ]}>
            <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </Animated.View>

      {/* Second login screen */}
      <Animated.View style={[styles.container, loginSecondViewAnimation]}>
        <Text style={styles.textArea}>First Name</Text>
        <TextInput
          style={input}
          onChangeText={onChangeTextGivenName}
          value={textGivenName}
          placeholder=""
          autoComplete={"given-name"}>
        </TextInput>  
        <Text style={styles.textArea}>Last Name</Text>
        <TextInput
          style={input}
          onChangeText={onChangeTextName}
          value={textName}
          placeholder=""
          autoComplete={"name"}>
        </TextInput>   
        
        <Pressable
          onPress={onUserLogIn}
          style={({pressed}) => [ 
            {backgroundColor: pressed? colors.quaternary : colors.tertiary},
            styles.button,
          ]}>
            <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </Animated.View>
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
    position: 'absolute',
    left: 0,
    right: 0,

    alignContent: 'center',
    justifyContent: 'center',

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

  button: {
    padding: 15,
    margin: 5,
    marginVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: colors.white,
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