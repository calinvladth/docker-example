import React from 'react'
import style from './index.module.sass'
import {Link, useLocation} from "react-router-dom";
import {ProductsPath} from "../../pages/products";
import {OrdersPath} from "../../pages/orders";
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from "../../redux/authentication/actions";
import {ConfigPath} from "../../pages/config";
import {MessagesPath} from "../../pages/mesages";
import {EmailsPath} from "../../pages/emails";
import {CheckShop} from "../../redux/check_shop/actions";
import {SelectShopPath} from "../../pages/select_shop";

const HeaderComponent = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {check_shop} = useSelector(state => state)

    return (
        <div className={style.box}>

            <div className={style.logOut}>
                {
                    check_shop.success && check_shop.loaded
                        ?
                        <div>
                            <span style={{color: 'black', paddingRight: '.5rem'}}>
                                {localStorage.getItem('shop')} |
                            </span>
                            <span onClick={() => {
                                localStorage.removeItem('shop')
                                dispatch(CheckShop())
                            }}>Change Shop</span>
                        </div>

                        :
                        <span onClick={() => dispatch(LogOut())}>Logout</span>
                }

            </div>
            {
                check_shop.success && check_shop.loaded
                    ?
                    <div className={style.links}>
                        <div className={location.pathname === ProductsPath ? style.active : null}>
                            <Link to={ProductsPath}>Products</Link>
                        </div>
                        <div className={location.pathname === OrdersPath ? style.active : null}>
                            <Link to={OrdersPath}>Orders</Link>
                        </div>

                        <div className={location.pathname === MessagesPath ? style.active : null}>
                            <Link to={MessagesPath}>Messages</Link>
                        </div>

                        <div className={location.pathname === EmailsPath ? style.active : null}>
                            <Link to={EmailsPath}>Emails</Link>
                        </div>
                    </div>
                    :
                    <div className={style.links}>
                        {
                            location.pathname !== ConfigPath ?
                                <div className={location.pathname === ConfigPath ? style.active : null}>
                                    <Link to={ConfigPath}>Config</Link>
                                </div>
                                :
                                <div
                                    className={location.pathname === SelectShopPath ? style.active : null}>
                                    <Link to={SelectShopPath}>Shops</Link>
                                </div>
                        }
                    </div>
            }


        </div>
    )
}

export default HeaderComponent