import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherCard = () => {
  return (
    <View style={styles.card}>
     <View style = {styles.cardRow}>

      <Text style={styles.dateText}>Mon Mar 4</Text>
      <View style={styles.locationRow}>
        <Image source={require('../assets/map-pointer.png')} style={styles.icon} />
        <Text style={styles.locationText}>abbaseya</Text>
      </View>


     </View>
     <View style = {styles.cardRow}>
        
      <View style={styles.weatherRow}>
        <Image source={require('../assets/cloud.png')} style={styles.weatherIcon} />
        <Text style={styles.tempText}>73/55 F</Text>
      </View>

      
      <Text style={styles.descriptionText}>Cloudy, currently 60F</Text>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8DDCC',
    padding: 16,
    borderRadius: 12,
    width: 300,
    elevation: 6,
    height :120,
    justifyContent:'space-between',
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
  },
  dateText: {
    color: '#777',
    fontSize: 14,
    marginVertical: 5,
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
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
  },
});

export default WeatherCard;
