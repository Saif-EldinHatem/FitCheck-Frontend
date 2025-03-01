import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "react-native-size-matters";
import { useState, Fragment } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";
import GoogleButton from "./GoogleButton";

const validationSchema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(8, "Password too short!"),
});

function LoginForm() {
  const navigation = useNavigation();

  async function handleLogin() {
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
  }

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
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => alert(JSON.stringify(values))}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Fragment>
              <Animated.View
                entering={FadeInUp.duration(1000).springify()}
                style={styles.inputWrapper}
              >
                <View
                  style={[
                    styles.inputContainer,
                    formikProps.touched.email &&
                      formikProps.errors.email &&
                      styles.errorBorder,
                  ]}
                >
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                    style={styles.inputField}
                    onChangeText={formikProps.handleChange("email")}
                    onBlur={formikProps.handleBlur("email")}
                  />
                </View>
                {formikProps.touched.email && formikProps.errors.email && (
                  <Text style={styles.validationText}>
                    {formikProps.errors.email}
                  </Text>
                )}
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(200).duration(1000).springify()}
                style={styles.inputWrapper}
              >
                <View
                  style={[
                    styles.inputContainer,
                    formikProps.touched.password &&
                      formikProps.errors.password &&
                      styles.errorBorder,
                  ]}
                >
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
                    style={styles.inputField}
                    secureTextEntry
                    onChangeText={formikProps.handleChange("password")}
                    onBlur={formikProps.handleBlur("password")}
                  />
                </View>
                {console.log(formikProps.errors.password)}
                {formikProps.touched.password &&
                  formikProps.errors.password && (
                    <Text style={styles.validationText}>
                      {formikProps.errors.password}
                    </Text>
                  )}
              </Animated.View>

              {formikProps.isSubmitting ? (
                <ActivityIndicator color={colors.accent} />
              ) : (
                // Button
                <PrimaryButton onPress={formikProps.handleSubmit}>
                  Login
                </PrimaryButton>
              )}
            </Fragment>
          )}
        </Formik>
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
          entering={FadeInUp.delay(400).duration(1000).springify()}
        >
          <Text style={styles.switchText}>Don't have an account?</Text>
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
    // width: "100%",
  },
  titleArea: {
    width: "100%",
    alignItems: "center",
    minHeight: 5,
    marginBottom: 30,
  },
  title: {
    fontFamily: "higuen",
    fontSize: 67,
  },
  inputArea: {
    width: "100%",
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: 12,
    padding: 10,
    elevation: 5,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: "darkred",
  },
  inputField: {
    fontWeight: "700",
    fontSize: 12,
    color: "black",
  },
  validationText: {
    color: "darkred",
    marginTop: 3,
    paddingLeft: 5,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondary,
  },
  lineText: {
    marginHorizontal: 10,
    fontSize: 16,
    // fontWeight: "bold",
    color: colors.secondary,
  },
  switchArea: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
  },
  switchText: {
    fontSize: 15,
  },
  pressableText: {
    fontFamily: "glacial-bold",
    marginHorizontal: 4,
    color: colors.accent,
    fontSize: 15,
  },
});

export default LoginForm;
