import React from 'react';
import { View, StyleSheet } from 'react-native';

const BoxDetails = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
        <View style={styles.smallBox} />
        <View style={styles.smallBox} />
      </View>

      
      <View style={styles.largeBox} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',  
    alignItems: 'center', 
    padding: 10, 
  },
  leftContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    height: 197, 
  },
  smallBox: {
    width: 98,
    height: 98,
    backgroundColor: '#e0e0e0', 
    marginBottom: 5, 
  },
  largeBox: {
    width: 99,
    height: 210,
    backgroundColor: '#e0e0e0', 
    marginLeft:5,
  },
});

export default BoxDetails;