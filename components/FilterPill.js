import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../assets/colors/colors";
import { useState } from "react";

function FilterPill({ title, isSelected = false, handleList }) {
  const [isPillSelected, setIsPillSelected] = useState(isSelected);
  return (
    <View style={[styles.wrapper, isPillSelected && styles.wrapperSelected]}>
      <Pressable
        style={styles.container}
        onPress={() => {
          setIsPillSelected((prev) => !prev);
          handleList(title);
        }}
      >
        <Text
          style={[styles.pillTitle, isPillSelected && styles.pillTitleSelected]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#CAC4D0",
    borderRadius: 5,
  },
  wrapperSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  container: {
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  pillTitle: {
    fontFamily: "inter",
    fontSize: 14,
    color: "#49454F",
  },
  pillTitleSelected: {
    color: "white",
  },
});

export default FilterPill;
