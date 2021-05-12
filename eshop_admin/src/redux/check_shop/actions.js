import axios from 'axios'
import {api} from "../../config";
import {CHECK_SHOP} from "./types";

export const CheckShop = (shop) => (dispatch, geState) => {
    let obj = shop
    if (shop) {
        localStorage.setItem('shop', obj)
    } else {
        obj = localStorage.getItem('shop')
    }

    axios({
        method: 'POST',
        url: `${api}/check_shop/?shop=${obj}`
    })
        .then(response => dispatch({type: CHECK_SHOP, data: response.data}))
        .catch((error) => dispatch({type: CHECK_SHOP, data: {success: false, message: 'Server is off'}}))
}