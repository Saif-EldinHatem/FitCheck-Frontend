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
      <View style={styles.signupForm}>
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
  signupForm: {
    flex: 8,
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

export default SignupScreen;
