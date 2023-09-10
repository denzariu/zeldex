import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fontSizes } from '../../styles/defaults'
import { useSelector } from 'react-redux';
import { foodItem } from '../../src/database/models';
import { Swipeable } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from '../ui/components/AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from '../ui/components/GmailStyleSwipeableRow';
import { svgThreeDots, svgThreeDotsVertical } from '../ui/images/svgs';
import { SvgXml } from 'react-native-svg';

const Row = ({ item, quantity }: { item: foodItem, quantity: number }) => (
  // eslint-disable-next-line no-alert
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
        <Text style={styles.itemPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(item.price / 100).toLowerCase()}</Text>  
      </View>

      
      <View style={[styles.itemColumn, {flex: 0.01, alignItems: 'flex-end', marginLeft: 2, justifyContent: 'center'}]}>
        <SvgXml xml={svgThreeDotsVertical} width={24} height={24} fill={colors.quaternary}/>
      </View>
    </View>
  </View>
);

const SwipeableRow = ({ item, quantity }: { item: foodItem, quantity: number }) => {
  // if (index % 2 === 0) {
    return (
      <AppleStyleSwipeableRow children={<Row item={item} quantity={quantity}></Row>} itemId={item.id}/>
    );
  // } else {
  //   return (
  //     <GmailStyleSwipeableRow>
  //       <Row item={item} />
  //     </GmailStyleSwipeableRow>
  //   );
  // }
};


const Checkout = () => {

  const [sum, setSum] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true);
  const items: foodItem[] = useSelector((state:any) => (state.userReducer.cart.items));
  const [itemsStacked, setItemsStacked] = useState<{item:foodItem, quantity:number}[]>();
  
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
  
  // useEffect(() => {
  //   items.map( (item, index) => {
  //     console.log('cartItem' + index)
  //   })
  // }, [])

  // const handleRemoveItem = (item: foodItem) => {
  //   items.filter((i) => {
  //     return i === item ? i : null 
  //   })
  //   console.log('Swiped');
  // }


  return (
    <View style={styles.pageContainer}>
      <FlatList
        scrollEnabled={false}
        data={itemsStacked}
        keyExtractor={(item, index) => (index + item.item.id + item.item.name)}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => (
          <SwipeableRow item={item.item} quantity={item.quantity}/>
        )}
      >
      </FlatList>

      <View style={[styles.itemContainer, {borderRadius: 0, borderTopColor: colors.quaternary, borderTopWidth: 2}]}>
        <View style={styles.itemRow}>
          <View style={styles.itemColumn}>
            <Text style={styles.sumTotal}>Total</Text>
            {/* <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text> */}
            {/* <Text style={styles.itemPrice}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(item.price / 100).toLowerCase()}</Text>   */}
          </View>
          {/* <Image
            source={{uri: item.image}}
            style={styles.itemImage}/> */}
          <Text style={styles.sumText}>{Intl.NumberFormat('ro-RO', {minimumFractionDigits: 2, style: 'currency', currency: 'lei', currencyDisplay: 'name'}).format(sum / 100).toLowerCase()}</Text>
          
        </View>
      </View>
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
    borderRadius: 12,
    marginHorizontal: 10,
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
  }
})

