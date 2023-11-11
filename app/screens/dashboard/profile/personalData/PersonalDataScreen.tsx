/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Icon, Image } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import DropDown from "@/components/Modals/DropDown";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { setUserData } from "@/reduxfile/redux/auth/slices";
import { useUpdateProfileMutation } from "@/reduxfile/redux/updateProfile/service";
import { RootState } from "@/store/store";
import { windowWidth } from "@/utils/dimensions";

import { UpdateProfile, UpdateProfileInitValues } from "./types/profileTypes";

const PersonalDataScreen = ({ navigation }) => {
  const jobs = [
    "Software Engineer",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
    "Frontend Developer",
  ];
  const { email, username, job } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const [selectCategory] = useState(false);
  const [values, setValues] = useState<UpdateProfile>(UpdateProfileInitValues);
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const [updateProfile, data] = useUpdateProfileMutation();
  const { isLoading, data: updateData } = data;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [hasGalleryPermission, setHasGalleryPermission] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;

      const { canceled, assets } = result;
      const fileInfo = await getFileInfo(assets[0].uri);

      if (!fileInfo?.exists) {
        Toast.show({
          position: "top",
          text1: "Oh no !!! an error occurred",
          type: "error",
        });
        return;
      }

      if (!canceled) {
        let response = assets[0].uri;
        if (Platform.OS === "ios") {
          response = response.replace("file:///", "").replace("file://", "");
          response = response.replaceAll("%20", " ");
          setImage(response);
          Toast.show({
            text1: "Image successfully uploaded",
            type: "success",
          });
        }
        Toast.show({
          text1: "Image successfully uploaded",
          type: "success",
        });
        setImage(assets[0].uri);
      }
      // Save or process with the result.assets[0].uri
    } catch (error) {
      Toast.show({
        text1: `${error as string}`,
        type: "warning",
      });
    }
  };

  const triggerUpdateProfile = () => {
    try {
      if (!values?.job) {
        return Toast.show({
          text1: "Please enter preferred job title",
          type: "error",
        });
      }
      updateProfile({
        id: "4",
        job: values?.job,
        username: values?.username || username,
      }).then((response: any) => {
        if (response?.data?.job !== null) {
          setValues({
            id: "",
            job: "",
            username: "",
          });
          dispatch(
            setUserData({
              job: response?.data?.job,
              username: response?.data?.name,
            }),
          );
          return navigation.navigate("PersonalDataSuccess");
        }
        if (!response?.data?.name) {
          Toast.show({
            text1: "Something went wrong, please try again",
            type: "error",
          });
        }
      });
    } catch (error) {
      Toast.show({
        text1: `${error as string}`,
        type: "error",
      });
    }
  };

  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box marginHorizontal="md" marginTop="Ml">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Personal Data"
        />
        <Box alignItems="center" justifyContent="center" marginTop="lg">
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ borderRadius: 100, height: 100, width: 100 }}
            />
          ) : (
            <Icon name="no_profile" size={95} />
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={pickImage}
            style={{
              marginLeft: 60,
              marginTop: -30,
            }}
          >
            <Icon name="edit_photo" size={50} />
          </TouchableOpacity>
        </Box>
        <Box marginTop="lg">
          <EyeTextInput
            labelText="Full name"
            properties={{
              onChangeText: (event: string) => handleChange(event, "username"),
              placeholder: `${username}`,
              secureTextEntry: false,
              value: values?.username,
              variant: "subHeading",
            }}
          />
          <EyeTextInput
            disableEdit={false}
            labelText="Email address"
            properties={{
              placeholder: `${email}`,
              secureTextEntry: false,
              variant: "subHeading",
            }}
          />
        </Box>
        <DropDown
          defaultSubheading="Choose preferred job title"
          label="Job"
          listItems={jobs}
          selected={values?.job || job}
          setSelected={(text: string) => handleChange(text, "job")}
        />
        <Box height={70} />
        <Button
          disabled={isLoading}
          isloading={isLoading}
          label="Update"
          loadingText="Updating profile..."
          onPress={triggerUpdateProfile}
          width={windowWidth * 0.85}
        />
        <Toast />
      </Box>
    </BlurryBottomContainer>
  );
};

export default PersonalDataScreen;
