const {GET_ORDER} = require("./types");
const initialState = {
    success: false,
    message: '',
    data: {},
    loaded: false
}

const OrderReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER:
            return {
                ...state,
                ...action.data,
                loaded: true
            }

        default:
            return {
                ...state,
                loaded: true
            }
    }
}

export default OrderReducers