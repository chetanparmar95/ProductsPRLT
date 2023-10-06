import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const EmptyCart = () => {
  return (
    <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.descriptionText}>Start shopping to add items to your cart.</Text>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
});