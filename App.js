import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { useFonts } from "expo-font";

import AuthProvider from "./store/context/AuthContext";
import RootNavigator from "./components/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded] = useFonts({
    higuen: require("./assets/Fonts/Higuen Serif.otf"),
    glacial: require("./assets/Fonts/GlacialIndifference-Regular.otf"),
    "glacial-bold": require("./assets/Fonts/GlacialIndifference-Bold.otf"),
    "glacial-italic": require("./assets/Fonts/GlacialIndifference-Italic.otf"), 
    AraEtab: require("./assets/Fonts/AraEtabAlMonie_ee-Medium.otf"),
    "poppins-light": require("./assets/Fonts/Poppins/Poppins-Light.ttf"),
    "poppins": require("./assets/Fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-medium": require("./assets/Fonts/Poppins/Poppins-Medium.ttf"),
    "poppins-semibold": require("./assets/Fonts/Poppins/Poppins-SemiBold.ttf"),
    "poppins-bold": require("./assets/Fonts/Poppins/Poppins-Bold.ttf"),
    "inter-light": require("./assets/Fonts/inter/Inter-Light.otf"),
    "inter": require("./assets/Fonts/inter/Inter-Regular.otf"),
    "inter-medium": require("./assets/Fonts/inter/Inter-Medium.otf"),
    "inter-semibold": require("./assets/Fonts/inter/Inter-SemiBold.otf"),
    "inter-bold": require("./assets/Fonts/inter/Inter-Bold.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading..</Text>;
  }

  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}
