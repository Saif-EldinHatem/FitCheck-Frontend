import {
  StyleSheet,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserRegisterationForm from "../components/UserRegisterationForm";

function UserRegisterationScreen() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.screen}>
        <UserRegisterationForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
});

export default UserRegisterationScreen;
