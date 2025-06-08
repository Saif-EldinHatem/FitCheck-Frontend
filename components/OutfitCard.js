import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Card from "./Card";

import { outfitsDummyData } from "../store/data";

function OutfitCard({ outfitId, onPress, items = {} }) {
  const [outfitItems, setOutfitItems] = useState();
  useEffect(() => {
    if (outfitId) {
      console.log({ outfitId });
      const outfitItems = outfitsDummyData.find(
        (outfit) => outfit.outfitId == outfitId
      ).items;
      setOutfitItems(outfitItems);
    }
  }, [items, outfitItems]);

  return (
    <View style={styles.container}>
      <Card onPress={onPress}>
        <View style={styles.leftContainer}>
          <View style={styles.smallBox}>
            <Image
              style={styles.img}
              source={
                outfitItems
                  ? outfitItems[0]?.image
                  : { uri: items[2]?.localImageUri }
              }
            />
          </View>
          <View style={styles.smallBox}>
            <Image
              style={styles.img}
              source={
                outfitItems
                  ? outfitItems[1]?.image
                  : { uri: items[0]?.localImageUri }
              }
            />
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Image
            style={styles.img}
            source={
              outfitItems
                ? outfitItems[2]?.image
                : { uri: items[1]?.localImageUri }
            }
          />
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
