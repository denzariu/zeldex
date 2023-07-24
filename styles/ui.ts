import { StyleSheet } from "react-native";
import { colors, fontSizes } from "./defaults";

export const input = {
  height: 40,
  margin: 6,
  borderWidth: 1.5,
  //borderCurve: "circular",
  borderRadius: 10,
  borderColor: colors.quaternary,
  padding: 10,
  fontSize: fontSizes.m,
  color: colors.textBlack,
  backgroundColor: colors.primary
}

export const inputTextAbove = StyleSheet.create({
  container: {
    height: 64,
    margin: 6,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.quaternary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: fontSizes.m,
    color: colors.textBlack,
    backgroundColor: colors.primary
  },

  focused: {

  }, 

  notFocused: {
    borderColor: colors.gray,
    color: colors.gray
  },

  disabled: {
    borderColor: colors.grayDisabled,
    color: colors.grayDisabled
  }, 

  notDisabled: {
  },

  inputUpperText: {
    padding: 0,
    margin: 0,
    color: colors.quaternary,
    fontSize: fontSizes.s,
    fontWeight: '500'
  },

  input: {
    padding: 0,
    margin: 0,
    color: colors.textBlack,
    fontSize: fontSizes.m,
    fontWeight: '400'
  }
})

export const card = StyleSheet.create({
  cardContainer: {
    height: 243,
    marginBottom: 16
  },

  cardImageContainer: {
    height: 195,
    backgroundColor: colors.primary,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },

  cardImage: {
    flex: 1,
    aspectRatio: 2.06,
    width: undefined,
    height: undefined,
    borderRadius: 12,
  },

  cardTextContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },

  cardText: {
    color: colors.textBlack,
    fontWeight: '700',
    fontSize: fontSizes.l
  },

  cardRating: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "nowrap",
    justifyContent: 'center'
  },

  cardRatingText: {
    color: colors.textBlack,
    fontWeight: '700',
    fontSize: fontSizes.m
  },

  cardPriceContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    gap: 8,
  },
  
  cardPrice: {
    color: colors.textBlack,
    fontWeight: '500',
    fontSize: fontSizes.m,
    
  },

  cardPriceDiscount: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fontSizes.m,
    backgroundColor: colors.quaternary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingBottom: 1
  },

  cardMenuDiscount: {
    position: "absolute",
    top: 12,
    left: 6,
    color: colors.quaternary,
    fontWeight: '700',
    fontSize: fontSizes.m,
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2
  }
})