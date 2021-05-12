import axios from 'axios'
import {api} from "../../config";
import {GET_CONFIG} from "./types";
import {SetAlert} from "../alerts/actions";

export const GetConfig = () => (dispatch, getState) => {
    axios({
        method: 'GET',
        url: `${api}/config/`
    })
        .then(response => dispatch({type: GET_CONFIG, data: response.data}))
        .catch((error) => SetAlert({success: false, message: error.response.data.message}))
}

export const EditConfig = (data) => (dispatch, getState) => {
    axios({
        method: 'PUT',
        url: `${api}/config/`,
        data: data
    })
        .then(response => {
            dispatch(SetAlert(response.data))
            dispatch(GetConfig())
        })
        .catch((error) => SetAlert({success: false, message: error.statusCode}))
}