import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type {PropsWithChildren} from 'react';

const Stack = createNativeStackNavigator();

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MenuBar from './components/MenuBar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import { colors, fontSizes } from './styles/defaults';
import Search from './components/screens/Search';
import Orders from './components/screens/Orders';
import { UserModel } from './redux/actions';
import Login from './components/screens/Login';


function App(): JSX.Element {

  
  const userDetails: UserModel = useSelector((state:any) => state.userReducer.user);
  const userFullName: string = useSelector((state:any) => (state.userReducer.user.firstName + ' ' + state.userReducer.user.lastName));
  const userPhone: string = useSelector((state:any) => (state.userReducer.user.phone));

  return (
    
      <SafeAreaProvider>
        <StatusBar/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login' screenOptions={{ contentStyle: {backgroundColor: colors.quaternary}}}>
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
              name="Home"
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
                  fontSize: fontSizes.xxl,
                },
              }}
            />
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
                title: 'Hi ' + userFullName + '!',
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
          </Stack.Navigator>
          
        <MenuBar/>
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
