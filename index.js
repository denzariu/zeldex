/**
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import React from 'react';

function Wrapper() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}><Provider store={store}><App/></Provider></GestureHandlerRootView>
  )
}

AppRegistry.registerComponent(appName, () => Wrapper);
