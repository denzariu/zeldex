import {
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react'
import { colors, fontSizes } from '../../../styles/defaults';
import Card  from '../../ui/components/Card'

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    //paddingVertical: 32,
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

const Home = () => {

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.textArea}>Open Restaurants</Text>

        <Card name='Omni Pizza' rating='4.3' priceDelivery='3,49 lei' priceDeliveryUsual='3,49 lei' menuDiscount='0'/>
        <Card name='Balls Alpaca' rating='4.7' priceDelivery='0,00 lei' priceDeliveryUsual='3,49 lei' menuDiscount='10'/>
        <Card name='Noodle Pack Veranda Mall' rating='3.9' priceDelivery='3,49 lei' priceDeliveryUsual='3,49 lei' menuDiscount='0'/>
        <Card name='Circus Pub' rating='4.6' priceDelivery='0,00 lei' priceDeliveryUsual='3,49 lei' menuDiscount='0'/>
        <Card name='Fabio Pizza Opanez' rating='4.2' priceDelivery='3,49 lei' priceDeliveryUsual='3,49 lei' menuDiscount='40'/>
      </ScrollView>
    </ScrollView>
  )
}


export default Home