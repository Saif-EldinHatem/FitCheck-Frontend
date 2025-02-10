import { StyleSheet, View, TextInput, Text } from "react-native";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";

function SignupForm() {
  return (
    <View style={styles.signupForm}>
      {/* title Area */}
      <View style={styles.titleArea}>
        <Text style={styles.title}>FitCheck</Text>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          placeholder="Your Email"
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          style={styles.input}
          secureTextEntry
        />
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
    paddingHorizontal: 40,
  },
  input: {
    fontFamily: "glacial-italic",
    fontWeight: "700",
    fontSize: 12,
    color: "black",
    backgroundColor: "#D5C8B8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 6,
    // borderWidth: 1,
    // borderBottomColor: "#746d67",
    // borderStyle: "dashed",
  },
});

export default SignupForm;
