/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";

import { Box, Button, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TextInput from "@/components/TextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useRegisterMutation } from "@/reduxfile/redux/auth/service";
import { loginSuccess, setUserData } from "@/reduxfile/redux/auth/slices";
import { capitalizeFirstLetter } from "@/utils/nameFormatter";

import { UserInitValues, UserValues } from "./uservalues/uservalues";

const UserSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<UserValues>(UserInitValues);
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const [selectCategory, setSelectCategory] = useState(false);
  const [handleRegisterTrigger, result] = useRegisterMutation();

  const handleSubmit = async () => {
    if (!values.username) {
      return Toast.show({
        text1: "Please enter your username",
        type: "error",
      });
    }
    if (!values.email) {
      return Toast.show({
        text1: "Enter your email address",
        type: "error",
      });
    }

    if (!values.password) {
      return Toast.show({
        text1: "Enter your password",
        type: "error",
      });
    }
    if (!values.password2) {
      return Toast.show({
        text1: "Re-enter your already declared password",
        type: "error",
      });
    }
    if (values.password2 !== values.password) {
      return Toast.show({
        text1: "Passwords do not match",
        type: "error",
      });
    }

    await handleRegisterTrigger({
      email: values?.email.trim(),
      password: values?.password.trim(),
    }).then((resp: any) => {
      if (resp?.error?.data?.error && resp?.error?.data?.error !== null) {
        return Toast.show({
          text1: `${resp?.error?.data?.error as string}`,
          type: "error",
        });
      }
      const [firstName, lastName] = values?.email
        .split("@")[0]
        .split(".")
        .map((namePart: string) => capitalizeFirstLetter(namePart));

      dispatch(
        setUserData({
          email: values?.email,
          username: `${firstName} ${lastName}`,
        }),
      );
      if (resp?.data?.token !== null) {
        dispatch(loginSuccess());
        return navigation.replace("DashboardTab", {
          screen: "HomeDashboard",
        });
      }
    });
  };

  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box marginTop="Ml" paddingHorizontal="md">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Create Account"
        />
        <Box height={20} />
        <ScrollView
          scrollEnabled={!selectCategory}
          showsVerticalScrollIndicator={false}
        >
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
              Username
            </Text>
            <TextInput
              autoComplete="off"
              color="black"
              onChangeText={(text) => handleChange(text, "username")}
              placeholder=""
              value={values.username}
              variant="boldBody"
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
              Email Address
            </Text>
            <TextInput
              autoComplete="off"
              color="black"
              onChangeText={(text) => handleChange(text, "email")}
              placeholder=""
              value={values.email}
              variant="boldBody"
            />
          </Box>
          <EyeTextInput
            hasEyes
            labelText="Password"
            properties={{
              autoComplete: "off",
              onChangeText: (event: string) => handleChange(event, "password"),
              placeholder: "",
              value: values.password,
              variant: "subHeading",
            }}
          />
          <EyeTextInput
            hasEyes
            labelText="Confirm password"
            properties={{
              autoComplete: "off",
              onChangeText: (event: string) => handleChange(event, "password2"),
              placeholder: "",
              value: values.password2,
              variant: "subHeading",
            }}
          />
          <Box height={40} />
          <Button
            isloading={result.isLoading}
            label="Register"
            loadingText="Creating account..."
            onPress={handleSubmit}
            width="95%"
          />
          <Box height={60} />
          <Text textAlign="center" variant="subHeading">
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("UserSignIn")}
              variant="bigSubHeading"
            >
              Login
            </Text>
          </Text>
        </ScrollView>
      </Box>
    </BlurryBottomContainer>
  );
};

export default UserSignUp;
