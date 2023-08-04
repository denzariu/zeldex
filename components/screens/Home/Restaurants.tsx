import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import Card from "../../ui/components/Card";
import { Restaurant } from "./Home";
import { colors, fontSizes } from "../../../styles/defaults";

// Switch to FlatList

const RenderHeader = ({title} : any) => {
  if (title) 
  return (
    <Text style={styles.textArea}>{title}</Text>
  )

  return <></>
}

const Restaurants = ({route, navigation} : any) => {

  const { title, restaurants } = route.params;
  return (
    <FlatList 
      data={restaurants}
      renderItem={({item, index}) => (
          <Card key={item.name + index} 
            miniCard={false}
            restaurant={item}/>
      )}
        contentInsetAdjustmentBehavior="automatic" 
        style={styles.pageContainer}
        ListHeaderComponent={<RenderHeader title={title}/>}
        stickyHeaderHiddenOnScroll={false}
        
        >
        
      </FlatList>
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