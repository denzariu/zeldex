import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { colors, fontSizes, fonts} from '../styles/defaults';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Home from './screens/Home';
import Profile from './screens/Profile';

const MenuBar = () => {

  type ButtonMenu = {
    name: string,
    icon: string,
  }
  const MenuButtons: Array<ButtonMenu> = [
    {name: "Home", icon: homeIcon},
    {name: "Search", icon: searchIcon},
    {name: "Orders", icon: ordersIcon},
    {name: "Profile", icon: profileIcon}
  ]

  const [selectedButton, setSelectedButton] = React.useState(MenuButtons[0].name); // Initial selected button
  const navigation = useNavigation();
  
  const handleSelection = (activePage: string) => {
    setSelectedButton(activePage);
    navigation.navigate(activePage);
  };

  return (
    // <View style={[styles.center, {top: 50}]}>
    //   <MenuBar />
    // </View>
    // <View style={colors.red, fontSizes.xl}>
    //   <MenuBar/>
    // </View>
    <View style={styles.container}>
      {
        MenuButtons.map((buttonMenu) => (
        
        <TouchableOpacity style={styles.menuItem} key={"ButtonMenu" + buttonMenu.name} onPress={() => handleSelection(buttonMenu.name)}>
          <SvgXml xml={buttonMenu.icon} width={24} height={24} fill={selectedButton === buttonMenu.name ? menuItemStyleActive : menuItemStyle}/>
          <Text style={selectedButton === buttonMenu.name ? styles.menuItemTextActive : styles.menuItemText}>{buttonMenu.name}</Text>
        </TouchableOpacity>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: colors.quaternary,
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
  },
  
  menuItemText: {
    fontSize: fontSizes.m,
    color: colors.textBlack,
  },

  menuItemTextActive: {
    fontSize: fontSizes.m,
    color: colors.quaternary,
  },

});

const menuItemStyle: string = colors.black;
const menuItemStyleActive: string = colors.quaternary;

// SVG icons
const homeIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 24 24">
    <path fillRule="evenodd" d='M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z'/>
  </svg>
`;

const searchIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/>
  </svg>
`;

const ordersIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M2 17v2h20v-2H2zm0-5h20v2H2v-2zm0-4h20v2H2V8zm0-4h20v2H2V4zm0 11h20v2H2v-2z"/>
  </svg>
`;

const profileIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8,16 C12.4183,16 16,12.4183 16,8 C16,3.58172 12.4183,0 8,0 C3.58172,0 0,3.58172 0,8 C0,12.4183 3.58172,16 8,16 Z M12.9533,11.387 C13.6137,10.4231 14,9.25665 14,8 C14,4.68629 11.3137,2 8,2 C4.68629,2 2,4.68629 2,8 C2,9.25665 2.38632,10.4231 3.04668,11.387 C3.25368,10.0411 4.13147,8.91649 5.32791,8.36519 C5.11827,7.95568 5,7.49165 5,7 C5,5.34315 6.34315,4 8,4 C9.65685,4 11,5.34315 11,7 C11,7.49165 10.8817,7.95568 10.6721,8.36519 C11.8685,8.91649 12.7463,10.0411 12.9533,11.387 Z M11,13.1973 L11,12 C11,10.8954 10.1046,10 9,10 L7,10 C5.89543,10 5,10.8954 5,12 L5,13.1973 C5.88252,13.7078 6.90714,14 8,14 C9.09286,14 10.1175,13.7078 11,13.1973 Z M8,8 C8.55228,8 9,7.55228 9,7 C9,6.44772 8.55228,6 8,6 C7.44772,6 7,6.44772 7,7 C7,7.55228 7.44772,8 8,8 Z"/>
  </svg>
`;




export default MenuBar;