import axios from 'axios'
import {api} from "../../config";
import {GetProduct, LoadingProduct} from "../product/actions";

export const PostImages = (product_id, data) => (dispatch, getState) => {
    dispatch(LoadingProduct())
    axios({
        method: 'POST',
        url: `${api}/products/${product_id}/images/`,
        data: data
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log("ERROR POSTING IMAGES"))
}

export const BulkEditImages = (product_id, images) => (dispatch, getState) => {
    axios({
        method: 'PUT',
        url: `${api}/products/${product_id}/images/`,
        data: {
            product: product_id,
            images: images
        }
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log("ERROR UPDATING IMAGES"))
}

export const RemoveImage = (product_id, image_id) => (dispatch, getState) => {
    axios({
        method: 'DELETE',
        url: `${api}/products/${product_id}/images/${image_id}`
    })
        .then(() => dispatch(GetProduct(product_id)))
        .catch(() => console.log("ERROR DELETING IMAGE ", image_id))
}