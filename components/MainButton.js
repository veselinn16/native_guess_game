import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

const MainButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 18
  }
});

export default MainButton;
