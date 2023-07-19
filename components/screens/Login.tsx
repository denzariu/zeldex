import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { colors, fontSizes } from '../../styles/defaults';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { input } from '../../styles/ui';
import { userSlice } from '../../redux/reducers';
import { UserModel } from '../../redux/actions';
import { _retrieveDataOnStartup, cacheUserDetails } from '../../redux/fetcher';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Use modal

const Login = () => {

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

  useEffect(() => {
    onLoading(true)
    _retrieveDataOnStartup().then(res => {
      onFetchLoad(true);
      console.log(fetchLoaded, loggedin)
    });
    
    //TEST PURPOSES - TODELETE
    AsyncStorage.clear();
  }, [])

  useEffect(() => {
    console.log(fetchLoaded, loggedin)
    if (loggedin)
      navigation.navigate('Home');
    else if (fetchLoaded)
      onLoading(false);

  }, [loggedin, fetchLoaded]);

  const onUserLogIn = () => {
    const userLoginData = {
      firstName: textGivenName,
      lastName: textName,
      phone: textPhone,
      password: textPassword
    } as UserModel;

    dispatch(userSlice.actions.login(userLoginData))
    cacheUserDetails(userLoginData, true)
  }
  //Test Activity Indicator
  //if (true) return (<ActivityIndicator style={styles.loading} color={colors.primary} size="large"/>) 
  
  if (!fetchLoaded || loading)
    return (<ActivityIndicator style={styles.loading} color={colors.primary} size="large"/>)
  else
  return (
    
    <View style={styles.pageContainer}>
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
        <Text style={styles.textArea}>Phone</Text>
        <TextInput
          style={input}
          onChangeText={onChangePhone}
          value={textPhone}
          placeholder=""
          autoComplete={"tel"}
          keyboardType='phone-pad'>
        </TextInput>    
        <Text style={styles.textArea}>Password</Text>
        <TextInput
          style={input}
          onChangeText={onChangePassword}
          value={textPassword}
          placeholder=""
          secureTextEntry={true}
          autoComplete={"current-password"}>
        </TextInput>    
        <Pressable
          onPress={onUserLogIn}
          style={({pressed}) => [ 
            {backgroundColor: pressed? colors.quaternary : colors.tertiary},
            styles.button,
          ]}>
            <Text style={styles.buttonText}>Log In</Text>
            
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

  container: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: colors.primary
  },

  textArea: {
    paddingLeft: 10,
    fontSize: fontSizes.m,
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
})

export default Login