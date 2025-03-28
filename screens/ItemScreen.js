import React from "react";
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

function ItemScreen() {
  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => console.log("Item deleted") },
    ]);
  };

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
});

export default ItemScreen;
