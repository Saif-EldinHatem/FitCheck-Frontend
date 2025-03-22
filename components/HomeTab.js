import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import OutfitDetailsScreen from "../screens/OutfitDetailsScreen";
import { Pressable } from "react-native";
import colors from "../assets/colors/colors";

const Stack = createNativeStackNavigator();

function HomeTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="OutfitDetails"
        component={OutfitDetailsScreen}
        options={{
          headerShown: true,
          title: "Outfit",
          headerTitleStyle: {
            fontFamily: "higuen",
            fontSize: 30,
          },
          headerStyle: { backgroundColor: colors.main },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable>
              <Ionicons name="trash" size={20} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeTab;
