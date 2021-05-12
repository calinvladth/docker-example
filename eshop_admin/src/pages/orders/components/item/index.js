import React from 'react'
import style from './index.module.sass'
import {OrderPathRQ} from "../../../order";
import {Link} from "react-router-dom";
import moment from 'moment'

const ItemComponent = ({order}) => {
    const created = moment.unix(order.created).format('DD-MM-YYYY')
    return (
        <Link to={`${OrderPathRQ}/${order.id}`}>
            <div className={`${style.box} ${order.canceled ? style.canceled : null}`}>
                <div>
                    <p>{order.billing_address.email}</p>
                </div>
                <div>
                    <p>{order.billing_address.city}</p>
                </div>
                <div>
                    <p>{order.payment.card ? 'card' : 'on delivery'}</p>

                </div>
                <div>
                    <p>{order.total_price}</p>
                </div>
                <div className={`${style.processed} ${order.processed ? style.processedActive : null}`}>
                    <span>&nbsp;</span>
                </div>
                <div>
                    <p>{created}</p>
                </div>
            </div>
        </Link>
    )
}

export default ItemComponent