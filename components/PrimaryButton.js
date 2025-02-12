import { StyleSheet, View, Text, Pressable } from "react-native";
import { Platform } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {scale, verticalScale } from "react-native-size-matters";

import colors from "../assets/colors/colors";

function PrimaryButton({ children }) {
  return (
    <Animated.View
      entering={FadeInUp.delay(600).duration(1000).springify()}
      style={styles.buttonContainer}
    >
      <Pressable
        style={styles.button}
        android_ripple={{ color: "rgba(0,0,0,0,1)" }}
      >
        <Text style={styles.buttonTitle}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.accent,
    borderRadius: scale(12 * (350 / 412)), // Responsive border radius
    elevation: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginTop: verticalScale(16 * (680 / 915)), // Responsive margin top
  },
  button: {
    padding: scale(16 * (350 / 412)), // Responsive padding
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "glacial-bold",
    fontSize: scale(16 * (350 / 412)), // Responsive font size
    color: "white",
    padding: scale(2 * (350 / 412)), // Responsive padding
    // fontWeight: "700",
  },
});

export default PrimaryButton;
