import axios from 'axios'
import {api} from "../../config";
import {CHECK, CHECK_ERROR} from "./types";
import {SetAlert} from "../alerts/actions";

export const CheckAccount = () => (dispatch, getState) => {
    const token = localStorage.getItem('token')
    const headers = {Authorization: `Token ${token}`}
    axios({
        method: 'GET',
        url: `${api}/account/check/`,
        headers: headers
    })
        .then(response => dispatch({type: CHECK, data: response.data}))
        .catch(error => {
            localStorage.removeItem('token')
            dispatch({type: CHECK_ERROR})
        })
}

export const Login = (data) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/account/login/`,
        data: data
    })
        .then(response => {
            dispatch(SetAlert(response.data))
            localStorage.setItem('token', response.data.data.token)
            dispatch(CheckAccount())
        })
        .catch(error => dispatch(SetAlert({success: false, message: 'Invalid credentials'})))
}

export const Register = (data) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/account/register/`,
        data: data
    })
        .then(response => {
            dispatch(SetAlert(response.data))
            localStorage.setItem('token', response.data.data.token)
            dispatch(CheckAccount())
        })
        .catch(error => dispatch(SetAlert({success: false, message: 'Something went wrong'})))
}

export const LogOut = () => (dispatch, getState) => {
    dispatch(SetAlert({success: true, message: 'Goodbye'}))
    localStorage.removeItem('token')
    dispatch(CheckAccount())
}