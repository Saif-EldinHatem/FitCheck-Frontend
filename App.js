import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";

import colors from "./assets/colors/colors";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import UserRegisterationScreen from "./screens/UserRegistertaionScreen";
import AuthProvider, { AuthContext } from "./store/context/AuthContext";
import NavBar from "./components/NavBar";
import VerificationScreen from "./screens/VerificationScreen";

const Stack = createNativeStackNavigator();

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    higuen: require("./assets/Fonts/Higuen Serif.otf"),
    glacial: require("./assets/Fonts/GlacialIndifference-Regular.otf"),
    "glacial-bold": require("./assets/Fonts/GlacialIndifference-Bold.otf"),
    "glacial-italic": require("./assets/Fonts/GlacialIndifference-Italic.otf"),
    AraEtab: require("./assets/Fonts/AraEtabAlMonie_ee-Medium.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading..</Text>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {console.log(isAuthenticated + "<---here")}
        {isAuthenticated ? (
          <NavBar />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.main },
              headerStyle: { backgroundColor: colors.main },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen
              name="UserRegisteration"
              component={UserRegisterationScreen}
            />
            <Stack.Screen
              name="Verification"
              component={VerificationScreen}
              options={{
                headerShown: true,
                title: "Verify Account",
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
