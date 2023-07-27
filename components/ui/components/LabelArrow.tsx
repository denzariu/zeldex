import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, fontSizes } from "../../../styles/defaults";
import { SvgXml } from "react-native-svg";
import { svgRightArrowBlack, svgRightArrowQuaternary } from "../images/svgs";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.grayLight
  },
  
  textArea: {
    color: colors.textBlack,
  }
})

type LabelArrowProps = {
  title: string;
  isBlack: boolean;
  route: any;
  labelWeight: '400' | '500' | '600' | '700';
  labelSize: 's' | 'm' | 'l' | 'xl';
  hasBorder: boolean;
  paddingH: number;
  paddingV: number;
};

const LabelArrow = ({title, isBlack, route, labelWeight, labelSize, hasBorder, paddingH, paddingV}: LabelArrowProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity style={[styles.container, {borderBottomWidth: hasBorder ? 1.5 : 0}, {paddingHorizontal: paddingH, paddingVertical: paddingV}]} onPress={() => navigation.navigate(route)}>
      <Text style={[ styles.textArea,
        {fontWeight: labelWeight},
        {fontSize: labelSize === 's' ? fontSizes.s : labelSize === 'm' ? fontSizes.m : labelSize === 'l' ? fontSizes.l : fontSizes.xl }   
      ]}>{title}</Text>
      <SvgXml xml={isBlack ? svgRightArrowBlack : svgRightArrowQuaternary} width={24} height={24} />
    </TouchableOpacity>
  )
}

export default LabelArrow