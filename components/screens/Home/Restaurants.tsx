import { ScrollView, StyleSheet, Text } from "react-native";
import Card from "../../ui/components/Card";
import { Restaurant } from "./Home";
import { colors, fontSizes } from "../../../styles/defaults";

// Switch to FlatList

const Restaurants = ({route, navigation} : any) => {

  const { title, restaurants } = route.params;
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      {title && <Text style={styles.textArea}>{title}</Text>}

      {restaurants.map((restaurant: Restaurant, i: number) => 
      <Card key={restaurant.name + i} 
        miniCard={false}
        restaurant={restaurant}/>
        
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
  },

  container: {
  },

  textArea: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.textBlack,
    paddingVertical: 8,
  }
})

export default Restaurants;