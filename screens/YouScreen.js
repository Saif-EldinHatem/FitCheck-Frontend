import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const YouScreen = () => {
  const [selectedSkinTone, setSelectedSkinTone] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedColorTone, setSelectedColorTone] = useState(null);

  const skinTones = ['#F3DCC6', '#8D5524', '#3B2E25'];
  const stylesOptions = ['Formal', 'Casual', 'Undecided'];
  const colorTones = ['Warm', 'Cool', 'Undecided'];

  return (
    <View style={styles.container}>
    
    <View style={styles.header}>
  <Text style={styles.headerText}>You</Text>
  <TouchableOpacity>
    <Image source={require('../assets/images/Youscreen/settings.png')} style={styles.settingsIcon} />
  </TouchableOpacity>
</View>

    <View style={styles.avatarContainer}>
  <Image source={require('../assets/images/Youscreen/user-avatar.png')} style={styles.avatar} />
  <TouchableOpacity style={styles.editIcon}>
    <Image source={require('../assets/images/Youscreen/edit-icon.png')} style={styles.editImage} />
  </TouchableOpacity>
  <Text style={styles.avatarName}>Cover</Text> {/* Add this line */}
</View>


      {/* Skin Tone Selection */}

 <Text style={styles.sectionTitle}>Avatar</Text>
<View style={styles.avatarSection}>
      <View style={styles.skinToneContainer}>
  <View style={styles.skinToneRow}>
    <Text style={styles.skinToneLabel}>Skin Tone</Text>
    <View style={{ flexDirection: 'row' }}>
      {['#F3DCC6', '#8D5524', '#3B2E25'].map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.skinToneButton,
            { backgroundColor: color },
            selectedSkinTone === color && styles.selectedSkinTone,
          ]}
          onPress={() => setSelectedSkinTone(color)}
        />
      ))}
         </View>
      </View>
    </View>
</View>


      {/* Outfit Preferences */}

<Text style={styles.sectionTitle}>Outfit Preferences</Text>
<View style={styles.outfitPreferenceContainer}>
  <View style={styles.preferenceRow}>
    <Text style={styles.label}>Style</Text>
    <View style={styles.buttonGroup}>
      {['Formal', 'Casual', 'Undecided'].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.toggleButton,
            selectedStyle === option && styles.selectedButton,
          ]}
          onPress={() => setSelectedStyle(option)}
        >
          <Text style={[styles.buttonText, selectedStyle === option && styles.selectedText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>

  <View style={styles.preferenceRow}>
    <Text style={styles.label}>Color Tone</Text>
    <View style={styles.buttonGroup}>
      {['Warm', 'Cool', 'Undecided'].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.toggleButton,
            selectedColorTone === option && styles.selectedButton,
          ]}
          onPress={() => setSelectedColorTone(option)}
        >
          <Text style={[styles.buttonText, selectedColorTone === option && styles.selectedText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</View>

     

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#F5EDE3',
    padding: 20
   },
  avatarContainer: { 
   alignItems: 'center',
    marginVertical: 20,
    
   },
  
   avatar: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#243137' },
  
   editIcon: { position: 'absolute', bottom: 0, right: 10, width: 45.6, height: 45.6, borderRadius: 22.8, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  
   editImage: { width: 25, height: 25 }, 
   
   sectionTitle: { 
    fontSize: 20, 
    color: '#1E2E33', 
    fontWeight: 'bold', 
    marginBottom: 5, 
  },
  
  subTitle: { 
    fontSize: 16,
     fontWeight: 'bold',
      marginTop: 10
     },
  optionsContainer: { 
    flexDirection: 'row',
     gap: 50,
      marginVertical: 10
     },
     skinToneContainer: { 
      width: 416, 
      height: 69, 
      backgroundColor: '#F5F5F5', 
      borderRadius: 10, 
      paddingHorizontal: 15, 
      justifyContent: 'center', 
      alignSelf: 'center', 
      marginVertical: 10, 
    },
    skinToneRow: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
    },
    skinToneLabel: { 
      fontSize: 16, 
      fontWeight: 'bold', 
    },
    skinToneButton: { 
      width: 30, 
      height: 30, 
      borderRadius: 15, 
      marginHorizontal: 5, 
      borderWidth: 2, 
      borderColor: 'transparent', 
    },
    selectedSkinTone: { 
      borderColor: 'black', 
    },
    
  skinTone: {
     width: 30,
     height: 30,
      borderRadius: 15,
       borderWidth: 2
       },

  avatarName: { 
        marginTop: 5, 
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: 'black' 
      },
      avatarSection: { 
        width: 416, 
        height: 69, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginVertical: 10 
      },
      outfitPreferenceContainer: { 
        width: 416, 
        height: 111, 
        backgroundColor: '#F5F5F5', 
        borderRadius: 10, 
        padding: 15, 
        justifyContent: 'center', 
        alignSelf: 'center', 
        marginVertical: 10 
      },
      preferenceRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 10 
      },

      label: { 
        fontSize: 16, 
        fontWeight: 'bold', 
      },
      buttonGroup: { 
        flexDirection: 'row', 
        gap: 8, 
      },
          
      toggleButton: { 
        width: 63, 
        height: 23, 
        borderRadius: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: 'black', 
        backgroundColor: 'white', 
      },
      selectedButton: { 
        backgroundColor: 'black', 
      },
      buttonText: { 
        color: 'black', 
        fontSize: 12, 
      },
      selectedText: { 
        color: 'white', 
      },
      
 

       rowContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginVertical: 10 
      },
      optionsContainer: { 
        flexDirection: 'row', 
        gap: 10 
      },    

      header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20, 
        fontFamily: "higuen",
        marginTop: 60 
      },
      headerText: { 
        fontSize: 30, 
        fontWeight: 'bold', 
        fontFamily: "higuen",
        textAlign: 'center', 
        flex: 1 
      },
  settingsIcon: { 
      width: 28, 
      height: 28 
  },
  logoutButton: { 
    width: 141, 
    height: 40, 
    backgroundColor: 'red', 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginTop: 20 
  },
  logoutText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
});

export default YouScreen;
