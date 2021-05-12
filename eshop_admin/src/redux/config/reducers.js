import {GET_CONFIG} from "./types";

const initialState = {
    success: false,
    message: '',
    loaded: false,
    timestamp: ''
}

const ConfigReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIG:
            return {
                ...state,
                ...action.data,
                timestamp: Date.now(),
                loaded: true
            }

        default:
            return {
                ...state
            }

    }

}

export default ConfigReducers