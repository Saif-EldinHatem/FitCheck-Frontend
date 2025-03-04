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

import TopBar from "../components/TopBar";
import WeatherCard from "../components/WeatherCard";
import colors from "../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";

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
            <View style={styles.outfitItem}></View>
            <View style={styles.outfitItem}></View>
            <View style={styles.outfitItem}></View>
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
            <View style={styles.outfitItem}></View>
            <View style={styles.outfitItem}></View>
            <View style={styles.outfitItem}></View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeScreenWrapper: {
    flex: 1,
    backgroundColor: colors.main
  },
  screen: {
    // minHeight: "100%",
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
  },
  weatherRow: {
    gap: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    // backgroundColor:"green",
  },
  section: {
    marginVertical: 15,
    // backgroundColor: "red",
  },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  pressableText: {
    color: colors.accent,
    textDecorationLine: "underline",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionContent: {
    gap: 10.5,
    paddingVertical: 10,
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
