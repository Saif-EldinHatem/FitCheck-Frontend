import { StyleSheet, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {scale, verticalScale} from "react-native-size-matters";

import colors from "../assets/colors/colors";
import SignupForm from "../components/SignupForm";

function SignupScreen() {
  return (
    <View style={styles.screen}>
      {/* star Area */}
      <View style={styles.starArea}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("../assets/images/Picture1.png")}
          style={styles.star}
        />
      </View>

      {/* Form Area */}
      <SignupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    padding: scale(4 * (350 / 412)),
  },
  starArea: {
    flex: 3,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    // paddingBottom: 12, // <=== also check if you really need this one here
  },
  star: {
width: scale(70 * (350 / 412)), // Responsive width
    height: scale(70 * (350 / 412)), // Responsive height
    left: scale(130 * (350 / 412)), // Responsive left position
    bottom: verticalScale(35 * (680 / 915)), // Responsive bottom position
  },
});

export default SignupScreen;
