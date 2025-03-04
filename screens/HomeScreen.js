import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Text,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TopBar from "../components/TopBar";
import WeatherCard from "../components/WeatherCard";
import BoxDetails from "../components/BoxDetails";
import colors from "../assets/colors/colors";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeScreenWrapper}>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <TopBar />

        {/* Weather Row */}
        <ScrollView
          contentContainerStyle={styles.weatherRow}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <WeatherCard />
          <WeatherCard />
          <WeatherCard />
        </ScrollView>

        {/* scrollableSection */}
        <View style={styles.section}>
          {/* Section Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Recent Outfits</Text>
            <Pressable onPress={() => console.log("view more pressed")}>
              <Text style={styles.pressableText}>View More</Text>
            </Pressable>
          </View>

          {/* Section Content */}
          <ScrollView
            contentContainerStyle={styles.sectionContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <BoxDetails />
            <BoxDetails />
            <BoxDetails />
          </ScrollView>
        </View>

        {/* scrollableSection */}
        <View style={styles.section}>
          {/* Section Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Favorite Outfits</Text>
            <Pressable onPress={() => console.log("view more pressed")}>
              <Text style={styles.pressableText}>View More</Text>
            </Pressable>
          </View>

          {/* Section Content */}
          <ScrollView
            contentContainerStyle={styles.sectionContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <BoxDetails />
            <BoxDetails />
            <BoxDetails />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeScreenWrapper: {
    flex: 1,
    backgroundColor: colors.main,
  },
  screen: {
    // minHeight: "100%",
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0)  },
  weatherRow: {
    gap: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  section: {
    marginVertical: 10,
  },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  pressableText: {
    color: colors.accent,
    // textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "700",
  },
  sectionContent: {
    gap: 10.5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  outfitItem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#bbbbbb",
    elevation: 4,
  },
});

export default HomeScreen;
