import { StyleSheet, View, Text, Pressable } from "react-native";
import { Platform } from "react-native";

import colors from "../assets/colors/colors";

function PrimaryButton({ children }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        android_ripple={{ color: "rgba(0,0,0,0,1)" }}
      >
        <Text style={styles.buttonTitle}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    elevation: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
  },
});

export default PrimaryButton;
