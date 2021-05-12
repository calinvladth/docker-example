import React from 'react'
import style from "./index.module.sass";
import {useDispatch} from "react-redux";
import {RemoveImage} from "../../../../redux/images/actions";
import {useParams} from "react-router";

const RemoveImageComponent = ({item}) => {
    const dispatch = useDispatch()
    const {id} = useParams()

    return (
        <div className={style.box} onClick={() => {
            dispatch(RemoveImage(id, item.id))
        }}>
            <p>Remove</p>
        </div>
    )
}

export default RemoveImageComponent