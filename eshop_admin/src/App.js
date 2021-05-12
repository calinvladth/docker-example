import React, {useEffect} from "react";
import Routes from "./pages/routes";
import {useDispatch, useSelector} from "react-redux";
import {CheckServer} from "./redux/check_server/actions";
import {CheckAccount} from "./redux/authentication/actions";
import AlertComponent from "./components/alert";
import {GetConfig} from "./redux/config/actions";
import {CheckShop} from "./redux/check_shop/actions";

const App = () => {
    const dispatch = useDispatch()
    const {check_server} = useSelector(state => state)
    useEffect(() => {
        dispatch(CheckServer())

        if (check_server.success) {
            dispatch(CheckAccount())
            dispatch(GetConfig())
            dispatch(CheckShop())
        }
        // eslint-disable-next-line
    }, [check_server.loaded])
    return (
        <div>
            <Routes/>
            <AlertComponent/>
        </div>
    );
}

export default App;
