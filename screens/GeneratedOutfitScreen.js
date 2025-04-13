import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../assets/colors/colors";
import FilterPill from "../components/FilterPill";
import Pill from "../components/you screen/Pill";


 function GeneratedOutfitScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.tagsSection}>
        <Text style={styles.sectionTitle}>Tags: </Text>
         <View style={styles.pillStyles}>
           <Pill title={"Casual"} isSelected={true} setIsSelected={()=>{}}/>
           <Pill title={"Winter"} isSelected={true} setIsSelected={()=>{}}/>
           <Pill title={"Old Money"} isSelected={true} setIsSelected={()=>{}}/>
           <Pill title={"Casual"} isSelected={true} setIsSelected={()=>{}}/>
         </View>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 180}}><Text style={{fontSize: 25}}>Outfit Image Placeholder</Text></View>
      <View style={styles.colorsSection}>
        <Text style={styles.sectionTitle}>Colors: </Text>
        <View style={styles.color}></View>
        <View style={styles.color}></View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.buttonWrapper}><View style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
          </View></Pressable>
        <Pressable style={styles.buttonWrapper}><View style={styles.rerunButton}>
        <Text style={styles.buttonText}>Rerun</Text>
        </View></Pressable>
      </View>
      <Pressable><Text style={styles.changePreferencesButton}>
      Change Generation Preferences</Text></Pressable>
      <Text style={styles.note}>Some preferences will be discarded if no wardrobe items match.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.main,
      paddingTop: 20,
      alignContent: "center",

    },
    tagsSection: {
      flexDirection: "row",
      gap: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    pillStyles: {
      flexDirection: "row",
      gap: 5,
      
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.black,
      fontFamily: "inter-medium",

    },
    colorsSection: {
      flexDirection: "row",
      gap: 4,
      marginLeft: 15,
    },
    color: {
      width: 27,
      height: 27,
      backgroundColor: "black",
      borderRadius: 12,
    },
    buttonsContainer: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: 30,
    },
    saveButton: {
      flex : 1,
      height: 60,
      backgroundColor: colors.accent,
      borderRadius: 12,
      },
      rerunButton: {
        flex : 1,
        height: 60,
        backgroundColor: "black",
        borderRadius: 12,
      },
      buttonWrapper: {
        flex: 1,
        height: 60,
        borderRadius: 12,
      },
      buttonText: {
        textAlign: "center",
        lineHeight: 60,
        fontSize: 24,
        color: "white",
        fontFamily: "higuen",
      },
      changePreferencesButton: {
        textAlign: "center",
        lineHeight: 60,
        fontSize: 13,
        color: "#888888",
        fontFamily: "inter",
        marginTop: 10,
        textDecorationLine: "underline",
      },
      note: {
        textAlign: "center",
        lineHeight: 60,
        fontSize: 10,
        color: "#888888",
        fontFamily: "inter",
        marginTop: 55,
      },  
})

export default GeneratedOutfitScreen;