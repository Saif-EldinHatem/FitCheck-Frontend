import { StyleSheet, View, Image } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

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
    padding: 4, // <=== check if you really need this later
  },
  starArea: {
    flex: 3,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 12, // <=== also check if you really need this one here
  },
  star: {
    width: 70,
    height: 70,
    left: 130,
    bottom: 35,
  },
});

export default SignupScreen;
