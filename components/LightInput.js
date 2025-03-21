import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function LightInput({ content, isPassword = false, alignCenter = false }) {
  const [value, setValue] = useState(content);

  return (
    <View style={[styles.inputContainer, alignCenter && {alignItems: "center"}]}>
      <TextInput
        secureTextEntry={isPassword}
        value={value}
        onChangeText={(text) => setValue(text)}
        style={styles.inputField}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#F5ECE3",
    borderRadius: 8,
    elevation: 3,
  },
  inputField: {
    fontFamily: "poppins",
    fontSize: 14,
    height: 32,
    lineHeight: 20,
    textAlignVertical: "center",
    paddingVertical: 0,
    color: "#00000080",
  },
});

export default LightInput;
