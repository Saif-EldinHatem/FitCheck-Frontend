import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import SignUpScreen from './screens/SignupScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    higuen: require("./assets/Fonts/Higuen Serif.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading..</Text>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <SignUpScreen />
    </>
  );
}

const styles = StyleSheet.create({
});
