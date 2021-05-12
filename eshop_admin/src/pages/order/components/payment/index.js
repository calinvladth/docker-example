import React from '../../../../assets/style/index.sass'
import style from './index.module.sass'
import {useSelector} from "react-redux";

const PaymentComponent = () => {
    const {order} = useSelector(state => state)
    return (
        <div className={style.box}>
            <div className={style.formGroup}>
                <div>
                    <label>Payment type</label>
                    <input type="text" readOnly={true} value={`${order.data.payment.card ? 'card' : 'on delivery'}`}/>
                </div>

                {
                    order.data.payment.card &&
                    <div>
                        <label>Payment secret</label>
                        <input type="text" readOnly={true} value={order.data.payment.payment_id}/>
                    </div>
                }


            </div>
            <div>
                <label>Transacrion Currency</label>
                <input type="text" readOnly={true} value={`${order.data.currency}`}/>
            </div>
            <div>
                <label>Products Price</label>
                <input type="text" readOnly={true} value={`${order.data.total_products_price}`}/>
            </div>

            <div>
                <label>Shipping</label>
                <input type="text" readOnly={true} value={`${order.data.shipping_price}`}/>
            </div>
            <div>
                <label>Total Price</label>
                <input type="text" readOnly={true} value={`${order.data.total_price}`}/>
            </div>
        </div>
    )
}

export default PaymentComponent