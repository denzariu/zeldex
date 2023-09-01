import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { foodItem } from '../src/database/models'
import { getDBConnection, getFoodItemsByRestaurantId } from '../src/database/db-service'

type CartProps = {
  restaurantId: number,
  itemsId: Array<number>
}

const Cart = ({restaurantId, itemsId}: CartProps) => {
  
  const [items, setItems] = useState(null)

  const loadDataCallback = useCallback(async () => {

    try {
    
      const testCart: foodItem[] = [
        {id: 0, restaurantId: restaurantId, categoryId: 0, name: 'Pizza Triforce', price: 31, description: 'MMM GOOD PIZZA', discount: 0, image: '', popular: false, available: true},
        {id: 1, restaurantId: restaurantId, categoryId: 0, name: 'Pizza Nomnomo', price: 30, description: 'MMM GOOD PIZZA', discount: 0, image: '', popular: false, available: true},
        {id: 2, restaurantId: restaurantId, categoryId: 0, name: 'Pizza Alcalia', price: 25, description: 'MMM GOOD PIZZA', discount: 0, image: '', popular: false, available: true}
      ]
      // // const initRestaurants: restaurantItem[] = [
      // // ]
      // const db = await getDBConnection();
      
      // // Test only
      // //await deleteTable(db);
      // console.info("Callback for data renewal");

      // await getFoodItemsByRestaurantId(db, restaurantId);
      // //await deleteTable(db);
      
      // if(initRestaurants.length) { 
      //   const storedRestaurantItems = await getRestaurantItems(db);
      //   if (storedRestaurantItems.length) {
      //     setRestaurantItems(storedRestaurantItems);
      //   } else {
      //     await saveRestaurantItems(db, initRestaurants);
      //     setRestaurantItems(initRestaurants);
      //   }
      // }
    } catch (error) {
      console.error(error);
      console.log(':(');
    }
  }, []);

  useEffect (() => {
    
  }, [restaurantId, itemsId])
  
  // return (
  //   <View>
  //     <Text>Cart</Text>
  //   </View>
  // )
}

export default Cart

const styles = StyleSheet.create({})