import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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


function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'My home',
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
            component={Profile}
            options={{
              title: 'Search',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen 
            name="Orders"
            component={Profile}
            options={{
              title: 'Orders',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen 
            name="Profile"
            component={Profile}
            options={{
              title: 'Profile',
              headerBackVisible: false,
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
