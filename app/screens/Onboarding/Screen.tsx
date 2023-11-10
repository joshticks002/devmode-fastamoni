/* eslint-disable react/no-array-index-key */
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { introone, introsec } from "@/assets/images";
import { Box, Button, Image } from "@/components/";
import { wp, wptdp } from "@/constants/";

import Dot from "./Dot";
import { Description, Heading } from "./Words";

const heading = ["Welcome to Fastamoni", "Secured Payment System"];
const description = [
  "Take ownership of your finances in a new way!",
  "Monitor your inflow and outflow on a regular basis.",
];

const { width } = Dimensions.get("window");
export default function Onboarding({ navigation }: any) {
  // const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const images = [introone, introsec];
  return (
    <Box flex={1}>
      <Box alignItems="center" flex={1} justifyContent="center">
        <Box flex={0.8}>
          <Animated.ScrollView
            bounces={false}
            horizontal
            onScroll={scrollHandler}
            pagingEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image, index) => (
              <Image
                height="100%"
                key={`${image}-${index}`}
                resizeMode="contain"
                source={image}
                style={{ transform: [{ scale: index === 0 ? 1.2 : 0.7 }] }}
                width={wptdp(100)}
              />
            ))}
          </Animated.ScrollView>
        </Box>
        <Box
          flex={0.55}
          justifyContent="space-between"
          paddingBottom="xxl"
          paddingHorizontal="lg"
          paddingTop="md"
          width="100%"
        >
          <Box>
            <Box
              alignItems="center"
              height={wp(47)}
              overflow="hidden"
              width="100%"
            >
              {heading.map((text, index) => (
                <Heading
                  index={index}
                  key={`${text}-${index}`}
                  text={text}
                  translateX={translateX}
                />
              ))}
            </Box>
            <Box height={wp(45)} overflow="hidden">
              {description.map((text, index) => (
                <Description
                  index={index}
                  key={`${text}-${index}`}
                  text={text}
                  translateX={translateX}
                />
              ))}
            </Box>
            <Box>
              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="center"
                marginBottom="md"
                marginTop="md"
              >
                {images.map((text, index) => (
                  <Dot
                    index={index}
                    key={`${text}-${index}`}
                    translateX={translateX}
                  />
                ))}
              </Box>
            </Box>
            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
            >
              <Box marginHorizontal="xs" marginVertical="md">
                <Button
                  backgroundColor="black"
                  label="Login"
                  marginHorizontal="xs"
                  marginTop="lg"
                  onPress={() => navigation.navigate("UserSignIn")}
                  variant="secondary"
                  width={width * 0.35}
                />
              </Box>
              <Box marginHorizontal="xs" marginVertical="md">
                <Button
                  backgroundColor="black"
                  label="Create Account"
                  marginHorizontal="xs"
                  marginTop="lg"
                  onPress={() => navigation.navigate("UserSignUp")}
                  width={width * 0.45} // #7B46CD
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
