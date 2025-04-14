import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherCard = () => {
  return (
    <View style={styles.card}>
     <View style = {styles.cardRow}>

      <Text style={styles.dateText}>Monday, March 4</Text>



     </View>
     <View style = {styles.cardRow}>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Cloudy, 60°F</Text>
      </View>
      <View style={styles.locationRow}>
      <Image source={require('../assets/map-pointer.png')} style={styles.icon} />
      <Text style={styles.locationText}>Abbaseya Sq.</Text>
      </View>
      <View style={styles.weatherRow}>
        <Image source={require('../assets/cloud.png')} style={styles.weatherIcon} />
        <Text style={styles.tempText}>L: 55° H: 73° F</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 375,
    height :150,
    padding: 16,
    borderRadius: 12,
    marginLeft: 0,
    justifyContent:'space-between',
    elevation: 6,
    backgroundColor: '#E8DDCC',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18
  },
cardRow:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
},

  icon: {
    width: 14,
    height: 14,
    marginRight: 2,
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    // fontWeight: 'bold',
    alignItems:'flex-end',
    // fontFamily: "inter",
    color: '#777',
    
    
  },
  dateText: {
    color: '#777',
    fontSize: 15,
    marginVertical: 5,
    fontFamily: "inter",

  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -21,
  },
  weatherIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginLeft: 200,

  },
  descriptionContainer: {
    alignItems: 'center',
    width: '100%',
  },
  tempText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    fontFamily: "GlacialIndifference-Regular",
  },
  descriptionText: {
    fontSize: 31,
    textAlign: 'left',
    width: '100%',
    paddingBottom: 6,
    marginTop: 10,
    fontFamily: "higuen",
  },
});

export default WeatherCard;
