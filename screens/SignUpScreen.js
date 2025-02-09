import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";

import colors from "../assets/colors/colors";

function SignUpScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/images/Picture1.png")}
          style={styles.star}
        />
        <Text style={styles.logoTitle}>FitCheck</Text>
      </View>
      <View style={styles.signUpForm}>
        <TextInput placeholder="Your Email" style={styles.input} />
        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} />

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            android_ripple={{ color: "rgba(0,0,0,0,1)" }}
          >
            <Text style={styles.buttonTitle}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
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
  logo: {
    flex: 2,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 40,
  },
  star: {
    width: 70,
    height: 70,
    position: "absolute",
    top: 135,
    right: 25,
  },
  logoTitle: {
    fontFamily: "higuen",
    fontSize: 67,
  },
  signUpForm: {
    flex: 3,
    width: "100%",
    paddingHorizontal: 40,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    marginBottom: 28,
  },
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

export default SignUpScreen;
