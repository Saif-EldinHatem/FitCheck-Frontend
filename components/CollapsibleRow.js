import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Collapsible from "react-native-collapsible";
import FilterPill from "./FilterPill";
import colors from "../assets/colors/colors";

import { filtersData } from "../store/data";

function CollapsibleRow({ title }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filterList, setFilterList] = useState([]);

  const rotation = useSharedValue(0);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      if (title == "Occasion") {
        toggleCollapse();
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev);
    rotation.value = withTiming(isCollapsed ? 90 : 0, { duration: 300 });
  }

  function handleList(newItem) {
    setFilterList((prev) => {
      if (prev.includes(newItem)) return prev.filter((item) => item != newItem);
      return [...prev, newItem];
    });
    console.log(filterList);
  }

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeaderWrapper}>
        <Pressable style={styles.itemHeader} onPress={toggleCollapse}>
          <Text style={styles.itemTitle}>{title}</Text>
          <View style={styles.rightRow}>
            <View style={styles.filterItems}>
              {filterList.map((item) => (
                <Text key={item} style={styles.filterItem}>
                  {item}
                </Text>
              ))}
            </View>
            <Animated.View style={animatedChevronStyle}>
              <Ionicons name="chevron-forward" size={26} />
            </Animated.View>
          </View>
        </Pressable>
      </View>
      <Collapsible
        renderChildrenCollapsed={true}
        collapsed={isCollapsed}
        style={styles.collapsibleWrapper}
      >
        <View style={styles.collapsibleContainer}>
          {filtersData
            .find((filter) => filter.filterGroup == title)
            ?.options.map((option) => (
              <FilterPill key={option} title={option} handleList={handleList} />
            ))}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    // paddingTop: 30,
    // gap: 20,
    // justifyContent: "flex-end",
    // backgroundColor: "green",
  },
  itemHeaderWrapper: {},
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  rightRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 2,
    alignItems: "center",
    maxWidth: "75%",
    overflow: "hidden",
  },
  filterItems: {
    flexDirection: "row",
    gap: 4,
  },
  filterItem: {
    fontFamily: "inter-medium",
    fontSize: 14,
    color: colors.accent,
  },
  itemTitle: {
    fontFamily: "inter",
    fontSize: 18,
  },
  chevron: {},
  collapsibleWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  collapsibleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 4,
    // backgroundColor: "green",
  },
});

export default CollapsibleRow;
