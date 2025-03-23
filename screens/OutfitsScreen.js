import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import colors from "../assets/colors/colors";
import { useEffect, useState } from "react";

import OutfitCard from "../components/OutfitCard";
import { Ionicons } from "@expo/vector-icons";
import { outfitsDummyData } from "../store/data";

function OutfitsScreen() {
  const [isRecent, setIsRecent] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [outfits, setOutfits] = useState(outfitsDummyData);
  const [filteredOutfits, setFilteredOutfits] = useState(outfitsDummyData);

  function handleFiltering() {
    let filteredList;
    if (isRecent == true && isFavorites == true) {
      filteredList = outfits.filter(
        (outfit) => outfit.favorites == true && outfit.recent == true
      );
    } else if (isRecent == true) {
      filteredList = outfits.filter((outfit) => outfit.recent == true);
    } else if (isFavorites == true) {
      filteredList = outfits.filter((outfit) => outfit.favorites == true);
    } else {
      filteredList = outfits;
    }
    setFilteredOutfits(filteredList);
  }

  function toggleFavorite(id) {
    setOutfits((prevOutfits) =>
      prevOutfits.map((outfit) =>
        outfit.outfitId === id
          ? { ...outfit, favorites: !outfit.favorites }
          : outfit
      )
    );
  }

  useEffect(handleFiltering, [isRecent, isFavorites, outfits]);

  return (
    <View style={styles.screen}>
      <View style={styles.filtersBar}>
        <View style={[styles.filter, isRecent && styles.filterSelected]}>
          <Pressable
            style={styles.filterInner}
            onPress={() => setIsRecent((prevIsRecent) => !prevIsRecent)}
          >
            <Text
              style={[styles.filterText, isRecent && styles.filterTextSelected]}
            >
              Recent
            </Text>
          </Pressable>
        </View>
        <View style={[styles.filter, isFavorites && styles.filterSelected]}>
          <Pressable
            style={styles.filterInner}
            onPress={() =>
              setIsFavorites((prevIsFavorites) => !prevIsFavorites)
            }
          >
            <Text
              style={[
                styles.filterText,
                isFavorites && styles.filterTextSelected,
              ]}
            >
              Favorites
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filteredOutfits}
        keyExtractor={(item) => item.outfitId}
        numColumns={2}
        style={{ width: "100%" }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
          width: "100%",
        }}
        contentContainerStyle={{
          gap: 15,
          paddingTop: 12,
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <OutfitCard outfitId={item.outfitId} />
            <Pressable
              style={styles.bookmark}
              onPress={toggleFavorite.bind(this, item.outfitId)}
            >
              {item.favorites ? (
                <Ionicons name="bookmark" size={28} color={colors.accent} />
              ) : (
                <Ionicons name="bookmark-outline" size={28} />
              )}
            </Pressable>
          </View>
        )}
      />
      <View style={styles.bottomButtonContainer}>
        <View style={styles.bottomButton}>
          <Pressable
            style={styles.bottomButtonInner}
            onPress={() => {
              console.log("Generate");
            }}
          >
            <Text style={styles.bottomButtonText}>Generate</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingTop: 5,
    alignItems: "center",
    // backgroundColor:"green",
  },
  filtersBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  filter: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CAC4D0",
    overflow: "hidden",
  },
  filterSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
    elevation: 2,
  },
  filterInner: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    fontFamily: "inter-medium",
    fontSize: 14,
    color: "#49454F",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  filterTextSelected: {
    color: "white",
  },
  cardWrapper: {
    width: "48%",
    aspectRatio: 1,
    position: "relative",
  },
  bookmark: {
    position: "absolute",
    right: 2,
    bottom: -10,
  },
  bottomButtonContainer: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "green",
  },
  bottomButton: {
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  bottomButtonInner: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonText: {
    fontFamily: "inter-semibold",
    fontSize: 24,
    fontStyle: 20,
    color: "white",
  },
});

export default OutfitsScreen;
