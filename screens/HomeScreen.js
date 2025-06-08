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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import WeatherCard from "../components/WeatherCard";
import OutfitCard from "../components/OutfitCard";
import colors from "../assets/colors/colors";
import { useLocationStore } from "../store/locationStore";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

const { height, width } = Dimensions.get("screen");
function HomeScreen() {
  const { city, getLocation, coords } = useLocationStore();
  const FirstName = useUserStore((state) => state.FirstName);
  useEffect(() => {
    getLocation();
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeScreenWrapper}>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <TopBar />
        <Text style={styles.helloText}>
          Hi {FirstName}, Here's today's weather:{" "}
        </Text>
        {/* Weather Row */}
        <ScrollView
          contentContainerStyle={styles.weatherRow}
          horizontal
          showsHorizontalScrollIndicator={false}
          // snapToInterval={360}
          decelerationRate="fast"
        >
          <WeatherCard />
        </ScrollView>

        {/* scrollableSection */}
        <View style={styles.section}>
          {/* Section Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Recent Outfits</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("OutfitsTab", {
                  screen: "Outfits",
                  params: { isRecent: true, isFavorites: false },
                })
              }
            >
              <Text style={styles.pressableText}>View More</Text>
            </Pressable>
          </View>

          {/* Section Content */}
          <ScrollView
            contentContainerStyle={styles.sectionContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardWrapper}>
              <OutfitCard
                outfitId={"101"}
                onPress={() => navigation.push("OutfitDetails")}
              />
            </View>
            <View style={styles.cardWrapper}>
              <OutfitCard
                outfitId={"101"}
                onPress={() => navigation.push("OutfitDetails")}
              />
            </View>
            <View style={styles.cardWrapper}>
              <OutfitCard
                outfitId={"101"}
                onPress={() => navigation.push("OutfitDetails")}
              />
            </View>
          </ScrollView>
        </View>

        {/* scrollableSection */}
        <View style={styles.section}>
          {/* Section Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Favorite Outfits</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("OutfitsTab", {
                  screen: "Outfits",
                  params: { isRecent: false, isFavorites: true },
                })
              }
            >
              <Text style={styles.pressableText}>View More</Text>
            </Pressable>
          </View>

          {/* Section Content */}
          <ScrollView
            contentContainerStyle={styles.sectionContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardWrapper}>
              <OutfitCard
                outfitId={"101"}
                onPress={() => navigation.push("OutfitDetails")}
              />
            </View>
            <View style={styles.cardWrapper}>
              <OutfitCard
                outfitId={"101"}
                onPress={() => navigation.push("OutfitDetails")}
              />
            </View>
            <View style={styles.cardWrapper}>
              <OutfitCard
                outfitId={"101"}
                onPress={() => navigation.push("OutfitDetails")}
              />
            </View>
          </ScrollView>
        </View>

        {/* <Pressable onPress={() => navigation.navigate("Outfits")}>
          <Text style={styles.generateOutfitText}>Generate New</Text>
        </Pressable> */}
        {/* <View style={styles.plusButton}>
          <Image
            style={styles.plusIcon}
            source={require("../assets/images/add - shitBrown .png")}
          />
        </View> */}
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
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    position: "static",
  },
  weatherRow: {
    gap: 18,
    paddingVertical: 10,
    paddingHorizontal: 19,
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
    gap: 11.5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  cardWrapper: {
    width: "160",
    aspectRatio: 1,
  },
  plusButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8DDCC",
    elevation: 6,
    borderRadius: "50%",
    padding: 4.5,
    position: "absolute",
    // left: 340,
    // top: 740,
    right: 0.05 * width,
    bottom: 0.04 * height,
  },
  plusIcon: {
    height: "100%",
    width: "100%",
  },
  helloText: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 10,
    color: "#49454F",
    fontFamily: "inter-medium",
  },
});

export default HomeScreen;
