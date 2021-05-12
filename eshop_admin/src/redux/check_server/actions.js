import axios from 'axios'
import {api} from "../../config";
import {CHECK_SERVER} from "./types";

export const CheckServer = () => (dispatch, geState) => {
    axios({
        method: 'GET',
        url: `${api}/check_server`
    })
        .then(response => dispatch({type: CHECK_SERVER, data: response.data}))
        .catch((error) => dispatch({type: CHECK_SERVER, data: {success: false, message: 'Server is off'}}))
}