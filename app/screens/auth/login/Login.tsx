/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/consistent-destructuring */
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import { loginimg } from "@/assets/images";
import { Box, Button, Icon, Image, Pressable, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useLoginMutation } from "@/reduxfile/redux/auth/service";
import { setUserData } from "@/reduxfile/redux/auth/slices";
import { RootState } from "@/store/store";
import { capitalizeFirstLetter } from "@/utils/nameFormatter";

type MyFormValues = {
  email: string;
  password: string;
};
const InitialValues: MyFormValues = {
  email: "",
  password: "",
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

const Login = ({ navigation }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState<MyFormValues>(InitialValues);
  const [welcomeback, setWelcomeback] = useState<MyFormValues>(InitialValues);
  const [username, setUsername] = useState<string>("");
  const [loginuser, data] = useLoginMutation();
  const { isLoading } = data;
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const handleWelcomeChange = (text: string, name: string) => {
    setWelcomeback({ ...welcomeback, [name]: text });
  };

  const [checkAuthenticate, setcheckAuthenticate] = useState(false);
  const [checkBiometrics, setCheckBiometrics] = useState(false);

  const checkBiometricAvailability = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    setCheckBiometrics(isBiometricAvailable);
  };

  const checkAvailableCredentials = async () => {
    const storedCredentials = await AsyncStorage.getItem("credentials");
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      const { email: storedEmail } = credentials;
      const fullname = storedEmail.split("@")[0];

      const firstName = fullname.split(".")[0].toUpperCase();
      setUsername(firstName);
      return {
        email: storedEmail,
        name: firstName,
      };
    }
    return "";
  };

  const dispatchUserData = (userEmail: string) => {
    const [firstName, lastName] = userEmail
      .split("@")[0]
      .split(".")
      .map((namePart: string) => capitalizeFirstLetter(namePart));

    dispatch(
      setUserData({
        email: userEmail,
        username: `${firstName} ${lastName}`,
      }),
    );
    return "";
  };

  const checkBiometricAuthentication = async () => {
    const isBiometricSet = await LocalAuthentication.isEnrolledAsync();

    if (isBiometricSet) {
      const storedCredentials = await checkAvailableCredentials();
      if (storedCredentials) {
        const result = await LocalAuthentication.authenticateAsync();

        if (result.success) {
          const { email: storedEmail } = storedCredentials;

          await loginuser({
            email: storedEmail,
            password: "secure_storage",
          }).then((resp: any) => {
            if (resp?.error?.data?.error && resp?.error?.data?.error !== null) {
              return Toast.show({
                text1: `${resp?.error?.data?.error as string}`,
                type: "error",
              });
            }
            if (resp?.data?.token && resp?.data?.token !== null) {
              dispatchUserData(storedEmail);
              return navigation.replace("DashboardTab", {
                screen: "HomeDashboard",
              });
            }
          });
        }
      }
    }
    setcheckAuthenticate(false);
  };

  useEffect(() => {
    checkAvailableCredentials();
    checkBiometricAvailability();
  }, []);

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
        await loginuser({
          email: values?.email,
          password: values?.password,
        }).then((resp: any) => {
          if (resp?.error?.data?.error && resp?.error?.data?.error !== null) {
            return Toast.show({
              text1: `${resp?.error?.data?.error as string}`,
              type: "error",
            });
          }
          AsyncStorage.setItem("credentials", JSON.stringify(credentials));
          dispatchUserData(values.email);
          return navigation.replace("DashboardTab", {
            screen: "HomeDashboard",
          });
        });
      } catch (error: any) {
        Toast.show({
          text1: `${error?.error?.data?.error as string}`,
          type: "error",
        });
      }
    }
  };

  const handleWelcomeBack = async () => {
    const isConnected = await checkNetworkConnectivity();
    if (isConnected) {
      try {
        if (isLoading) return;
        if (!welcomeback?.password) {
          return Toast.show({
            text1: "Please enter your registered password",
            type: "error",
          });
        }
        const storedCredentials = await checkAvailableCredentials();
        if (storedCredentials) {
          const { email: storedEmail } = storedCredentials;

          await loginuser({
            email: storedEmail as string,
            password: welcomeback?.password,
          }).then((resp: any) => {
            if (resp?.error?.status === 400 || resp?.error?.data?.error) {
              return Toast.show({
                text1: `${resp?.error?.data?.error as string}`,
                type: "error",
              });
            }

            if (resp?.data?.token && resp?.data?.token !== null) {
              dispatchUserData(storedEmail);
              return navigation.replace("DashboardTab", {
                screen: "HomeDashboard",
              });
            }
          });
        }
      } catch (error) {
        return Toast.show({
          text1: `${error as string}`,
          type: "error",
        });
      }
    }
  };

  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box>
        {!username && !isAuthenticated ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box marginTop="Ml" paddingHorizontal="md">
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled
                keyboardVerticalOffset={Platform.OS === "ios" ? 47 : -10}
                style={{ flex: 1 }}
              >
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
                  marginBottom="lg"
                >
                  <Image height={250} source={loginimg} width={250} />
                </Box>
                <EyeTextInput
                  labelText="Email address"
                  properties={{
                    autoComplete: "off",
                    onChangeText: (text) => handleChange(text, "email"),
                    placeholder: "",
                    secureTextEntry: false,
                    value: values?.email,
                    variant: "subHeading",
                  }}
                />
                <Box marginTop="sm">
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
                    variant="boldBody"
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
              </KeyboardAvoidingView>
            </Box>
          </ScrollView>
        ) : (
          <Box marginTop="xxl" paddingHorizontal="md">
            <Box>
              <TitleComponent handleBackPress={() => {}} title="Login" />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              marginVertical="lg"
            >
              <Image height={127} source={loginimg} width={127} />
            </Box>
            <Box alignItems="center" justifyContent="center">
              <Text marginBottom="xs" variant="header">
                Welcome Back
              </Text>
              <Text
                color="textColorTint"
                textTransform="capitalize"
                variant="subHeading"
              >
                {username}
              </Text>
            </Box>
            <Box marginTop="lg">
              <EyeTextInput
                hasEyes
                labelText="Password"
                properties={{
                  autoComplete: "off",
                  onChangeText: (event: string) =>
                    handleWelcomeChange(event, "password"),
                  placeholder: "",
                  value: welcomeback.password,
                  variant: "subHeading",
                }}
              />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="md"
              marginTop="xs"
            >
              <Text
                marginRight="sm"
                onPress={() => navigation.navigate("ResetPin")}
                variant="subHeading"
              >
                Forgot password?
              </Text>
              <Text
                color="darkPurple"
                onPress={() => navigation.navigate("LoginAnotherUser")}
                variant="subHeading"
              >
                Login another account?
              </Text>
            </Box>
            <Box marginTop="xxl">
              <Button
                disabled={data.isLoading}
                isloading={isLoading}
                label="Login"
                loadingText="Logging in..."
                onPress={handleWelcomeBack}
              />
            </Box>

            <Box>
              <Pressable
                alignItems="center"
                disabled={data.isLoading}
                justifyContent="center"
                marginTop="lg"
                onPress={checkBiometricAuthentication}
              >
                <Icon name="fingerprint" size={100} />
              </Pressable>
            </Box>

            <Box alignItems="center" justifyContent="center" marginTop="Ml">
              <Text variant="boldBody">
                Dont have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("UserSignUp")}
                  variant="subHeading"
                >
                  Sign Up
                </Text>
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </BlurryBottomContainer>
  );
};

export default Login;
