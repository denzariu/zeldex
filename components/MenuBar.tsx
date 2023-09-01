import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { colors, fontSizes, fonts} from '../styles/defaults';
import { SvgXml } from 'react-native-svg';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { svgMenuIcons } from './ui/images/svgs';

const MenuBar = ({ navigation }) => {

  type ButtonMenu = {
    name: string,
    icon: string,
  }
  const MenuButtons: Array<ButtonMenu> = [
    {name: "Home", icon: svgMenuIcons.home},
    {name: "Search", icon: svgMenuIcons.search},
    {name: "Orders", icon: svgMenuIcons.orders},
    {name: "Profile", icon: svgMenuIcons.profile}
  ]

  const [selectedButton, setSelectedButton] = React.useState(MenuButtons[0].name); // Initial selected button
  const loggedin: boolean = useSelector((state:any) => (state.userReducer.isAuthenticated));
  
  const handleSelection = (activePage: string) => {
    setSelectedButton(activePage);
    navigation.navigate(activePage);
  };

  if (loggedin)
  return (
    <View style={styles.container}>
      {
        MenuButtons.map((buttonMenu) => (
        
        <TouchableOpacity style={styles.menuItem} key={"ButtonMenu" + buttonMenu.name} onPress={() => handleSelection(buttonMenu.name)}>
          <SvgXml xml={buttonMenu.icon} width={20} height={20} fill={selectedButton === buttonMenu.name ? menuItemStyleActive : menuItemStyle}/>
          <Text style={selectedButton === buttonMenu.name ? styles.menuItemTextActive : styles.menuItemText}>{buttonMenu.name}</Text>
        </TouchableOpacity>
        ))
      }
    </View>
  )
  return <></>
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: colors.quaternary,
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
  },
  
  menuItemText: {
    fontSize: fontSizes.ultras,
    color: colors.gray,
  },

  menuItemTextActive: {
    fontSize: fontSizes.ultras,
    color: colors.quaternary,
  },

});

const menuItemStyle: string = colors.gray;
const menuItemStyleActive: string = colors.quaternary;






export default MenuBar;