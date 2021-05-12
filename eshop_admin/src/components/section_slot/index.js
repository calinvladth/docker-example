import React from 'react'
import style from './index.module.sass'
import {Link} from "react-router-dom";

const SectionSlotComponent = ({title = "Title", action = false, children}) => (
    <div className={style.box}>
        <div>
            <h1>{title}</h1>
            {
                action && <Link to={action.link}>
                    <div className={style.icon}>
                        {action.icon}
                    </div>
                </Link>
            }

        </div>
        <div>
            {children}
        </div>
    </div>
)

export default SectionSlotComponent