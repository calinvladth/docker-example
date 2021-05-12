import React, {useEffect} from 'react'
import {useParams} from "react-router";
import ImagesComponent from "./components/images";
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import DetailsComponent from "./components/details";
import SpecsComponent from "./components/specs";
import {useDispatch, useSelector} from "react-redux";
import {GetProduct} from "../../redux/product/actions";
import CategoryComponent from "./components/category";
import ActionsComponent from "./components/actions";

export const ProductPath = '/product/:id'
export const ProductPathRQ = '/product'


const ProductPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    const product = useSelector(state => state.product)

    const product_details = {
        name: product.data.name,
        price: product.data.price,
        description_short: product.data.description_short,
        description_long: product.data.description_long
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(GetProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        if (product.success && product.loaded) document.title = product.data.name
    }, [product.success, product.loaded, product.data.name])

    if (product.success && product.loaded) {
        return (
            <div className={style.box}>
                <section>
                    <SectionSlotComponent
                        title={'Images'}
                    >
                        <ImagesComponent images={product.data.images}/>
                    </SectionSlotComponent>
                </section>

                <section>
                    <SectionSlotComponent
                        title={'Details'}
                    >
                        <DetailsComponent product={product_details}/>
                    </SectionSlotComponent>
                </section>

                <section>
                    <SectionSlotComponent
                        title={'Specs'}
                    >
                        <SpecsComponent specs={product.data.specs}/>
                    </SectionSlotComponent>
                </section>

                <section>
                    <SectionSlotComponent
                        title={`Category ${product.data.category ? `(${product.data.category.category.name})` : ''}`}>
                        <CategoryComponent/>
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

export default ProductPage