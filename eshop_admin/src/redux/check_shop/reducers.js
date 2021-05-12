import {CHECK_SHOP} from "./types";

const initialState = {
    success: false,
    message: '',
    data: false,
    loaded: false
}

const CheckShopReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_SHOP:
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

export default CheckShopReducers