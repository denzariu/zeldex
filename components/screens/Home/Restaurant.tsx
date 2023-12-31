import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

// import GestureRecognizer from 'react-native-swipe-gestures' 
import TabSectionList from './../../ui/components/TabSectionList';
import { faker } from '@faker-js/faker';
import { colors, fontSizes } from '../../../styles/defaults';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { starXml, svgClose, svgDiscount } from '../../ui/images/svgs';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '../../../src/redux/reducers';
import { CartModel } from '../../../src/redux/actions';
import { store } from '../../../src/redux/store';
import { foodItem, restaurantItem } from '../../../src/database/models';
import { cacheData } from '../../../src/redux/fetcher';
import { getDBConnection, getFoodItemsByRestaurantId } from '../../../src/database/db-service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../App';

declare const global: {HermesInternal: null | {}};

type CartButtonProps = {
  restaurant: restaurantItem,
  restaurantCart: string,
} 

const CartButton = ({restaurant, restaurantCart}: CartButtonProps) => {
  if (restaurant.name != restaurantCart)
    return;

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const items: Array<foodItem> = useSelector((state:any) => (state.userReducer.cart.items));
  const [sum, setSum] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect (() => {
    if (items.length) {
      const newSum = items.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0) ?? 0

      setSum(newSum);
      setLoading(false);
    }
    // console.log("Cart sum: ", sum);
  }, [[], items.length])
  
  function handleRedirectToCart(): void {
    navigation.navigate('Checkout', {restaurant: restaurant});

  }

  if (!loading)
  return (
    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 8, zIndex: 2000, backgroundColor: colors.primary}}>
      <TouchableOpacity activeOpacity={0.75} style={styles.textContainerCart} onPress={handleRedirectToCart}>
        <Text style={styles.textCart} numberOfLines={1}>Checkout</Text>
        <Text style={styles.subtextCart}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(sum / 100).toLowerCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const HomeRestaurant = ({ route, navigation }: any) => {

  const dispatch = useDispatch();

  const {restaurant} = route.params;

  const restaurantCart = useSelector((state: any) => (state.userReducer.cart.restaurantName));
  const [SECTIONS, setSECTIONS] = useState([
    {
      title: 'Burgers',
      data: {} as foodItem[]
    },
    {
      title: 'Pizza',
      data: {} as foodItem[]
    },
    {
      title: 'Sushi and rolls',
      data: {} as foodItem[]
    },
    {
      title: 'Salads',
      data: {} as foodItem[]
    },
    {
      title: 'Dessert',
      data: {} as foodItem[]
    },
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

  // This state would determine if the drawer sheet is visible or not
  const [foodItem, setCurrentFoodItem] = useState<foodItem>({
    id: 0,
    restaurantId: restaurant.id,
    categoryId: 0,
    name: '',
    price: 0,
    description: '',
    discount: 0,
    image: '',
    popular: 0,
    available: 0,
  });
  const modalizeRef = useRef<Modalize>(null);

  const [loading, setLoading] = useState<boolean>(true);

  // Load the food items of a restaurant
  const loadData = useCallback( async () => {
    const db = await getDBConnection();
    const items: foodItem[] = await getFoodItemsByRestaurantId(db, restaurant.id);
    const sections: Array<{title: string, data: Array<foodItem>}> = [];

    items.map((item: foodItem) => {
      const {categoryId} = item;
      // group[categoryId] = group[categoryId] ?? [];
      // group[categoryId].push(item);
      
      let categoryExists = false; 
      sections.forEach((element: {title: string, data: Array<foodItem>}) => {
        if (element.title == categoryId.toString()) {
          element.data.push(item);
          categoryExists = true;
        }
      });

      if (!categoryExists)
        sections.push({title: categoryId.toString(), data: [item]});
        
      
    }, {});
    
    console.log('sections', sections);
    setSECTIONS(sections);
    setLoading(false);

  }, [restaurant]); 

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [loadData])

  // Function to open the bottom sheet for the 'title' product

  const handleOpenBottomSheet = (item : foodItem) => {
    setCurrentFoodItem(item)
    //setIsBottomSheetOpen(true);
    try {
      modalizeRef.current?.open();
    } catch (e) {
      console.log('Error when opening Modal: ' + e)
    }
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    //setIsBottomSheetOpen(false);
    try {
      modalizeRef.current?.close();
    } catch (e) {
      console.log('Error when closing Modal: ' + e)
    }
  };

  const [noItems, setNoItems] = useState<number>(0);
  const handleDecrement = () => {
    if (noItems > 0)
      setNoItems(noItems - 1);
  }
  const handleIncrement = () => {
    setNoItems(noItems + 1);
  }

  const handleAddToCart = () => {
    // console.log('Check if this gets triggered when there is no press.'); // Test
    
    let noItemsToAdd = noItems;

    if (store.getState().userReducer.cart.restaurantId != restaurant.id) {
      dispatch(userSlice.actions.setCart({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        items: []
      } as CartModel));
      cacheData('cartRestaurantId', restaurant.id.toString());
      cacheData('cartRestaurantName', restaurant.name);
      console.log("CACHED REST ID: ", restaurant.id);
    }
    
    // Cache number of items in cart and then each item as {'cartItem' + index} => id 
    const itemsInCart = store.getState().userReducer.cart.items.length;
    // console.log('ITEMS IN CART (BEFORE CACHING): ', itemsInCart)
    // console.log('ITEMS TO ADD (BEFORE CACHING): ', noItemsToAdd)

    while (noItemsToAdd) {
      dispatch(userSlice.actions.appendCart(foodItem));
      cacheData('cartItem' + (itemsInCart + noItemsToAdd).toString(), foodItem.id.toString())
      noItemsToAdd = noItemsToAdd - 1;
    }
    cacheData('cartNoItems', (itemsInCart + noItems).toString());

    setNoItems(0);
  }

  

  const renderFooter = () => (
    <View style={styles.modalFooter}>
      
      <View style={[styles.modalQuantityContainer, {flex: 0.33}]}>
        <TouchableOpacity style={{padding: 4}} onPress={handleDecrement}>
          <Text style={[{fontSize: fontSizes.xxxl, color: colors.quaternary}]}>–</Text>
        </TouchableOpacity>
        <Text style={[{fontSize: fontSizes.xl, color: colors.quaternary}]}>{noItems}</Text>
        <TouchableOpacity style={{padding: 4}} onPress={handleIncrement}>
          <Text style={[{fontSize: fontSizes.xxxl, color: colors.quaternary}]}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.modalFooterBuyButton, {flex: 0.66}]}
        onPress={handleAddToCart}
      >
        <Text numberOfLines={1} style={styles.modalFooterBuyButtonText}>Add</Text>
        <Text numberOfLines={1} style={styles.modalFooterBuyButtonTextPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(foodItem.price / 100).toLowerCase()}</Text>
      </TouchableOpacity>
    </View>
  )

  const renderContent = () => [
    <View key="0">
      {/* Header section - (with a close button) */}
      {/* <View style={styles.modalHeader}>
        <TouchableOpacity onPress={handleCloseBottomSheet}>
          <SvgXml xml={svgClose} height={24} width={24}
              fill={colors.quaternary}
          />
        </TouchableOpacity>
      </View> */}
      
      {/* Section with Information  */}
      <View style={styles.modalHeader}>
        <View style={styles.modalSection}>
          <Animated.Image
            source={{uri: foodItem.image}}
            style={[styles.modalImage, styles.coverPhoto]}
          />
          <Text style={styles.modalTitle}>{foodItem.name}</Text>
          <Text style={styles.modalPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(foodItem.price / 100).toLowerCase()}</Text>
          <Text style={styles.modalDescription}>{foodItem.description}</Text>
        </View>
          {/* <View style={styles.modalDivider} />   */}
      </View>
    </View>,
  
    <View key="1">
      <View style={styles.modalInfo}>
        <View style={[styles.modalSection, {marginBottom: '15%'}]}>
          <Text style={styles.modalNote}>Leave a note for the kitchen</Text>
        </View>
      </View>
    </View>,
  ]

  if (!loading)
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        
        <CartButton
          restaurant={restaurant}
          restaurantCart={restaurantCart}
        />
        <Modalize
            ref={modalizeRef}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              // stickyHeaderIndices: [0]
            }}
            //rootStyle={{backgroundColor: colors.quaternary + '10'}}
            //snapPoint={350}
            adjustToContentHeight={true}
            handleStyle={{
              backgroundColor: colors.primary + '00',
              height: 170, 
              width: '100%',
              zIndex: 100,
            }}
            HeaderComponent={renderFooter()}
            // modalStyle={{
            //   zIndex: 10,
            //   marginBottom: 80,
            //   marginTop: 80
            // }}
            handlePosition='inside'
          >              
            {renderContent()}
        </Modalize>  
            
        <TabSectionList
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior='automatic'
          style={styles.sectionList}
          contentContainerStyle={restaurantCart == restaurant.name ? {paddingBottom: 72} : {paddingBottom: 0}}
          sections={SECTIONS || []}
          keyExtractor={(item: any) => item.id}
          stickySectionHeadersEnabled={false}
          scrollToLocationOffset={5}
          tabBarStyle={[styles.tabBar, {opacity: tabBarOpacity}]}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={
            <>
              {/* Restaurant's image */}
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
              </Animated.View>
              
              {/* Restaurant's title card */}
              <View style={styles.resturantRow}>
                {restaurant.name && <Text style={styles.textArea}>{restaurant.name}</Text>}
                <Text numberOfLines={1} style={styles.textAreaRating}><SvgXml xml={starXml} height={18} width={18}
                      fill={restaurant.rating >= '4.5'? colors.quaternary : colors.textBlack}/>{restaurant.rating}</Text>
              </View>

              {/* Restaurant's discounts */}
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
                          <Text style={styles.itemTitle}>{item.name}</Text>
                          <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                          <Text style={styles.itemPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(item.price / 100).toLowerCase()}</Text>  
                        </View>
                        <Image
                          source={{uri: item.image}}
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
      height: '120%',
      top: '-30%'
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
    width: '100%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '15%',
    backgroundColor: colors.white,
    zIndex: 1,
    borderTopColor: colors.primary,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20
  },
  
  modalQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.quaternary,
    fontSize: fontSizes.l,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 24,
    height: 50
  },

  modalFooterBuyButton: {
    paddingVertical: 6,
    zIndex: 1,
    // paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.quaternary,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  modalFooterBuyButtonText: {
    color: colors.white,
    fontSize: fontSizes.xl,
    fontWeight: '700'
  },

  modalFooterBuyButtonTextPrice: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: '700'
  },

  modalImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  modalInfo: {
    width: '100%',
    backgroundColor: colors.primary,
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
    paddingHorizontal: 20,
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
    color: colors.grayMedium,
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
    shadowOpacity: 1.25,
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

  containerCart: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    
  },

  textContainerCart: {
    paddingVertical: 8,
    backgroundColor: colors.quaternary,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 48,
    alignItems: 'center'
  },

  textCart: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.primary,
  },

  subtextCart: {
    fontSize: fontSizes.ml,
    fontWeight: '300',
    color: colors.primary,
  }
});

export default HomeRestaurant;