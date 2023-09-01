import { Dimensions, StyleSheet } from "react-native";
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
    flex: 1,
    display: "flex",
    marginBottom: 24
  },

  cardImageContainer: {
    // height: 194,
    // backgroundColor: colors.primary,
    // padding: 4,
    // display: "flex",
    // alignItems: "center",
    // borderWidth: 3,
    // borderColor: colors.primary,
    paddingVertical: 8
  },
  
  cardImage: {
    flex: 1,
    aspectRatio: 2.04,
    width: undefined,
    height: undefined,
    borderRadius: 12,
  },

  cardTextContainer: {
    display: 'flex',
    flexDirection: "row",
  },
  cardStar: {

  },

  cardText: {
    flex: 1,
    color: colors.textBlack,
    fontWeight: '700',
    fontSize: fontSizes.xl,
    //width: 318,
    //paddingRight: 12,
    paddingRight: 12,
  },

  cardRatingText: {
    color: colors.textBlack,
    fontWeight: '700',
    fontSize: fontSizes.l,
    
  },

  cardPriceContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    gap: 8,
  },
  
  cardPrice: {
    alignSelf: 'center',
    color: colors.textBlack,
    fontWeight: '400',
    fontSize: fontSizes.ml,
    paddingVertical: 1.2,
    verticalAlign: 'middle'
  },

  cardPriceDiscount: {
    alignSelf: 'center',
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSizes.m,
    backgroundColor: colors.quaternary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    //paddingBottom: 1.4
    //marginTop: 2,
    verticalAlign: 'middle'
  },

  cardMenuDiscount: {
    position: "absolute",
    top: 16,
    left: 8,
    color: colors.quaternary,
    fontWeight: '700',
    fontSize: fontSizes.sm,
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  }
})

export const minicard = StyleSheet.create({
  
  cardContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: 146,
    width: 216,
    marginBottom: 16,
  },

  cardImageContainer: {
    height: 126,
    backgroundColor: colors.primary,
    marginTop: 8,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    position: 'relative',
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },

  cardImage: {
    flex: 1,
    aspectRatio: 1.84,
    width: undefined,
    height: undefined,
    borderRadius: 12,
  },

  cardTextContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    borderRightWidth: 0
    
  },

  cardText: {
    flex: 1,
    color: colors.textBlack,
    fontWeight: '700',
    fontSize: fontSizes.m,
    paddingRight: 6,
    paddingLeft: 4
  },

  cardRating: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "nowrap",
    justifyContent: 'center',
    paddingRight: 4
  },

  cardStar: {
    paddingRight: 4,
  },

  cardRatingText: {
    color: colors.textBlack,
    fontWeight: '700',
    fontSize: fontSizes.sm,
    paddingRight: 8
  },
  
  cardPriceContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    gap: 8,
    paddingLeft: 4
  },
  
  cardPrice: {
    color: colors.textBlack,
    fontWeight: '500',
    fontSize: fontSizes.s,
  },

  cardPriceDiscount: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fontSizes.s,
    backgroundColor: colors.quaternary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingBottom: 1,
  },

  cardMenuDiscount: {
    position: "absolute",
    top: 12,
    left: 6,
    color: colors.quaternary,
    fontWeight: '800',
    fontSize: fontSizes.ultras,
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2
  }
})