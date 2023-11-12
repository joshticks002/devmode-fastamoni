import lodash from "lodash";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

import { Box, Button, Text } from "@/components/";
import { ErrorMessage } from "@/components/ErrorMessage";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import CheckBoxWithText from "@/components/Selectables/CheckBoxWithText";
import { Separator } from "@/components/Separator";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { RootState } from "@/store/store";
import { windowWidth } from "@/utils/dimensions";

import { wait } from "../home/HomeDashboard";

type PasswordType = {
  old: { value: string; error: string };
  new: { value: string; error: string };
  confirm: { value: string; error: string };
};

const initialPasswordValues = {
  confirm: { error: "", value: "" },
  new: { error: "", value: "" },
  old: { error: "", value: "" },
};

function ChangePassword({ navigation }) {
  const { username } = useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState<PasswordType>(initialPasswordValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [passwordValidation, setPasswordValidation] = useState({
    hasLowerCase: false,
    hasSpecialCharacter: false,
    hasUppercase: false,
    isValid: false,
  });

  const firstName = username.split(" ")[0];
  const lastName = username.split(" ")[1];

  function handleTextChange(value: string, key: keyof PasswordType) {
    setPassword((previous) => {
      const newValues = lodash.cloneDeep(previous);
      newValues[key].value = value;
      if (newValues[key].error) {
        newValues[key].error = "";
      }

      return newValues;
    });
  }

  const handleUpdate = () => {
    if (!password.old.value) {
      setPassword((previous) => {
        const newValues = lodash.cloneDeep(previous);
        newValues.old.error = "Enter your current password";

        return newValues;
      });
      return;
    }

    if (!password.new.value) {
      setPassword((previous) => {
        const newValues = lodash.cloneDeep(previous);
        newValues.new.error = "Enter your new password";

        return newValues;
      });
      return;
    }

    if (
      !passwordValidation.hasSpecialCharacter ||
      !passwordValidation.hasUppercase ||
      !passwordValidation.hasLowerCase
    ) {
      setPasswordValidation((previous) => ({ ...previous, isValid: false }));
      setPassword((previous) => {
        const newValues = lodash.cloneDeep(previous);
        newValues.new.error = "Password do not meet requirements";

        return newValues;
      });
    }

    if (
      password.new.value.toLowerCase().includes(firstName.toLowerCase()) ||
      password.new.value.toLowerCase().includes(lastName.toLowerCase())
    ) {
      setPassword((previous) => {
        const newValues = lodash.cloneDeep(previous);
        newValues.new.error = "Password cannot contain your username";

        return newValues;
      });
      return;
    }

    if (!password.confirm.value) {
      setPassword((previous) => {
        const newValues = lodash.cloneDeep(previous);
        newValues.confirm.error = "Enter your new password again";

        return newValues;
      });
      return;
    }

    if (password.confirm.value !== password.new.value) {
      setPassword((previous) => {
        const newValues = lodash.cloneDeep(previous);
        newValues.confirm.error = "Passwords do not match";

        return newValues;
      });
      return;
    }

    // Password is valid, perform update
    setIsLoading(true);
    setPassword(initialPasswordValues);
    wait(2000).then(() => {
      setIsLoading(false);
      Toast.show({
        text1: "Password changed successfully",
        type: "success",
      });
    });
  };

  const checkBoxValues = [
    {
      selected: passwordValidation.hasSpecialCharacter,
      value: "At least a special character",
    },
    {
      selected: passwordValidation.hasUppercase,
      value: "One uppercase letter",
    },
    {
      selected: passwordValidation.hasLowerCase,
      value: "One lowercase letter",
    },
  ];

  const inputItems = [
    {
      error: password.old.error,
      labelText: "Enter Old Password",
      onChangeType: "old",
      value: password.old.value,
    },
    {
      error: password.new.error,
      labelText: "Enter New Password",
      onChangeType: "new",
      value: password.new.value,
    },
    {
      error: password.confirm.error,
      labelText: "Confirm New Password",
      onChangeType: "confirm",
      value: password.confirm.value,
    },
  ];

  useEffect(() => {
    const specialCharacterRegex = /[!"#$%&()*,.:<>?@^{|}]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    setPasswordValidation((previous) => ({
      ...previous,
      hasLowerCase: lowercaseRegex.test(password.new.value),
      hasSpecialCharacter: specialCharacterRegex.test(password.new.value),
      hasUppercase: uppercaseRegex.test(password.new.value),
    }));
  }, [password.new.value]);

  return (
    <Box backgroundColor="white" flex={1}>
      <Box flex={1} marginTop="Ml" paddingHorizontal="lg">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Change Password"
        />
        <Separator height={35} />
        {inputItems.map((item) => (
          <Box key={item.labelText} marginBottom="sl">
            <EyeTextInput
              errorMessage={item.error}
              hasEyes
              labelText={item.labelText}
              properties={{
                autoComplete: "off",
                onChangeText: (event: string) =>
                  handleTextChange(
                    event,
                    item.onChangeType as keyof PasswordType,
                  ),
                placeholder: "",
                value: item.value,
                variant: "subHeading",
              }}
            />
            {item.error ? <ErrorMessage text={item.error} /> : null}
          </Box>
        ))}
        <Box>
          <Text color="blackTint" marginBottom="sm" variant="medium">
            Password should contain the following:
          </Text>
          {checkBoxValues.map((item) => (
            <CheckBoxWithText
              item={item.value}
              key={item.value}
              selected={item.selected}
            />
          ))}
        </Box>
        <Box flex={1} position="relative">
          <Box
            alignItems="center"
            bottom={0}
            justifyContent="center"
            left={0}
            paddingBottom="sm"
            paddingTop="xs"
            paddingVertical="sm"
            position="absolute"
            right={0}
          >
            <Button
              alignSelf="center"
              disabled={isLoading}
              isloading={isLoading}
              label="Update Password"
              loadingText="Updating password..."
              onPress={handleUpdate}
              width={windowWidth * 0.85}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { ChangePassword };
