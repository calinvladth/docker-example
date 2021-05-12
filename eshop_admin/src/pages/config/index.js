import React, {useEffect} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import FormShippingComponent from "./components/form_shipping";
import FormPaymentComponent from "./components/form_payment";
import FormPaginationComponent from "./components/form_pagination";
import {useSelector} from "react-redux";

export const ConfigPath = '/config'

const ConfigPage = () => {

    const config = useSelector(state => state.config)
    useEffect(() => {
        document.title = 'Configurations'
    }, [])

    if (config.success && config.loaded) {
        return (
        <div className={style.box}>
            <section>
                <SectionSlotComponent title={'Taxes'}>
                    <FormShippingComponent data={config.data.taxes} timestamp={config.timestamp}/>
                </SectionSlotComponent>
            </section>

            <section>
                <SectionSlotComponent title={'Pagination'}>
                    <FormPaginationComponent data={config.data.pagination} timestamp={config.timestamp}/>
                </SectionSlotComponent>
            </section>

            <section>
                <SectionSlotComponent title={'Payment'}>
                    <FormPaymentComponent data={config.data.payment} timestamp={config.timestamp}/>
                </SectionSlotComponent>
            </section>


        </div>
    )
    } else {
        return (
            <div>
                <p>Loading ...</p>
            </div>
        )
    }



}

export default ConfigPage