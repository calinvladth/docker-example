import React from 'react'
import style from './index.module.sass'
import moment from "moment";

const ItemComponent = ({email}) => (
    <div className={style.box}>
        <div>
            <span>{email.email}</span>
        </div>
        <div>
            <span>{moment.unix(email.created).format('DD-MM-YYYY')}</span>
        </div>
    </div>
)

export default ItemComponent