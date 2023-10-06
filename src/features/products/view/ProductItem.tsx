import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Product } from '../../../types/product';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/actions';

interface Props {
    item: Product
}

const ProductItem = ({item}: Props) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} resizeMode='contain' />
            <View style={styles.detailsContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productColor}>Color: {item.colour}</Text>
                <Text style={styles.productPrice}>Price: ${item.price}</Text>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => dispatch(addItemToCart(item))}>
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
      },
    image: {
        width: 100,
        height: 160, 
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '100%', 
    },
    productColor: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5722', 
        marginTop: 5,
    },
    addToCartButton: {
        backgroundColor: '#FF5722',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5, 
    }
});