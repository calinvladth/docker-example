import {CHECK_SERVER} from "./types";

const initialState = {
    success: false,
    message: '',
    loaded: false
}

const CheckServerReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_SERVER:
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

export default CheckServerReducers