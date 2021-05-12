import React, {useEffect} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import ItemComponent from "./components/item";
import {useDispatch, useSelector} from "react-redux";
import {GetOrders} from "../../redux/orders/actions";
import TitleComponent from "./components/title";
import Pagination from "../../components/pagination";
import {useHistory} from "react-router-dom";
import {addQuery, useQuery} from "../../services/url";

export const OrdersPath = '/orders'

const OrdersPage = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)

    // Query
    const history = useHistory()
    const query = useQuery()
    const page = query.get('page') || 1
    let filters_data = {}
    filters_data['page'] = query.get('page') || 1

    useEffect(() => {
        document.title = 'Orders'
        dispatch(GetOrders(page, filters_data))
        // eslint-disable-next-line
    }, [
        dispatch,
        filters_data.page
    ])

    const pagination = (page = 1) => {
        // If no page query, set to 1
        filters_data['page'] = page
        history.push(OrdersPath + `?${addQuery(filters_data)}`)
    }

    return (
        <div className={style.box}>

            <section>
                <SectionSlotComponent title={'All Orders'}>


                    {
                        orders.data.length > 0
                            ?
                            <OrdersList orders={orders} pagination={pagination}/>
                            :
                            <div>
                                <p>No orders ...</p>
                            </div>
                    }


                    {/*</Pagination>*/}

                </SectionSlotComponent>
            </section>

        </div>
    )
}

const OrdersList = ({orders, pagination}) => (
    <Pagination data={orders.pagination} action={pagination}>
        <div>
            <TitleComponent/>
        </div>


        {
            orders.data.map(o => <div key={o.id} className={style.boxItem}>
                <ItemComponent order={o}/>
            </div>)

        }
    </Pagination>
)

export default OrdersPage