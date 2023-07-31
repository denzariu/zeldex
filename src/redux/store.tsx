import { combineReducers, applyMiddleware} from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { userSlice } from './reducers';

//import thunk from 'redux-thunk';
//import userReducer from './reducers';


//const rootReaducer = combineReducers({userReducer});
//const rootReaducer = combineReducers({});

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer
  },
});

