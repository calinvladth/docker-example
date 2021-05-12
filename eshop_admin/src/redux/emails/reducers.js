import {GET_EMAILS} from "./types";

const initialState = {
    success: false,
    message: '',
    data: [],
    loaded: false,
}

const EmailsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMAILS:
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

export default EmailsReducers