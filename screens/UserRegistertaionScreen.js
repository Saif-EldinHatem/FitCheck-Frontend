import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserRegisterationForm from "../components/UserRegisterationForm";

function UserRegisterationScreen() {
  const navigation = useNavigation();

  return (

      <View style={styles.screen}>
        <UserRegisterationForm />
      </View>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default UserRegisterationScreen;