import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { UserModel } from "./actions";
import { userSlice } from "./reducers";
import { DispatchProp, useDispatch } from "react-redux";
import { Dispatch } from "react";
import { store } from "./store";
import { getDBConnection, getFoodItemById, getFoodItemsByRestaurantId } from "../database/db-service";
import { foodItem } from "../database/models";


export const cacheData = async (key: string, value: string) => {
  if (key === "" || value === "") {
    // Alert.alert("Either key or value field is empty. Please enter values for both.");
    return;
  }
  try {
    console.log('key: ' + key, 'value: ' + value)
    await AsyncStorage.setItem(
      key,
      value,
    );
    //Alert.alert("Item with key: " + key + " and value: " + value + " successfully cached.")
  } catch (error) {
    Alert.alert("Some error occured while caching data. Check console logs for details.");
    console.log(error);
  }
};

export const cacheDataArray = async (keysvalue: Map<string,string>) => {
  if (keysvalue === undefined || keysvalue.size <= 0) {
    Alert.alert("Either key or value size is not allowed. Please enter valid values for both.");
    return;
  }
  
  keysvalue.forEach((value, key) => {
    cacheData(key, value)
  });
};

export const fetchData = async (key: string) => {
  if (key === "") {
    Alert.alert("Key field is empty. Please enter they key to fetch corresponding data.");
    return undefined;
  }
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Alert.alert("Data corresponding to the key " + key + " is: " + value);
      return value;
    }
    else {
      // Alert.alert("Data corresponding to the key " + key + " does not exist in cache.");
      return undefined;
    }
  } catch (error) {
    Alert.alert("Some error occured while fetching data. Check console logs for details.");
    console.log(error);
    return undefined;
  }
};

export const fetchDataArray = async (keyArray: Array<string>) => {

  let promises: Array<Promise<string | undefined>> = [];
  
  try {
    keyArray.forEach(key => {
      promises.push(fetchData(key))
    })
    const values = await Promise.all(promises.map(promise => promise));
    return {values};
  } catch (error) {
    console.log(error);
    console.log('Oops!');
  }
  
};

export const cacheUserDetails = async (userData : UserModel, userIsLogged : boolean) => {
  await cacheDataArray(new Map<string, string>([
  ['firstName', userData.firstName],
  ['lastName', userData.lastName],
  ['phone', userData.phone],
  ['isAuthenticated', userIsLogged? 'true' : 'false'],
  ['countryCode', userData.countryCode],
  ['email', userData.email],
  ['address', userData.address],
]))
}

export const _retrieveDataOnStartup = async () => {


  const dataToRetrieveUser = ['firstName', 'lastName', 'phone', 'isAuthenticated', 'countryCode', 'email', 'address', 'cartRestaurantId', 'cartNoItems']  
  
  try {
    for (const item in dataToRetrieveUser) {
      const value = await AsyncStorage.getItem(dataToRetrieveUser[item]);

      if (value !== null) {
        switch (dataToRetrieveUser[item]) {
          case 'firstName':
            store.dispatch(userSlice.actions.setFirstName(value));
            break;
          case 'lastName':
            store.dispatch(userSlice.actions.setLastName(value));
            break;
          case 'phone':
            store.dispatch(userSlice.actions.setPhone(value));
            break;
          case 'isAuthenticated':
            store.dispatch(userSlice.actions.setLoggedInString(value));
            break;
          case 'countryCode':
            store.dispatch(userSlice.actions.setCountryCode(value));
            break;
          case 'email':
            store.dispatch(userSlice.actions.setEmail(value));
            break;
          case 'address':
            store.dispatch(userSlice.actions.setUserLocation(value));
            break;
          case 'cartRestaurantId':
            const restaurantName: string | null = await AsyncStorage.getItem('cartRestaurantName');
            store.dispatch(userSlice.actions.setCart({
              restaurantId: Number(value),
              restaurantName: restaurantName? restaurantName : '',
              items: []
            }))
            break;
          case 'cartNoItems':
            // console.log('CACHED noItemsCart: ', noItemsCart);
            const restaurantId: number | null = store.getState().userReducer.cart.restaurantId;
            const db = await getDBConnection();
            let noItemsCart = Number(value);
            while (noItemsCart) {
              try {
              const itemId: string | null = await AsyncStorage.getItem('cartItem' + noItemsCart);
              const itemCart: foodItem = await getFoodItemById(db, restaurantId, Number(itemId))
              store.dispatch(userSlice.actions.appendCart(itemCart))
              } catch {
                console.log("Coudn't fetch foodItem from cache or database.")
              }
              noItemsCart = noItemsCart - 1;
            }
            break;
          default:
            console.log("None of the provided options has been found in data retrieval." + dataToRetrieveUser[item])
        }
      } 
    }
  } catch (error) {
    console.log("Error retrieving data to state.");
  }
};


