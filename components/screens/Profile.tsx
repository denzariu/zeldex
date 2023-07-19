import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import React from 'react'
import { colors, fontSizes } from '../../styles/defaults';
import { useSelector } from 'react-redux';

const Profile = () => {
  
  //Test
  const phone: string = useSelector((state:any) => (state.userReducer.user.phone));

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.pageContainer}>
      <View style={styles.container}>
        <Text style={styles.textArea}>{phone}</Text>
      </View>
    </ScrollView>
  );
}

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

export default Profile
