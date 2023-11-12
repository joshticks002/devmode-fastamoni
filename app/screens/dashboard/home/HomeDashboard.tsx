/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-promise-executor-return */
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { useDispatch, useSelector } from "react-redux";

import { Box, Icon, Pressable, Text } from "@/components/";
import { ListItem } from "@/components/Content/ListItems";
import LogoutModal from "@/components/Modals/Logout";
import CustomSwitch from "@/components/Switch/CustomSwitch";
import { logout } from "@/reduxfile/redux/auth/slices";
import { useLazyUserInfoQuery } from "@/reduxfile/redux/userInfo/service";
import { RootState } from "@/store/store";
import { windowWidth } from "@/utils/dimensions";

import { FrequentTransactionList } from "./component/FrequentTransactionList";
import { freePosters, frequentTransactionList, images } from "./data/data";

export const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

function renderItem({ item, index }: CarouselRenderItemInfo<any>) {
  return (
    <Box borderRadius="sm" key={index} overflow="hidden" width="100%">
      <Image
        alt="new images"
        source={item.image}
        style={{
          borderRadius: 10,
          height: 176,
          width: windowWidth * 0.95,
        }}
      />
    </Box>
  );
}

const HomeDashboard = ({ navigation, route }) => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  const [getUserInfo, userInfoData] = useLazyUserInfoQuery();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenModal = () => bottomSheetRef.current?.present();
  const handleCloseModal = () => bottomSheetRef.current?.dismiss();
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [customTab, setCustomTab] = useState<number>(1);

  const onRefresh = React.useCallback(() => {
    getUserInfo();
    wait(2000).then(() => setShowPullDownToRefresh(false));
  }, [getUserInfo]);

  const { username } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isFocused && route.params && route.params.onRefresh) {
      route.params.onRefresh();
    }
    getUserInfo();
  }, [route.params]);

  return (
    <Box backgroundColor="white" flex={1} paddingTop="xl">
      <Box>
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="sm"
          paddingHorizontal="lg"
          paddingTop="xxl"
        >
          <Box alignItems="center" flexDirection="row">
            <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
              <Icon name="no_profile" size={53} />
            </Pressable>
            <Text marginHorizontal="md" variant="subHeading">
              Welcome,{" "}
              <Text
                color="primaryPurple"
                textTransform="capitalize"
                variant="bigSubHeading"
              >
                {username}
              </Text>
            </Text>
          </Box>
          <Pressable>
            <Icon color="primary" name="notify" size={40} />
          </Pressable>
        </Box>

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
          <Box flex={1}>
            {/* Animated images */}
            <Box alignItems="center" justifyContent="center" marginTop="md">
              <Carousel
                autoPlay
                autoPlayInterval={3000}
                data={images}
                height={176}
                loop
                mode="parallax"
                modeConfig={{
                  parallaxScrollingOffset: 20,
                  parallaxScrollingScale: 0.9,
                }}
                renderItem={renderItem}
                scrollAnimationDuration={1500}
                width={windowWidth * 0.95}
              />
            </Box>

            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="xl"
              marginTop="md"
            >
              <Text variant="subHeading">Transactions</Text>
              <Pressable onPress={() => navigation.navigate("HistoryLanding")}>
                <Text color="primaryPurple" variant="subHeading">
                  See all
                </Text>
              </Pressable>
            </Box>
            <Box marginHorizontal="xl" marginTop="md">
              <CustomSwitch
                isLeftActive={customTab === 1}
                isRightActive={customTab === 2}
                option1="Frequent"
                option2="Recent"
                tabLeftFunction={() => setCustomTab(1)}
                tabRightFunction={() => setCustomTab(2)}
              />
            </Box>
            {customTab === 1 && (
              <Box marginHorizontal="xl" marginTop="sm">
                <Box marginBottom="lg">
                  {frequentTransactionList.map((item, index) => (
                    <FrequentTransactionList item={item} key={index} />
                  ))}
                  <Box height={100} />
                </Box>
              </Box>
            )}
            {customTab === 2 && (
              <Box marginHorizontal="xl" marginTop="sm">
                <Box marginBottom="lg">
                  {freePosters.map((item) => (
                    <ListItem
                      isFree={item.isFree}
                      key={item.id}
                      onPress={() => {}}
                      photo={item.poster}
                      price={item.price}
                      subTitle={item.subtitle}
                      title={item.title}
                    />
                  ))}
                  <Box height={100} />
                </Box>
              </Box>
            )}
          </Box>
          <LogoutModal
            bottomSheetModalRef={bottomSheetRef}
            handleClose={handleCloseModal}
            onProceed={() => {
              dispatch(logout());
              handleCloseModal();
            }}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default HomeDashboard;
