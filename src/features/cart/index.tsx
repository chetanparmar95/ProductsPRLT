import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from '../../types/product';
import CartItem from './view/CartItem';
import EmptyCart from './view/EmptyCart';
import Button from '../../components/button';

const CartScreen = () => {
    const cartItems = useSelector((state: RootState) => state.products.cartItems);

    const calculateTotalPrice = useCallback(() => {
        let total = 0;
        cartItems.forEach((item) => {
          total += item.price * (item.quantity);
        });
        return total.toFixed(2);
    }, [cartItems]);

    const renderItem = ({ item }: { item: Product }) => {
        return <CartItem item={item} />
    };

    return (
        <View style={styles.container}>
            {cartItems.length > 0 ? <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            /> : <EmptyCart /> }
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
                <Button title='Checkout' containerStyle={styles.checkoutButton} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }, 
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    borderRadius: 10,
  },
});

export default CartScreen;
