import {combineReducers} from "redux";
import CheckServerReducers from "./check_server/reducers";
import ProductsReducers from "./products/reducers";
import ProductReducers from "./product/reducers";
import OrdersReducers from "./orders/reducers";
import OrderReducers from "./order/reducers";
import CategoriesReducers from "./categories/reducers";
import AuthenticationReducers from "./authentication/reducers";
import AlertReducer from "./alerts/reducers";
import ConfigReducers from "./config/reducers";
import CheckRegisterReducers from "./check_register/reducers";
import MessagesReducers from "./messages/reducers";
import EmailsReducers from "./emails/reducers";
import MessageReducers from "./message/reducers";
import CheckShopReducers from "./check_shop/reducers";

const allReducers = combineReducers({
    alerts: AlertReducer,
    check_server: CheckServerReducers,
    check_register: CheckRegisterReducers,
    check_shop: CheckShopReducers,
    config: ConfigReducers,
    account: AuthenticationReducers,
    products: ProductsReducers,
    product: ProductReducers,
    orders: OrdersReducers,
    order: OrderReducers,
    categories: CategoriesReducers,
    messages: MessagesReducers,
    message: MessageReducers,
    emails: EmailsReducers
})

export default allReducers
