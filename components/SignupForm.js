import { StyleSheet, View, TextInput } from "react-native";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";

function SignupForm() {
  return (
    <View style={styles.signupForm}>
      <TextInput placeholder="Your Email" style={styles.input} />
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />

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
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    marginBottom: 28,
  },
});

export default SignupForm;
