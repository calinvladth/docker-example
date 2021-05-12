import axios from 'axios'
import {api} from "../../config";
import {GET_PRODUCTS} from "./types";
import {addQuery} from "../../services/url";

export const GetProducts = (page = 1, filters = {}) => (dispatch, getState) => {
    filters['admin'] = true
    filters['shop'] = localStorage.getItem('shop')
    filters['page'] = page
    const str = addQuery(filters)
    axios({
        'method': 'GET',
        'url': `${api}/products/?${str}`
    })
        .then(response => {
            const {config: {data: {pagination}}} = getState()
            dispatch({type: GET_PRODUCTS, data: response.data, page: page, limit: pagination.items_admin})
        })
        .catch(error => console.log('ERROR FETCHING PRODUCTS'))
}