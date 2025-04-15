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

const { width } = Dimensions.get("window");

function GeneratedOutfitScreen({ route }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [outfitColors, setOutfitColors] = useState([]);
  const tags = Object.entries(route.params).filter(
    ([key, values]) => values !== ""
  );
  const generatedOutfits = outfitsDummyData.slice(1, 4);

  const [isSaved, setIsSaved] = useState(outfitsDummyData[1].favorites);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.max(Math.round(scrollPosition / width));
    if (index + 1 !== currentIndex) {
      setCurrentIndex(index + 1);
      console.log("Current index: ", index);
    }
  };

  const getOutfitColors = () => {
    const uniqueColors = [
      ...new Set(
        generatedOutfits[currentIndex - 1].items
          .map((item) => item.color)
          .filter((color) => color !== undefined)
      ),
    ];
    console.log(uniqueColors);
    setOutfitColors(uniqueColors);
  };

  useEffect(() => {
    getOutfitColors();
    setIsSaved(outfitsDummyData[currentIndex].favorites);
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
            {tags.map(([key, values]) =>
              key === "theme" ? (
                values.map((value) => (
                  <Pill
                    key={`${key}-${value}`}
                    title={value}
                    isSelected={true}
                    setIsSelected={() => {}}
                  />
                ))
              ) : (
                <Pill
                  key={`${key}-${values}`}
                  title={values}
                  isSelected={true}
                  setIsSelected={() => {}}
                />
              )
            )}
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
          {generatedOutfits.map((outfit) => (
            <View key={outfit.outfitId} style={styles.cardWrapper}>
              <OutfitCard outfitId={outfit.outfitId} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.colorsSection}>
        <Text style={styles.sectionTitle}>Colors: </Text>
        {outfitColors.map((color) => (
          <View
            key={`${color}-${currentIndex}`}
            style={[styles.color, { backgroundColor: color }]}
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
                backgroundColor: isSaved ? "black" : colors.accent,
              },
            ]}
            android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            onPress={() => {
              outfitsDummyData[currentIndex].favorites =
                !outfitsDummyData[currentIndex].favorites;
              setIsSaved(outfitsDummyData[currentIndex].favorites);
            }}
          >
            <Text style={styles.buttonText}>{isSaved ? "Unsave" : "Save"}</Text>
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
