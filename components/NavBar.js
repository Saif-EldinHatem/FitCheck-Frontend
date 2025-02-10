import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WardrobeScreen from "../screens/WardrobeScreen";
import OutfitsScreen from "../screens/OutfitsScreen";
import YouScreen from "../screens/YouScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Wardrobe') {
            iconName = focused ? 'shirt' : 'shirt-outline';
        } else if (route.name === 'Outfits') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
        } else if (route.name === 'You') {
            iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

const tabBarOptions = {
    activeTintColor: 'primary',
    inactiveTintColor: 'gray',
};

const NavBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Wardrobe" component={WardrobeScreen} />
                <Tab.Screen name="Outfits" component={OutfitsScreen} />
                <Tab.Screen name="You" component={YouScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default NavBar;