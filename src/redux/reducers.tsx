import { Dictionary, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartModel, UserModel } from "./actions";
import { act } from "react-test-renderer";
import { foodItem } from "../database/models";
//import { ON_ERROR, ON_LOGIN, UserAction, UserModel } from "./actions";

// type UserState = {
//   user: UserModel;
//   error: string | undefined;
// }

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    countryCode: '',
    address: '',
    coordinates: {
      longitude: 0.0,
      latitude: 0.0
    },
    token: '' //Test purposes only
  } as UserModel,

  cart: {
    restaurantName: '',
    restaurantId: -1,
    items: []
  } as CartModel,

  error: '' as string | undefined,
  isAuthenticated: false as boolean,
  cachingComplete: false as boolean,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    // User Actions
    login(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    error(state) {
      state.isAuthenticated = false;
      state.error = '';
    },

    // Flag for finishing caching operation / state init
    cachingComplete(state) {
      state.cachingComplete = true;
    },

    // User Information Actions
    setFirstName(state, action: PayloadAction<string>) {
      state.user.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.user.lastName = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.user.phone = action.payload;
    },
    setLoggedInString(state, action: PayloadAction<string>) {
      action.payload == 'true' ? state.isAuthenticated = true : state.isAuthenticated = false;
    },
    setCountryCode(state, action: PayloadAction<string>) {
      state.user.countryCode = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    setUserLocation(state, action: PayloadAction<string>) {
      state.user.address = action.payload;
    },
    setUserCoordinates(state, action: PayloadAction<{longitude: number | undefined, latitude: number | undefined}>) {
      state.user.coordinates = action.payload;
    },

    // Cart Actions
    setCart(state, action: PayloadAction<CartModel>) {
      state.cart = action.payload;
    },
    appendCart(state, action: PayloadAction<foodItem>) {
      // console.log('<--------------------------------')
      // console.log('PAYLOAD: ', action.payload);
      // console.log('ITEMS: ', state.cart.items);
      state.cart.items.push(action.payload);
      // console.log('--------------------------------->')
    }
  }
})

// function userReducer(state: UserState = initialState, action: UserAction) {
//   switch (action.type) {
//     case ON_LOGIN:
//       return { 
//         ...state, 
//         user: action.payload,
//         loggedin: true
//       };
//     case ON_ERROR:
//       return { 
//         ...state,
//         error: action.payload,
//         loggedin: false
//       };
//     default:
//       return state;
//   } 
// }

// export default userReducer;