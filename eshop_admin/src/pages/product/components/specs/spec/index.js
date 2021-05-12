import React from 'react'
import style from "./index.module.sass";
import {useDispatch} from "react-redux";
import {DeleteSpec} from "../../../../../redux/product/actions";
import {useParams} from "react-router";

const SpecComponent = ({spec, active}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    return (
        <div className={style.box}>
            <div>
                <p>{spec.key}</p>
            </div>
            <div>
                <p>{spec.value}</p>
            </div>
            {active && <div className={style.remove} onClick={() => dispatch(DeleteSpec(id, spec.id))}>
                <p>Remove</p>
            </div>}

        </div>
    )
}

export default SpecComponent