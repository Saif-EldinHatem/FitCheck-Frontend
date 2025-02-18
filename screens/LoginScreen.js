import { StyleSheet, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import colors from "../assets/colors/colors";
import LoginForm from "../components/LoginForm";

function LoginScreen() {
  return (
    <View style={styles.screen}>
      {/* Icon Area */}
      <View style={styles.iconArea}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("../assets/images/Picture1.png")}
          style={styles.icon}
        />
      </View>

      {/* Form Area */}
      <LoginForm />
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    padding: 4, // Adjust if needed
  },
  iconArea: {
    flex: 3,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
    left: 130,
    bottom: 35,
  },
});

export default LoginScreen;