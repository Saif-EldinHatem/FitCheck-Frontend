import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
} from "react-native";

import colors from "../assets/colors/colors";
import ItemCard from "../components/ItemCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { outfitsDummyData } from "../store/data";

const dummyData = [
  { id: "1", image: require("../assets/images/clothes/black-tshirt.png") },
  { id: "2", image: require("../assets/images/clothes/grayPants.webp") },
  { id: "3", image: require("../assets/images/clothes/beanie.png") },
  { id: "4", image: require("../assets/images/clothes/black-converse.png") },
  { id: "5", image: require("../assets/images/clothes/sunglasses.png") },
];

function OutfitDetailsScreen({ route }) {
  const [data, setData] = useState(dummyData);
  const [editMode, setEditMode] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const outfitItems = outfitsDummyData.find(
    (item) => item.outfitId === route.params?.outfitId
  ).items;

  const navigation = useNavigation();
  function handleItemPress(id) {
    if (selectedList.includes(id)) {
      setSelectedList((prev) => prev.filter((itemId) => itemId != id));
    } else {
      setSelectedList((prev) => [...prev, id]);
    }
  }

  function handleEditMode() {
    setEditMode((prevEditMode) => {
      if (prevEditMode == true) {
        setSelectedList([]);
      }
      return !prevEditMode;
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Items</Text>
        <View style={styles.editButton}>
          <Pressable
            style={styles.editButtonInner}
            // android_ripple={{ color: "rgba(0,0,0,0.1)" }}
            onPress={handleEditMode}
          >
            {editMode == false ? (
              <Text style={styles.editText}>Edit</Text>
            ) : (
              <Text style={styles.editText}>Cancel</Text>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.grid}>
          {outfitItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <ItemCard
                img={item.image}
                onPress={() => {
                  navigation.navigate("ItemScreen", { itemId: item.id });
                }}
                onLongPress={() => {
                  handleEditMode();
                  setSelectedList((prev) => [...prev, item.id]);
                }}
              />
              {item.id != "last" && editMode == true && (
                <Pressable
                  style={styles.selectArea}
                  onPress={handleItemPress.bind(this, item.id)}
                >
                  <View style={styles.selectIcon}>
                    <Ionicons
                      name={
                        selectedList.includes(item.id)
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={21}
                      color={colors.accent}
                    />
                  </View>
                </Pressable>
              )}
            </View>
          ))}

          {!editMode && (
            <View style={styles.itemContainer}>
              <Card>
                <Ionicons name="add" size={60} />
              </Card>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingTop: 18,
    alignItems: "center",
  },
  container: {
    flexGrow: 1,
    paddingTop: 18,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
    // backgroundColor:"green",
  },
  headerTitle: {
    fontFamily: "inter-medium",
    fontSize: 24,
  },
  editButtonInner: {
    height: 36,
    padding: 5,
    justifyContent: "center",
  },
  editText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "black",
    fontFamily: "inter-medium",
    fontSize: 18,
  },

  grid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 15,
  },
  selectArea: {
    position: "absolute",
    inset: 0,
  },
  selectIcon: {
    position: "absolute",
    right: 4,
    top: 4,
  },
});

export default OutfitDetailsScreen;
