import { StyleSheet, View, Text, SafeAreaView, Button } from "react-native";
import colors from "../assets/colors/colors";
import FilterPill from "../components/FilterPill";
import { useState } from "react";
import Pill from "../components/you screen/Pill";
import { useNavigation } from "@react-navigation/native";

function GenerationScreen() {
  const [dressCode, setDressCode] = useState();
  const [style, setStyle] = useState();
  const [theme, setTheme] = useState();

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.generationSection}>
        <Text style={styles.generationHeader}>What's the dress code</Text>
        <View style={styles.generationInput}>
          <Pill
            title={"Casual"}
            isSelected={"Casual" === dressCode}
            setIsSelected={setDressCode}
          />
          <Pill
            title={"Formal"}
            isSelected={"Formal" === dressCode}
            setIsSelected={setDressCode}
          />
          <Pill
            title={"Semi-Formal"}
            isSelected={"Semi-Formal" === dressCode}
            setIsSelected={setDressCode}
          />
        </View>
      </View>
      <Button
        title="Generate"
        onPress={() => navigation.push("GeneratedOutfit")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  generationSection: {
    gap: 15,
  },
  generationHeader: {
    fontFamily: "inter-medium",
    fontSize: 18,
    lineHeight: 20,
  },
  generationInput: {
    flexDirection: "row",
    gap: 4,
    paddingBottom: 5,
  },
});

export default GenerationScreen;
