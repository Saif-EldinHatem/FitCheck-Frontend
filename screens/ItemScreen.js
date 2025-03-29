import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  Pressable,
} from "react-native";
import colors from "../assets/colors/colors";
import PrimaryButton from "../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBarItemDetails from "../components/TopBarItemDetails";
import CustomBottomSheet from "../components/CustomBottomSheet";


function ItemScreen() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleDelete = () => {
    handlePresentModalPress();
    };

    const handlePresentModalPress = useCallback(() => {
      setIsModalOpen((prev) => !prev);
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChanges", index);
      }, []);

      const bottomSheetModalRef = useRef(null);
    
  
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.pageTitle}>Item</Text>
    <View style={styles.underline} />
    <View style= {styles.imageContainer}>
    <Image
        source={require("../assets/images/clothes/black-tshirt.png")}
        style={styles.image}
      />
      </View>
    <Text style={styles.itemBrand}>H&M</Text>
    <Text style={styles.itemName}>Black T-shirt</Text>
    <Pressable
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </Pressable>

        <CustomBottomSheet
        ref={bottomSheetModalRef}
        onSheetChanges={handleSheetChanges}
        >
            <View style= {styles.bottomSheetText}> 
                <Text style = {styles.areYouSureText}>Are you sure?</Text>
                <Text style = {styles.aboutToDeleteText}>You're about to delete</Text>
                <Text style = {styles.bottomSheetItemName}>Black T-shirt</Text>
                <Text style = {styles.aboutToDeleteText}>This action cannot be undone.</Text>
            </View>
            <View style={styles.bottomSheetDeleteButtonContainer}>
                    <Pressable
                        style={styles.bottomSheetDeleteButton}
                        >
                    <Text style={styles.bottomSheetDeleteButtonText}>Yes, Delete</Text>
                    </Pressable>
            </View>
            <View style={styles.bottomSheetCancelButtonContainer}>
                    <Pressable
                        style={styles.bottomSheetCancelButton}
                        >
                    <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
                    </Pressable>
            </View>
      </CustomBottomSheet>
    
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
        marginTop: 30,
        aspectRatio: 1,
        width: "100%",
        borderRadius: 8,
        elevation: 6,
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
    // backgroundColor: "#FF0000",
    fontFamily: "inter",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#f00",
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
