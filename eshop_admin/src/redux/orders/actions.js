import axios from 'axios'
import {GET_ORDERS} from "./types";
import {api} from "../../config";
import {addQuery} from "../../services/url";

export const GetOrders = (page = 1, filters = {}) => (dispatch, getState) => {
    filters['admin'] = true
    filters['shop'] = localStorage.getItem('shop')
    filters['page'] = page
    const str = addQuery(filters)
    axios({
        method: 'GET',
        url: `${api}/order/?${str}`
    })
        .then(response => {
            const {config: {data: {pagination}}} = getState()
            dispatch({type: GET_ORDERS, data: response.data, page: page, limit: pagination.items_admin || 6})
        })
        .catch(error => console.log('ERROR FETCHING ORDERS'))
}