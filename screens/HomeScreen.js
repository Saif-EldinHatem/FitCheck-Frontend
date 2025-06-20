import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import WeatherCard from "../components/WeatherCard";
import OutfitCard from "../components/OutfitCard";
import colors from "../assets/colors/colors";
import { useLocationStore } from "../store/locationStore";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useOutfitStore } from "../store/outfitStore";
import { useWardrobeStore } from "../store/wardrobeStore";

const { height, width } = Dimensions.get("screen");
function HomeScreen() {
  const [favoriteOutfits, setFavoriteOutfits] = useState([]);
  const [recentOutfits, setRecentOutfits] = useState([]);
  const { city, getLocation, coords } = useLocationStore();
  const FirstName = useUserStore((state) => state.FirstName);

  const setWardrobeItems = useWardrobeStore((state) => state.setWardrobeItems);
  const setOutfits = useOutfitStore((state) => state.setOutfits);
  const getFavoriteOutfits = useOutfitStore(
    (state) => state.getFavoriteOutfits
  );

  const getRecentOutfits = useOutfitStore((state) => state.getRecentOutfits);

  useEffect(() => {
    const checkImageExists = async (imageUri) => {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      return fileInfo.exists;
    };

    async function downloadImage(imagePath, status) {
      try {
        const directoryPath = FileSystem.documentDirectory + "wardrobe/";
        const fileName = imagePath.split("\\").pop(); // Extract only the file name
        const localUri = directoryPath + fileName; // Append the file name to the directory path
        const normalizedUri = localUri.replace(/\\/g, "/"); // Normalize the path

        // Ensure the directory exists
        const dirInfo = await FileSystem.getInfoAsync(directoryPath);
        if (!dirInfo.exists) {
          console.log("Directory does not exist, creating:", directoryPath);
          await FileSystem.makeDirectoryAsync(directoryPath, {
            intermediates: true,
          });
        }

        const exists = await checkImageExists(normalizedUri); // Pass normalizedUri here
        if (exists) {
          // console.log("Image already exists: ", normalizedUri);
          return normalizedUri;
        }

        if (status == 2) {
          return null;
        }
        const res = await FileSystem.downloadAsync(
          process.env.EXPO_PUBLIC_API_HOST + "/asset?file=" + imagePath,
          normalizedUri
        );
        console.log("Image Downloaded to: ", res.uri);
        return res.uri;
      } catch (error) {
        console.error("Error downloading image: ", error);
        return null;
      }
    }

    async function handleFetchWardrobe() {
      console.log(process.env.EXPO_PUBLIC_API_HOST);
      try {
        const res = await fetch(
          process.env.EXPO_PUBLIC_API_HOST + "/wardrobe",
          {
            method: "GET",
          }
        );

        const data = await res.json();
        if (data.Result == false) {
          console.log("Error", data.Errors[0]);
        } else {
          const itemsWithLocalImages = await Promise.all(
            data.Items.map(async (item) => {
              const localImageUri = await downloadImage(
                item.ImagePath,
                item.Status
              );

              return { ...item, localImageUri };
            })
          );
          setWardrobeItems(itemsWithLocalImages);
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleFetchWardrobe();
    getLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function handleFetchOutfits() {
        try {
          const res = await fetch(
            process.env.EXPO_PUBLIC_API_HOST + "/wardrobe/outfits",
            {
              method: "GET",
            }
          );

          const data = await res.json();
          if (data.Result == false) {
            console.log("Error", data.Errors[0]);
          } else {
            const groupedOutfits = Object.values(
              data.Outfits.reduce((acc, curr) => {
                const { OutfitID, ItemID, Favorite } = curr;
                if (!acc[OutfitID]) {
                  acc[OutfitID] = {
                    OutfitID,
                    ItemIDs: [],
                    Favorite,
                  };
                }
                acc[OutfitID].ItemIDs.push(ItemID);
                return acc;
              }, {})
            );
            console.log("Hi");

            setOutfits(groupedOutfits);
          }
        } catch (error) {
          console.error(error);
        }
      }

      handleFetchOutfits();
      setFavoriteOutfits(() => getFavoriteOutfits());
      setRecentOutfits(() => getRecentOutfits());
    }, [])
  );

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
          // decelerationRate="fast"
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
            {recentOutfits.map(({ OutfitID }) => (
              <View style={styles.cardWrapper} key={OutfitID}>
                <OutfitCard
                  OutfitID={OutfitID}
                  onPress={() => navigation.push("OutfitDetails", { OutfitID })}
                />
              </View>
            ))}
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
            {favoriteOutfits.map(({ OutfitID }) => (
              <View style={styles.cardWrapper} key={OutfitID}>
                <OutfitCard
                  OutfitID={OutfitID}
                  onPress={() => navigation.push("OutfitDetails", { OutfitID })}
                />
              </View>
            ))}
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
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
