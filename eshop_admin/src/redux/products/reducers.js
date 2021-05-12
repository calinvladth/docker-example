import {GET_PRODUCTS} from "./types";

const initialState = {
    success: false,
    message: '',
    data: [],
    pagination: {},
    loaded: false
}

const ProductsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                ...action.data,
                data: action.data.data,
                pagination: action.data.pagination,
                filters: action.data.filters,
                loaded: true
            }

        default:
            return {
                ...state
            }
    }
}

export default ProductsReducers