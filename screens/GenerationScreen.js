import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import colors from "../assets/colors/colors";

function GenerationScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>GenerationScreen</Text>
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
