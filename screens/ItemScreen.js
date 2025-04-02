import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";

import colors from "../assets/colors/colors";
import CustomBottomSheet from "../components/CustomBottomSheet";
import { filtersData, itemsDummyData } from "../store/data";
import { Ionicons } from "@expo/vector-icons";
import ProcessingScreen from "../components/ProcessingScreen";
import CollapsibleRow from "../components/CollapsibleRow";
import { ScrollView } from "react-native-gesture-handler";
import { useWardrobeStore } from "../store/wardrobeStore";

function ItemScreen({ route }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const item = wardrobeItems.find((item) => item.ItemID === route.params.itemId);

  const handleDelete = () => {
    toggleModal();
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
    }
  }, []);

  const bottomSheetModalRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {isProcessing && <ProcessingScreen />}
        <Text style={styles.pageTitle}>Item</Text>
        <View style={styles.underline} />
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                process.env.EXPO_PUBLIC_API_HOST +
                "/asset?file=" +
                item.ImagePath,
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.itemBrand}>{item.BrandName || "Unknown"}</Text>
        <Text style={styles.itemName}>{item.ItemName || "Unknown"}</Text>
        <View style={styles.alterTagsArea}>
          {filtersData.map((filter) => (
            <CollapsibleRow key={filter.id} title={filter.filterGroup} />
          ))}
        </View>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
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
            <Text style={styles.bottomSheetItemName}>Black T-shirt</Text>
            <Text style={styles.aboutToDeleteText}>
              This action cannot be undone.
            </Text>
          </View>
          <View style={styles.bottomSheetDeleteButtonContainer}>
            <Pressable style={styles.bottomSheetDeleteButton}>
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
    </SafeAreaView>
    // <SafeAreaView style={styles.container}>
    //   {isProcessing && <ProcessingScreen />}
    //   <Text style={styles.pageTitle}>Item</Text>
    //   <View style={styles.underline} />
    //   <View style={styles.imageContainer}>
    //     <Image source={item.image} style={styles.image} />
    //   </View>
    //   <Text style={styles.itemBrand}>{item.brand}</Text>
    //   <Text style={styles.itemName}>{item.name}</Text>
    //   <View style={styles.tagsArea}>
    //     <View style={styles.tag}>
    //       <Image
    //         source={require("../assets/images/icons/casual.png")}
    //         style={styles.tagIcon}
    //       />
    //       <Text style={styles.tagTitle}>Casual</Text>
    //     </View>
    //     <View style={styles.tag}>
    //       <Image
    //         source={require("../assets/images/icons/summer.png")}
    //         style={styles.tagIcon}
    //       />
    //       <Text style={styles.tagTitle}>Summer</Text>
    //     </View>

    //     <View style={styles.tag}>
    //       <Image
    //         source={require("../assets/images/icons/t-shirt.png")}
    //         style={styles.tagIcon}
    //       />
    //       <Text style={styles.tagTitle}>T-shirt</Text>
    //     </View>

    //     <View style={styles.tag}>
    //       <View
    //         style={{ width: 17, aspectRatio: 1, backgroundColor: "black" }}
    //       />
    //       <Text style={styles.tagTitle}>Black</Text>
    //     </View>

    //     <View style={[styles.tag, { backgroundColor: "#EBDFCF" }]}>
    //       <Ionicons name="add-sharp" size={20} />
    //       <Text style={styles.tagTitle}>Add Tag</Text>
    //     </View>
    //   </View>
    // <Pressable onPress={handleDelete} style={styles.deleteButton}>
    //   <Text style={styles.deleteButtonText}>Delete Item</Text>
    // </Pressable>
    // <CustomBottomSheet
    //   ref={bottomSheetModalRef}
    //   onSheetChanges={handleSheetChanges}
    //   backgroundColor={"#FFF3E3"}
    // >
    //   <View style={styles.bottomSheetText}>
    //     <Text style={styles.areYouSureText}>Are you sure?</Text>
    //     <Text style={styles.aboutToDeleteText}>You're about to delete</Text>
    //     <Text style={styles.bottomSheetItemName}>Black T-shirt</Text>
    //     <Text style={styles.aboutToDeleteText}>
    //       This action cannot be undone.
    //     </Text>
    //   </View>
    //   <View style={styles.bottomSheetDeleteButtonContainer}>
    //     <Pressable style={styles.bottomSheetDeleteButton}>
    //       <Text style={styles.bottomSheetDeleteButtonText}>Yes, Delete</Text>
    //     </Pressable>
    //   </View>
    //   <View style={styles.bottomSheetCancelButtonContainer}>
    //     <Pressable
    //       style={styles.bottomSheetCancelButton}
    //       onPress={toggleModal}
    //     >
    //       <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
    //     </Pressable>
    //   </View>
    // </CustomBottomSheet>
    // </SafeAreaView>
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
    marginTop: 16,
    textAlign: "center",
    paddingBottom: 0,
    paddingTop: 16,
    textDecorationLine: "none", // Remove default underline
    position: "relative",
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
    marginTop: 30,
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
  itemBrand: {
    fontSize: 16,
    color: "#777",
    fontFamily: "inter",
    paddingTop: 17,
  },
  itemName: {
    fontSize: 24,
    color: "#000",
    fontFamily: "inter-med",
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
