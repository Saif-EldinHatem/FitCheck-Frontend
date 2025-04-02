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
import { useNavigation } from "@react-navigation/native";

import CollapsibleRow from "../components/CollapsibleRow";
import ItemCard from "../components/ItemCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import colors from "../assets/colors/colors";
import { itemsDummyData, filtersData } from "../store/data";
import { RefreshControl } from "react-native-gesture-handler";
import { useWardrobeStore } from "../store/wardrobeStore";

function WardrobeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [wardrobeItems, setWardrobeItems] = useState(itemsDummyData);
  const wardrobeItems = useWardrobeStore((state) => state.wardrobeItems);
  const setWardrobeItems = useWardrobeStore((state) => state.setWardrobeItems);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    setIsModalOpen((prev) => !prev);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

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
        console.log(data.Items);
        setWardrobeItems(data.Items);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleFetchData();
    // setWardrobeItems(itemsDummyData);
  }, []);

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
            isFiltered && { backgroundColor: "#A9A59D" },
          ]}
        >
          <Pressable
            style={styles.iconWrapperInner}
            onPress={() => {
              setIsFiltered((prev) => !prev);
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
            Filterd: Summer, Tops, Bottoms
          </Text>
        </View>
      )}

      <FlatList
        data={wardrobeItems}
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
        contentContainerStyle={{ gap: 15, paddingTop: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.imageBox}>
              <ItemCard
                img={{
                  uri:
                    process.env.EXPO_PUBLIC_API_HOST +
                    "/asset?file=" +
                    item.ImagePath,
                }}
                onPress={() =>
                  navigation.navigate("ItemScreen", { itemId: item.ItemID })
                }
              />
            </View>
            <Text style={styles.itemBrand}>{item.BrandName || "Unknown"}</Text>
            <Text style={styles.itemName}>{item.ItemName || "Unknown"}</Text>
          </View>
        )}
      />

      <View style={styles.floatingButton}>
        <Pressable
          style={styles.floatingButtonInner}
          onPress={() => navigation.navigate("UploadItemScreen")}
        >
          <Ionicons name="camera-outline" size={30} color={colors.accent} />
        </Pressable>
      </View>
      <CustomBottomSheet
        ref={bottomSheetModalRef}
        onSheetChanges={handleSheetChanges}
      >
        {filtersData.map((filter) => (
          <CollapsibleRow key={filter.id} title={filter.filterGroup} />
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
    backgroundColor: "white",
  },
});

export default WardrobeScreen;
