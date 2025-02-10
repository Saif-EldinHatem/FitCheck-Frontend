import { StyleSheet, View, Text, Pressable } from "react-native";
import { Platform } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

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
    borderRadius: 12,
    elevation: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginTop: 16,
  },
  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "glacial-bold",
    fontSize: 16,
    color: "white",
    padding: 2,
    // fontWeight: "700",
  },
});

export default PrimaryButton;
