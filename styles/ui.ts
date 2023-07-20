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
  color: colors.quaternary,
  backgroundColor: colors.primary
}

export const card = StyleSheet.create({
  cardContainer: {
    height: 242,
    marginBottom: 8
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
    gap: 8
  },
  
  cardPrice: {
    paddingTop: 0,
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