import React from 'react'
import style from './index.module.sass'
import ItemComponent from "../../../products/components/item";

const ProductComponent = ({products}) => {
    return (
        <div className={style.box}>
            {
                products.map(o =>
                    <div key={o.id}>
                        <ItemComponent product={o} quantity={o.quantity}/>
                    </div>)
            }

        </div>
    )
}

export default ProductComponent