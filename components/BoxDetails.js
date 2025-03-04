import React from "react";
import { View, StyleSheet, Image } from "react-native";

const BoxDetails = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
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
        <Image style={styles.img} source={require("../assets/images/clothes/grayPants.webp")}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#bbbbbb",
    height: 170,
    width: 170,
    justifyContent: "space-between",
    borderRadius: 10,
    elevation: 4,
    overflow: "hidden",
  },
  leftContainer: {
    flexDirection: "column",
    width: "50%",
    height: "100%",
    justifyContent: "space-between",
  },
  rightContainer: {
    width: "50%",
    height: "100%",
    backgroundColor: "#EEEDEB",
  },
  smallBox: {
    height: "50%",
    width: "100%",
    backgroundColor: "#EEEDEB",
  },
  img:{
    objectFit: "cover",
    height: "100%",
    width: "100%,",
    // backgroundColor:"red",
  }
});

export default BoxDetails;
