/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import { Platform } from "react-native";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";
import TextInput, { TextInputProps } from "../TextInput";

type InputProps = {
  disableEdit?: boolean;
  hasEyes?: boolean;
  labelText?: string;
  properties?: TextInputProps;
};

const EyeTextInput = (props: InputProps) => {
  const { disableEdit = true, hasEyes = false, labelText, properties } = props;

  const [switchEyes, setSwitchEyes] = useState<boolean>(false);
  return (
    <Box
      alignItems="center"
      alignSelf="center"
      backgroundColor={disableEdit === false ? "grey" : "lightGrey"}
      borderRadius={7}
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
  );
};

export default EyeTextInput;
