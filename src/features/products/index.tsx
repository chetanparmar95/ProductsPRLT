import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types/product';
import { RootState } from '../../store';
import { fetchProducts } from './redux/actions';
import { useNavigation } from '@react-navigation/native';
import { ProductsScreenNavigationProp } from '../../navigation';
import ProductItem from './view/ProductItem';
import Button from '../../components/button';

const ProductList: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const cartItems = useSelector((state: RootState) => state.products.cartItems);
    const dispatch = useDispatch()
    const navigation = useNavigation<ProductsScreenNavigationProp>()

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const renderItem = ({ item }: { item: Product }) => {
        return <ProductItem item={item} />
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button 
                title={`${cartItems.length} item in Cart`} 
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate('Cart')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    buttonContainer: {
        marginTop: 16,
    }
});

export default ProductList;
