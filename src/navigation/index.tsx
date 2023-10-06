import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "../features/products";
import CartScreen from "../features/cart";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Products: undefined;
    Cart: undefined;
};

export type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;

export type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

const Stack = createNativeStackNavigator();

const NavigationRoot = () => {
    return (
        <Stack.Navigator initialRouteName="Products">
            <Stack.Screen
                name="Products"
                component={ProductList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}


export default NavigationRoot;