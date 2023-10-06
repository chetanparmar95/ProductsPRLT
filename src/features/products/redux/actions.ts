import { Product } from "../../../types/product";
import { ADD_TO_CART, DECREMENT_QUANTITY, FETCH_PRODUCTS, FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_SUCCESS, INCREMENT_QUANTITY, REMOVE_FROM_CART } from "./types";

export const fetchProducts = () => {
    return { type: FETCH_PRODUCTS }
}

export const fetchProductsSuccess = (payload: Product[]) => {
    const products = payload.map(product => {
        return {...product, quantity: 0}
    })
    return { type: FETCH_PRODUCTS_SUCCESS, payload: products}
}

export const fetchProductsFailed = (error: any) => {
    return { type: FETCH_PRODUCTS_FAILED, payload: error }
}

export const addItemToCart = (product: Product) => {
    return { type: ADD_TO_CART, payload: product}
}

export const removeItemFromCart = (productId: number) => {
    return { type: REMOVE_FROM_CART, payload: {id: productId}}
}

export const incrementQuantity = (productId: number) => {
    return { type: INCREMENT_QUANTITY, payload: {id: productId}}
}

export const decrementQuantity = (productId: number) => {
    return { type: DECREMENT_QUANTITY, payload: {id: productId}}
}