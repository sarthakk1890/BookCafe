import { createReducer } from "@reduxjs/toolkit";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstant";


export const productReducer = createReducer({ products: [] }, (builder) => {
  builder
    .addCase(ALL_PRODUCT_REQUEST, productReq)
    .addCase(ADMIN_PRODUCT_REQUEST, productReq)

    .addCase(ALL_PRODUCT_SUCCESS, (state, action) => {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    })

    .addCase(ADMIN_PRODUCT_SUCCESS, (state, action) => {
      return {
        laoding: false,
        products: action.payload,
      }
    })

    .addCase(ALL_PRODUCT_FAIL, productReqFail)
    .addCase(ADMIN_PRODUCT_FAIL, productReqFail)

    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });


  function productReq(state) {
    return {
      loading: true,
      products: [],
    };
  }

  function productReqFail(state, action) {
    return {
      loading: false,
      error: action.payload,
    };
  }

});


export const productDetailsReducer = createReducer({ product: {} }, (builder) => {
  builder
    .addCase(PRODUCT_DETAILS_REQUEST, (state) => {
      return {
        loading: true,
        ...state,
      };
    })
    .addCase(PRODUCT_DETAILS_SUCCESS, (state, action) => {
      return {
        loading: false,
        product: action.payload,
      };
    })
    .addCase(PRODUCT_DETAILS_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      }
    })
    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });
}
);


export const newReviewReducer = createReducer({}, (builder) => {
  builder
    .addCase(NEW_REVIEW_REQUEST, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(NEW_REVIEW_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload,
      };
    })
    .addCase(NEW_REVIEW_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(NEW_REVIEW_RESET, (state) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const newProductReducer = createReducer({ product: {} }, (builder) => {
  builder
    .addCase(NEW_PRODUCT_REQUEST, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(NEW_PRODUCT_SUCCESS, (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product
      };
    })
    .addCase(NEW_PRODUCT_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(NEW_PRODUCT_RESET, (state) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const productDeleteUpdateReducer = createReducer({}, (builder) => {
  builder
    .addCase(DELETE_PRODUCT_REQUEST, caseReq)
    .addCase(UPDATE_PRODUCT_REQUEST, caseReq)

    .addCase(DELETE_PRODUCT_SUCCESS, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    })
    .addCase(UPDATE_PRODUCT_SUCCESS, (state, action) => {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    })

    .addCase(DELETE_PRODUCT_FAIL, caseFail)
    .addCase(UPDATE_PRODUCT_FAIL, caseFail)

    .addCase(DELETE_PRODUCT_RESET, (state) => {
      return {
        ...state,
        isDeleted: false,
      };
    })
    .addCase(UPDATE_PRODUCT_RESET, (state) => {
      return {
        ...state,
        isUpdated: false,
      };
    })

    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });


  function caseReq(state) {
    return {
      ...state,
      loading: true,
    };
  }

  function caseFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }

});


export const productReviewsReducer = createReducer({ reviews: [] }, (builder) => {
  builder
    .addCase(ALL_REVIEW_REQUEST, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(ALL_REVIEW_SUCCESS, (state, action) => {
      return {
        loading: false,
        reviews: action.payload,
      };
    })
    .addCase(ALL_REVIEW_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    })
    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });
});


export const reviewReducer = createReducer({}, (builder) => {
  builder
    .addCase(DELETE_REVIEW_REQUEST, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(DELETE_REVIEW_SUCCESS, (state, action) => {
      return {
        loading: false,
        isDeleted: action.payload,
      };
    })
    .addCase(DELETE_REVIEW_FAIL, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(DELETE_REVIEW_RESET, (state) => {
      return {
        ...state,
        isDeleted: false,
      };
    })
    .addCase(CLEAR_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });
});