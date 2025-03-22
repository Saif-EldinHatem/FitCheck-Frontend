import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Card from "./Card";

function OutfitCard({ onPress }) {
  return (
    <View style={styles.container}>
      <Card onPress={onPress}>
        <View style={styles.leftContainer}>
          <View style={styles.smallBox}>
            <Image
              style={styles.img}
              source={require("../assets/images/clothes/black-tshirt.png")}
            />
          </View>
          <View style={styles.smallBox}>
            <Image
              style={styles.img}
              source={require("../assets/images/clothes/jordans.png")}
            />
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Image
            style={styles.img}
            source={require("../assets/images/clothes/grayPants.webp")}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 160,
  },
  leftContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  rightContainer: {
    flex: 1,
  },
  smallBox: {
    flex: 1,
  },
  img: {
    objectFit: "cover",
    height: "100%",
    width: "100%,",
  },
});

export default OutfitCard;
