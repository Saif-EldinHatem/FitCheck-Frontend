import { StyleSheet, View, TextInput, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";

function SignupForm() {
  return (
    <View style={styles.signupForm}>
      {/* title Area */}
      <View style={styles.titleArea}>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={styles.title}
        >
          FitCheck
        </Animated.Text>
      </View>
      <View style={styles.inputArea}>
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Your Email"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Name"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(400).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            secureTextEntry
          />
        </Animated.View>
        {/* Button */}
        <PrimaryButton>Sign Up</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupForm: {
    flex: 8,
    width: "100%",
  },
  titleArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    minHeight: 5,
  },
  title: {
    fontFamily: "higuen",
    fontSize: 67,
  },
  inputArea: {
    flex: 4,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 5,
    // borderWidth: 1,
    // borderBottomColor: "#746d67",
    // borderStyle: "dashed",
  },
  inputField: {
    // fontFamily: "glacial",
    fontWeight: "700",
    fontSize: 12,
    color: "black",
  },
});

export default SignupForm;
