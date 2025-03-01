import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useState } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import colors from "../assets/colors/colors";
import PrimaryButton from "./PrimaryButton";
import GoogleButton from "./GoogleButton";

// Responsive design related code
const { width, height } = Dimensions.get("window");
const isSmallWidth = width < 480;
const isSmallHeight = height < 900;

function UserRegisterationForm() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Month options
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Generate days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  // Generate years (1900 - current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 125 }, (_, i) =>
    (currentYear - i).toString()
  );

  const navigation = useNavigation();
  return (
    <View style={styles.UserRegisterationForm}>
      {/* title Area */}
      <View style={styles.titleArea}>
        <Animated.Text
          //   entering={FadeInUp.duration(1000).springify()}
          style={styles.title}
        >
          Register
        </Animated.Text>
      </View>
      <View style={styles.inputArea}>
        <Animated.View
          //   entering={FadeInUp.duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Username"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
          />
        </Animated.View>
        <Animated.View
          // entering={FadeInUp.delay(400).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            secureTextEntry
          />
        </Animated.View>

        <Animated.View
          // entering={FadeInUp.delay(600).duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
            secureTextEntry
          />
        </Animated.View>
        {/* <Animated.View
          //   entering={FadeInUp.duration(1000).springify()}
          style={styles.inputContainer}
        >
          <TextInput
            keyboardType="numeric"
            placeholder="DATE OF BIRTH"
            placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            style={styles.inputField}
          />
        </Animated.View> */}

        {/* Date of Birth Area */}
        <View style={styles.dobArea}>
          {/* Month Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Mon" value="" />
              {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={month} />
              ))}
            </Picker>
          </View>

          {/* Day Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="DD" value="" />
              {days.map((day, index) => (
                <Picker.Item key={index} label={day} value={day} />
              ))}
            </Picker>
          </View>

          {/* Year Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={currentYear} value="" />
              {years.map((year, index) => (
                <Picker.Item key={index} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Button */}
        <View style={styles.button}>
          <PrimaryButton
            onPress={() => navigation.navigate("Verification")}
          >
            Sign Up
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  UserRegisterationForm: {
    paddingTop: 200,
    width: "100%",
    alignItems: "center",
    // backgroundColor: "darkred",
  },
  titleArea: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
    // backgroundColor: "red",
  },
  title: {
    fontFamily: "higuen",
    fontSize: isSmallWidth ? scale(60) : 60,
  },
  inputArea: {
    flex: 8,
    width: "100%",
    paddingHorizontal: scale(17),
    width: isSmallWidth ? "100%" : "80%",
    // backgroundColor: "green",
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: moderateScale(10), //12 before responsive
    padding: moderateScale(8), //10 before responsive
    marginBottom: verticalScale(15 * (680 / 915)),
    elevation: 5,
    width: "100%",
    // borderWidth: 1,
    // borderBottomColor: "#746d67",
    // borderStyle: "dashed",
  },
  inputField: {
    // fontFamly: "glacial-bold",
    fontWeight: "700",
    fontSize: 12,
    color: "black",
  },
  dobArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    height: 50,
    backgroundColor: "#D5C8B8",
  },
  picker: {
    flex: 1,
    width: "100%",
    backgroundColor: "#D5C8B8",
  },
  button: {
    marginVertical: 20,
  },

});

export default UserRegisterationForm;
