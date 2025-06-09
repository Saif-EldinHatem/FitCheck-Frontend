import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList,
  Button,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

import CollapsibleRow from "../components/CollapsibleRow";
import ItemCard from "../components/ItemCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import colors from "../assets/colors/colors";
import { itemsDummyData, filtersData } from "../store/data";
import { RefreshControl } from "react-native-gesture-handler";
import { useWardrobeStore } from "../store/wardrobeStore";
import { useFilterStore } from "../store/FilterationStore";

function WardrobeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [checkPending, setCheckPending] = useState(false);
  const [filterdList, setFilteredList] = useState([]);
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const setWardrobeItems = useWardrobeStore((state) => state.setWardrobeItems);
  const filters = useFilterStore((state) => state.filters);
  const updateFilter = useFilterStore((state) => state.updateFilter);
  const clearFilters = useFilterStore((state) => state.clearFilters);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = (index) => {
    console.log("handleSheetChanges", index);
    if (index == -1) {
      console.log("Filters: " + Object.values(filters).flat());

      setIsFiltered(Object.values(filters).flat().length != 0);
    }
  };

  const checkImageExists = async (imageUri) => {
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    return fileInfo.exists;
  };

  async function deleteWardrobeDirectory() {
    const directoryPath = FileSystem.documentDirectory + "wardrobe/";

    try {
      const dirInfo = await FileSystem.getInfoAsync(directoryPath);

      if (dirInfo.exists) {
        console.log("Deleting directory:", directoryPath);
        await FileSystem.deleteAsync(directoryPath, { idempotent: true });
        console.log("Directory deleted successfully.");
      } else {
        console.log("Directory does not exist, nothing to delete.");
      }
    } catch (error) {
      console.error("Error deleting directory:", error);
    }
  }

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

  async function handleFetchData() {
    console.log(process.env.EXPO_PUBLIC_API_HOST);
    try {
      const res = await fetch(process.env.EXPO_PUBLIC_API_HOST + "/wardrobe", {
        method: "GET",
      });

      const data = await res.json();
      if (data.Result == false) {
        console.log("Error", data.Errors[0]);
      } else {
        // console.log("tags", data?.["Items"]);

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
        setCheckPending(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function listDirectories() {
    try {
      const rootPath = FileSystem.documentDirectory + "wardrobe/";
      const items = await FileSystem.readDirectoryAsync(rootPath);

      console.log("Items in root directory:", items);

      // Check which items are directories
      for (const item of items) {
        const itemPath = rootPath + item;
        const itemInfo = await FileSystem.getInfoAsync(itemPath);

        if (itemInfo.isDirectory) {
          console.log("Directory:", itemPath);
        } else {
          console.log("File:", itemPath);
        }
      }
    } catch (error) {
      console.error("Error listing directories:", error);
    }
  }

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    setFilteredList(wardrobeItems);
  }, [wardrobeItems]);

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  useEffect(() => {
    applyFilter();
  }, [wardrobeItems, filters, isFiltered]);

  useEffect(() => {
    if (checkPending) {
      const interval = setInterval(() => {
        console.log("Checking for updates...");
        handleFetchData();
      }, 3000); // Call handleFetchData every 5 seconds

      // Cleanup the interval when checkPending becomes false or component unmounts
      return () => clearInterval(interval);
    }
  }, [checkPending]);

  useEffect(() => {
    // Automatically set checkPending to false if no items have Status == 2
    const hasPendingStatus = wardrobeItems.some((item) => item.Status === 2);

    if (!hasPendingStatus) {
      setCheckPending(false);
    }
  }, [wardrobeItems]);

  function applyFilter() {
    const selectedFilters = Object.values(filters).flat();
    var newItems = [];
    console.log("selectedFilters: ", selectedFilters);
    if (selectedFilters.length === 0) {
      setFilteredList(wardrobeItems);
      return;
    }
    newItems = wardrobeItems.filter((item) => {
      return item?.Tags?.some(({ Tag }) => selectedFilters.includes(Tag));
    });
    setFilteredList(newItems);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.header}>
        <View style={styles.searchbarWrapper}>
          <TextInput
            style={styles.inputField}
            placeholder="Search"
            cursorColor={colors.accent}
          />
        </View>
        <View
          style={[
            styles.iconWrapper,
            isFiltered && { backgroundColor: "#5B6962" },
          ]}
        >
          <Pressable
            style={styles.iconWrapperInner}
            onPress={() => {
              handlePresentModalPress();
            }}
          >
            {isFiltered ? (
              <Ionicons name="funnel-outline" size={24} color={"white"} />
            ) : (
              <Ionicons name="funnel-outline" size={24} color={"black"} />
            )}
          </Pressable>
        </View>
      </View>

      {isFiltered && (
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            Filtered: {Object.values(filters).flat(2).join(", ")}
          </Text>
          {/* {Object.values(filters)
            .flat(2)
            .map((option, index) => {
              return (
                <Text key={option + "-" + index} style={styles.subHeaderText}>
                  {option},
                </Text>
              );
            })} */}
        </View>
      )}

      <FlatList
        style={{ width: "100%" }}
        data={filterdList}
        keyExtractor={(item) => item.ItemID}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleFetchData} />
        }
        refreshing={true}
        numColumns={2}
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
          <View style={styles.itemCard}>
            <View style={styles.imageBox}>
              <ItemCard
                img={{
                  uri: item.localImageUri,
                }}
                onPress={() =>
                  navigation.navigate("ItemScreen", { itemId: item.ItemID })
                }
              />
            </View>
            <Text style={styles.itemBrand}>{item.BrandName || "Brand "}</Text>
            <Text style={styles.itemName}>{item.ItemName || "Item Name"}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Object.values(filters).flat().length > 0 ? (
              <Pressable
                onPress={() => {
                  console.log("here");
                  clearFilters();
                }}
              >
                <Text>no items found. Clear filter</Text>
              </Pressable>
            ) : (
              <Text>Wardrobe Empty</Text>
            )}
          </View>
        }
      />

      <View style={styles.floatingButton}>
        <Pressable
          style={styles.floatingButtonInner}
          onPress={() => navigation.navigate("UploadItemScreen")}
        >
          <Ionicons name="camera-outline" size={30} color={"#5B6962"} />
        </Pressable>
      </View>
      <CustomBottomSheet
        ref={bottomSheetModalRef}
        onSheetChanges={handleSheetChanges}
      >
        <View style={styles.bottomSheetHeader}>
          {Object.values(filters).flat().length > 0 && (
            <Pressable
              onPress={() => {
                clearFilters();
              }}
            >
              <Text style={{ fontFamily: "inter", color: colors.pineGreen }}>
                Clear
              </Text>
              {/* <Ionicons name="close" size={28} /> */}
            </Pressable>
          )}
        </View>
        {filtersData.map((filter) => (
          <CollapsibleRow
            key={filter.id}
            title={filter.filterGroup}
            list={filters[filter.filterGroup]}
            updateList={updateFilter}
          />
        ))}
      </CustomBottomSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingTop: 10,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
    height: 38,
    // backgroundColor: "green",
  },
  searchbarWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingVertical: 3,
    backgroundColor: "#EBDFCF",
    borderRadius: 8,
    elevation: 6,
    height: "100%",
    justifyContent: "center",
  },
  inputField: {
    fontFamily: "inter",
    fontSize: 18,
    height: 32,
    // lineHeight: 20,
    paddingVertical: 0,
    color: "#00000080",
  },
  iconWrapper: {
    overflow: "hidden",
    borderRadius: 8,
    height: "100%",
    // elevation: 6,
  },
  iconWrapperInner: {
    height: "100%",
    aspectRatio: 1,
    // height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 30,
    gap: 4,
  },
  subHeaderText: {
    fontFamily: "inter",
    color: "#6B6B6B",
    fontSize: 12,
  },
  itemCard: {
    width: "48%",
    gap: 3,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 1,
  },
  itemBrand: {
    fontFamily: "inter-medium",
    fontSize: 12,
    // lineHeight: 20,
    color: "#878787",
    paddingLeft: 3,
  },
  itemName: {
    fontFamily: "inter-medium",
    fontSize: 15,
    lineHeight: 16,
    paddingLeft: 3,

    // backgroundColor: "green",
  },
  floatingButton: {
    overflow: "hidden",
    borderRadius: "50%",
    elevation: 2,
    position: "absolute",
    right: 32,
    bottom: 45,
  },
  floatingButtonInner: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainDark,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginBottom: 20,
    height: 20,
  },
});

export default WardrobeScreen;
