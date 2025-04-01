import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../assets/colors/colors";

function ProcessingScreen() {
  return (
    <View style={styles.lottieScreen}>
      <View style={styles.shadowLayer} />
      <LottieView
        autoPlay
        source={require("../assets/lottifiles/processing1.json")}
        style={styles.lottieFile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottieScreen: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    inset: 0,
    zIndex: 5,
  },
  shadowLayer: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.main,
    opacity: 0.8,
  },
  lottieFile: {
    width: "100%",
    aspectRatio: 1,
    zIndex: 10,
    opacity: 1,
  },
});

export default ProcessingScreen;
