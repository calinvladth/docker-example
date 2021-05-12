import React, {useEffect} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import FormComponent from "./components/form";

export const NewProductPath = '/product'

const NewProductPage = () => {
    useEffect(() => {
        document.title = 'Create new product'
    }, [])
    return (
        <div className={style.box}>
            <section>
                <SectionSlotComponent
                    title={'New Product'}
                >
                    <FormComponent/>
                </SectionSlotComponent>
            </section>
        </div>
    )
}

export default NewProductPage