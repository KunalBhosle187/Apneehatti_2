import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAILS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SEARCH_LIST_REQUEST,
  PRODUCT_SEARCH_LIST_SUCCESS,
  PRODUCT_SEARCH_LIST_FAILS,
  PRODUCT_UPLOAD_REQUEST,
  PRODUCT_UPLOAD_SUCCESS,
  PRODUCT_UPLOAD_FAILS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILS,
  PRODUCT_UPDATE_MANY_REQUEST,
  PRODUCT_UPDATE_MANY_SUCCESS,
  PRODUCT_UPDATE_MANY_FAILS,
  PRODUCT_DELETE_MANY_REQUEST,
  PRODUCT_DELETE_MANY_SUCCESS,
  PRODUCT_DELETE_MANY_FAILS,
} from "../constants/productConstant";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSearchListReducer = (
  state = { seachProducts: [] },
  action
) => {
  const { searchData, searchKey } = action;
  switch (action.type) {
    case PRODUCT_SEARCH_LIST_REQUEST:
      return { loading: true, searchProducts: [] };
    case PRODUCT_SEARCH_LIST_SUCCESS:
      return {
        loading: false,
        searchProducts: searchData.filter(
          (x) =>
            x.title?.toLowerCase().includes(searchKey?.toLowerCase() || "") ||
            x._id?.toLowerCase().includes(searchKey?.toLowerCase() || "")
        ),
      };
    case PRODUCT_SEARCH_LIST_FAILS:
      return { loading: false, error: searchData };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: [] };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPLOAD_REQUEST:
      return { loading: true };
    case PRODUCT_UPLOAD_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPLOAD_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateManyReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_MANY_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_MANY_SUCCESS:
      return { loading: false, success: true, checkedProducts: action.payload };
    case PRODUCT_UPDATE_MANY_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteManyReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_MANY_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_MANY_SUCCESS:
      return { loading: false, success: true, checkedProducts: action.payload };
    case PRODUCT_DELETE_MANY_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
