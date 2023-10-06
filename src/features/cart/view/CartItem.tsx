import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Product } from '../../../types/product';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItemFromCart } from '../../products/redux/actions';
import Button from '../../../components/button';

interface Props {
    item: Product
}

const CartItem = ({item}: Props) => {
    const dispatch = useDispatch();
    return (
        <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.img }} style={styles.cartItemImage} resizeMode='contain' />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>Price: ${item.price.toFixed(2)}</Text>
                <View style={styles.bottomRow}>
                    <View style={styles.quantityControl}>
                        <TouchableOpacity
                            testID='decrement'
                            style={styles.quantityButton}
                            onPress={() => item.quantity && item.quantity > 1 ? dispatch(decrementQuantity(item.id)) : dispatch(removeItemFromCart(item.id))}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                            testID='increment'
                            style={styles.quantityButton}
                            onPress={() => dispatch(incrementQuantity(item.id))}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Button title='Remove' containerStyle={styles.removeButtonContainer} onPress={() => dispatch(removeItemFromCart(item.id))} />
                </View>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cartItemImage: {
        width: 80,
        height: 120,
        borderRadius: 10,
    },
    cartItemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    cartItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemPrice: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    bottomRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 12, 
        alignItems: 'center'
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#FF5722',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    removeButtonContainer: {
        paddingVertical: 0,
        height: 30
    }
});