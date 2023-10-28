import { createReducer } from "@reduxjs/toolkit";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstant"

export const userReducer = createReducer({ user: {} }, (builder) => {
    builder
        .addCase(REGISTER_USER_REQUEST, setRequestState)
        .addCase(LOGIN_REQUEST, setRequestState)
        .addCase(LOAD_USER_REQUEST, setRequestState)

        .addCase(REGISTER_USER_SUCCESS, setSuccessState)
        .addCase(LOGIN_SUCCESS, setSuccessState)
        .addCase(LOAD_USER_SUCCESS, setSuccessState)

        .addCase(REGISTER_USER_FAIL, setFailState)
        .addCase(LOGIN_FAIL, setFailState)

        .addCase(LOAD_USER_FAIL, (state, action) => {
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        })

        .addCase(LOGOUT_SUCCESS, (state) => {
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        })

        .addCase(LOGOUT_FAIL, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        })

        .addCase(CLEAR_ERRORS, (state) => {
            return {
                ...state,
                error: null,
            };
        });

    function setRequestState(state) {
        return {
            loading: true,
            isAuthenticated: false,
        };
    }
    function setSuccessState(state, action) {
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
        };
    }
    function setFailState(state, action) {
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload,
        };
    }

});

export const profileReducer = createReducer({}, (builder) => {
    builder
        .addCase(UPDATE_PROFILE_REQUEST, requestFunc)
        .addCase(UPDATE_PASSWORD_REQUEST, requestFunc)
        .addCase(UPDATE_USER_REQUEST, requestFunc)
        .addCase(DELETE_USER_REQUEST, requestFunc)
        
        .addCase(UPDATE_PROFILE_SUCCESS, successFunc)
        .addCase(UPDATE_PASSWORD_SUCCESS, successFunc)
        .addCase(UPDATE_USER_SUCCESS, successFunc)

        .addCase(DELETE_USER_SUCCESS, (state, action)=>{
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            }
        })

        .addCase(UPDATE_PROFILE_FAIL, failFunc)
        .addCase(UPDATE_PASSWORD_FAIL, failFunc)
        .addCase(UPDATE_USER_FAIL, failFunc)
        .addCase(DELETE_USER_FAIL, failFunc)
        
        .addCase(UPDATE_PROFILE_RESET, resetFunc)
        .addCase(UPDATE_PASSWORD_RESET, resetFunc)
        .addCase(UPDATE_USER_RESET, resetFunc)

        .addCase(DELETE_USER_RESET, (state)=>{
            return{
                ...state,
                isDeleted: false,
            }
        })

        .addCase(CLEAR_ERRORS, (state) => {
            return {
                ...state,
                error: null
            }
        });

    function requestFunc(state) {
        return {
            ...state,
            loading: true
        }
    }
    function successFunc(state, action) {
        return {
            ...state,
            loading: false,
            isUpdated: action.payload
        }
    }
    function failFunc(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    }
    function resetFunc(state) {
        return {
            ...state,
            isUpdated: false
        }
    }
});

export const forgotPasswordReducer = createReducer({}, (builder) => {
    builder
        .addCase(FORGOT_PASSWORD_REQUEST, requestFunc)
        .addCase(RESET_PASSWORD_REQUEST, requestFunc)

        .addCase(FORGOT_PASSWORD_SUCCESS, successFunc)
        .addCase(RESET_PASSWORD_SUCCESS, resetSuccessFunc)

        .addCase(FORGOT_PASSWORD_FAIL, failFunc)
        .addCase(RESET_PASSWORD_FAIL, failFunc)

        .addCase(CLEAR_ERRORS, (state) => {
            return {
                ...state,
                error: null
            }
        });

    function requestFunc(state) {
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    function successFunc(state, action) {
        return {
            ...state,
            loading: false,
            message: action.payload
        }
    }
    function resetSuccessFunc(state, action) {
        return {
            ...state,
            loading: false,
            success: action.payload
        }
    }
    function failFunc(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    }
});

export const allUsersReducer = createReducer({ user: [] }, (builder) => {
    builder
        .addCase(ALL_USERS_REQUEST, requestFunc)

        .addCase(ALL_USERS_SUCCESS, successFunc)

        .addCase(ALL_USERS_FAIL, failFunc)

        .addCase(CLEAR_ERRORS, (state) => {
            return {
                ...state,
                error: null
            }
        });

    function requestFunc(state) {
        return {
            ...state,
            loading: true,
        }
    }
    function successFunc(state, action) {
        return {
            ...state,
            loading: false,
            users: action.payload
        }
    }
    function failFunc(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    }
});


export const userDetailsReducer = createReducer({ user: {} }, (builder) => {
    builder
        .addCase(USER_DETAILS_REQUEST, requestFunc)

        .addCase(USER_DETAILS_SUCCESS, successFunc)

        .addCase(USER_DETAILS_FAIL, failFunc)

        .addCase(CLEAR_ERRORS, (state) => {
            return {
                ...state,
                error: null
            }
        });

    function requestFunc(state) {
        return {
            ...state,
            loading: true,
        }
    }
    function successFunc(state, action) {
        return {
            ...state,
            loading: false,
            user: action.payload
        }
    }
    function failFunc(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    }
});