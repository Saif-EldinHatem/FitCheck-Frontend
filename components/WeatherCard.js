import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherCard = () => {
  return (
    <View style={styles.card}>
     <View style = {styles.cardRow}>

      <Text style={styles.dateText}>Monday, March 4</Text>
      <View style={styles.locationRow}>
        <Image source={require('../assets/map-pointer.png')} style={styles.icon} />
        <Text style={styles.locationText}>Abbaseya Square</Text>
      </View>


     </View>
     <View style = {styles.cardRow}>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Cloudy, 60°F</Text>
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
    width: 340,
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
  },
cardRow:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
},

  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems:'flex-end',
    fontFamily: "GlacialIndifference-Regular",

  },
  dateText: {
    color: '#777',
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "GlacialIndifference-Regular",

  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  descriptionContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  tempText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    fontFamily: "GlacialIndifference-Regular",

  },
  descriptionText: {
    fontSize: 28,
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
    // fontFamily: "higuen",
  },
});

export default WeatherCard;
