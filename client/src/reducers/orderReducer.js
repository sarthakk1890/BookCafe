import { createReducer } from "@reduxjs/toolkit";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstant";


export const newOrderReducer = createReducer({}, (builder) => {
    builder
        .addCase(CREATE_ORDER_REQUEST, (state) => {
            return {
                ...state,
                loading: true
            }
        })
        .addCase(CREATE_ORDER_SUCCESS, (state, action) => {
            return {
                loading: false,
                order: action.payload
            }
        })
        .addCase(CREATE_ORDER_FAIL, (state, action) => {
            return {
                loading: false,
                order: action.payload
            }
        })

        .addCase(CLEAR_ERRORS, (state)=>{
            return{
                ...state,
                error: null
            }
        });
})

export const myOrderReducer = createReducer({orders: []}, (builder) => {
    builder
        .addCase(MY_ORDERS_REQUEST, () => {
            return {
                loading: true
            }
        })
        .addCase(MY_ORDERS_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        })
        .addCase(MY_ORDERS_FAIL, (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        })

        .addCase(CLEAR_ERRORS, (state)=>{
            return{
                ...state,
                error: null
            }
        });
})

//All Orders --Admin
export const allOrderReducer = createReducer({orders: []}, (builder) => {
    builder
        .addCase(ALL_ORDERS_REQUEST, () => {
            return {
                loading: true
            }
        })
        .addCase(ALL_ORDERS_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        })
        .addCase(ALL_ORDERS_FAIL, (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        })

        .addCase(CLEAR_ERRORS, (state)=>{
            return{
                ...state,
                error: null
            }
        });
})

//Update and Delete Order
export const orderReducer = createReducer({}, (builder) => {
    builder
        .addCase(UPDATE_ORDER_REQUEST, caseReq)
        .addCase(DELETE_ORDER_REQUEST, caseReq)


        .addCase(UPDATE_ORDER_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        })
        .addCase(DELETE_ORDER_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        })


        .addCase(UPDATE_ORDER_FAIL, caseFail)
        .addCase(DELETE_ORDER_FAIL, caseFail)


        .addCase(UPDATE_ORDER_RESET, (state, action) => {
            return {
                ...state,
                isUpdated: false
            }
        })
        .addCase(DELETE_ORDER_RESET, (state, action) => {
            return {
                ...state,
                isDeleted: false
            }
        })

        
        .addCase(CLEAR_ERRORS, (state)=>{
            return{
                ...state,
                error: null
            }
        });

        function caseReq(state){
            return {
                ...state,
                loading: true
            }
        }

        function caseFail(state,action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
})


export const orderDetailsReducer = createReducer({order: {}}, (builder) => {
    builder
        .addCase(ORDER_DETAILS_REQUEST, () => {
            return {
                loading: true
            }
        })
        .addCase(ORDER_DETAILS_SUCCESS, (state, action) => {
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        })
        .addCase(ORDER_DETAILS_FAIL, (state, action) => {
            return {
                loading: false,
                order: action.payload
            }
        })

        .addCase(CLEAR_ERRORS, (state)=>{
            return{
                ...state,
                error: null
            }
        });
})