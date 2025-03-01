import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import colors from "../assets/colors/colors";
import OTPInput from "../components/OTPInput";
import PrimaryButton from "../components/PrimaryButton";

// Responsive design related code
const { width, height } = Dimensions.get("window");
const isSmallWidth = width < 480;
const isSmallHeight = height < 900;

function VerificationScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: colors.main,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageArea}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/verificationPicture.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.textHeader}>Enter Your Verification Code</Text>
          <Text style={styles.textInfo}>
            We sent a verification code {"\n"}
            to <Text style={styles.emailText}>JohnDoe@gmail.com</Text>
          </Text>
        </View>
        <View style={styles.formArea}>
          <View style={styles.otpContainer}>
            <OTPInput />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={() => {
                console.log("value");
              }}
            >
              Verify OTP
            </PrimaryButton>
          </View>
          <View style={styles.resendArea}>
            <Text style={styles.resendText}>Didn't recieve code?</Text>
            <Pressable>
              <Text style={styles.pressableText}>Resend again</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageArea: {
    width: "100%",
    height: 280,
    marginTop: 25,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 270,
    height: 270,
    // borderRadius: "50%",
    // overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textArea: {
    // backgroundColor: "green",
    alignItems: "center",
    marginVertical: 30,
  },
  textHeader: {
    // fontFamily: "AraEtab",
    fontWeight: "500",
    fontSize: 18,
    marginVertical: verticalScale(3),
  },
  textInfo: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: verticalScale(2),
  },
  emailText: {
    color: colors.accent,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  formArea: {
    // backgroundColor: "blue",
  },
  otpContainer: {
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  resendArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 5,
  },
  resendText: {
    fontSize: 15,
  },
  pressableText: {
    color: colors.accent,
    fontWeight: "600",
    fontSize: 15,
  },
});

export default VerificationScreen;
