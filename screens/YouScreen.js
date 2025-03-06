import { useContext } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../store/context/AuthContext";


function YouScreen() {
  const AuthCtx = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex :1, justifyContent:"center", alignItems: "center",}}>
      <Button color={"red"} title="log out" onPress={()=>{
        AuthCtx.setIsAuthenticated(false);
      }}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create(
);

export default YouScreen;
