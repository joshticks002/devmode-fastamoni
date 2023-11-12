import React from "react";

import { Box, Text } from "@/components/";
import { PaletteType } from "@/constants/theme";

import { BoxProps } from "../Box";
import { TextProps } from "../Text";

interface PropsType {
  item: string;
  selected: boolean;
  backgroundColor?: PaletteType;
  ringBackgroundColor?: PaletteType;
  ringBorderColor?: PaletteType;
  cardContainerStyle?: BoxProps;
  textProp?: TextProps;
}
const CheckBoxWithText = (props: PropsType) => {
  const {
    ringBackgroundColor = "white",
    ringBorderColor = "primaryPurple",
    backgroundColor = "white",
    cardContainerStyle,
    textProp,
    item,
    selected,
  } = props;
  return (
    <Box
      alignItems="center"
      backgroundColor={backgroundColor}
      flexDirection="row"
      justifyContent="flex-start"
      paddingHorizontal="sm"
      {...cardContainerStyle}
    >
      <Box
        alignItems="center"
        borderColor={selected ? "primaryPurple" : ringBorderColor}
        borderRadius="lg"
        borderWidth={2}
        height={18}
        justifyContent="center"
        marginRight="xs"
        width={18}
      >
        <Box
          backgroundColor={selected ? "primaryPurple" : ringBackgroundColor}
          borderRadius="lg"
          height={10}
          width={10}
        />
      </Box>
      <Box
        alignItems="center"
        borderRadius="lg"
        height={45}
        justifyContent="center"
      >
        <Text marginLeft="xs" {...textProp}>
          {item}
        </Text>
      </Box>
    </Box>
  );
};
export default CheckBoxWithText;
