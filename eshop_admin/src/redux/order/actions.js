import axios from 'axios'
import {api} from "../../config";
import {GET_ORDER} from "./types";
import {SetAlert} from "../alerts/actions";

export const GetOrder = (pk) => (dispatch, getState) => {
    axios({
        method: 'GET',
        url: `${api}/order/${pk}/`
    })
        .then(response => dispatch({type: GET_ORDER, data: response.data}))
        .catch(error => console.log('ERROR FETCHING ORDER'))
}

export const EditOrder = (pk, data) => (dispatch, getState) => {
    axios({
        method: 'PUT',
        url: `${api}/order/${pk}/`,
        data: {
            id: pk,
            billing_address: data
        }
    })
        .then(response => dispatch(GetOrder(pk)))
        .catch(error => console.log('ERROR FETCHING ORDER'))
}

export const ProcessOrder = (pk) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/order/${pk}/process/`
    })
        .then(response => {
            dispatch(SetAlert(response.data))
            dispatch(GetOrder(pk))
        })
        .catch(error => console.log('ERROR PROCESSING ORDER'))
}

export const CancelOrder = (pk) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/order/${pk}/cancel/`
    })
        .then(response => {
            dispatch(SetAlert(response.data))
            dispatch(GetOrder(pk))
        })
        .catch(error => console.log('ERROR CANCELING ORDER'))
}