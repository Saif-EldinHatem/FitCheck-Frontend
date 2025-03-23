import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import colors from "../assets/colors/colors";
import SectionWrapper from "../components/SectionWrapper";
import LightInput from "../components/LightInput";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function AccountSettings() {
  const navigation = useNavigation();

  const [gender, setGender] = useState("M");
  const [isEdited, setIsEdited] = useState(false);

  //  make it useEffect instead if you want to support web and serverside rendering (from docs -v:7.x)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.headerButton}
          onPress={() => console.log("saved")}
          // disabled={!isEdited}
        >
          <Text style={styles.headerButtonTitle}>Save</Text>
        </Pressable>
      ),
    });
  }, [navigation, isEdited]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <SectionWrapper title={"Account Details"} style={{ paddingBottom: 0 }}>
          <View style={styles.sectionRow}>
            <Text style={styles.rowTitle}>username</Text>

            <View style={styles.rowContent}>
              <LightInput content={"Saif Hatem"} />
            </View>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.rowTitle}>Email</Text>

            <View style={styles.rowContent}>
              <LightInput content={"Saifhatem76@gmail.com"} />
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.passwordRow}>
            <Pressable
              style={styles.passwordTab}
              onPress={() => navigation.push("ChangePassword")}
            >
              <Text style={styles.rowTitle}>Change password</Text>

              <Image
                source={require("../assets/images/tools/chevron.png")}
                style={styles.chevron}
              />
            </Pressable>
          </View>
        </SectionWrapper>

        <SectionWrapper title={"Personal Details"}>
          <View style={styles.sectionRow}>
            <Text style={styles.rowTitle}>Name</Text>

            <View style={styles.rowContent}>
              <LightInput content={"Saif Hatem"} />
            </View>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.rowTitle}>Birth Date</Text>

            <View style={[styles.rowContent, { gap: 5 }]}>
              <LightInput content={"Jun"} alignCenter={true} />
              <LightInput content={"09"} alignCenter={true} />
              <LightInput content={"2003"} alignCenter={true} />
            </View>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.rowTitle}>Gender</Text>
            <View style={[styles.rowContent, { gap: 5 }]}>
              <View
                style={[
                  styles.buttonWrapper,
                  gender == "M" && styles.buttonSelected,
                ]}
              >
                <Pressable
                  style={styles.genderButton}
                  onPress={() => setGender("M")}
                  android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                >
                  <Text
                    style={[
                      styles.buttonTitle,
                      gender == "M" && styles.buttonTitleSelected,
                    ]}
                  >
                    Male
                  </Text>
                </Pressable>
              </View>

              <View
                style={[
                  styles.buttonWrapper,
                  gender == "F" && styles.buttonSelected,
                ]}
              >
                <Pressable
                  style={styles.genderButton}
                  onPress={() => setGender("F")}
                  android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                >
                  <Text
                    style={[
                      styles.buttonTitle,
                      gender == "F" && styles.buttonTitleSelected,
                    ]}
                  >
                    Female
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </SectionWrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    // backgroundColor: "red",
    height: "100%",
    width: 100,
    alignItems: "flex-end",
  },
  headerButtonTitle: {
    height: "100%",
    fontFamily: "poppins-medium",
    fontSize: 16,
    textAlignVertical: "bottom",
  },
  screen: {
    flex: 1,
    backgroundColor: colors.main,
  },
  container: {
    flexGrow: 1,
    paddingTop: 35,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  sectionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  rowTitle: {
    // fontFamily: "poppins-medium",
    fontSize: 15,
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  line: {
    width: "95%",
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  passwordRow: {
    overflow: "hidden",
    // backgroundColor: "green",
  },
  passwordTab: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    paddingHorizontal: 16,
  },
  chevron: {
    height: 20,
    width: 20,
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  genderButton: {
    width: "100%",
    height: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "rgba(0,0,0,0.5)",
    fontFamily: "poppins",
    lineHeight: 20,
    height: "100%",
    textAlignVertical: "center",
    fontSize: 16,
  },
  buttonSelected: {
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.accent,
    elevation: 3,
  },
  buttonTitleSelected: {
    color: "white",
  },
});

export default AccountSettings;
