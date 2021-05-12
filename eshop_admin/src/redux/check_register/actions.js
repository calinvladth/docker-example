import axios from 'axios'
import {api} from "../../config";
import {CHECK_REGISTER} from "./types";

export const CheckRegister = () => (dispatch, geState) => {
    axios({
        method: 'GET',
        url: `${api}/check_register/`
    })
        .then(response => dispatch({type: CHECK_REGISTER, data: response.data}))
        .catch(() => dispatch({type: CHECK_REGISTER, data: {success: false, message: 'Server is off'}}))
}