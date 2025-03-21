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
import BoxDetails from "../components/BoxDetails";
import colors from "../assets/colors/colors";

const { height, width } = Dimensions.get("screen");
function HomeScreen() {
  const navigation = useNavigation();
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
          snapToInterval={348}
          decelerationRate="fast"
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

        {/* <Pressable onPress={() => navigation.navigate("Outfits")}>
          <Text style={styles.generateOutfitText}>Generate New</Text>
        </Pressable> */}
        <View style={styles.plusButton}>
          <Image
            style={styles.plusIcon}
            source={require("../assets/images/add - shitBrown .png")}
          />
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
    paddingTop: 15 + (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    position: "static",
  },
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
    gap: 11.5,
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
  generateOutfitText: {
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "GlacialIndifference-Italic",
    textDecorationLine: "underline",
    padding: 10,
    color: colors.accent,
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
});

export default HomeScreen;
