import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import colors from "../assets/colors/colors";
import CustomBottomSheet from "../components/CustomBottomSheet";
import { filtersData, itemsDummyData } from "../store/data";
import { Ionicons } from "@expo/vector-icons";
import ProcessingScreen from "../components/ProcessingScreen";
import CollapsibleRow from "../components/CollapsibleRow";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useWardrobeStore } from "../store/wardrobeStore";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

function ItemScreen({ route }) {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const item = wardrobeItems.find(
    (item) => item.ItemID === route.params.itemId
  );
  const [itemName, setItemName] = useState(item.ItemName);
  const [brandName, setBrandName] = useState(item.BrandName);
  const [tags, setTags] = useState({
    Occasion: [],
    Category: [],
    Color: [],
    Season: [],
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) =>
        isEdited ? (
          <Pressable onPress={handleSave}>
            <Text style={styles.saveChanges}>Save</Text>
          </Pressable>
        ) : null,
    });
  }, [isEdited, itemName, brandName, tags]);

  const handleSelectTag = (filterGroup, updatedTags) => {
    setTags((prev) => ({ ...prev, [filterGroup]: updatedTags || [] }));
    setIsEdited(true);
  };

  const fillTags = () => {
    var newtags = {
      Occasion: [],
      Category: [],
      Color: [],
      Season: [],
    };

    item.Tags?.forEach(({ Class, Tag }) => {
      if (newtags[Class]) {
        newtags[Class].push(Tag);
      }
    });
    setTags(newtags);
  };

  useEffect(() => {
    console.log("Brand Name: " + item.BrandName);

    fillTags();
  }, []);

  const handleSave = async () => {
    const Tags = Object.entries(tags)
      .map(([Class, Tags]) => Tags.map((Tag) => ({ Class, Tag })))
      .flat();

    console.log("itemName: " + itemName);

    console.log(process.env.EXPO_PUBLIC_API_HOST);
    try {
      const res = await fetch(
        process.env.EXPO_PUBLIC_API_HOST + "/wardrobe/modify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ItemID: item.ItemID,
            ItemName: itemName,
            BrandName: brandName,
            Tags: Tags,
          }),
        }
      );
      console.log("route id: " + route.params.itemId);
      console.log("fetched: " + item.ItemID);
      console.log(
        "JSON.Stringify: " + JSON.stringify({ ItemID: route.params.itemId })
      );
      const data = await res.json();
      if (data.Result == false) {
        console.log("Error", data.Errors[0]);
      } else {
        // navigation.pop();
        setIsEdited(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    console.log(process.env.EXPO_PUBLIC_API_HOST);
    try {
      const res = await fetch(
        process.env.EXPO_PUBLIC_API_HOST + "/wardrobe/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ItemID: route.params.itemId }),
        }
      );
      console.log("item id: " + route.params.itemId);
      console.log(
        "JSON.Stringify: " + JSON.stringify({ ItemID: route.params.itemId })
      );
      const data = await res.json();
      if (data.Result == false) {
        console.log("Error", data.Errors[0]);
      } else {
        FileSystem.deleteAsync(item.localImageUri);
        console.log("deleted: " + item.localImageUri);

        navigation.pop();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = () => {
    if (isModalOpen) {
      bottomSheetModalRef.current?.dismiss();
    } else {
      bottomSheetModalRef.current?.present();
    }
    setIsModalOpen((prev) => !prev);
  };

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    console.log(item);
    if (item.Status == 2) {
      setIsProcessing(true);
    } else {
      setIsProcessing(false);
    }
  }, [item.Status]);

  const bottomSheetModalRef = useRef(null);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {isProcessing && <ProcessingScreen />}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "red",
            marginTop: 32,
          }}
        >
          <Ionicons name="chevron-back" size={28} />
          <Text style={styles.pageTitle}>Item</Text>
          <Pressable onPress={handleSave}>
            <Text style={styles.saveChanges}>Save</Text>
          </Pressable>
        </View> */}
        {/* <View style={styles.underline} /> */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.localImageUri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.brandWrapper}>
          <TextInput
            value={brandName}
            placeholder="Brand Name"
            style={styles.itemBrand}
            onChangeText={(text) => {
              setBrandName(text);
              setIsEdited(true);
            }}
          />
          {/* <Text style={styles.itemBrand}>{item.BrandName || "Brand Name"}</Text> */}
          {/* <Ionicons name="pencil-outline" size={16} /> */}
          <Image
            source={require("../assets/images/tools/pencil-outline.png")}
            style={{ height: 13, width: 13 }}
          />
        </View>
        <View style={styles.itemNameWrapper}>
          <TextInput
            value={itemName}
            placeholder="Item Name"
            placeholderTextColor={"#000"}
            style={styles.itemName}
            onChangeText={(text) => {
              setItemName((prev) => text);
              setIsEdited(true);
            }}
          />
          {/* <Text style={styles.itemName}>{item.ItemName || "Item Name"}</Text> */}

          <Image
            source={require("../assets/images/tools/pencil-outline.png")}
            style={{ height: 15, width: 15 }}
          />
        </View>

        <View style={styles.alterTagsArea}>
          {filtersData.map((filter) => (
            <CollapsibleRow
              key={filter.id}
              title={filter.filterGroup}
              list={tags[filter.filterGroup]}
              updateList={handleSelectTag}
            />
          ))}
        </View>
        <Pressable style={styles.deleteButton} onPress={toggleModal}>
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </Pressable>

        <CustomBottomSheet
          ref={bottomSheetModalRef}
          onSheetChanges={handleSheetChanges}
          backgroundColor={"#FFF3E3"}
        >
          <View style={styles.bottomSheetText}>
            <Text style={styles.areYouSureText}>Are you sure?</Text>
            <Text style={styles.aboutToDeleteText}>You're about to delete</Text>
            <Text style={styles.bottomSheetItemName}>
              {item.ItemName || "Item Name"}
            </Text>
            <Text style={styles.aboutToDeleteText}>
              This action cannot be undone.
            </Text>
          </View>
          <View style={styles.bottomSheetDeleteButtonContainer}>
            <Pressable
              style={styles.bottomSheetDeleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.bottomSheetDeleteButtonText}>
                Yes, Delete
              </Text>
            </Pressable>
          </View>
          <View style={styles.bottomSheetCancelButtonContainer}>
            <Pressable
              style={styles.bottomSheetCancelButton}
              onPress={toggleModal}
            >
              <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </CustomBottomSheet>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  alterTagsArea: {
    marginTop: 30,
    gap: 20,
  },
  container: {
    flex: 1,
    // padding: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.main,
  },
  pageTitle: {
    fontSize: 26,
    fontFamily: "higuen",
    color: "#000",
    textAlign: "center",
    paddingBottom: 0,
    textDecorationLine: "none", // Remove default underline
    position: "relative",
  },
  saveChanges: {
    fontFamily: "inter",
    fontSize: 18,
    // backgroundColor: "green",
  },
  underline: {
    height: 1, // Thickness of the underline
    backgroundColor: "#000", // Color of the underline
    width: "17%", // Adjust width as needed
    alignSelf: "center",
    marginTop: 0, // Distance between text and underline
  },
  tagsArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 20,
  },
  tag: {
    minWidth: 100,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 7,
    borderRadius: 6,
    alignItems: "center",
  },
  tagIcon: {
    width: 22,
    aspectRatio: 1,
  },
  tagTitle: {
    fontFamily: "roboto-medium",
    fontSize: 16,
  },
  bottomSheetText: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.mainDark,
    borderRadius: 10,
    marginBottom: 20,
  },
  areYouSureText: {
    fontSize: 27,
    fontFamily: "higuen",
    color: "#000",
    textAlign: "center",
    paddingBottom: 25,
  },
  aboutToDeleteText: {
    fontSize: 14,
    fontFamily: "inter",
    color: "#000",
    textAlign: "center",
    paddingTop: 10,
  },
  bottomSheetItemName: {
    fontSize: 14,
    fontFamily: "inter-bold",
    color: "#000",
    textAlign: "center",
  },
  imageContainer: {
    backgroundColor: "white",
    aspectRatio: 1,
    width: "100%",
    borderRadius: 5,
    elevation: 4,
  },
  image: {
    objectFit: "contain",
    height: "100%",
    width: "100%",
  },
  brandWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    // backgroundColor: "green",
    marginTop: 16,
  },
  itemBrand: {
    fontSize: 16,
    color: "#777",
    fontFamily: "inter",
    padding: 0,
  },
  itemNameWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  itemName: {
    fontSize: 22,
    color: "#000",
    fontFamily: "inter-medium",
    padding: 0,
    // backgroundColor: "red",
  },
  deleteButtonText: {
    fontFamily: "inter-semibold",
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#AC3434",
    textDecorationLine: "underline",
  },

  bottomSheetDeleteButtonContainer: {
    height: 53,
    // marginTop: 15,
    backgroundColor: "#EB4141",
    elevation: 1,
    borderRadius: 12,
    overflow: "hidden",
    // width: "100%",
  },
  bottomSheetDeleteButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 120,
  },
  bottomSheetDeleteButtonText: {
    fontFamily: "poppins-semibold",
    color: "white",
    fontSize: 16,
  },
  bottomSheetCancelButtonContainer: {
    height: 53,
    // marginTop: 15,
    backgroundColor: colors.secondary,
    elevation: 1,
    borderRadius: 12,
    overflow: "hidden",
    // width: "100%",
  },
  bottomSheetCancelButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 120,
  },
  bottomSheetCancelButtonText: {
    fontFamily: "poppins-semibold",
    color: "white",
    fontSize: 16,
  },
});

export default ItemScreen;
