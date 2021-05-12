import React from 'react'
import style from '../../index.module.sass'
import moment from "moment";
import {MessagePathRQ} from "../../../message";
import {Link} from "react-router-dom";


const ItemComponent = ({message}) => (
    <Link to={`${MessagePathRQ}/${message.id}/`}>
        <div className={`${style.table} ${style.tableItem}`}>
            <div>
                <span>{message.subject}</span>
            </div>

            <div>
                <span>{moment.unix(message.created).format('DD-MM-YYYY')}</span>
            </div>
        </div>
    </Link>
)

export default ItemComponent