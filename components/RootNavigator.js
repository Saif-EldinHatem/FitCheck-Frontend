import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NavBar from "../components/NavBar";
import AuthNavigator from "../components/AuthNavigator";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp" component={NavBar} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
