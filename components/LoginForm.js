import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "react-native-size-matters";
import {useState} from "react";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";
import GoogleButton from "./GoogleButton";

function LoginForm() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation();

  async function handleLogin(){

    try {
      const res = await fetch("192.168.48.241:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Password }),
      });

      const data = await res.json();
      setResponse(data.message || "Data sent successfully!");
    } catch (error) {
      console.error(error);
      setResponse("Error sending data");
    }
  };
  
  return (
    <View style={styles.loginForm}>
      {/* Title Area */}
      <View style={styles.titleArea}>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={styles.title}
        >
          FitCheck
        </Animated.Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputArea}>
        <Animated.View
          // entering={FadeInUp.duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            value={Email}
            onChangeText={setEmail}
          />
        </Animated.View>

        <Animated.View
          // entering={FadeInUp.delay(200).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            secureTextEntry
            value={Password}
            onChangeText={setPassword}
          />
        </Animated.View>

        {/* Button */}
        <PrimaryButton onPress={handleLogin}>Login</PrimaryButton>

        {/* -----or ----- */}
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.lineText}>Or Continue With</Text>
          <View style={styles.line}></View>
        </View>
        {/* Google Button */}
        <GoogleButton>Google</GoogleButton>

        <Animated.View
          style={styles.switchArea}
          // entering={FadeInUp.delay(400).duration(1000).springify()}
        >
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.replace("Signup")}>
            <Text style={styles.pressableText}>Register</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    flex: 8,
    width: "100%",
  },
  titleArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    minHeight: 5,
  },
  title: {
    fontFamily: "higuen",
    fontSize: 67,
  },
  inputArea: {
    flex: 4,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 5,
  },
  inputField: {
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

export default LoginForm;
