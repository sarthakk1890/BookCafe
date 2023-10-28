import { createReducer } from "@reduxjs/toolkit";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

export const cartReducer = createReducer({ cartItems: [], shippingInfo: {} }, (builder) => {
    builder
        .addCase(ADD_TO_CART, (state, action) => {
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        })

        .addCase(REMOVE_CART_ITEM,(state, action)=>{
            return {
                ...state,
                cartItems: state.cartItems.filter((i)=> i.product !== action.payload),
            }
        })

        .addCase(SAVE_SHIPPING_INFO, (state, action)=>{
            return{
                ...state,
                shippingInfo: action.payload,
            }
        })

})