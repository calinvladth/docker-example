const {GET_ORDERS} = require("./types");
const initalState = {
    success: false,
    message: '',
    data: [],
    pagination: {},
    loaded: false
}

const OrdersReducers = (state = initalState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                ...action.data,
                data: action.data.data,
                pagination: action.data.pagination,
                loaded: true
            }

        default:
            return {
                ...state,
                loaded: true
            }
    }
}

export default OrdersReducers