import React from 'react'
import style from './index.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import {ActivateOrDeactivateProduct, DeleteProduct} from "../../../../redux/product/actions";

const ActionsComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    const product = useSelector(state => state.product)

    return (
        <div className={style.box}>
            <div onClick={() => dispatch(DeleteProduct(id, history))}>
                <p>Remove</p>
            </div>
            <div
                className={product.data.active ? style.deactivate : style.activate}
                onClick={() => dispatch(ActivateOrDeactivateProduct(id))}
            >
                <p>{product.data.active ? 'Deactivate' : 'Activate'}</p>
            </div>

        </div>
    )
}

export default ActionsComponent