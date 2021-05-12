import {CHECK, CHECK_ERROR} from "./types";

const initialState = {
    success: false,
    message: '',
    data: {},
    is_authenticated: false,
    loaded: false
}

const AuthenticationReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHECK:
            return {
                ...state,
                ...action.data,
                is_authenticated: true,
                loaded: true
            }

        case CHECK_ERROR:
            return {
                ...state,
                is_authenticated: false,
                loaded: true
            }

        default:
            return {
                ...state
            }
    }
}

export default AuthenticationReducers