import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import colors from "../assets/colors/colors";
import FilterPill from "../components/FilterPill";
import Pill from "../components/you screen/Pill";
import OutfitCard from "../components/OutfitCard";

import { outfitsDummyData } from "../store/data";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useWardrobeStore } from "../store/wardrobeStore";

const { width } = Dimensions.get("window");

function GeneratedOutfitScreen({ route }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outfitColors, setOutfitColors] = useState([]);
  const getItem = useWardrobeStore((state) => state.getItem);
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const { suggestions, tags } = route.params;
  // console.log({ tags });
  // console.log("route.params: ", route.params);

  // console.log({ suggestions });

  console.log({ suggestions });

  const generatedOutfits = Object.values(
    suggestions.reduce((acc, { SugID, ItemID }) => {
      if (!acc[SugID]) {
        acc[SugID] = { SugID, items: [] }; // Initialize an array for this SugID if it doesn't exist
      }
      acc[SugID].items.push(
        wardrobeItems.find((item) => item.ItemID === ItemID)
      ); // Add the ItemID to the corresponding SugID array
      return acc;
    }, {})
  );
  console.log(generatedOutfits[0]);

  // console.log("object values", Object.values(groupedData[currentIndex]));

  // const tags = Object.entries(route.params).filter(
  //   ([key, values]) => values !== ""
  // );
  // const generatedOutfits = outfitsDummyData.slice(0, 3);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.max(Math.round(scrollPosition / width));
    if (index !== currentIndex) {
      setCurrentIndex(index);
      console.log("Current index: ", index);
    }
  };

  const getOutfitColors = () => {
    const uniqueColors = [
      ...new Set(
        generatedOutfits[currentIndex]?.items
          .map((item) => item?.Color)
          .filter((color) => color !== undefined)
      ),
    ];
    console.log({ uniqueColors });
    setOutfitColors(uniqueColors);
  };

  useEffect(() => {
    getOutfitColors();
  }, [currentIndex]);

  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      {tags.length != 0 && (
        <View style={styles.tagsSection}>
          <Text style={styles.sectionTitle}>Tags: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillStyles}
          >
            {tags.map((tag, index) => (
              <Pill
                key={`${tag}-${index}`}
                title={tag}
                isSelected={true}
                setIsSelected={() => {}}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.scrollViewWrapper}>
        <ScrollView
          horizontal
          contentContainerStyle={[styles.scrollView, { flexGrow: 1 }]}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={width * 0.9 + 11.5 / 2}
          decelerationRate="fast"
        >
          {generatedOutfits.map((outfit) => {
            console.log("hi", outfit.SugID);

            return (
              <View key={outfit.SugID} style={styles.cardWrapper}>
                <OutfitCard items={outfit?.items} />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.colorsSection}>
        <Text style={styles.sectionTitle}>Colors: </Text>
        {outfitColors.map((color) => (
          <View
            key={`${color}-${currentIndex}`}
            style={[styles.color, { backgroundColor: "#" + color }]}
          />
        ))}
        {/* <View style={[styles.color, { backgroundColor: "#878787" }]} /> */}
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={[
              styles.saveButton,
              {
                backgroundColor: true
                  ? // backgroundColor: generatedOutfits[currentIndex].favorites
                    "black"
                  : colors.accent,
              },
            ]}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            onPress={
              () => console.log("toggle favorites")

              // (generatedOutfits[currentIndex].favorites =
              //   !generatedOutfits[currentIndex].favorites)
            }
          >
            <Text style={styles.buttonText}>
              {generatedOutfits[currentIndex]?.favorites ? "Unsave" : "Save"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.rerunButton}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
          >
            <Text style={styles.buttonText}>Rerun</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => navigation.pop()}>
        <Text style={styles.changePreferencesButton}>
          Change Generation Preferences
        </Text>
      </Pressable>
      <View style={styles.noteWrapper}>
        <Text style={styles.note}>
          Some preferences will be discarded if no wardrobe items match.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingTop: 20,
    alignContent: "center",
  },
  tagsSection: {
    paddingLeft: 16,
    flexDirection: "row",
    gap: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pillStyles: {
    gap: 5,
    paddingVertical: 8,
    alignItems: "center",
    // flexWrap: "wrap",
    paddingRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "black",
    fontFamily: "inter-medium",
  },
  scrollViewWrapper: {
    marginTop: 20,
    marginVertical: 20,
    // backgroundColor: "green",
  },
  scrollView: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 16,
    gap: 11.5,
    // backgroundColor: "green",
  },
  cardWrapper: {
    width: width * 0.9,
    aspectRatio: 1,
  },
  colorsSection: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 16,
  },
  color: {
    width: 27,
    height: 27,
    backgroundColor: "black",
    borderRadius: 12,
    elevation: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  rerunButton: {
    flex: 1,
    backgroundColor: colors.pineGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontFamily: "higuen",
  },
  changePreferencesButton: {
    textAlign: "center",
    lineHeight: 60,
    fontSize: 13,
    color: "#888888",
    fontFamily: "inter",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  noteWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 10,
  },
  note: {
    textAlign: "center",
    lineHeight: 60,
    fontSize: 10,
    color: "#888888",
    fontFamily: "inter",
    marginTop: 55,
  },
});

export default GeneratedOutfitScreen;
