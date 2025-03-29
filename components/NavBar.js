import { Pressable, StyleSheet, Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WardrobeScreen from "../screens/WardrobeScreen";
import OutfitsScreen from "../screens/OutfitsScreen";
import YouScreen from "../screens/YouScreen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AccountTab from "./AccountTab";
import HomeTab from "./HomeTab";
import WardrobeTab from "./WardrobeTab";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: { color: colors.accent },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "WardrobeTab") {
            iconName = focused
              ? "file-tray-stacked"
              : "file-tray-stacked-outline";
          } else if (route.name === "Outfits") {
            iconName = focused ? "shirt" : "shirt-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "reorder-four" : "reorder-four-outline";
          }

          return <Ionicons name={iconName} size={size} color={colors.accent} />;
        },
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen
        name="WardrobeTab"
        component={WardrobeTab}
        options={{
          title: "Wardrobe",
        }}
      />
      <Tab.Screen
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
                onPress={()=>console.log("settings pressed")}
              >
                <Image source={require("../assets/images/tools/customizer.png")} style={{ height: "30", width: "30" }} />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountTab}
        options={{ title: "You" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.main,
    height: 55,
  },
});

export default NavBar;
