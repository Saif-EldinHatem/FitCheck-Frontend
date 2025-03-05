import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import colors from "../assets/colors/colors";
import LoginForm from "../components/LoginForm";

function LoginScreen({setIsAuthenticated}) {
  return (
    <KeyboardAvoidingView style={{height:"100%", width:"100%",}}>
      <ScrollView contentContainerStyle={styles.screen}>
        {/* Icon Area */}
        <View style={styles.iconArea}>
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            source={require("../assets/images/Picture1.png")}
            style={styles.icon}
          />
        </View>

        {/* Form Area */}
        <LoginForm setIsAuthenticated={setIsAuthenticated} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: colors.main,
    padding: 4, // Adjust if needed
  },
  iconArea: {
    // flex: 3,
    height: 200,
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
