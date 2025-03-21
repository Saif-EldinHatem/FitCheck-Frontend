import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import colors from "../assets/colors/colors";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

function ChangePasswordScreen() {
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputArea}>
            {/* Current Password */}
            <PasswordInput title={"Current Password"} isCurrent={true} />
            <PasswordInput title={"New Password"} />
            <PasswordInput title={"Confirm Password"} />
          </View>
          <PrimaryButton
            children={"Confirm"}
            onPress={() => console.log("confirmed")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
  },
  container: {
    flexGrow: 1,
    paddingTop: 35,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  form: {
    width: "100%",
    gap: 35,
    alignItems: "center",
  },
  inputArea: {
    paddingVertical: 10,
    gap: 15,
  },
});

export default ChangePasswordScreen;
