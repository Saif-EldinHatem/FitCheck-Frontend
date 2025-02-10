import { StyleSheet, View, TextInput } from "react-native";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";

function SignupForm() {
  return (
    
    <View style={styles.signupForm}>
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
  );
}

const styles = StyleSheet.create({
  signupForm: {
    flex: 8,
    width: "100%",
    paddingHorizontal: 40,
  },
  input: {
    // borderWidth: 1,
    // borderBottomColor: "#746d67",
    fontFamily: "glacial",
    fontWeight: "700",
    fontSize: 12,
    color: "black",
    backgroundColor: "#D5C8B8",
    borderRadius: 16,
    padding: 14,
    marginBottom: 22,
    borderStyle: "dashed",
  },
});

export default SignupForm;
