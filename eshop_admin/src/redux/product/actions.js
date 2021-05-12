import axios from "axios";
import {api} from "../../config";
import {CLEAR_PRODUCT_STATE, GET_PRODUCT, LOADING_PRODUCT} from "./types";
import {ProductPathRQ} from "../../pages/product";
import {ProductsPath} from "../../pages/products";
import {SetAlert} from "../alerts/actions";

export const ClearProductState = () => (dispatch, getState) => {
    dispatch({type: CLEAR_PRODUCT_STATE})
}

export const LoadingProduct = () => (dispatch) => {
    dispatch({type: LOADING_PRODUCT})
}

export const GetProduct = (pk) => (dispatch, getState) => {
    axios({
        'method': 'GET',
        'url': `${api}/products/${pk}/?shop=${localStorage.getItem('shop')}`
    })
        .then(response => dispatch({type: GET_PRODUCT, data: response.data}))
        .catch(error => console.log('ERROR FETCHING PRODUCT'))
}

export const CreateProduct = (data, history) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/products/`,
        data: {...data, shop: localStorage.getItem('shop')}
    })
        .then(response => {
            history.push(`${ProductPathRQ}/${response.data.data.id}`)
            dispatch(SetAlert(response.data))
        })
        .catch(() => console.log('ERROR CREATING PRODUCT DETAILS'))
}

export const EditProduct = (pk, data) => (dispatch, getState) => {
    axios({
        method: 'PUT',
        url: `${api}/products/${pk}/`,
        data: data
    })
        .then(response => {
            dispatch(GetProduct(pk))
        })
        .catch(() => console.log('ERROR UPDATING PRODUCT DETAILS'))
}

export const DeleteProduct = (pk, history) => (dispatch, getState) => {
    axios({
        method: 'DELETE',
        url: `${api}/products/${pk}/`,
    })
        .then(() => {
            dispatch(SetAlert({success: true, message: 'product deleted'}))
            history.push(ProductsPath)
        })
        .catch(() => console.log('ERROR DELETING PRODUCT'))
}

export const ActivateOrDeactivateProduct = (pk) => (dispatch, getState) => {
    axios({
        method: 'PUT',
        url: `${api}/products/${pk}/activate/`,
    })
        .then(response => {
            dispatch(SetAlert(response.data))
            dispatch(GetProduct(pk))
        })
        .catch(error => {
            dispatch(SetAlert({success: false, message: error.response.data.message}))
        })
}

export const PostSpec = (product_id, data) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/products/${product_id}/specs/`,
        data: data
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log('ERROR CREATING SPEC'))
}

export const DeleteSpec = (product_id, spec_id) => (dispatch, getState) => {
    axios({
        method: 'DELETE',
        url: `${api}/products/${product_id}/specs/${spec_id}/`
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log('ERROR DELETING SPEC'))

}

export const BulkEditSpecs = (product_id, data) => (dispatch, getState) => {

    axios({
        method: 'PUT',
        url: `${api}/products/${product_id}/specs/`,
        data: {
            product: product_id,
            specs: data
        }
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log('ERROR UPDATING SPECS'))
}