import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OutfitsScreen from "../screens/OutfitsScreen";
import OutfitDetailsScreen from "../screens/OutfitDetailsScreen";
import colors from "../assets/colors/colors";

const Stack = createNativeStackNavigator();

function OutfitsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Outfits"
        component={OutfitsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.main },
          headerTitle: "All Outfits",
          headerTitleStyle: { fontFamily: "higuen", fontSize: 32 },
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ height: "100%", aspectRatio: 1 }}>
              <Pressable
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => console.log("settings pressed")}
              >
                <Image
                  source={require("../assets/images/tools/customizer.png")}
                  style={{ height: "30", width: "30" }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
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

export default OutfitsTab;
