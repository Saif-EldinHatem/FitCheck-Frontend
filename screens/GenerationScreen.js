import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Collapsible from "react-native-collapsible";

import colors from "../assets/colors/colors";
import Pill from "../components/you screen/Pill";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

function GenerationScreen() {
  const [dressCode, setDressCode] = useState();
  const [style, setStyle] = useState();
  const [theme, setTheme] = useState();
  const [weather, setWeather] = useState();
  const [isAuto, setIsAuto] = useState(true);

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
        <Text style={styles.generationHeader}>
          What style are you going for?
        </Text>
        <View style={styles.generationInput}>
          <Pill
            title={"Old Money"}
            isSelected={"Old Money" === style}
            setIsSelected={setStyle}
          />
          <Pill
            title={"Oversize"}
            isSelected={"Oversize" === style}
            setIsSelected={setStyle}
          />
          <Pill
            title={"Streetwear"}
            isSelected={"Streetwear" === style}
            setIsSelected={setStyle}
          />
        </View>
        <Text style={styles.generationHeader}>Color Theme:</Text>
        <View style={styles.generationInput}>
          <Pill
            title={"Vintage"}
            isSelected={"Vintage" === theme}
            setIsSelected={setTheme}
          />
          <Pill
            title={"Pastel"}
            isSelected={"Pastel" === theme}
            setIsSelected={setTheme}
          />
          <Pill
            title={"Warm"}
            isSelected={"Warm" === theme}
            setIsSelected={setTheme}
          />
          <Pill
            title={"Cool"}
            isSelected={"Cool" === theme}
            setIsSelected={setTheme}
          />
        </View>
        <View style={styles.automaticWeather}>
          <Pressable onPress={() => setIsAuto((prev) => !prev)}>
            {isAuto ? (
              <Ionicons name="checkbox" size={20} color={colors.pineGreen} />
            ) : (
              <Ionicons
                name="square-outline"
                size={20}
                // color={colors.pineGreen}
              />
            )}
          </Pressable>
          <Text style={styles.automaticWeatherText}>
            Automatically check the weather
          </Text>
        </View>
        <Collapsible collapsed={isAuto} style={{ paddingBottom: 15 }}>
          <View style={styles.generationSection}>
            <View style={{ paddingTop: 5 }}>
              <Text style={styles.generationHeader}>
                What's the weather like, or is it indoors?
              </Text>
              <Text style={styles.subHeader}>
                (This will override the weather-based suggesstion)
              </Text>
            </View>
            <View style={styles.generationInput}>
              <Pill
                title={"Indoors"}
                isSelected={"Indoors" === weather}
                setIsSelected={setWeather}
              />
              <Pill
                title={"Spring/Fall"}
                isSelected={"Spring/Fall" === weather}
                setIsSelected={setWeather}
              />
              <Pill
                title={"Summer"}
                isSelected={"Summer" === weather}
                setIsSelected={setWeather}
              />
              <Pill
                title={"Winter"}
                isSelected={"Winter" === weather}
                setIsSelected={setWeather}
              />
            </View>
          </View>
        </Collapsible>
      </View>
      <Text style={[styles.subHeader]}>
        Note: Leaving options blank will use your general preferences.
      </Text>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={styles.buttonInner}
          onPress={() => navigation.push("GeneratedOutfit")}
        >
          <Text style={styles.buttonTitle}>Generate</Text>
        </Pressable>
        <Ionicons
          name="sparkles-sharp"
          color="white"
          size={20}
          style={styles.sparkles}
        />
      </View>
      <ActivityIndicator size={60} color={colors.pineGreen} />
      {/* <LottieView
        source={require("../assets/lottifiles/smeh.json")}
        autoPlay
        loop
        style={styles.lottieFile}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingHorizontal: 16,
    paddingTop: 25,
    alignItems: "center",
  },
  generationSection: {
    gap: 15,
    width: "100%",
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
  automaticWeather: {
    flexDirection: "row",
    gap: 5,
  },
  automaticWeatherText: {
    fontFamily: "inter-medium",
    fontSize: 14,
  },
  subHeader: {
    fontFamily: "inter",
    fontSize: 12,
    color: "#878787",
  },
  buttonWrapper: {
    width: "100%",
    elevation: 4,
    overflow: "hidden",
    borderRadius: 10,
    marginTop: 8,
  },
  buttonInner: {
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  buttonTitle: {
    fontFamily: "higuen",
    fontSize: 24,
    fontStyle: 20,
    color: "white",
  },
  sparkles: {
    position: "absolute",
    right: 120,
    top: 7,
  },
  lottieFile: {
    width: 150,
    aspectRatio: 1,
  },
});

export default GenerationScreen;
