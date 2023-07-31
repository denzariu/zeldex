import { Alert, Image, Pressable, Text, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { colors } from "../../../styles/defaults"
import { card, minicard } from "../../../styles/ui"
import { useEffect, useState } from "react"
import { Restaurant } from "../../screens/Home/Home"
import { useNavigation } from "@react-navigation/native"
import { starXml } from "../images/svgs"

type CardProps = {
  restaurant: any,
  miniCard: boolean
}

const Card = ({restaurant, miniCard}: CardProps) => {

  const navigator = useNavigation();
  const cardInUse = miniCard? minicard : card;

  return (
    <Pressable 
      onPress={()=>navigator.navigate('HomeRestaurant', {restaurant: restaurant})}
      style={({pressed})  => [
        {opacity: pressed ?  0.9 : 1}  
      ]}>
      <View style={cardInUse.cardContainer}>
        <View style={cardInUse.cardImageContainer}>
          <Image 
            style={cardInUse.cardImage}
            source={{uri: restaurant.image}}
          /> 
          {restaurant.menuDiscount > '0' && <Text style={cardInUse.cardMenuDiscount}>{'-' + restaurant.menuDiscount + '%'}</Text>}
        </View>
        
        <View style={cardInUse.cardTextContainer}>
          <Text numberOfLines={1} style={cardInUse.cardText}>
            {restaurant.name}
          </Text>
          
          {/* <View style={cardInUse.cardRating}> */}
            <Text style={cardInUse.cardRatingText}>
              <SvgXml xml={starXml} style={cardInUse.cardStar} width={miniCard ? 14 : 18} height={miniCard? 14 : 18} 
                      fill={restaurant.rating >= '4.5'? colors.quaternary : colors.textBlack} />{restaurant.rating}
            </Text>
          {/* </View> */}
        </View>
        <View style={cardInUse.cardPriceContainer}>
          <Text style={cardInUse.cardPrice}>{restaurant.priceDeliveryUsual + ' lei'}</Text>
          { restaurant.priceDelivery !== restaurant.priceDeliveryUsual && 
            <Text style={cardInUse.cardPriceDiscount}>{restaurant.priceDelivery + ' lei'}</Text>
          }
        </View>
      </View>
    </Pressable>
  )
}




//Water tempo:
//https://fastly.picsum.photos/id/1053/400/175.jpg?hmac=O52zXF9b70YEMtLNqi9J0h-JGzRembJ-KTge7_nbgfg

//Green field tempo:
//https://fastly.picsum.photos/id/840/400/175.jpg?hmac=32hN2aKRca4IcZhAtFXb3T3xAp27RA0TixICFaagPkU

// Last used img
// uri:'https://fastly.picsum.photos/id/608/400/175.jpg?hmac=nF4KfcHPcc-5rcUrMWjz1WooJek8gXDFqjvcCHv3_oY'}
export default Card