import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";
import GoogleButton from "./GoogleButton";

// Responsive design related code
const { width, height } = Dimensions.get("window");
const isSmallWidth = width < 480;
const isSmallHeight = height < 900;

function SignupForm() {
  console.log("Width: " + width);
  const navigation = useNavigation();
  return (
    <View style={styles.signupForm}>
      {/* title Area */}
      <View style={styles.titleArea}>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={styles.title}
        >
          FitCheck
        </Animated.Text>
      </View>
      <View style={styles.inputArea}>
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
          />
        </Animated.View>
        {/* <Animated.View
          // entering={FadeInUp.delay(200).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Name"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
          />
        </Animated.View>
        <Animated.View
          // entering={FadeInUp.delay(400).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            secureTextEntry
          />
        </Animated.View>

        <Animated.View
          // entering={FadeInUp.delay(600).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            secureTextEntry
          />
        </Animated.View> */}

        {/* Button */}
        <PrimaryButton onPress={()=>navigation.navigate("UserRegisteration")}>Proceed</PrimaryButton>

        {/* -----or ----- */}
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.lineText}>Or Continue With</Text>
          <View style={styles.line}></View>
        </View>
        {/* Google Button */}
        <GoogleButton>Google</GoogleButton>

        {/* navigation text */}
        <Animated.View
          style={styles.switchArea}
          // entering={FadeInUp.delay(200).duration(1000).springify()}
        >
          <Text>Already have an account?</Text>
          <Pressable onPress={() => navigation.replace("Login")}>
            <Text style={styles.pressableText}>Sign In</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupForm: {
    flex: 13,
    width: "100%",
    alignItems: "center",
    // backgroundColor: "darkred",
  },
  titleArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    minHeight: 10,
    // backgroundColor: "red",
  },
  title: {
    fontFamily: "higuen",
    fontSize: isSmallWidth ? scale(57) : 67,
  },
  inputArea: {

    flex: 5,
    width: "100%",
    paddingHorizontal: scale(17),
    width: isSmallWidth ? "100%" : "80%",
    // backgroundColor: "green",
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: moderateScale(10), //12 before responsive
    padding: moderateScale(8), //10 before responsive
    marginBottom: verticalScale(15 * (680 / 915)),
    elevation: 5,
    width: "100%",
    // borderWidth: 1,
    // borderBottomColor: "#746d67",
    // borderStyle: "dashed",
  },
  inputField: {
    // fontFamly: "glacial-bold",
    fontWeight: "700",
    fontSize: 12,
    color: "black",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(12),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondary,
  },
  lineText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  switchArea: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
  },
  pressableText: {
    fontFamily: "glacial-bold",
    marginHorizontal: 4,
    color: colors.accent,
  },
});

export default SignupForm;
