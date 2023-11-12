import { Animated } from "react-native";

export const triggerShakeAnimation = (animValue: Animated.Value) => {
  Animated.sequence([
    Animated.timing(animValue, {
      duration: 100,
      toValue: -10,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      duration: 100,
      toValue: 10,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      duration: 100,
      toValue: -10,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true,
    }),
  ]).start();
};
