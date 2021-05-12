import React, {useEffect} from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useSelector} from "react-redux";
import style from './index.module.sass'


const AlertComponent = () => {
    const alerts = useSelector(state => state.alerts)

    const notify = () => {
        if (alerts.success) toast.success(<p className={style.alertMessage}>{alerts.message}</p>)
        else toast.error(<p className={style.alertMessage}>{alerts.message}</p>)
    }

    useEffect(() => {
        if (alerts.message) {
            notify()
        }
        // eslint-disable-next-line
    }, [alerts.timestamp])


    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default AlertComponent
