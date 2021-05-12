import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ProductsPage, {ProductsPath} from "./products";
import OrdersPage, {OrdersPath} from "./orders";

import style from './index.module.sass'
import ProductPage, {ProductPath} from "./product";
import OrderPage, {OrderPath} from "./order";
import NewProductPage, {NewProductPath} from "./new_product";
import HeaderComponent from "../components/header";
import AuthenticationPage, {AuthenticationPath} from "./authentication";
import {useSelector} from "react-redux";
import ConfigPage, {ConfigPath} from "./config";
import MessagesPage, {MessagesPath} from "./mesages";
import EmailsPage, {EmailsPath} from "./emails";
import MessagePage, {MessagePath} from "./message";
import SelectShopPage, {SelectShopPath} from "./select_shop";


const Routes = () => {
    const account = useSelector(state => state.account)
    const {check_server, check_shop} = useSelector(state => state)
    if (check_server.loaded && check_server.success) {


        if (account.loaded && account.is_authenticated) {
            return (
                <div className={style.box}>
                    <BrowserRouter>

                        <div className={style.boxContent}>

                            <div>
                                <div>
                                    <HeaderComponent/>
                                </div>

                                {
                                    check_shop.success && check_shop.loaded
                                        ?
                                        <Switch>
                                            {/*<Route path="/" exact><Redirect to={ProductsPath}/></Route>*/}
                                            <Route path={ProductsPath} exact><ProductsPage/></Route>
                                            <Route path={ProductPath} exact><ProductPage/></Route>
                                            <Route path={NewProductPath} exact><NewProductPage/></Route>
                                            <Route path={OrdersPath} exact><OrdersPage/></Route>
                                            <Route path={OrderPath} exact><OrderPage/></Route>
                                            <Route path={ConfigPath} exact><ConfigPage/></Route>
                                            <Route path={MessagesPath} exact><MessagesPage/></Route>
                                            <Route path={MessagePath} exact><MessagePage/></Route>
                                            <Route path={EmailsPath} exact><EmailsPage/></Route>

                                            <Route><Redirect to={ProductsPath}/></Route>
                                        </Switch>
                                        :
                                        <Switch>
                                            <Route path={SelectShopPath} exact><SelectShopPage/></Route>
                                            <Route path={ConfigPath} exact><ConfigPage/></Route>
                                            <Route><Redirect to={SelectShopPath}/></Route>
                                        </Switch>
                                }

                            </div>
                        </div>

                    </BrowserRouter>

                </div>
            )
        } else if (account.loaded && !account.is_authenticated) {
            return (
                <div className={style.box}>
                    <BrowserRouter>
                        <div className={style.boxContent}>
                            <Switch>
                                <Route path={AuthenticationPath}><AuthenticationPage/></Route>
                                <Route><Redirect to={AuthenticationPath}/></Route>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            )

        } else {
            return (
                <div>
                    <p>Loading ...</p>
                </div>
            )
        }
    } else if (check_server.loaded && !check_server.success) {
        return <div>
            <p>Server is off. Please contact your developer</p>
        </div>
    } else {
        return <div>
            <p>Loading ...</p>
        </div>
    }

}

export default Routes