/* eslint-disable react/no-array-index-key */
/* eslint-disable no-promise-executor-return */
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Box, Icon, Pressable, Text } from "@/components/";
import LogoutModal from "@/components/Modals/Logout";
import Tile from "@/components/Tile";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { AppNavScreenProps } from "@/navigation/index";
import { logout } from "@/reduxfile/redux/auth/slices";
import { RootState } from "@/store/store";
import { windowWidth } from "@/utils/dimensions";

import { profileNavigation } from "./data/data";

const ProfileScreen = ({ navigation }: AppNavScreenProps<"DashboardTab">) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenModal = () => bottomSheetRef.current?.present();
  const handleCloseModal = () => bottomSheetRef.current?.dismiss();
  const dispatch = useDispatch();
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);

  const { username, email } = useSelector((state: RootState) => state.user);

  return (
    <Box backgroundColor="white">
      <Box marginTop="Ml" paddingHorizontal="lg">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Profile"
        />
        <ScrollView
          onScroll={({ nativeEvent }) => {
            const {
              contentOffset: { y },
            } = nativeEvent;
            if (y < 60) {
              setShowPullDownToRefresh(true);
              return;
            }
            if (y > 100 && showPullDownToRefresh) {
              setShowPullDownToRefresh(false);
            }
          }}
          scrollEventThrottle={20}
          showsVerticalScrollIndicator={false}
        >
          <Box
            alignItems="center"
            alignSelf="center"
            justifyContent="center"
            paddingTop="xxl"
            position="absolute"
            top={-8}
          />
          <Box alignItems="center" justifyContent="center" marginTop="lg">
            <Icon name="no_profile" size={95} />
            <Text fontSize={30} textTransform="capitalize" variant="header">
              {username}
            </Text>
            <Text variant="boldBody">{email}</Text>
          </Box>
          <Box marginTop="lg">
            <Box marginHorizontal="md" marginVertical="xxs">
              <Text color="primaryPurple" variant="subHeading">
                General Settings
              </Text>
            </Box>
            <Tile
              icon="right_arrow"
              onProceed={() => navigation.navigate("PersonalDataScreen")}
              text="Edit Personal Data"
            />
            <Box>
              {profileNavigation.map((data, id) => (
                <Tile
                  icon={data.icon}
                  key={id}
                  onProceed={data.onClick}
                  text={data.text}
                />
              ))}
              <Box alignItems="center" justifyContent="center">
                <Pressable
                  alignItems="center"
                  backgroundColor="primaryPurple"
                  borderRadius={100}
                  height={60}
                  justifyContent="center"
                  marginVertical="md"
                  onPress={handleOpenModal}
                  width={windowWidth * 0.75}
                >
                  <Text
                    color="white"
                    marginHorizontal="md"
                    variant="subHeading"
                  >
                    Log Out
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
          <Box height={120} />
        </ScrollView>
        <LogoutModal
          bottomSheetModalRef={bottomSheetRef}
          handleClose={handleCloseModal}
          onProceed={() => {
            dispatch(logout());
            navigation.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            });
            handleCloseModal();
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileScreen;
