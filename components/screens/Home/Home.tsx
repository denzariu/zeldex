import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react'
import { colors, fontSizes } from '../../../styles/defaults';
import Restaurants from './Restaurants';


const Home = ({ navigation }) => {

  const showRestaurants = (filter: string) => {
    if (filter === 'DISCOUNT_MENU') {
      const restaurantsFiltered = restaurants.filter((restaurant: Restaurant) => {
        return restaurant.menuDiscount !== '0';
      })
      navigation.navigate({
      name: 'HomeRestaurants',
      params: {title: '🎁 Discount on the entire menu', restaurants: restaurantsFiltered}
      });
    }

    else if (filter === 'DISCOUNT_DELIVERY') {
      const restaurantsFiltered = restaurants.filter((restaurant: Restaurant) => {
        return restaurant.priceDelivery !== restaurant.priceDeliveryUsual;
      })
      navigation.navigate({
        name: 'HomeRestaurants',
        params: {title: 'Discount on delivery', restaurants: restaurantsFiltered}
      });
    }

    else
      console.log('Invalid selection of filter.')
    
  }

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <TouchableOpacity onPress={() => showRestaurants('DISCOUNTS')}>
          <Text style={styles.textArea}>🌙 Late Night Munchies</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showRestaurants('DISCOUNT_MENU')}>
          <Text style={styles.textArea}>🎁 Discount on the entire menu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showRestaurants('DISCOUNT_DELIVERY')}>
          <Text style={styles.textArea}>Discount on delivery</Text>
        </TouchableOpacity>  
      </View>

      <Text style={[styles.textArea, {paddingHorizontal: 24}]}>All restaurants and Stores</Text>
      <Restaurants route={{params:{restaurants: restaurants, title: undefined}}}/>
    </ScrollView>
  )
}

// To rework into actual database information
export type Restaurant = {
  name: string;
  rating: string;
  priceDelivery: string;
  priceDeliveryUsual: string;
  menuDiscount: string;
}


const restaurants: Restaurant[] = [
  {name:'Omni Pizza', rating:'4.3', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'0'},
  {name:'Balls Apaca', rating:'4.7', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'10'},
  {name:'Noodle Pack Veranda Mall', rating:'3.9', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'0'},
  {name:'Circus Pub', rating:'4.6', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0'},
  {name:'Fabio Pizza Opanez', rating:'4.2', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'40'},
]

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    //paddingVertical: 32,
    paddingHorizontal: 24,
  },

  container: {
  },

  textArea: {
    fontSize: fontSizes.xl,
    fontWeight: '900',
    color: colors.quaternary,
    paddingVertical: 8,
  }
})

export default Home