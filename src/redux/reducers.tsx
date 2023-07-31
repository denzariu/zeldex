import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "./actions";
import { act } from "react-test-renderer";
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
    password: '' //Test purposes only
  } as UserModel,
  error: '' as string | undefined,
  isAuthenticated: false as boolean
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    error(state) {
      state.isAuthenticated = false;
      state.error = '';
    },

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