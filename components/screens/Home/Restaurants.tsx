import { ScrollView, StyleSheet, Text } from "react-native";
import Card from "../../ui/components/Card";
import { Restaurant } from "./Home";
import { colors, fontSizes } from "../../../styles/defaults";


const Restaurants = ({route, navigation} : any) => {

  const { title, restaurants } = route.params;
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      {title && <Text style={styles.textArea}>{title}</Text>}

      {restaurants.map((restaurant: Restaurant, i: number) => 
      <Card key={restaurant.name + i} 
        name={restaurant.name} 
        rating={restaurant.rating} 
        priceDelivery={restaurant.priceDelivery}
        priceDeliveryUsual={restaurant.priceDeliveryUsual}
        menuDiscount={restaurant.menuDiscount}/>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
  },

  container: {
  },

  textArea: {
    fontSize: fontSizes.xxl,
    fontWeight: '900',
    color: colors.quaternary,
    paddingVertical: 8,
  }
})

export default Restaurants;