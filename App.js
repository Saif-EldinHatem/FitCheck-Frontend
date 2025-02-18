import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import SignupScreen from './screens/SignupScreen';
import LoginScreen from "./screens/LoginScreen";
import UserRegisterationScreen from './screens/UserRegistertaionScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from './components/NavBar';
import colors from './assets/colors/colors';

const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.main},
        }}

      >
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="UserRegisteration" component={UserRegisterationScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
