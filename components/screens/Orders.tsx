import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import React from 'react'
import { colors, fontSizes } from '../../styles/defaults';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary
  },

  container: {
  },

  textArea: {
    flex: 1,
    fontSize: fontSizes.l,
    color: colors.quaternary
  }
})


const Orders = () => {
  
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      <View style={styles.container}>
        <Text style={styles.textArea}>Hello</Text>
        
        <Text style={styles.textArea}>Hello</Text>
      </View>
    </ScrollView>
  );
}

export default Orders
