import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WardrobeScreen from "../screens/WardrobeScreen";
import OutfitsScreen from "../screens/OutfitsScreen";
import YouScreen from "../screens/YouScreen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarLabelStyle: { color: colors.accent },
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Wardrobe") {
      iconName = focused ? "file-tray-stacked" : "file-tray-stacked-outline";
    } else if (route.name === "Outfits") {
      iconName = focused ? "shirt" : "shirt-outline";
    } else if (route.name === "You") {
      iconName = focused ? "reorder-four" : "reorder-four-outline";
    }

    return <Ionicons name={iconName} size={size} color={colors.accent} />;
  },
});

const NavBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabelStyle: { color: colors.accent },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Wardrobe") {
              iconName = focused
                ? "file-tray-stacked"
                : "file-tray-stacked-outline";
            } else if (route.name === "Outfits") {
              iconName = focused ? "shirt" : "shirt-outline";
            } else if (route.name === "You") {
              iconName = focused ? "reorder-four" : "reorder-four-outline";
            }

            return (
              <Ionicons name={iconName} size={size} color={colors.accent} />
            );
          },
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wardrobe" component={WardrobeScreen} />
        <Tab.Screen name="Outfits" component={OutfitsScreen} />
        <Tab.Screen name="You" component={YouScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.main,
    height:75,  
  }
})

export default NavBar;
