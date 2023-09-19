import { Animated, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors, fontSizes } from '../../styles/defaults'
import { useSelector } from 'react-redux';
import { foodItem, restaurantItem } from '../../src/database/models';
import AppleStyleSwipeableRow from '../ui/components/AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from '../ui/components/GmailStyleSwipeableRow';
import { svgLocation, svgThreeDotsVertical } from '../ui/images/svgs';
import { SvgXml } from 'react-native-svg';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Input from '../ui/components/Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

type CheckoutProps = {
  route: any,
  navigation: any,
}

const Checkout = ({ route, navigation } : CheckoutProps) => {

  const { restaurant } = route.params;
  const modalizeRef = useRef<Modalize>(null);

  const [sum, setSum] = useState<number>(0)
  const items: foodItem[] = useSelector((state:any) => (state.userReducer.cart.items));
  const [itemsStacked, setItemsStacked] = useState<{ item: foodItem, quantity: number }[]>();
  
  const address: string = useSelector((state:any) => (state.userReducer.user.address));
  const coordinates: {latitude: number, longitude: number} = useSelector((state:any) => (state.userReducer.user.coordinates));

  const [tipOption, setTip] = useState<number>(0);

  const [userAddressOne, setUserAddressOne] = useState<string>('')
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / 160;
  const LATITUDE_DELTA = 0.002;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    navigation.setOptions({
      title: restaurant.name,
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
    }
    // console.log("Cart sum: ", sum);
  }, [items.length])
  

  const renderHeader = () => (
    <>
    <KeyboardAvoidingView style={[styles.contentTitle]}>
      <Text style={styles.contentSubheading}>{'Total'.toUpperCase()}</Text>
      <Text style={styles.contentHeading}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(sum / 100).toLowerCase()}</Text>
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={[styles.content, {paddingVertical: 8}]} key="4">
      <Text style={[styles.contentHeading, {paddingTop: 8}]}>Delivery Address</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <SvgXml xml={svgLocation} height={18} width={18}></SvgXml>
        <Text numberOfLines={1} style={styles.contentDelivery}>{address}</Text>
      </View>
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={styles.contentMap} key="5">
      <View style={{alignSelf: 'center', alignItems: 'center', flex: 1, justifyContent: 'center', zIndex: 10, transform: [{translateY: -16}]}}>
        <Image source={require('../ui/images/marker.png')} style={{ height: 32, width: 32}}/>
      </View>

      <MapView key="5"
        provider={PROVIDER_GOOGLE}
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
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={styles.content} key="6">
      <Input 
        autoComplete='address-line1'
        // defaultValue='' //TODO: replace with user's address
        maxLength={80}
        upperText='Address'
        onTextChange={setUserAddressOne}
        styleContainer={{backgroundColor: colors.white, borderColor: colors.grayLight}}
        styleText={{color: colors.quaternary}}
        blurOnSubmit={false}
        placeholder='Floor, apartment number, etc.'
      />
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={[styles.content, {paddingVertical: 8}]} key="7">
      <Text style={[styles.contentHeading, {paddingTop: 8}]}>Tip the Courier</Text>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', paddingVertical: 12}}>
        <TouchableOpacity 
          onPress={() => setTip(0)}
          style={[{alignItems: 'center', width: 64, borderRadius: 6}, tipOption == 0 ? {borderColor: colors.quaternary, borderWidth: 1.5} : {borderColor: colors.grayLight, borderWidth: 1}]}>
          <Text style={[styles.contentDescription, tipOption == 0 ? {color: colors.quaternary, fontWeight: '500'} : {}]}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTip(1)}
          style={[{alignItems: 'center', width: 64, borderRadius: 6}, tipOption == 1 ? {borderColor: colors.quaternary, borderWidth: 1.5} : {borderColor: colors.grayLight, borderWidth: 1}]}>
          <Text style={[styles.contentDescription, tipOption == 1 ? {color: colors.quaternary, fontWeight: '500'} : {}]}>3 lei</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTip(2)}
          style={[{alignItems: 'center', width: 64, borderWidth: 1, borderRadius: 6}, tipOption == 2 ? {borderColor: colors.quaternary, borderWidth: 1.5} : {borderColor: colors.grayLight, borderWidth: 1}]}>
          <Text style={[styles.contentDescription, tipOption == 2 ? {color: colors.quaternary, fontWeight: '500'} : {}]}>10 lei</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTip(3)}
          style={[{alignItems: 'center', width: 64, borderWidth: 1, borderRadius: 6}, tipOption == 3 ? {borderColor: colors.quaternary, borderWidth: 1.5} : {borderColor: colors.grayLight, borderWidth: 1}]}>
          <Text style={[styles.contentDescription, tipOption == 3 ? {color: colors.quaternary, fontWeight: '500'} : {}]}>20 lei</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    
    {/* <KeyboardAvoidingView style={styles.content} key="7">
        <Input 
        autoComplete='address-line1'
        defaultValue='Second Line.' //TODO: replace with user's address
        maxLength={80}
        upperText='Address'
        onTextChange={setUserAddressOne}
        styleContainer={{backgroundColor: colors.white}}
        blurOnSubmit={false}
      />
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={styles.content} key="8">
        <Input 
        autoComplete='address-line1'
        defaultValue='Second Line.' //TODO: replace with user's address
        maxLength={80}
        upperText='Address'
        onTextChange={setUserAddressOne}
        styleContainer={{backgroundColor: colors.white}}
        blurOnSubmit={false}
      />
    </KeyboardAvoidingView> */}
    
    </>
  )

  const renderContent = () => [
    
    
    // <View style={[styles.content, {paddingVertical: 8}]} key="4">
    //   <Text style={[styles.contentHeading, {paddingTop: 8}]}>Delivery Address</Text>
    //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //     <SvgXml xml={svgLocation} height={18} width={18}></SvgXml>
    //     <Text numberOfLines={1} style={styles.contentDelivery}>{address}</Text>
    //   </View>
    // </View>,
    // <View style={styles.contentMap} key="5">
    //   <View style={{alignSelf: 'center', alignItems: 'center', flex: 1, justifyContent: 'center', zIndex: 10, transform: [{translateY: -16}]}}>
    //     <Image source={require('../ui/images/marker.png')} style={{ height: 32, width: 32}}/>
    //   </View>

    //   <MapView key="5"
    //     provider={PROVIDER_GOOGLE}
    //     style={styles.map}  
    //     liteMode={true}
    //     region={{
    //       latitude: coordinates? coordinates.latitude : 0,
    //       longitude: coordinates? coordinates.longitude : 0, 
    //       latitudeDelta: LATITUDE_DELTA,
    //       longitudeDelta: LONGITUDE_DELTA
    //     }}
    //   >
    //   </MapView>
    // </View>,
    // <View style={styles.content} key="6">
    //   <Input 
    //     autoComplete='address-line1'
    //     defaultValue='Floor, apartment number, etc.' //TODO: replace with user's address
    //     maxLength={80}
    //     upperText='Address'
    //     onTextChange={userAddressOne}
    //     styleContainer={{backgroundColor: colors.white}}
    //   />
    // </View>,
    <View style={styles.content} key="7">
      <Text style={[styles.contentHeading, {paddingTop: 8}]}>Payment Method</Text>
    </View>,

  ]

  const top = useSafeAreaInsets().top;
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
        panGestureComponentEnabled={true}
        // overlayStyle={{backgroundColor: colors.white}}
        
        FloatingComponent={(
          <KeyboardAvoidingView style={[styles.content, {marginVertical: 0, paddingVertical: 8, paddingHorizontal: 10, flex: 1, position: 'absolute', bottom: 0, right: 0, width: '50%' }]} key="8">
            <TouchableOpacity
              onPress={() => {console.log('Hi, please add validation to fields such as address. Thank you, developer.s')}}
              containerStyle={{backgroundColor: colors.white}}
              style={{alignItems: 'center', paddingVertical: 16, backgroundColor: colors.quaternary, borderRadius: 6}}
            >
              <Text style={{color: colors.primary, fontWeight: "800"}}>Place order</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
        modalStyle={[
          styles.contentModal, 
          { 
            flex: 1,
            // marginTop: top - 90
          }
        ]}
        // avoidKeyboardLikeIOS={Platform.select({ios: true, android: true})}
        keyboardAvoidingBehavior={Platform.OS == 'android' ? 'height' : 'padding'}
        // avoidKeyboardLikeIOS={true}

        alwaysOpen={modalInitSize}
        handlePosition="inside"
        HeaderComponent={renderHeader()}
      >              
        {/* {renderContent()} */}
      </Modalize>    
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
    marginBottom: 2,
  },

  content: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginVertical: 4,
    borderRadius: 8
  },

  contentModal: {
    backgroundColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    // shadowRadius: 12,
  },

  contentSubheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: '600',
    color: colors.grayLight,
  },

  contentHeading: {
    fontSize: fontSizes.xxl,
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

  contentDelivery: {
    paddingVertical: 4,
    paddingHorizontal: 8,

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

