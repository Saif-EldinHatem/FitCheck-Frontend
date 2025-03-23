import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import colors from "../assets/colors/colors";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ItemCard from "../components/ItemCard";

const dummyData = [
  {
    id: "1",
    image: require("../assets/images/clothes/black-tshirt.png"),
    brand: "H&M",
    name: "Black T-Shirt",
  },
  {
    id: "2",
    image: require("../assets/images/clothes/grayPants.webp"),
    brand: "pull & bear",
    name: "Green Pants",
  },
  {
    id: "3",
    image: require("../assets/images/clothes/green-converse.png"),
    brand: "Converse",
    name: "Green Converse",
  },
  {
    id: "4",
    image: require("../assets/images/clothes/beanie.png"),
    brand: "pull & bear",
    name: "Black Beanie",
  },
  {
    id: "5",
    image: require("../assets/images/clothes/sunglasses.png"),
    brand: "Louis Vuitton",
    name: "Sunglasses",
  },
  {
    id: "6",
    image: require("../assets/images/clothes/plaid-shirt.png"),
    brand: "pull & bear",
    name: "Red Plaid Shirt",
  },
  {
    id: "7",
    image: require("../assets/images/clothes/olivegreen-pants.png"),
    brand: "pull & bear",
    name: "Gray Sweatpants",
  },
];

function WardrobeScreen() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [data, setData] = useState(dummyData);
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
            isFiltered && { backgroundColor: colors.accent },
          ]}
        >
          <Pressable
            style={styles.iconWrapperInner}
            onPress={() => setIsFiltered((prev) => !prev)}
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
            Filterd: Summer, Tops, Bottoms
          </Text>
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
          width: "100%",
        }}
        contentContainerStyle={{ gap: 15, paddingTop: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.imageBox}>
              <ItemCard img={item.image} />
            </View>
            <Text style={styles.itemBrand}>{item.brand}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />

      <View style={styles.floatingButton}>
        <Pressable
          style={styles.floatingButtonInner}
          onPress={() => console.log("floating button pressed")}
        >
          <Ionicons name="camera-outline" size={30} color={colors.accent} />
        </Pressable>
      </View>
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
  },
  subHeaderText: {
    fontFamily: "inter",
    color: "#6B6B6B",
    fontSize: 12,
  },
  itemCard: {
    width: "48%",
    gap: 2,
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
    backgroundColor: "white",
  },
});

export default WardrobeScreen;
