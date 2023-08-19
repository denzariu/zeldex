import React from 'react';
import {NavigationContainer, TabRouter, useNavigation} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type {PropsWithChildren} from 'react';

const Stack = createNativeStackNavigator();

import {
  Alert,
  Button,
  Share,
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
import { UserModel } from './src/redux/actions';
import Login from './components/screens/Login';
import { Text } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileUserDetails from './components/screens/secondary/ProfileUserDetails';
import ProfilePayment from './components/screens/secondary/ProfilePayment';
import ProfilePromoCodes from './components/screens/secondary/ProfilePromoCodes';
import ProfileSettings from './components/screens/secondary/ProfileSettings';
import ProfileAbout from './components/screens/secondary/ProfileAbout';
import ProfileHelp from './components/screens/secondary/ProfileHelp';
import ProfileLanguage from './components/screens/secondary/ProfileLanguage';
import ProfileCommunication from './components/screens/secondary/ProfileCommunication';
import Restaurants from './components/screens/Home/Restaurants';
import HomeRestaurant from './components/screens/Home/Restaurant';
import Map from './components/screens/secondary/Map'

import { HeaderBackButton, HeaderTitle, PlatformPressable } from '@react-navigation/elements'

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
      <HomeTabs.Screen name='Home' component={HomeStackScreen}/>
      <HomeTabs.Screen name='Search' component={Search}/>
      <HomeTabs.Screen name='Orders' component={Orders}/>
      <HomeTabs.Screen name='Profile' component={ProfileStackScreen}/>
    </HomeTabs.Navigator>
  )
}
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false, statusBarColor: colors.primary, statusBarStyle: 'dark'}}>
      <HomeStack.Screen
              name="HomeStackScreen"
              component={Home}
              options={{
                title: 'My home',
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
        <HomeStack.Screen
              name="HomeRestaurants"
              component={Restaurants}
              options={{
                title: '',
                headerShown: true,
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
        
    </HomeStack.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false, statusBarColor: colors.primary, statusBarStyle: 'dark'}}>
      <ProfileStack.Screen
              name="ProfileStackScreen"
              component={Profile}
              options={{
                // headerShown: false,
                title: 'My home',
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileUserDetails"
              component={ProfileUserDetails}
              options={{
                headerShown: true,
                headerTitle: 'Profile',
                title: 'Profile',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfilePayment"
              component={ProfilePayment}
              options={{
                headerShown: true,
                headerTitle: 'Payment',
                title: 'Payment',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfilePromoCodes"
              component={ProfilePromoCodes}
              options={{
                headerShown: true,
                headerTitle: 'Promo Codes',
                title: 'Promo Codes',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileSettings"
              component={ProfileSettings}
              options={{
                headerShown: true,
                headerTitle: 'Settings',
                title: 'Settings',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTitleAlign: 'center',
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileAbout"
              component={ProfileAbout}
              options={{
                headerShown: true,
                headerTitle: 'About',
                title: 'My home',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileHelp"
              component={ProfileHelp}
              options={{
                headerShown: true,
                headerTitle: 'Help',
                title: 'My home',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileLanguage"
              component={ProfileLanguage}
              options={{
                headerShown: true,
                headerTitle: 'Language',
                title: 'Language',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
      <ProfileStack.Screen
              name="ProfileCommunication"
              component={ProfileCommunication}
              options={{
                headerShown: true,
                headerTitle: 'Communication preferences',
                title: 'Communication preferences',
                headerBackVisible: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              }}
            />
    </ProfileStack.Navigator>
  )
}

function App(): JSX.Element {

  const shareData = async () => {
    try {
        await Share.share({
            title: 'Sharing this xoxo',
            message:
                'This is the demo text',
        });
    } catch (error) {
        console.log(error);
    }
  };

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
                statusBarColor: colors.quaternary,
                statusBarStyle: 'light',
                headerShown: false,
                headerStyle: {
                  backgroundColor: colors.quaternary,
                },
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

            <Stack.Screen
              name="HomeRestaurant"
              component={HomeRestaurant}
              options={ (navigation)=> ({
                title: '',
                statusBarColor: colors.primary,
                statusBarStyle: 'dark',
                headerShown: true,
                headerTransparent: true,
                headerBackVisible: false,
                headerShadowVisible: false,
                headerTitleAlign: 'center',

                // headerStyle: {
                //   backgroundColor: colors.primary,
                // },

                headerTitle: (title) => (
                    <HeaderTitle
                      {...title}
                      numberOfLines={1}
                      allowFontScaling={false} 
                      style={{
                        maxWidth: 200,
                        paddingVertical: 5, 
                        paddingHorizontal: 12, 
                        borderRadius: 12, 
                        backgroundColor: colors.primary, 
                        fontWeight: 'bold',
                        fontSize: fontSizes.m}}
                    >
                      
                    </HeaderTitle>
                ),
                headerLeft: (props) => (
                    <HeaderBackButton
                      {...props}
                      onPress={() => navigation.navigation.goBack(null)}
                      //color={colors.quaternary}
                      style={{borderRadius: 48, backgroundColor: colors.primary}}
                      tintColor={colors.quaternary}
                    />
                ),
                //headerSearchBarOptions: {shouldShowHintSearchIcon:true},
                headerRight: (props) => (
                  <HeaderBackButton
                      {...props}
                      onPress={shareData}
                      tintColor={colors.quaternary}
                      style={{borderRadius: 48, backgroundColor: colors.primary, transform: ([{rotate: '130deg'}]) }}
                      // //tintColor={colors.quaternary}
                      // pressColor={colors.quaternary}
                      pressOpacity={0}
                    />
              ),
                

                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              })}
            />

            <Stack.Screen
              name="Map"
              component={Map}
              options={ (navigation)=> ({
                title: '',
                statusBarColor: colors.primary,
                statusBarStyle: 'dark',
                headerShown: true,
                headerTransparent: true,
                headerBackVisible: false,
                headerShadowVisible: false,
                headerTitleAlign: 'center',

                // headerStyle: {
                //   backgroundColor: colors.primary,
                // },

              //   headerTitle: (title) => (
              //       <HeaderTitle
              //         {...title}
              //         numberOfLines={1}
              //         allowFontScaling={false} 
              //         style={{
              //           maxWidth: 200,
              //           paddingVertical: 5, 
              //           paddingHorizontal: 12, 
              //           borderRadius: 12, 
              //           backgroundColor: colors.primary, 
              //           fontWeight: 'bold',
              //           fontSize: fontSizes.m}}
              //       >
                      
              //       </HeaderTitle>
              //   ),
              //   headerLeft: (props) => (
              //       <HeaderBackButton
              //         {...props}
              //         onPress={() => navigation.navigation.goBack(null)}
              //         //color={colors.quaternary}
              //         style={{borderRadius: 48, backgroundColor: colors.primary}}
              //         tintColor={colors.quaternary}
              //       />
              //   ),
              //   //headerSearchBarOptions: {shouldShowHintSearchIcon:true},
              //   headerRight: (props) => (
              //     <HeaderBackButton
              //         {...props}
              //         onPress={shareData}
              //         tintColor={colors.quaternary}
              //         style={{borderRadius: 48, backgroundColor: colors.primary, transform: ([{rotate: '130deg'}]) }}
              //         // //tintColor={colors.quaternary}
              //         // pressColor={colors.quaternary}
              //         pressOpacity={0}
              //       />
              // ),
                

                headerTintColor: colors.quaternary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: fontSizes.xl,
                },
              })}
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


export default App;
