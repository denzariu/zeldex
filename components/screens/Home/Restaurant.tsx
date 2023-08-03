import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
} from 'react-native';

import TabSectionList from './../../ui/components/TabSectionList';
// import {mockPlaceDetails} from './src/data/mock-data';
// import DishItem from './src/components/DishItem';
import { Restaurant } from '@material-ui/icons';
import { faker } from '@faker-js/faker';
import { colors, fontSizes } from '../../../styles/defaults';
import { useNavigation } from '@react-navigation/native';
import { addListener } from '@reduxjs/toolkit';
import { getDefaultHeaderHeight, useHeaderHeight } from '@react-navigation/elements'

declare const global: {HermesInternal: null | {}};

//const headerHeight = useHeaderHeight();

const HomeRestaurant = ({route, navigation} : any) => {


  const { restaurant } = route.params;
  
  const [restaurantTitle, setTitle]= useState('');
  const [opacity, setOpacity]= useState('');
  const [SECTIONS, setSECTIONS] = useState([
    {
      title: 'Burgers',
      data: Array(5)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Pizza',
      data: Array(5)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Sushi and rolls',
      data: Array(10)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Salads',
      data: Array(10)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Dessert',
      data: Array(10)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    }
  ]);

  const [scrollY] = React.useState(new Animated.Value(0));

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  });

  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  const tabBarOpacity = scrollY.interpolate({
    inputRange: [50, 225],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // const titleBarOpacity = scrollY.interpolate({
  //   inputRange: [50, 225],
  //   outputRange: [0, 99],
  //   extrapolate: 'clamp',
  // });


  // const headerHeight = useHeaderHeight();
  // useEffect(() => {
  //   // console.log(JSON.stringify(tabBarOpacity)
  //   navigator.setOptions({
      
  //     headerBackground: () => (
  //       <>
  //         <View style={{position: 'absolute', left: 10, borderRadius: 24, top: headerHeight/2 - fontSizes.l, padding: fontSizes.l, backgroundColor: colors.primary}}/>
  //         <View style={{position: 'absolute', left: , borderRadius: 24, top: headerHeight/2 - fontSizes.l, padding: fontSizes.l, backgroundColor: colors.primary}}/>
  //       </>
  //     ),
  //     //headerTintColor: colors.quaternary + tabBarOpacity.toString(16)
  //   });
  // }, [navigator]);
  
  useEffect(() => {
    navigation.setOptions({
      title: restaurant.name,
    });
  }, [restaurantTitle, navigation]);

  return (
    <>
      {/*<StatusBar barStyle="light-content" /> */}
      <SafeAreaView style={styles.safeArea}>
        
        <TabSectionList
          contentInsetAdjustmentBehavior='automatic'
          style={styles.sectionList}
          sections={SECTIONS || []}
          keyExtractor={(item) => item.title}
          stickySectionHeadersEnabled={false}
          scrollToLocationOffset={5}
          tabBarStyle={[styles.tabBar, {opacity: tabBarOpacity}]}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={
            <>
              <Animated.View
                style={[
                  styles.coverPhotoContainer,
                  {
                    transform: [
                      {
                        translateY: coverTranslateY,
                      },
                    ],
                  },
                ]}>
                {SECTIONS[0].title && (
                  <Animated.Image
                    source={require('../../ui/images/image.jpg')}
                    style={[
                      styles.coverPhoto,
                      {
                        transform: [
                          {
                            scale: coverScale,
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </Animated.View>
              <View style={styles.sectionHeaderText}>
                <View style={styles.resturantRow}>
                  <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                  <Text style={styles.restaurantPrice}>{restaurant.priceDelivery} lei</Text>
                </View>
                <Text style={styles.itemDescription}>{restaurant.name}</Text>
              </View>
            </>
          }
          renderTab={({title, isActive}) => {
            const borderBottomWidth = isActive ? 2 : 0;
            return (
              <View style={[styles.tabItem, {borderBottomWidth}]}>
                <Text
                  style={[
                    styles.tabText,
                    {color: isActive ? colors.quaternary : colors.grayDisabled},
                  ]}>
                  {title}
                </Text>
              </View>
            );
          }}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          )}
          renderItem={({item}) => {
            return <View style={styles.itemContainer}>
                      <View style={styles.itemRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>${item.price}</Text>
                      </View>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
      </SafeAreaView>
    </>
  );
};




const styles = StyleSheet.create({

  restaurantContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.primary
  },
  restaurantTitle: {
    flex: 1,
    fontSize: fontSizes.xl,
    color: colors.textBlack,
    fontWeight: '700'
  },
  restaurantPrice: {
    
    fontSize: fontSizes.m,
    color: colors.textBlack,
    fontWeight: '300',
  },
  restaurantDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: fontSizes.s,
  },
  resturantRow: {
    flexDirection: 'row'
  },

  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.primary
  },
  itemTitle: {
    flex: 1,
    fontSize: fontSizes.m,
    color: colors.textBlack,
    fontWeight: '700'
  },
  itemPrice: {
    
    fontSize: fontSizes.m,
    color: colors.textBlack,
    fontWeight: '300',
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: fontSizes.s,
  },
  itemRow: {
    flexDirection: 'row'
  },

  container: {
    flex: 1,
  },
  coverPhotoContainer: {
    // maxHeight: 225,
    height: 165
  },
  coverPhoto: {
    height: 180,
    // width: '100%',
    // height: '100%',
  },
  tabBar: {
    backgroundColor: colors.primary,
    
    // borderBottomColor: '#f4f4f4',
    // borderBottomWidth: 1,
    
    position: 'absolute',
    shadowColor: colors.textBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 80,
  },
  tabItem: {
    borderColor: colors.quaternary,
    backgroundColor: colors.primary,
  },
  tabText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 42,
    justifyContent: 'flex-end',
    fontSize: fontSizes.sm,
    fontWeight: 'bold',
  },
  sectionHeaderText: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    color: colors.quaternary,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grayLight,
  },
  sectionList: {
    backgroundColor: colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.quaternary,
  },
});

export default HomeRestaurant;