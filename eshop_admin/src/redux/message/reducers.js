import {CLEAR_MESSAGE_STATE, GET_MESSAGE} from "./types";

const initialState = {
    success: false,
    message: '',
    data: {},
    loaded: false,
}

const MessageReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGE:
            return {
                ...state,
                ...action.data,
                loaded: true
            }

        case CLEAR_MESSAGE_STATE:
            return {
                ...initialState
            }

        default:
            return {
                ...state
            }

    }

}

export default MessageReducers