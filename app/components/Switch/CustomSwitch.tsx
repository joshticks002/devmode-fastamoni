import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomSwitchProps {
  option1: string;
  option2: string;
  tabLeftFunction: () => void;
  tabRightFunction: () => void;
  isLeftActive: boolean;
  isRightActive: boolean;
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  container: {
    backgroundColor: "#e4e4e4",
    borderColor: "#AD40AF",
    borderRadius: 10,
    flexDirection: "row",
    height: 55,
    justifyContent: "center",
    width: "100%",
  },
});

export default function CustomSwitch({
  option1,
  option2,
  tabLeftFunction,
  tabRightFunction,
  isLeftActive,
  isRightActive,
}: CustomSwitchProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={tabLeftFunction}
        style={[
          styles.button,
          {
            backgroundColor: isLeftActive ? "#7B46CD" : "#e4e4e4",
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: isLeftActive ? "white" : "#7B46CD",
            },
          ]}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={tabRightFunction}
        style={[
          styles.button,
          {
            backgroundColor: isRightActive ? "#7B46CD" : "#e4e4e4",
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: isRightActive ? "white" : "#7B46CD",
            },
          ]}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
