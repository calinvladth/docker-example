import React, {useEffect} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import BillingComponent from "./components/billing";
import PaymentComponent from "./components/payment";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {GetOrder} from "../../redux/order/actions";
import ProductComponent from "./components/products";
import ActionsComponent from "./components/actions";

export const OrderPath = `/orders/:id`
export const OrderPathRQ = '/orders'

const OrderPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const order = useSelector(state => state.order)

    useEffect(() => {
        dispatch(GetOrder(id))
    }, [id, dispatch])

    useEffect(() => {
        if (order.success && order.loaded) document.title = `Order from ${order.data.billing_address.firstName} ${order.data.billing_address.lastName}`
    }, [order.success, order.loaded, order.data.billing_address])

    if (order.success && order.loaded) {
        return (
            <div className={style.box}>
                <section>
                    <SectionSlotComponent
                        title={'Billing info'}>
                        <BillingComponent billing={order.data.billing_address}/>
                    </SectionSlotComponent>
                </section>

                <section>
                    <SectionSlotComponent
                        title={'Payment info'}>
                        <PaymentComponent/>
                    </SectionSlotComponent>
                </section>

                <section>
                    <SectionSlotComponent title={'Products'}>
                        <ProductComponent products={order.data.products}/>
                    </SectionSlotComponent>
                </section>

                <section>
                    <SectionSlotComponent title={'Actions'}>
                        <ActionsComponent/>
                    </SectionSlotComponent>
                </section>
            </div>
        )
    } else {
        return <div>
            <p>Loading...</p>
        </div>
    }


}

export default OrderPage