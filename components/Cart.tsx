import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { foodItem, restaurantItem } from '../src/database/models'
import { getDBConnection, getFoodItemsByRestaurantId, getRestaurantById } from '../src/database/db-service'
import { colors, fontSizes } from '../styles/defaults'
import { useSelector, useStore } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Cart = () => {
  const navigator = useNavigation();
  const restaurantName: string = useSelector((state:any) => (state.userReducer.cart.restaurantName));
  const restaurantId: number = useSelector((state:any) => (state.userReducer.cart.restaurantId));
  const items: Array<foodItem> = useSelector((state:any) => (state.userReducer.cart.items));
  const cachingComplete: number = useSelector((state:any) => (state.userReducer.cachingComplete));
  
  const [restaurant, setRestaurant] = useState<restaurantItem>();
  const [sum, setSum] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  
  const loadRestaurant = useCallback(async () => {
    try {
      const db = await getDBConnection();
      console.info("Callback for restaurant data.");
      await getRestaurantById(db, restaurantId).then((result) => {
        console.log("Restaurant set: ", result)
        setRestaurant(result);
        setLoading(false);
      });

    } catch (error) {
      console.error(error);
      console.log(':(');
      setRestaurant(undefined);
    }
  }, []);

  useEffect(() => {
    // console.log("Loading...");
    setLoading(true)
    // console.log('i: ', items);
    loadRestaurant();
    // console.log("Loaded");
  }, [])

  const handleRedirectToRestaurant = () => {
    console.log('Loading: ', loading);
    if (!loading)
      navigator.navigate('HomeRestaurant', {restaurant: restaurant})
  }

  useEffect (() => {
    // console.log("Items: ", items);
    // console.log("itemsno: ", items.length);

    const newSum = items.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue?.price ?? 0)
    }, 0) ?? 0

    setSum(newSum);

    // console.log("Cart sum: ", sum);
  }, [[], items.length])


  if (cachingComplete && items.length)
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.75} style={styles.textContainer} onPress={handleRedirectToRestaurant}>
          <Text style={styles.text} numberOfLines={1}>{restaurantName}</Text>
          <Text style={styles.subtext}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(sum / 100).toLowerCase()}</Text>
        </TouchableOpacity>
      </View>
    )
  return <></>
}

export default Cart

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    
  },

  textContainer: {
    paddingVertical: 8,
    backgroundColor: colors.quaternary,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 48,
    alignItems: 'center'
  },

  text: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.primary,
  },

  subtext: {
    fontSize: fontSizes.ml,
    fontWeight: '300',
    color: colors.primary,
  }
})