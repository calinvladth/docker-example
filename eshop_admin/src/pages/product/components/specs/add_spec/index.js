import React, {useState} from 'react'
import style from "./index.module.sass";
import {useDispatch} from "react-redux";
import {PostSpec} from "../../../../../redux/product/actions";
import {useParams} from "react-router";

const AddSpecComponent = () => {
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const {id} = useParams()

    function submit(e) {
        e.preventDefault()
        if (!key || !value) return

        const data = {
            key, value
        }

        dispatch(PostSpec(id, data))

        setKey('')
        setValue('')
    }

    return (
        <form className={style.form} onSubmit={(e) => submit(e)}>
            <div className={style.formGroup}>
                <div className={style.formInput}>
                    <input
                        type="text"
                        placeholder={'Key'}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </div>

                <span>&nbsp;</span>

                <div className={style.formInput}>
                    <input
                        type="text"
                        placeholder={'Value'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>
            <div className={style.formAction}>
                <button>Save</button>
            </div>
        </form>
    )
}

export default AddSpecComponent