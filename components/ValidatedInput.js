import { StyleSheet, View, Text, TextInput } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

function ValidatedInput({
  placeholder,
  touched,
  error,
  handleChange,
  handleBlur,
  isPassword,
}) {
  return (
    <View style={styles.inputWrapper}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={[styles.inputContainer, touched && error && styles.errorBorder]}
      >
        <TextInput
          placeholder={placeholder}
          secureTextEntry={isPassword}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          style={styles.inputField}
          onChangeText={handleChange}
          onBlur={handleBlur}
        />
      </Animated.View>
      {touched && error && <Text style={styles.validationText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
  },
  inputContainer: {
    backgroundColor: "#D5C8B8",
    borderRadius: 12,
    padding: 10,
    elevation: 5,
  },
  errorBorder: {
    // borderWidth: 1,
    //   borderColor: "darkred",
    backgroundColor: "#f09898",
  },
  inputField: {
    fontSize: 16,
    height: 32,
    paddingVertical: 0,
  },
  validationText: {
    color: "darkred",
    marginTop: 3,
    paddingLeft: 5,
  },
});

export default ValidatedInput;
