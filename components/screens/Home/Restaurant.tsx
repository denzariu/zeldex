import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  NativeSyntheticEvent,
  Image,
} from 'react-native';

import TabSectionList from './../../ui/components/TabSectionList';
import { faker } from '@faker-js/faker';
import { colors, fontSizes } from '../../../styles/defaults';
import { useNavigation } from '@react-navigation/native';
import { addListener } from '@reduxjs/toolkit';
import { getDefaultHeaderHeight, useHeaderHeight } from '@react-navigation/elements'
import { SvgXml } from 'react-native-svg';
import { HeaderTitle } from '@react-navigation/elements'
import { starXml, svgDiscount } from '../../ui/images/svgs';

declare const global: {HermesInternal: null | {}};

//const headerHeight = useHeaderHeight();

const HomeRestaurant = ({route, navigation} : any) => {


  const { restaurant } = route.params;

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
          description: faker.lorem.lines(1),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Sushi and rolls',
      data: Array(5)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(3),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Salads',
      data: Array(5)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    },
    {
      title: 'Dessert',
      data: Array(5)
        .fill(0)
        .map(_ => ({
          title: faker.commerce.productName(),
          description: faker.lorem.lines(2),
          price: faker.commerce.price()
        }))
    }
  ]);

  useEffect (() => {
    navigation.setOptions({
      title: restaurant.name
    })
  }, [navigation])

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

  return (
    <>
      {/*<StatusBar barStyle="light-content" /> */}
      <SafeAreaView style={styles.safeArea}>
        
        <TabSectionList
          showsVerticalScrollIndicator={false}
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
                    //source={require('../../ui/images/image.jpg')}
                    source={{uri: restaurant.image}}
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
              {/* <View style={styles.sectionHeaderText}> */}
              <View style={styles.resturantRow}>
                {restaurant.name && <Text style={styles.textArea}>{restaurant.name}</Text>}

                <Text numberOfLines={1} style={styles.textAreaRating}><SvgXml xml={starXml} height={18} width={18}
                      fill={restaurant.rating >= '4.5'? colors.quaternary : colors.textBlack}/>{restaurant.rating}</Text>
              </View>
              {
                restaurant.menuDiscount !== '0' && 
  
                <>
                  <View style={[styles.restaurantDiscount, {flexDirection: 'row'}]}>
                    <SvgXml xml={svgDiscount} height={32} width={32}
                          fill={colors.quaternary}/>
                    <Text style={styles.restaurantDiscountText}>{restaurant.menuDiscount}% off everything</Text>
                  </View>
                  <View style={styles.divider}></View>
                </>
              }
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
                        <View style={styles.itemColumn}>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                          <Text style={styles.itemPrice}>{item.price/10} lei</Text>  
                        </View>
                        <Image
                          source={{uri: restaurant.image}}
                          style={styles.itemImage}/>
                        </View>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  restaurantDiscount: {
    marginHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: colors.grayLight,
    borderRadius: 12, 
    alignItems: 'center',
    paddingLeft: 8,
    gap: 8
  },

  restaurantDiscountText: {
    color: colors.textBlack,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },

  textArea: {
    flex: 1,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.textBlack,
    paddingRight: 16,
  },

  textAreaRating: {
    fontSize: fontSizes.ml,
    fontWeight: '800',
    color: colors.textBlack,
  },

  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary
  },
  itemTitle: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.textBlack,
    fontWeight: '700'
  },

  itemPrice: {  
    fontSize: fontSizes.m,
    color: colors.textBlack,
    fontWeight: '300',
  },

  itemDescription: {
    marginVertical: 8,
    color: '#b6b6b6',
    fontSize: fontSizes.s,
  },
  
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  itemColumn: {
    flex: 0.66,
    flexDirection: 'column'
  },
  
  itemImage: {
    flex: 0.30,
    aspectRatio: 1.3,
    borderRadius: 4
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
    paddingHorizontal: 16,
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
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  divider: {
    marginHorizontal: 20,
    flex: 1,
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