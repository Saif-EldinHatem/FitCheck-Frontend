import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";

import colors from "../assets/colors/colors";
import SignupForm from "../components/SignupForm";

function SignupScreen() {
  return (
    <View style={styles.screen}>
      {/* star Area */}
      <View style={styles.starArea}>
        <Image
          source={require("../assets/images/Picture1.png")}
          style={styles.star}
        />
      </View>

      {/* title Area */}
      <View style={styles.titleArea}>
        <Text style={styles.title}>FitCheck</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  starArea: {
    flex: 4,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 12,
  },
  star: {
    width: 70,
    height: 70,
    left: 130,
    bottom: 35,
  },
  titleArea: {
    flex: 2,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontFamily: "higuen",
    fontSize: 67,
  },

});

export default SignupScreen;
