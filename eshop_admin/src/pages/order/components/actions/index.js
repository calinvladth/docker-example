import React from 'react'
import style from './index.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {CancelOrder, ProcessOrder} from "../../../../redux/order/actions";

const ActionsComponent = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const order = useSelector(state => state.order)


    return (
        <div className={style.box}>
            <div
                className={order.data.canceled ? style.canceled : null}
                onClick={() => dispatch(CancelOrder(id))}>
                <p>{order.data.canceled ? 'Canceled order' : 'Cancel Order'}</p>
            </div>
            <div
                className={order.data.processed ? style.processed : style.process}
                onClick={() => dispatch(ProcessOrder(id))}
            >
                <p>{order.data.processed ? 'Processed' : 'Process Order'}</p>
            </div>
        </div>
    )
}

export default ActionsComponent