import axios from "axios";
import {api} from "../../config";
import {GET_EMAILS} from "./types";
import {SetAlert} from "../alerts/actions";
import {addQuery} from "../../services/url";

export const GetEmails = (page = 1, filters = {}) => (dispatch, getState) => {
    filters['admin'] = true
    filters['shop'] = localStorage.getItem('shop')
    filters['page'] = page
    const str = addQuery(filters)
    axios({
        method: 'GET',
        url: `${api}/newsletter/?${str}`
    })
        .then(response => {
            const {config: {data: {pagination}}} = getState()
            dispatch({type: GET_EMAILS, data: response.data, page: page, limit: pagination.items_admin || 6})
        })
        .catch((error) => SetAlert({success: false, message: error.statusCode}))
}