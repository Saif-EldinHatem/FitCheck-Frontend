import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import SignupScreen from './screens/SignupScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    "higuen": require("./assets/Fonts/Higuen Serif.otf"),
    "glacial": require("./assets/Fonts/GlacialIndifference-Regular.otf"),
    "glacial-bold": require("./assets/Fonts/GlacialIndifference-Bold.otf"),   
    "glacial-italic": require("./assets/Fonts/GlacialIndifference-Italic.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading..</Text>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <SignupScreen />
    </>
  );
}

const styles = StyleSheet.create({
});
