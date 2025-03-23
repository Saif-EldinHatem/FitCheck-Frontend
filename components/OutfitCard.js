import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Card from "./Card";

import { outfitsDummyData } from "../store/data";

function OutfitCard({ outfitId = "101", onPress }) {
  const outfitItems = outfitsDummyData.find(
    (outfit) => outfit.outfitId == outfitId
  ).items;

  return (
    <View style={styles.container}>
      <Card onPress={onPress}>
        <View style={styles.leftContainer}>
          <View style={styles.smallBox}>
            <Image style={styles.img} source={outfitItems[0].image} />
          </View>
          <View style={styles.smallBox}>
            <Image style={styles.img} source={outfitItems[1].image} />
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Image style={styles.img} source={outfitItems[2].image} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%", //160
    width: "100%",
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
