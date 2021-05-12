import axios from 'axios'
import {api} from "../../config";
import {GET_CATEGORIES} from "./types";
import {GetProduct} from "../product/actions";

export const GetCategories = () => (dispatch, getState) => {
    axios({
        method: 'GET',
        url: `${api}/product_categories/?shop=${localStorage.getItem('shop')}`
    })
        .then(response => dispatch({type: GET_CATEGORIES, data: response.data}))
        .catch(error => console.log('ERROR GETTING CATEGORIES'))
}

export const PostCategory = (data) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/product_categories/`,
        data: {...data, shop: localStorage.getItem('shop')}
    })
        .then(() => dispatch(GetCategories()))
        .catch(() => console.log('ERROR POSTING CATEGORY'))
}

export const EditCategory = (pk, data, product_pk) => (dispatch, getState) => {
    axios({
        method: 'PUT',
        url: `${api}/product_categories/${pk}/`,
        data: data
    })
        .then(() => {
            dispatch(GetProduct(product_pk))
            dispatch(GetCategories())
        })
        .catch(() => console.log('ERROR UPDATING CATEGORY'))
}

export const DeleteCategory = (pk, product_pk) => (dispatch, getState) => {
    axios({
        method: 'DELETE',
        url: `${api}/product_categories/${pk}/`
    })
        .then(() => {
            dispatch(GetProduct(product_pk))
            dispatch(GetCategories())
        })
        .catch(() => console.log('ERROR DELETING CATEGORY'))
}

export const CreateOrEditProductCategory = (product_id, category_id) => (dispatch, getState) => {
    axios({
        method: 'POST',
        url: `${api}/product_categories/${product_id}/${category_id}/`
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log('ERROR Creating/Editing PRODUCT CATEGORY'))
}