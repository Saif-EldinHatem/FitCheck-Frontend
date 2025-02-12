import { StyleSheet, View, TextInput, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {scale, verticalScale, moderateScale } from "react-native-size-matters";

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
    minHeight: verticalScale(5),
  },
  title: {
    fontFamily: "higuen",
    fontSize: scale(57),
  },
  inputArea: {
    flex: 4,
    width: "100%",
    paddingHorizontal: scale(17),
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: scale(10), //12 before responsive
    padding: scale(8), //10 before responsive
    marginBottom: verticalScale(15 * (680 / 915)),
    elevation: 5,
    // borderWidth: 1,
    // borderBottomColor: "#746d67",
    // borderStyle: "dashed",
  },
  inputField: {
    // fontFamly: "glacial-bold",
    fontWeight: "700",
    fontSize: (12 * (350 / 412)),
    color: "black",
  },
});

export default SignupForm;
