import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import colors from '../assets/colors/colors';

function ItemDetailScreen() {
    const handleDelete = () => {
        Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', onPress: () => console.log('Item deleted') },
        ]);
      };
    
  
    return (
    <View style={styles.container}>
    {/* Hide the status bar */}
    <StatusBar hidden />
    
    {/* Product Image */}
    <Image source={require("../assets/images/blueTshirt.jpg")} style={styles.image} />

    {/* Product Details */}
    <View style={styles.detailsContainer}>
      <Text style={styles.brand}>H&M</Text>
      <Text style={styles.title}>Blue T-shirt</Text>
      <Text style={styles.category}>Summer | Casual | T-shirt</Text>
      <Text style={styles.color}>Color: Blue</Text>
    </View>

    {/* Delete Button */}
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteButtonText}>Delete Item</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
        backgroundColor: colors.main,
      },
      image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 8,
      },
      detailsContainer: {
        marginTop: 16,
      },
      brand: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 8,
      },
      category: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
      },
      color: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
      },
      deleteButton: {
        marginTop: 24,
        backgroundColor: '#ff4444',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
      },
      deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },

});

export default ItemDetailScreen;
