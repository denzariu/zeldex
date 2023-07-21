import { Alert, Image, Pressable, Text, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { colors } from "../../../styles/defaults"
import { card } from "../../../styles/ui"

const Card = (props: any) => {
  return (
    <Pressable 
      onPress={()=>Alert.alert('Pressed.')}
      style={({pressed})  => [
        {opacity: pressed ?  0.9 : 1}  
      ]}>
      <View style={card.cardContainer}>
        <View style={card.cardImageContainer}>
          <Image
            style={card.cardImage}
            source={{uri:'https://fastly.picsum.photos/id/608/400/175.jpg?hmac=nF4KfcHPcc-5rcUrMWjz1WooJek8gXDFqjvcCHv3_oY'}}
          /> 
          {props.menuDiscount > '0' && <Text style={card.cardMenuDiscount}>{'-' + props.menuDiscount + '%'}</Text>}
        </View>
        <View style={card.cardTextContainer}>
          <Text style={card.cardText}>
            {props.name}
          </Text>
          <View style={card.cardRating}>
            <SvgXml xml={starXml} width={18} height={18} fill={props.rating >= '4.5'? colors.quaternary : colors.textBlack} />
            <Text style={card.cardRatingText}>
              {props.rating}
            </Text>
          </View>
        </View>
        <View style={card.cardPriceContainer}>
          <Text style={card.cardPrice}>{props.priceDeliveryUsual}</Text>
          { props.priceDelivery !== props.priceDeliveryUsual && 
            <Text style={card.cardPriceDiscount}>{props.priceDelivery}</Text>
          }
        </View>
      </View>
    </Pressable>
  )
}

const starXml = `
<svg width="800px" height="800px" viewBox="2 -2 24 24" id="star" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><path id="primary" d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" ></path></svg>
`
//Water tempo:
//https://fastly.picsum.photos/id/1053/400/175.jpg?hmac=O52zXF9b70YEMtLNqi9J0h-JGzRembJ-KTge7_nbgfg

//Green field tempo:
//https://fastly.picsum.photos/id/840/400/175.jpg?hmac=32hN2aKRca4IcZhAtFXb3T3xAp27RA0TixICFaagPkU

export default Card