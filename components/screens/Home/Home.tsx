import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Image
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fontSizes } from '../../../styles/defaults';
import Restaurants from './Restaurants';
import Card from '../../ui/components/Card';
import { SvgXml } from 'react-native-svg';
import { svgRightArrowBlack } from '../../ui/images/svgs';
import LabelArrow from '../../ui/components/LabelArrow';
import { createTable, deleteTable, getDBConnection, getRestaurantItems, saveRestaurantItems } from '../../../src/database/db-service';
import { restaurantItem } from '../../../src/database/models';

const Home = ({ navigation }) => {

  const [restaurants, setRestaurantItems] = useState<restaurantItem[]>([]);
  const [newRestaurant, setNewsetRestaurantItem] = useState('');
  
  const loadDataCallback = useCallback(async () => {
    
    try {
    
      const initRestaurants: restaurantItem[] = [
        {id: 0, name:'Omni Pizza', rating:'4.3', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/nhxJhzV.jpeg'},
        {id: 1, name:'Balls Apaca', rating:'4.7', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'10', image: 'https://i.imgur.com/ONaFgwn.jpeg'},
        {id: 2, name:'Noodle Pack Veranda Mall', rating:'3.9', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/6kkAFZR.png'},
        {id: 3, name:'Circus Pub', rating:'4.6', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/KnuLgDK.png'},
        {id: 4, name:'Shoteria - Statie de test test test testi t t ', rating:'4.2', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'40', image: 'https://i.imgur.com/RdY0gsz.png'},
      ]
      //const initRestaurants = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
      const db = await getDBConnection();
      
      // Test only
      //await deleteTable(db);

      await createTable(db);
      const storedRestaurantItems = await getRestaurantItems(db);
      if (storedRestaurantItems.length) {
        setRestaurantItems(storedRestaurantItems);
      } else {
        await saveRestaurantItems(db, initRestaurants);
        setRestaurantItems(initRestaurants);
      }
    } catch (error) {
      console.error(error);
      console.log(':(');
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  
  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        {/* <TouchableOpacity onPress={() => showRestaurants('DISCOUNTS')}>
          <Text style={styles.textArea}>🌙 Late Night Munchies</Text>
        </TouchableOpacity> */}

        <LabelArrow 
          paddingH={24}
          paddingV={16}
          title='🎁 Discount on the entire menu'
          isBlack={true}
          hasBorder={false}
          labelWeight='700'
          labelSize='xl'
          route={{
            name: 'HomeRestaurants',
            params: {title: '🎁 Discount on the entire menu', 
            restaurants: [...restaurants].filter((restaurant) => {
              return restaurant.menuDiscount !== '0';
            })}
          }}
        />

        {/* Discount the entire menu filtering */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardInline}>
        {[...restaurants]
          .filter((restaurant) => {return restaurant.menuDiscount !== '0'})
          .map((restaurant, i: number) => 
          <Card key={restaurant.name + i} 
            miniCard={true}
            restaurant={restaurant}/>
        )}
        </ScrollView>

        <LabelArrow 
          paddingH={24}
          paddingV={16}
          title='Discount on delivery'
          isBlack={true}
          hasBorder={false}
          labelWeight='700'
          labelSize='xl'
          route={{
            name: 'HomeRestaurants',
            params: {title: 'Discount on delivery', 
            restaurants: [...restaurants].filter((restaurant) => {
              return restaurant.priceDelivery !== restaurant.priceDeliveryUsual;
            })}
          }}
        />

        {/* Discount on delivery */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardInline}>
        {[...restaurants]
          .filter((restaurant) => {return restaurant.priceDelivery !== restaurant.priceDeliveryUsual})
          .map((restaurant, i: number) => 
          <Card key={restaurant.name + i} 
            miniCard={true}
            restaurant={restaurant}
          />
        )}
        </ScrollView>

        {/* Spotlight */}
        <View style={styles.spotlightContainer}>
          <View style={styles.spotlightLeft}>
            <Text style={styles.spotlightTextBig}>Craving something sweet? </Text>
            <Text style={styles.spotlightText}>Discover the selection.</Text>
          </View>
          <Image
            style={styles.spotlightImage}
            source={require('./../../ui/images/image.jpg')}
          /> 
        </View>

        <LabelArrow 
          paddingH={24}
          paddingV={16}
          title='✨Top Picks'
          isBlack={true}
          hasBorder={false}
          labelWeight='700'
          labelSize='xl'
          route={{
            name: 'HomeRestaurants',
            params: {title: '✨Top Picks', 
            restaurants: [...restaurants].filter((restaurant) => {
              return restaurant.menuDiscount !== '0';
            })}
          }}
        />

        {/* Top Picks */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardInline}>
        { [...restaurants]
          .sort((a, b) => {
            const parsedA = parseFloat(a.rating);
            const parsedB = parseFloat(b.rating);
            return parsedA > parsedB ? -1 : 1;
          })
          .map((restaurant, i: number) => 
          <Card key={restaurant.name + i} 
            miniCard={true}
            restaurant={restaurant}/>
        )}
        </ScrollView>

         
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
  image: ImageSourcePropType;
}




const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    //paddingVertical: 32,
  },

  container: {
  },

  textArea: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.textBlack,
    paddingVertical: 8,
  },

  cardInline: {
    gap: 8,
    paddingLeft: 16
  },

  spotlightContainer: {
    height: 160,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.quaternary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    //paddingHorizontal: 16,
    borderRadius: 8,
  },

  
  spotlightTextBig: {
    color: colors.primary,
    fontSize: fontSizes.l,
    fontWeight: '700',
    lineHeight: 24,
  },

  spotlightLeft: {
    flex: 0.33,
    alignSelf: 'center',
    paddingLeft: 16,
  },

  spotlightText: {
    color: colors.primary,
    fontSize: fontSizes.m,
    fontWeight: '600',
  },

  spotlightImage: {
    alignSelf: 'center',
    flex: 0.5,
    aspectRatio: 1.13,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 64,
    borderBottomLeftRadius: 64,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
})

export default Home