import {CHECK_REGISTER} from "./types";

const initialState = {
    success: false,
    message: '',
    data: {},
    loaded: false
}

const CheckRegisterReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_REGISTER:
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

export default CheckRegisterReducers