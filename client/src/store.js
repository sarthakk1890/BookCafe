import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, productDeleteUpdateReducer, reviewReducer, productReviewsReducer } from "./reducers/productReducer";
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        profile: profileReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrderReducer,
        orderDetails: orderDetailsReducer,
        newReview: newReviewReducer,
        newProduct: newProductReducer,
        productDeleteUpdate: productDeleteUpdateReducer,
        allOrders: allOrderReducer,
        order: orderReducer,
        allUsers: allUsersReducer,
        userDetails: userDetailsReducer,
        review: reviewReducer,
        productReviews: productReviewsReducer
    },
    preloadedState: initialState,
});

export default store;