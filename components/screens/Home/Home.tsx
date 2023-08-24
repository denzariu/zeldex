import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  RefreshControl
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react'
import { colors, fontSizes } from '../../../styles/defaults';
import Restaurants from './Restaurants';
import Card from '../../ui/components/Card';
import LabelArrow from '../../ui/components/LabelArrow';
import { createTable, deleteTable, getDBConnection, getRestaurantItems, saveRestaurantItems } from '../../../src/database/db-service';
import { restaurantItem } from '../../../src/database/models';
import CardLoader from '../../ui/loaders/CardLoader';
import MiniCardLoader from '../../ui/loaders/MiniCardLoader';
import { PERMISSIONS, check, request } from 'react-native-permissions';
import Geolocation, { GeoCoordinates, GeoPosition } from 'react-native-geolocation-service';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../../src/redux/reducers';
import { SvgXml } from 'react-native-svg';
import { svgLocation } from '../../ui/images/svgs';

const wait = (timeout : number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

/* Make sure that the user has all needed permissions and then redirect to the Map */
const requestLocationPermission = async () => {
  
  try {
    const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
    })
    .catch((error) => {
      console.log('PERMISSION REQ ERR: ', error)
      return false;
    })

    if (granted == 'granted')
      console.log('Permission GRANTED')
      return true;

    console.log('Permission NOT GRANTED')
    return false;
  }
  catch (error) {
    console.log('Permission Request Error: Geolocation (fine)', error)
    return false;
  }
}

const Home = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();  

  const [restaurants, setRestaurantItems] = useState<restaurantItem[]>([]);
  const [newRestaurant, setNewsetRestaurantItem] = useState('');
  const [location, setLocation] = useState<GeoCoordinates>();
  const address: string = useSelector((state:any) => (state.userReducer.user.address));
  const [refreshing, setRefreshing] = React.useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      loadDataCallback()
      setRefreshing(false)
    });
  }, []);
  
  const loadDataCallback = useCallback(async () => {

    try {
    
      const initRestaurants: restaurantItem[] = [
        {id: 0, name:'Omni Pizza', rating:'4.3', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/nhxJhzV.jpeg'},
        {id: 1, name:'Balls Apaca', rating:'4.7', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'10', image: 'https://i.imgur.com/ONaFgwn.jpeg'},
        {id: 2, name:'Noodle Pack Veranda Mall', rating:'3.9', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/6kkAFZR.png'},
        {id: 3, name:'Circus Pub', rating:'4.6', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/KnuLgDK.png'},
        {id: 4, name:'Shoteria - Statie de test test test testi t t ', rating:'4.2', priceDelivery:'3,49', priceDeliveryUsual:'3,49', menuDiscount:'40', image: 'https://i.imgur.com/RdY0gsz.png'},
      ]
      // const initRestaurants: restaurantItem[] = [
      // ]
      const db = await getDBConnection();
      
      // Test only
      //await deleteTable(db);
      console.info("Callback for data renewal");

      await createTable(db);
      //await deleteTable(db);
      
      if(initRestaurants.length) { 
        const storedRestaurantItems = await getRestaurantItems(db);
        if (storedRestaurantItems.length) {
          setRestaurantItems(storedRestaurantItems);
        } else {
          await saveRestaurantItems(db, initRestaurants);
          setRestaurantItems(initRestaurants);
        }
      }
    } catch (error) {
      console.error(error);
      console.log(':(');
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords);
            setLocation(position.coords);
            navigation.navigate('Map', {locationProp: position.coords})
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(undefined);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(location);
  };  

  return (
    <ScrollView 
      horizontal={false}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          progressBackgroundColor={colors.quaternary} 
          colors={[colors.primary]}
        />
      }
    >
      <TouchableOpacity activeOpacity={0.75} onPress={getLocation} style={{paddingTop: 16, paddingBottom: 8, paddingHorizontal: 20, flex: 1, backgroundColor: colors.primary}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <SvgXml xml={svgLocation} height={18} width={18}></SvgXml>
          <Text numberOfLines={1} style={{color: colors.quaternary, textAlign: 'center', fontSize: fontSizes.m, fontWeight: '700'}}>{address? address : "Set Your Delivery Address"}</Text>
        </View>
      </TouchableOpacity>

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
            params: {
              title: '🎁 Discount on the entire menu', 
              restaurants: [...restaurants].filter((restaurant) => {
              return restaurant.menuDiscount !== '0';
              })
            }
          }}
        />

        {/* Discount the entire menu filtering */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardInline}>
        {
          restaurants.length ?
          [...restaurants]
          .filter((restaurant) => {return restaurant.menuDiscount !== '0'})
          .map((restaurant, i: number) => 
          <Card key={restaurant.name + i} 
            miniCard={true}
            restaurant={restaurant}/>)
          :
          <>
            <MiniCardLoader/>
            <MiniCardLoader/>
          </>
        }
        </ScrollView>

        <LabelArrow 
          paddingH={24}
          paddingV={16}
          title='🍲 Discount on delivery'
          isBlack={true}
          hasBorder={false}
          labelWeight='700'
          labelSize='xl'
          route={{
            name: 'HomeRestaurants',
            params: {title: '🍲 Discount on delivery', 
            restaurants: [...restaurants].filter((restaurant) => {
              return restaurant.priceDelivery !== restaurant.priceDeliveryUsual;
            })}
          }}
        />

        {/* Discount on delivery */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardInline}>
        { 
          restaurants.length ? 
          [...restaurants]
          .filter((restaurant) => {return restaurant.priceDelivery !== restaurant.priceDeliveryUsual})
          .map((restaurant, i: number) => 
          <Card key={restaurant.name + i} 
            miniCard={true}
            restaurant={restaurant}
          />)
          :
          <>
            <MiniCardLoader/>
            <MiniCardLoader/>
          </>
        }
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
          title='✨ Top Picks'
          isBlack={true}
          hasBorder={false}
          labelWeight='700'
          labelSize='xl'
          route={{
            name: 'HomeRestaurants',
            params: {title: '✨ Top Picks', 
            restaurants: [...restaurants] .sort((a, b) => {
              const parsedA = parseFloat(a.rating);
              const parsedB = parseFloat(b.rating);
              return parsedA > parsedB ? -1 : 1;
            })}
          }}
        />
        
        {/* Top Picks */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardInline}>
        { 
          restaurants.length ? 
          [...restaurants]
          .sort((a, b) => {
            const parsedA = parseFloat(a.rating);
            const parsedB = parseFloat(b.rating);
            return parsedA > parsedB ? -1 : 1;
          })
          .map((restaurant, i: number) => 
          <Card key={restaurant.name + i} 
            miniCard={true}
            restaurant={restaurant}/>
          )
          :
          <>
            {/* <Card miniCard={true} restaurant={{id: 0, name:'Omni Pizza', rating:'4.3', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/nhxJhzV.jpeg'}} /> */}
            {/* <Card miniCard={true} restaurant={{id: 0, name:'Omni Pizza', rating:'4.3', priceDelivery:'0,00', priceDeliveryUsual:'3,49', menuDiscount:'0', image: 'https://i.imgur.com/nhxJhzV.jpeg'}} /> */}
            <MiniCardLoader/>
            <MiniCardLoader/>
          </>
        }
        </ScrollView>
        
      </View>

      <Text style={[styles.textArea, {paddingHorizontal: 24}]}>All restaurants and Stores</Text>
      {
        restaurants.length ?
        <Restaurants route={{params:{restaurants: restaurants, unscrollable: true}}}/>
        :
        <>
          <CardLoader/>
          <CardLoader/>
          <CardLoader/>   
        </>
      }
        
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
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    //paddingHorizontal: 16,
    borderRadius: 8,
  },

  
  spotlightTextBig: {
    color: colors.primary,
    fontSize: fontSizes.xl,
    fontWeight: '700',
    lineHeight: 24,
  },

  spotlightLeft: {
    flex: 0.45,
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
    width: undefined,
    height: '100%',
    borderTopLeftRadius: 64,
    borderBottomLeftRadius: 64,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
})

export default Home