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

function ItemDetailScreen() {
  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => console.log("Item deleted") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} >
      {/* Hide the status bar */}
      {/* <StatusBar /> */}
      <TopBarItemDetails title="Item Details" />

      {/* Product Image */}
      <Image
        source={require("../assets/images/blueTshirt.jpg")}
        style={styles.image}
      />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.brand}>H&M</Text>
        <Text style={styles.title}>Blue T-shirt</Text>
        <Text style={styles.category}>Summer | Casual | T-shirt</Text>
        <Text style={styles.color}>Color: Blue</Text>
      </View>

      {/* Delete Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleDelete}
          android_ripple={{ color: "rgba(0,0,0,0,1)" }}
          style={styles.button}
        >
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.main,
  },
  image: {
    height: "50%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    elevation: 6,
  },
  detailsContainer: {
    marginTop: 16,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  color: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    width: "100%",
    overflow:"hidden",
    backgroundColor: "#ff4444",
    elevation: 6,
  },
  button:{
    padding: 16,
    alignItems: "center",
    justifyContent: "center",

  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ItemDetailScreen;
