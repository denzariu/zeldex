import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import React from 'react'
import { colors } from '../../styles/defaults';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary
  },

  container: {
  },
  textArea: {
    flex: 1,

  }
})


const Search = () => {
  
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      <View style={styles.container}>
        <Text style={styles.textArea}>Hi</Text>
      </View>
    </ScrollView>
  );
}

export default Search
