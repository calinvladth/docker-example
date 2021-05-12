import React from 'react'
import style from './index.module.sass'
import ImageComponent from "./image";
import {ProductPathRQ} from "../../../product";
import {Link} from "react-router-dom";
import {OrderByIndex} from "../../../../services/reorder";

const ItemComponent = ({product, quantity = false, currency}) => {
    return (
        <Link to={`${ProductPathRQ}/${product.id}`}>
            <div className={style.box}>

                <div className={style.image}>
                    {
                        OrderByIndex(product.images).map((o, index) => <ImageComponent key={o.id} image={o}
                                                                                       index={index}/>)
                    }
                </div>
                <div className={style.name}>
                    <p>{product.name}</p>
                </div>
                <div className={style.price}>
                    <p>{quantity && `${quantity} x `}{product.price} {currency}</p>
                </div>
                <div className={style.status}>
                    <span className={product.active ? style.statusActive : style.statusInactive}>&nbsp;</span>
                </div>

            </div>
        </Link>
    )
}

export default ItemComponent