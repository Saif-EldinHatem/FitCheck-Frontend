import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";

import colors from "../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";

function TopBar() {
  return (
    <View style={styles.barContainer}>
      <Text style={styles.logo}>FitCheck</Text>
      <View style={styles.rightRow}>
        <Ionicons name="notifications-outline" size={32} color="#1D1B20" />
        <Image
          style={styles.userAvatar}
          source={require("../assets/images/home screen/user-avatar.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    marginBottom: 17,
    // backgroundColor: colors.accent,
  },
  logo: {
    fontFamily: "higuen",
    fontSize: 32,
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    // backgroundColor: colors.secondary,
  },
  userAvatar: {
    width: 44,
    height: 44,
  },
});

export default TopBar;