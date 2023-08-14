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
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures' 
import TabSectionList from './../../ui/components/TabSectionList';
import { faker } from '@faker-js/faker';
import { colors, fontSizes } from '../../../styles/defaults';
import { useNavigation } from '@react-navigation/native';
import { addListener } from '@reduxjs/toolkit';
import { getDefaultHeaderHeight, useHeaderHeight } from '@react-navigation/elements'
import { SvgXml } from 'react-native-svg';
import { HeaderTitle } from '@react-navigation/elements'
import { starXml, svgClose, svgDiscount } from '../../ui/images/svgs';

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

  

  // Height needed for bottom-up drawer 
  const windowHeight = Dimensions.get('window').height;

  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [foodItem, setCurrentFoodItem] = useState<itemType>({title:'', description: '', price: 0});

  // Function to open the bottom sheet for the 'title' product
  /// TODO: modify from 'any' to real data typeof
  type itemType = {
    title: string,
    description: string,
    price: number
  }

  const handleOpenBottomSheet = (item : itemType) => {
    setCurrentFoodItem(item)
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };


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

                {/* // Photo cover of the selected product */}
                <Animated.Image
                  source={{uri: restaurant.image}}
                  style={[styles.coverPhoto,]}
                />

                {/* // Modal which pops up when you select a product */}
                <Modal
                  animationType="slide"
                  transparent={true}
                // We use the state here to toggle visibility of Bottom Sheet 
                  visible={isBottomSheetOpen}
                // We pass our function as default function to close the Modal
                  onRequestClose={handleCloseBottomSheet}>

                    {/* // Define outside-View area where the user can press in order to close the modal */}
                    <TouchableOpacity onPress={handleCloseBottomSheet} style={[styles.modalOutside, {height: '40%'}]}>
                      <GestureRecognizer
                        style={{flex: 1}}
                        // onSwipeUp={ () => this.setModalVisible() }
                        onSwipeDown={ () => handleCloseBottomSheet() }
                      />
                    </TouchableOpacity>
                    
                    <View style={[styles.bottomSheet, {height: '60%'}]}>
                    {/* //  First Section of Bottom sheet with Header and close button */}

                      <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={handleCloseBottomSheet}>
                          <SvgXml xml={svgClose} height={24} width={24}
                              fill={colors.quaternary}/>
                        </TouchableOpacity>
                      </View>
                    {/* // First Section of Bottom sheet with Header and close button

                    // Section with Information  */}
                      <View style={styles.modalInfo}>
                        <View style={styles.modalSection}>
                          <Animated.Image
                            source={{uri: restaurant.image}}
                            style={[styles.modalImage, styles.coverPhoto]}
                          />
                          <Text style={styles.modalTitle}>{foodItem.title}</Text>
                          <Text style={styles.modalPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(foodItem.price / 10).toLowerCase()}</Text>
                          <Text style={styles.modalDescription}>{foodItem.description}</Text>
                        </View>
                          {/* <View style={styles.modalDivider} />   */}
                    
                          <View style={styles.modalSection}>
                            <Text style={styles.modalNote}>Leave a note for the kitchen</Text>
                            <View style={styles.modalDivider} />
                          </View>
                      </View>
                    </View>
                  </Modal>

              </Animated.View>
              
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
            return <TouchableOpacity onPress={ ()  => { handleOpenBottomSheet(item) }} style={styles.itemContainer}>
                      <View style={styles.itemRow}>
                        <View style={styles.itemColumn}>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                          <Text style={styles.itemPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(item.price / 10).toLowerCase()}</Text>  
                        </View>
                        <Image
                          source={{uri: restaurant.image}}
                          style={styles.itemImage}/>
                        </View>
                    </TouchableOpacity>
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

  // Modal styles
  // containerModal: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },
  bottomSheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      justifyContent: 'flex-start',
      backgroundColor: colors.primary,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      bottom: 0,
      // borderWidth: 1.5,
      // borderColor: colors.quaternary
  },

  modalOutside: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },

  modalHeader: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    zIndex: 12,
    borderRadius: 16,
  },
  
  modalImage: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalInfo: {
    width: '100%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  
  modalSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    color: colors.quaternary,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: 8
  },

  modalTitle: {
    color: colors.textBlack,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20
  },

  modalPrice: {
    color: colors.textBlack,
    fontSize: fontSizes.m,
    fontWeight: '400',
    marginBottom: 16,
    paddingHorizontal: 20
  },

  modalDescription: {
    color: colors.gray,
    fontSize: fontSizes.m,
    fontWeight: '400',
    marginBottom: 16,
    paddingHorizontal: 20
  },

  modalNote: {
    color: colors.grayLight,
    fontSize: fontSizes.s,
    fontWeight: '400',
    marginVertical: 16,
    paddingHorizontal: 20
  },

  modalSubTitle: {
    color: colors.textBlack,
    fontSize: fontSizes.xl,
    fontWeight: '400',
    paddingVertical: 12,
    paddingHorizontal: 20
  },

  modalDivider: { opacity: .2, height: 1, borderWidth: 1, borderColor: colors.quaternary},
  // Other styles

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