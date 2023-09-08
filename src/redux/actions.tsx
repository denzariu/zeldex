import { Dictionary, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { foodItem } from "../database/models";

// export const ON_LOGIN = 'ON_LOGIN';
// export const ON_ERROR = 'ON_ERROR';



export interface UserModel {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode: string;
  address: string;
  coordinates: {
    longitude: number | undefined,
    latitude: number | undefined
  },
  token: string;  
  type: string;
}

export interface CartModel {
  restaurantName: string,
  restaurantId: number,
  items: Array<foodItem>,
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

