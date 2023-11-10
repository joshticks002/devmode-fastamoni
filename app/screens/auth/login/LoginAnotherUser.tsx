/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/consistent-function-scoping */

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { loginimg } from "@/assets/images";
import { Box, Button, Image, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TextInput from "@/components/TextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useLoginMutation } from "@/reduxfile/redux/auth/service";
import { setUserData } from "@/reduxfile/redux/auth/slices";
import { capitalizeFirstLetter } from "@/utils/nameFormatter";

type MyFormValues = {
  email: string;
  password: string;
};
const InitialValues: MyFormValues = {
  email: "",
  password: "",
};

const LoginOtherAccounts = ({ navigation }) => {
  const [values, setValues] = useState<MyFormValues>(InitialValues);
  const dispatch = useDispatch();
  const [login, data] = useLoginMutation();
  const { isLoading } = data;
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };

  const checkNetworkConnectivity = async () => {
    const netInfo = await NetInfo.fetch();

    if (!netInfo.isConnected) {
      Toast.show({
        text1: "No network connection was detected, please try again",
        type: "error",
      });
      return false;
    }

    try {
      const response = await fetch("https://www.facebook.com");
      if (!response.ok) {
        Toast.show({
          text1: "Network failed",
          type: "error",
        });
        return false;
      }
    } catch {
      Toast.show({
        text1: "Network request failed",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isConnected = await checkNetworkConnectivity();
    const credentials = { email: values?.email };

    if (isConnected) {
      try {
        if (isLoading) return;
        if (!values?.email || !values?.password) {
          return Toast.show({
            text1: "Please fill in all fields",
            type: "error",
          });
        }
        await login({
          email: values?.email,
          password: values?.password,
        }).then((resp: any) => {
          if (resp?.error?.status === 400 || resp?.error?.status === 500) {
            return Toast.show({
              text1: `${resp?.error?.data?.error as string}`,
              type: "error",
            });
          }
          if (resp?.data?.token && resp?.data?.token !== null) {
            AsyncStorage.setItem("credentials", JSON.stringify(credentials));

            const [firstName, lastName] = values.email
              .split("@")[0]
              .split(".")
              .map((namePart: string) => capitalizeFirstLetter(namePart));

            dispatch(
              setUserData({
                email: values.email,
                username: `${firstName} ${lastName}`,
              }),
            );
            return navigation.replace("DashboardTab", {
              screen: "HomeDashboard",
            });
          }
        });
      } catch (error) {
        Toast.show({
          text1: `${error as string}`,
          type: "error",
        });
      }
    }
  };
  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box>
        <Box marginTop="Ml" paddingHorizontal="md">
          <Box>
            <TitleComponent
              handleBackPress={() => navigation.goBack()}
              title="Login"
            />
          </Box>
          <Box
            alignItems="center"
            borderRadius={100}
            justifyContent="center"
            marginBottom="Ml"
          >
            <Image
              borderRadius={100}
              height={125}
              source={loginimg}
              width={125}
            />
          </Box>
          <Box
            alignSelf="center"
            backgroundColor="lightGrey"
            borderRadius={7}
            borderWidth={0.5}
            height={70}
            marginBottom="sm"
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
              onChangeText={(text) => handleChange(text, "email")}
              placeholder=""
              value={values?.email}
              variant="boldBody"
            />
          </Box>
          <Box marginTop="xs">
            <EyeTextInput
              hasEyes
              labelText="Password"
              properties={{
                autoComplete: "off",
                onChangeText: (event: string) =>
                  handleChange(event, "password"),
                placeholder: "",
                value: values.password,
                variant: "subHeading",
              }}
            />
          </Box>
          <Box marginHorizontal="md" marginTop="md">
            <Text
              onPress={() => navigation.navigate("ResetPin")}
              variant="subHeading"
            >
              Forgot password?
            </Text>
          </Box>
          <Box marginTop="xxl">
            <Button
              isloading={isLoading}
              label="Login"
              loadingText="Logging in..."
              onPress={handleSubmit}
            />
          </Box>

          <Box alignItems="center" justifyContent="center" marginTop="Ml">
            <Text variant="boldBody">
              Dont have an account?{" "}
              <Text
                onPress={() => navigation.navigate("UserSignUp")}
                variant="subHeading"
              >
                Create Account
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </BlurryBottomContainer>
  );
};

export default LoginOtherAccounts;
