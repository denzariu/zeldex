import { combineReducers, applyMiddleware} from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import userReducer from './reducers';

const rootReaducer = combineReducers({userReducer});

export const Store = configureStore({
  reducer: rootReaducer,
});

