import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Text, View } from 'react-native'
import WardrobeScreen from "../screens/WardrobeScreen";
import ItemScreen from "../screens/ItemScreen";
import colors from "../assets/colors/colors";

const Stack = createNativeStackNavigator();



function WardrobeTab() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Wardrobe" component={WardrobeScreen} 
            options={{
                headerShown: true,
                headerStyle: { backgroundColor: colors.main },
                headerTitle: "Wardrobe",
                headerTitleStyle: { fontFamily: "higuen", fontSize: 32 },
                headerShadowVisible: false,
        }}/>
            <Stack.Screen name="ItemScreen" component={ItemScreen}  />
        </Stack.Navigator>
    )
  }

  export default WardrobeTab;