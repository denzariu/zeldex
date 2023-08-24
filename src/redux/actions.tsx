import { Dictionary, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export const ON_LOGIN = 'ON_LOGIN';
// export const ON_ERROR = 'ON_ERROR';



export interface UserModel {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode: string;
  address: string,
  coordinates: {
    longitude: number | undefined,
    latitude: number | undefined
  },
  password: string;  
}

// export interface LoginAction {
//   readonly type: 'ON_LOGIN';
//   payload: UserModel;
// }

// export interface ErrorAction {
//   readonly type: 'ON_ERROR';
//   payload: any;
// }
// export type UserAction = LoginAction | ErrorAction;

