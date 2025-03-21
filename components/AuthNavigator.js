import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import UserRegisterationScreen from "../screens/UserRegistertaionScreen";
import VerificationScreen from "../screens/VerificationScreen";
import colors from "../assets/colors/colors";

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
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
  );
}


export default AuthNavigator;
