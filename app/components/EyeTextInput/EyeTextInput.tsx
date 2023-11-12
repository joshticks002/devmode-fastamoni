/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import { Animated, Platform } from "react-native";

import { triggerShakeAnimation } from "@/utils/shakeAnimation";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";
import TextInput, { TextInputProps } from "../TextInput";

type InputProps = {
  disableEdit?: boolean;
  errorMessage?: null | undefined | string | boolean;
  hasEyes?: boolean;
  labelText?: string;
  properties?: TextInputProps;
};

const EyeTextInput = (props: InputProps) => {
  const {
    disableEdit = true,
    errorMessage = null,
    hasEyes = false,
    labelText,
    properties,
  } = props;

  const [switchEyes, setSwitchEyes] = useState<boolean>(false);
  const animValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (errorMessage) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, errorMessage]);

  return (
    <Animated.View style={{ transform: [{ translateX: animValue }] }}>
      <Box
        alignItems="center"
        alignSelf="center"
        backgroundColor={disableEdit === false ? "grey" : "lightGrey"}
        borderColor={errorMessage ? "error" : "black"}
        borderRadius="sm"
        borderWidth={disableEdit === false ? 0 : 0.5}
        flexDirection="row"
        height={70}
        justifyContent="space-between"
        marginBottom="sm"
        paddingHorizontal="md"
        paddingVertical="sm"
        width="95%"
      >
        <Box>
          <Text variant="boldBody">{labelText}</Text>
          <TextInput
            color="black"
            editable={disableEdit}
            secureTextEntry={!switchEyes}
            style={{
              width:
                Platform.OS === "ios" || Platform.OS === "android" ? 250 : 280,
            }}
            {...properties}
            autoComplete="off"
            variant="boldBody"
          />
        </Box>
        {hasEyes && (
          <Pressable onPress={() => setSwitchEyes(!switchEyes)} padding="md">
            <Icon name={switchEyes ? "eye" : "eye_off"} size={30} />
          </Pressable>
        )}
      </Box>
    </Animated.View>
  );
};

export default EyeTextInput;
