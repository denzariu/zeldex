import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../../ui/components/Card";
import { Restaurant } from "./Home";
import { colors, fontSizes } from "../../../styles/defaults";
import { SvgXml } from "react-native-svg";
import { starXml } from "../../ui/images/svgs";

const HomeRestaurant = ({route, navigation} : any) => {

  const { restaurant } = route.params;
  
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      
      <View style={styles.container}>
        {restaurant.name && <Text numberOfLines={1} style={styles.textArea}>{restaurant.name}</Text>}
        
        <Text numberOfLines={1} style={styles.textAreaRating}><SvgXml xml={starXml} height={18} width={18}
              fill={restaurant.rating >= '4.5'? colors.quaternary : colors.textBlack}/>{restaurant.rating}</Text>
      </View>
      <View>
        <Text style={styles.textAreaRating}>{restaurant.priceDelivery}</Text>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  textArea: {
    flex: 1,
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.textBlack,
    paddingRight: 12,
  },

  textAreaRating: {
    fontSize: fontSizes.xl,
    fontWeight: '800',
    color: colors.textBlack,
  }
})

export default HomeRestaurant;