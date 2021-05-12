import React from 'react'
import style from './index.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {CheckShop} from "../../redux/check_shop/actions";

export const SelectShopPath = '/select_shop'


const SelectShopPage = () => {
    const dispatch = useDispatch()
    const {config} = useSelector(state => state)

    function submit(shop) {
        dispatch(CheckShop(shop))
    }

    if (config.success && config.loaded) {
        return (
            <div className={style.box}>
                <h1>Select shop</h1>

                <ul>
                    {
                        config.data.shops.map(o => <li
                            key={o}
                            onClick={() => submit(o)}
                        >{o}</li>)
                    }
                </ul>


            </div>
        )
    } else {
        return <div>
            <p>Loading ...</p>
        </div>
    }

}

export default SelectShopPage