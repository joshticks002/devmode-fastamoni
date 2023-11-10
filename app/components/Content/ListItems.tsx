import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { windowWidth } from "@/utils/dimensions";

interface ListItemProps {
  photo: ImageSourcePropType;
  title: string;
  subTitle: string;
  isFree: string;
  price?: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7B46CC",
    borderRadius: 10,
    padding: 10,
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  image: {
    borderRadius: 10,
    height: 55,
    marginRight: 8,
    width: 55,
  },
  leftContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  subTitle: {
    color: "#333",
    fontSize: 14,
  },
  textContainer: {
    width: windowWidth - 220,
  },
  title: {
    color: "#333",
    fontSize: 14,
    textTransform: "uppercase",
  },
});

const ListItem: React.FC<ListItemProps> = ({
  photo,
  title,
  subTitle,
  isFree,
  price,
  onPress,
}) => (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
      <Image source={photo} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text numberOfLines={1} style={styles.title}>
          {title.toUpperCase()}
        </Text>
      </View>
    </View>

    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{isFree === "Yes" ? "Pay" : price}</Text>
    </TouchableOpacity>
  </View>
);

export { ListItem };
