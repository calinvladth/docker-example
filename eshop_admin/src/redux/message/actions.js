import axios from "axios";
import {api} from "../../config";
import {GET_MESSAGE} from "./types";
import {SetAlert} from "../alerts/actions";
import {CLEAR_MESSAGE_STATE} from "./types";

export const ClearMessageState = () => (dispatch, getState) => {
    dispatch({type: CLEAR_MESSAGE_STATE})
}

export const GetMessage = (id) => (dispatch, getState) => {
    axios({
        method: 'GET',
        url: `${api}/user_message/${id}/`
    })
        .then(response => dispatch({type: GET_MESSAGE, data: response.data}))
        .catch((error) => SetAlert({success: false, message: error.statusCode}))
}