import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  Button,
  Pressable,
  Dimensions,
} from "react-native";
import colors from "../assets/colors/colors";

import * as ImagePicker from "expo-image-picker";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { itemsDummyData } from "../store/data";
import { useNavigation } from "@react-navigation/native";

const deviceWidth = Dimensions.get("window").width;

function UploadItemScreen() {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  async function requestPermissions() {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" && galleryStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your camera and gallery."
      );
      return false;
    }

    return true;
  }

  async function openCamera() {
    const hasPermission = requestPermissions();

    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({});

    if (!result.canceled) {
      const image = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName,
        isSelected: true,
      };
      setImages((prev) => [...prev, image]);
    }
  }

  async function openGallery() {
    const hasPermission = requestPermissions();

    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => {
        return {
          uri: asset.uri,
          type: asset.mimeType,
          name: asset.fileName,
          isSelected: true,
        };
      });
      setImages((prev) => [...prev, ...selectedImages]);
    }
  }

  async function handleUpload() {
    console.log(process.env.EXPO_PUBLIC_API_HOST);

    const formData = new FormData();
    console.log(images);
    // formData.append("ItemImages", JSON.stringify(images));
    images.forEach(({ isSelected, ...image }) => {
      if (isSelected) {
        formData.append(`ItemImages`, image);
      }
    });

    try {
      const res = await fetch(
        process.env.EXPO_PUBLIC_API_HOST + "/wardrobe/add",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.Result == false) {
        console.log("Error", data.Errors[0]);
      } else {
        images.forEach((image, index) => {
        var newItem;
          if (image.isSelected) {
            newItem = {
              id: itemsDummyData.length + 1 + index,
              image: { uri: image.uri },
              name: "New Item",
              brand: "processing...",
            };
            itemsDummyData.push(newItem);
          }
        });
        navigation.pop();

        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.gallery}>
        <View style={styles.boxWrapper}>
          <Pressable style={styles.box} onPress={openCamera}>
            <Ionicons name="camera-sharp" size={60} color={"#808080"} />
          </Pressable>
        </View>
        <View style={styles.boxWrapper}>
          <Pressable style={styles.box} onPress={openGallery}>
            <Ionicons name="images-sharp" size={60} color={"#808080"} />
          </Pressable>
        </View>

        {images.map((image, index) => (
          <View key={index} style={styles.boxWrapper}>
            <Pressable
              style={styles.box}
              onPress={() =>
                setImages((prevImages) => {
                  const updatedImages = [...prevImages];
                  updatedImages[index].isSelected =
                    !updatedImages[index].isSelected;
                  return updatedImages;
                })
              }
            >
              <Image
                source={{ uri: image.uri }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <Ionicons
                name={
                  image.isSelected
                    ? "checkmark-circle-sharp"
                    : "ellipse-outline"
                }
                size={24}
                color={colors.accent}
                style={styles.selectIcon}
              />
            </Pressable>
          </View>
        ))}
      </View>
      {/* <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 30,
          left: 15,
        }}
      >
        <PrimaryButton children={"UPLOAD"} onPress={handleUpload} />
      </View> */}
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonTitle}>Upload</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.main,
    paddingVertical: 16,
    alignItems: "center",
  },
  gallery: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 4,
    // backgroundColor: "green",
    columnGap: "1%",
    rowGap: 4,
  },
  boxWrapper: {
    width: "24.25%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  box: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f3f0",
  },
  selectIcon: {
    position: "absolute",
    left: 2,
    top: 2,
  },
  buttonWrapper: {
    width: "95%",
    position: "absolute",
    bottom: 40,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: colors.accent,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
    fontFamily: "inter-semibold",
    fontSize: 18,
  },
});

export default UploadItemScreen;
