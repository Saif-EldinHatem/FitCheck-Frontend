import { StyleSheet, View, Text, SafeAreaView, Button } from "react-native";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import GeneratedOutfitScreen from "./GeneratedOutfitScreen";

function GenerationScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.screen}>
      <Text>GenerationScreen</Text>
      <Button title="ay haga" onPress={navigation.push("GeneratedOutfit")}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingHorizontal: 16,
    paddingTop: 10,

    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default GenerationScreen;
