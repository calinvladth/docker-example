import {GET_CATEGORIES} from "./types";

const initialState = {
    success: false,
    message: '',
    data: {},
    loaded: false
}

const CategoriesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                ...action.data,
                loaded: true
            }

        default:
            return {
                ...state
            }
    }
}

export default CategoriesReducers