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
import { useEffect, useMemo, useState } from "react";
import Collapsible from "react-native-collapsible";

import colors from "../assets/colors/colors";
import Pill from "../components/you screen/Pill";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as yup from "yup";

function GenerationScreen() {
  const navigation = useNavigation();
  const [isAuto, setIsAuto] = useState(true);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      dressCode: yup.string().required(),
      style: yup.string().required(),
      theme: yup.string().required(),
      weather: isAuto ? yup.string() : yup.string().required(),
    });
  }, [isAuto]);
  const formik = useFormik({
    initialValues: {
      dressCode: "",
      style: "",
      theme: "",
      weather: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        navigation.push("GeneratedOutfit");
      } catch (error) {
        console.error("Submission error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [isAuto]);
  //   const [dressCode, setDressCode] = useState();
  //   const [style, setStyle] = useState();
  //   const [theme, setTheme] = useState();
  //   const [weather, setWeather] = useState();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.generationSection}>
        <Text style={styles.generationHeader}>What's the dress code</Text>
        <View style={styles.generationInput}>
          <Pill
            title={"Casual"}
            isSelected={"Casual" === formik.values.dressCode}
            setIsSelected={() => formik.setFieldValue("dressCode", "Casual")}
          />
          <Pill
            title={"Formal"}
            isSelected={"Formal" === formik.values.dressCode}
            setIsSelected={() => formik.setFieldValue("dressCode", "Formal")}
          />
          <Pill
            title={"Semi-Formal"}
            isSelected={"Semi-Formal" === formik.values.dressCode}
            setIsSelected={() =>
              formik.setFieldValue("dressCode", "Semi-Formal")
            }
          />
        </View>
        <Text style={styles.generationHeader}>
          What style are you going for?
        </Text>
        <View style={styles.generationInput}>
          <Pill
            title={"Old Money"}
            isSelected={"Old Money" === formik.values.style}
            setIsSelected={() => formik.setFieldValue("style", "Old Money")}
          />
          <Pill
            title={"Oversize"}
            isSelected={"Oversize" === formik.values.style}
            setIsSelected={() => formik.setFieldValue("style", "Oversize")}
          />
          <Pill
            title={"Streetwear"}
            isSelected={"Streetwear" === formik.values.style}
            setIsSelected={() => formik.setFieldValue("style", "Streetwear")}
          />
        </View>
        <Text style={styles.generationHeader}>Color Theme:</Text>
        <View style={styles.generationInput}>
          <Pill
            title={"Vintage"}
            isSelected={"Vintage" === formik.values.theme}
            setIsSelected={() => formik.setFieldValue("theme", "Vintage")}
          />
          <Pill
            title={"Pastel"}
            isSelected={"Pastel" === formik.values.theme}
            setIsSelected={() => formik.setFieldValue("theme", "Pastel")}
          />
          <Pill
            title={"Warm"}
            isSelected={"Warm" === formik.values.theme}
            setIsSelected={() => formik.setFieldValue("theme", "Warm")}
          />
          <Pill
            title={"Cool"}
            isSelected={"Cool" === formik.values.theme}
            setIsSelected={() => formik.setFieldValue("theme", "Cool")}
          />
        </View>
        <View style={styles.automaticWeather}>
          <Pressable
            onPress={() => {
              setIsAuto((prev) => !prev);

              console.log(formik.isValid);
            }}
          >
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
                title={"Spring"}
                isSelected={"Spring" === formik.values.weather}
                setIsSelected={() => formik.setFieldValue("weather", "Spring")}
              />
              <Pill
                title={"Fall"}
                isSelected={"Fall" === formik.values.weather}
                setIsSelected={() => formik.setFieldValue("weather", "Fall")}
              />
              <Pill
                title={"Summer"}
                isSelected={"Summer" === formik.values.weather}
                setIsSelected={() => formik.setFieldValue("weather", "Summer")}
              />
              <Pill
                title={"Winter"}
                isSelected={"Winter" === formik.values.weather}
                setIsSelected={() => formik.setFieldValue("weather", "Winter")}
              />
            </View>
          </View>
        </Collapsible>
      </View>
      <Text style={[styles.subHeader]}>
        Note: Leaving options blank will use your general preferences.
      </Text>
      {formik.isSubmitting ? (
        <ActivityIndicator size={60} color={colors.accent} />
      ) : (
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[
              styles.buttonInner,
              {
                backgroundColor: formik.isValid ? colors.accent : "#878787",
              },
            ]}
            onPress={formik.handleSubmit}
            disabled={!formik.isValid}
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
      )}
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
    backgroundColor: "#878787",
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
