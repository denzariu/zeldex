import React from 'react';
import {NavigationContainer, TabRouter} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type {PropsWithChildren} from 'react';

const Stack = createNativeStackNavigator();

import {
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


import MenuBar from './components/MenuBar';
import Home from './components/screens/Home/Home';
import Profile from './components/screens/Profile';
import { colors, fontSizes } from './styles/defaults';
import Search from './components/screens/Search';
import Orders from './components/screens/Orders';
import { UserModel } from './redux/actions';
import Login from './components/screens/Login';
import { Text } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileUserDetails from './components/screens/secondary/ProfileUserDetails';


//TODO: styles revamp



const HomeTabs = createBottomTabNavigator();

function MainTabScreen() {

  const screenOptionsSet = {
  };
  const sceneContainerStyle = {
  };
  
  return (
    <HomeTabs.Navigator
      screenOptions={{headerShown: false}} 
      tabBar={props => <MenuBar {...props}/>}
    >
      <HomeTabs.Screen name='Home' component={Home} options={{
                headerShown: true,
                title: 'My home',
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}/>
      <HomeTabs.Screen name='Search' component={Search}/>
      <HomeTabs.Screen name='Orders' component={Orders}/>
      <HomeTabs.Screen name='Profile' component={ProfileStackScreen}/>
    </HomeTabs.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
              name="ProfileStackScreen"
              component={Profile}
              options={{
                // headerShown: false,
                animation: 'fade_from_bottom',
                title: 'My home',
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileUserDetails"
              component={ProfileUserDetails}
              options={{
                headerShown: true,
                headerTitle: '',
                title: 'My home',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}
            />
    </ProfileStack.Navigator>
  )
}

function App(): JSX.Element {

  
  const userDetails: UserModel = useSelector((state:any) => state.userReducer.user);
  const userFullName: string = useSelector((state:any) => (state.userReducer.user.firstName + ' ' + state.userReducer.user.lastName));
  const userPhone: string = useSelector((state:any) => (state.userReducer.user.phone));

  return (
    
      <SafeAreaProvider>
        <StatusBar/>
        <NavigationContainer>
          
          <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, contentStyle: {backgroundColor: colors.quaternary}}}>
          <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Sign In',
                headerShown: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}
            />
            <Stack.Screen
              name="MainTabScreen"
              component={MainTabScreen}
              options={{
                // headerShown: false,
                animation: 'fade_from_bottom',
                title: 'My home',
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}
            />
{/*             
            <Stack.Screen 
              name="Search"
              component={Search}
              options={{
                title: 'Search',
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}
            />
            <Stack.Screen 
              name="Orders"
              component={Orders}
              options={{
                title: 'Orders',
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xxl,
                },
              }}
            />
            <Stack.Screen 
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
                // title: '',
                // headerBackVisible: false,
                // //headerLeft: () => (<View style={{width: 500}}><Text>Hi {userFullName}</Text></View>),
                // headerStyle: {
                //   backgroundColor: colors.quaternary,
                // },
                // headerTintColor: colors.primary,
                // headerTitleStyle: {
                //   fontWeight: 'bold',
                //   fontSize: fontSizes.xxl,
                // },
              }}
            /> */}

          </Stack.Navigator>
          
        {/*<MenuBar/>*/}
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
