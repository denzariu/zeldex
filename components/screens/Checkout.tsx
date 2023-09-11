import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors, fontSizes } from '../../styles/defaults'
import { useSelector } from 'react-redux';
import { foodItem } from '../../src/database/models';
import AppleStyleSwipeableRow from '../ui/components/AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from '../ui/components/GmailStyleSwipeableRow';
import { svgThreeDotsVertical } from '../ui/images/svgs';
import { SvgXml } from 'react-native-svg';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Row = ({ item, quantity }: { item: foodItem, quantity: number }) => {

  return (
  <View style={styles.itemContainer}>
    
    <View style={[styles.itemRow]}>
      <View style={[styles.itemRow, {flex: 0.38, alignItems: 'center', backgroundColor: colors.quaternary, borderTopLeftRadius: 12, borderBottomLeftRadius: 12}]}>
        <Text style={[styles.itemTitle, {flex: 0.3, color: colors.white, textAlign: 'center', textAlignVertical: 'center'}]}>{quantity}x</Text>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
        />
      </View>
      
      <View style={[styles.itemColumn, {flex: 0.55, alignContent: 'center', justifyContent: 'space-around', paddingVertical: 4, paddingHorizontal: 4}]}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.itemPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(quantity * item.price / 100).toLowerCase()}</Text>  
      </View>
 
      <View style={[styles.itemColumn, {flex: 0.01, alignItems: 'flex-end', marginLeft: 2, justifyContent: 'center'}]}>
        <SvgXml xml={svgThreeDotsVertical} width={24} height={24} fill={colors.quaternary}/>
      </View>

    </View>
  </View>
)};

const SwipeableRow = ({ item, quantity }: { item: foodItem, quantity: number }) => {
    return (
      <AppleStyleSwipeableRow 
        children={<Row item={item} quantity={quantity}></Row>} 
        item={item} 
        quantity={quantity}
      />
    );
};

const modalInitSize = 88;

const Checkout = () => {

  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);

  const [sum, setSum] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true);
  const items: foodItem[] = useSelector((state:any) => (state.userReducer.cart.items));
  const [itemsStacked, setItemsStacked] = useState<{ item: foodItem, quantity: number }[]>();
  
  const restaurantCart: string = useSelector((state:any) => (state.userReducer.cart.restaurantName));
  const address: string = useSelector((state:any) => (state.userReducer.user.address));
  const coordinates: {latitude: number, longitude: number} = useSelector((state:any) => (state.userReducer.user.coordinates));

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / 160;
  const LATITUDE_DELTA = 0.002;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    navigation.setOptions({
      title: restaurantCart,
    });
  }, [navigation]);

  useEffect (() => {
    if (items.length) {
      const itemsStack: {item: foodItem, quantity: number}[] = [];
      const newSum = items.reduce((accumulator, currentItem) => {
        
        let itemExistsInStack = false;
        for(let i:number = 0; i < itemsStack.length; i++)
          if (itemsStack[i].item.id == currentItem.id) {
            itemsStack[i].quantity += 1;
            itemExistsInStack = true;
            break;
          }
        if (!itemExistsInStack) itemsStack.push({item: currentItem, quantity: 1});

        return accumulator + currentItem.price;
      }, 0) ?? 0
      
      itemsStack.sort((a, b) => (a.item.id > b.item.id) ? 1 : -1)

      setItemsStacked(itemsStack);
      setSum(newSum);
      setLoading(false);
    }
    // console.log("Cart sum: ", sum);
  }, [items.length])
  

  const renderHeader = () => (
    <View style={styles.contentTitle}>
      <Text style={styles.contentSubheading}>{'Total'.toUpperCase()}</Text>
      <Text style={styles.contentHeading}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(sum / 100).toLowerCase()}</Text>
    </View>
  )

  const renderContent = () => [
    
    <View style={styles.content} key="1">
      <Text style={styles.contentDescription}>Restaurant {restaurantCart}</Text>
    </View>,
    <View style={styles.content} key="2">
      <Text style={styles.contentDescription}>'Section 2'</Text>
    </View>,
    <View style={styles.content} key="3">
      <Text style={styles.contentDescription}>'Section 3'</Text>
    </View>,
    <View style={styles.content} key="4">
      <Text style={styles.contentDescription}>{address}</Text>
    </View>,
    <View style={styles.contentMap} key="5">
      <View style={{alignSelf: 'center', alignItems: 'center', flex: 1, justifyContent: 'center', zIndex: 10, transform: [{translateY: -16}]}}>
        <Image source={require('../ui/images/marker.png')} style={{ height: 32, width: 32}}/>
      </View>

      <MapView key="5"
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}  
        liteMode={true}
        region={{
          latitude: coordinates? coordinates.latitude : 0,
          longitude: coordinates? coordinates.longitude : 0, 
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
      </MapView>
    </View>,
    <View style={styles.content} key="6">
      <Text style={styles.contentDescription}>'Section 6'</Text>
    </View>,
    <View style={styles.content} key="7">
      <Text style={styles.contentDescription}>'Section 7'</Text>
    </View>,
    <View style={styles.content} key="8">
      <Text style={styles.contentDescription}>'Section 8'</Text>
    </View>,
    <View style={styles.content} key="9">
      <Text style={styles.contentDescription}>'Section 9'</Text>
    </View>,
    <View style={styles.content} key="10">
      <Text style={styles.contentDescription}>'Section 10'</Text>
    </View>,
    <View style={styles.content} key="11">
      <Text style={styles.contentDescription}>'Section 11'</Text>
    </View>,
    <View style={styles.content} key="12">
      <Text style={styles.contentDescription}>'Section 12'</Text>
    </View>,
    <View style={styles.content} key="13">
      <Text style={styles.contentDescription}>'Section 13'</Text>
    </View>,
    <View style={styles.content} key="14">
      <Text style={styles.contentDescription}>'Section 14'</Text>
    </View>,
    <View style={styles.content} key="15">
      <Text style={styles.contentDescription}>'Section 15'</Text>
    </View>
  ]

  return (
    <View style={styles.pageContainer}>
      <FlatList
        // scrollEnabled={false}
        data={itemsStacked}
        keyExtractor={(item, index) => (index + item.item.id + item.item.name)}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => (
          <SwipeableRow item={item.item} quantity={item.quantity}/>
        )}
        contentContainerStyle={{paddingBottom: modalInitSize + 8}}
      >
      </FlatList>
      
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          // stickyHeaderIndices: [2]
        }}
        panGestureComponentEnabled={true}
        //rootStyle={{backgroundColor: colors.quaternary + '10'}}
        // snapPoint={350}
        // adjustToContentHeight={true}
        // modalHeight={modalInitSize}
        handleStyle={{
          // backgroundColor: colors.grayLight
        }}
        modalStyle={styles.contentModal}
        alwaysOpen={modalInitSize}
        handlePosition="inside"

        HeaderComponent={renderHeader()}
        // modalStyle={{
        //   zIndex: 10,
        //   marginBottom: 80,
        //   marginTop: 80
        // }}
      >              
        {renderContent()}
      </Modalize>  
      
      {/* <View style={[styles.itemContainer, {borderRadius: 0, borderTopColor: colors.quaternary, borderTopWidth: 2}]}>
        <Text style={styles.sumTotal}>Total</Text>
        <Text style={styles.sumText}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(sum / 100).toLowerCase()}</Text>  
      </View> */}
    
    </View>
  )
}

export default Checkout


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary
  },

  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    color: colors.quaternary,
    fontSize: fontSizes.l,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 24,
    // height: 50
  },

  divider: { 
    marginHorizontal: 20,
    flex: 1,
    marginVertical: 8,
    height: 1,
    backgroundColor: colors.grayLight
  },

  itemContainer: {
    //Style 1
    marginLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,

    //Style 2
    // borderRadius: 12,
    // marginHorizontal: 10,
    // paddingVertical: 12,
    // paddingHorizontal: 20,

    backgroundColor: colors.white
  },
  itemTitle: {
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
    // marginTop: 2,
    // marginBottom: 4,
    color: colors.grayMedium,
    fontSize: fontSizes.s,
  },
  
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 10,
  },

  itemColumn: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  
  itemImage: {
    flex: 1,
    aspectRatio: 1,
  },

  sumTotal: {
    fontSize: fontSizes.ml,
    color: colors.quaternary,
    fontWeight: '700' 
  },

  sumText: {
    fontSize: fontSizes.l,
    color: colors.quaternary,
    fontWeight: '700'  
  },

  // Modal section
  contentTitle: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 2,
  },

  content: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginVertical: 2,
    borderRadius: 8
  },

  contentModal: {
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  contentSubheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: '600',
    color: colors.grayLight,
  },

  contentHeading: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.quaternary,
  },

  contentDescription: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: fontSizes.sm,
    fontWeight: '200',
    lineHeight: 22,
    color: colors.textBlack,
  },

  //Map
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 160,
  },

  contentMap: {
    // paddingVertical: 4,
    // paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginVertical: 2,
    borderRadius: 8,
    height: 160
  }
})

