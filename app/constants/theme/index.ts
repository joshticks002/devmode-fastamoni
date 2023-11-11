import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";

import { wp } from "@/constants/layout";

export const palette = {
  bankReceivedGreen: "#03B146",
  black: "#101818",
  blackTint: "#696977",
  blue: "#3878B8",
  darkPurple: "#7B46CC",
  error: "#E25825",
  grey: "#C1C7CF",
  lightGrey: "rgba(245, 245, 245, 1)",
  negativeColor: "#E70011",
  primary: "rgba(0, 136, 204, 1)",
  primaryPurple: "#7B46CD",
  purple: "rgba(35, 0, 83, 1)",
  red: "rgba(227, 30, 36, 1)",
  secondary: "#878681",
  success: "#00A067",
  transparent: "transparent",
  warning: "#D1A000",
  white: "#FBFBFB",
  yellow: "#F2C948",
};

const theme = createTheme({
  breakpoints: {
    bigscreen: 412,
    phone: 0,
    tablet: 768,
  },
  colors: {
    ...palette,
    blockBg: palette.grey,
    buttonPry: palette.primary,
    mainBackground: palette.white,
    textColor: palette.black,
    textColorTint: palette.blackTint,
  },
  spacing: {
    Ml: wp(60), // mega large
    lg: wp(24), // large
    md: wp(16), // medium
    sl: wp(20), // semi large
    sm: wp(12), // semi medium
    sml: wp(8), // small
    xl: wp(32), // extra large
    xs: wp(4), // extra small
    xxl: wp(40), // extra extra large
    xxs: wp(2), // extra extra small
  },
  textVariants: {
    bigSubHeading: {
      color: "textColor",
      fontFamily: "harmonia-sbd",
      fontSize: 20,
      fontWeight: "600",
    },
    body: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
    boldBody: {
      color: "textColorTint",
      fontFamily: "harmonia-rg",
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 20,
    },
    button: {
      color: "mainBackground",
      fontFamily: "harmonia-sbd",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 22,
    },
    defaults: {},
    header: {
      color: "textColor",
      fontFamily: "harmonia-sbd",
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 40,
    },
    subHeading: {
      color: "textColor",
      fontFamily: "harmonia-sbd",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 21,
    },
  },
});

export type Theme = typeof theme;

export const useTheme = () => useRestyleTheme<Theme>();

export default theme;
