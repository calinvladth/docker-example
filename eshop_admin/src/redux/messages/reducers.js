import {GET_MESSAGES} from "./types";

const initialState = {
    success: false,
    message: '',
    data: [],
    pagination: {},
    loaded: false,
}

const MessagesReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                ...action.data,
                data: action.data.data,
                pagination: action.data.pagination,
                loaded: true
            }

        default:
            return {
                ...state
            }

    }

}

export default MessagesReducers