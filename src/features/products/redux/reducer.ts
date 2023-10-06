import { Reducer } from "redux";
import { Product } from "../../../types/product";
import { ADD_TO_CART, DECREMENT_QUANTITY, FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_SUCCESS, INCREMENT_QUANTITY, REMOVE_FROM_CART } from "./types";

export interface ProductReducerState {
    products: Product[],
    cartItems: Product[],
    error: any
}
const initialState: ProductReducerState = {
    products: [],
    cartItems: [],
    error: null
};

const productReducer: Reducer<ProductReducerState> = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            const products = action.payload?.map((p: Product) => ({...p, quantity: 0}))
            return {
                ...state,
                products: products,
            };
        case FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        case ADD_TO_CART:
            const exist = state.cartItems.find(item => item.id === action.payload.id)
            if(!exist) {
                const product = {...action.payload, quantity: 1}
                return {
                    ...state,
                    cartItems: [...state.cartItems, product]
                }
            }
            return { ...state }
        case REMOVE_FROM_CART:
            const filteredList = state.cartItems.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                cartItems: filteredList
            }
        case INCREMENT_QUANTITY:
            const { id: incrementId } = action.payload;
            const incrementedCartItems = state.cartItems.map((item) => {
                if (item.id === incrementId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            return { ...state, cartItems: incrementedCartItems };
        case DECREMENT_QUANTITY:
            const { id: decrementId } = action.payload;
            const decrementedCartItems = state.cartItems.map((item) => {
                if (item.id === decrementId && item.quantity && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            return { ...state, cartItems: decrementedCartItems };
        default:
            return state;
    }
};

export default productReducer;