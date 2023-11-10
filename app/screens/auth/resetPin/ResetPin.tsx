import React, { useState } from "react";
import Toast from "react-native-toast-message";

/* eslint-disable consistent-return */
import { Box, Button, Text } from "@/components/";
import TextInput from "@/components/TextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { windowWidth } from "@/utils/dimensions";

const ResetPin = ({ navigation }) => {
  const [getEmail, setGetEmail] = useState<string>("");

  const handleOtpTrigger = async () => {
    if (!getEmail) {
      return Toast.show({
        text1: "Please enter your registered email address",
        type: "error",
      });
    }
    Toast.show({
      text1: "Email successfully sent",
      type: "success",
    });
    return navigation.goBack();
  };
  return (
    <Box flex={1}>
      <Box marginTop="xxl" paddingHorizontal="md">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Reset Pin"
        />
        <Box alignItems="center" justifyContent="center" marginTop="lg">
          <Text variant="header">Reset Password</Text>
          <Text variant="subHeading">Enter account email address</Text>
        </Box>
        <Box marginTop="lg">
          <Box
            alignSelf="center"
            backgroundColor="lightGrey"
            borderRadius={7}
            borderWidth={0.3}
            height={70}
            marginTop="md"
            paddingHorizontal="md"
            paddingVertical="sm"
            width="95%"
          >
            <Text color="textColorTint" variant="boldBody">
              Email address
            </Text>
            <TextInput
              autoComplete="off"
              color="black"
              onChangeText={(text) => setGetEmail(text)}
              placeholder="Enter account email address"
              value={getEmail}
              variant="boldBody"
            />
          </Box>
        </Box>
        <Box height={100} />
        <Box>
          <Button
            label="Continue"
            loadingText="Processing request..."
            onPress={handleOtpTrigger}
            width={windowWidth * 0.85}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPin;
