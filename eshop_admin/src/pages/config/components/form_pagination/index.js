import React, {useEffect, useState} from 'react'
import style from '../form.module.sass'
import {useDispatch} from "react-redux";
import {EditConfig} from "../../../../redux/config/actions";

const FormPaginationComponent = ({data, timestamp}) => {
    const [itemsStore, setItemsStore] = useState(3)
    const [itemsAdmin, setItemsAdmin] = useState(3)
    const [readOnly, setReadOnly] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setItemsStore(data.items_store)
        setItemsAdmin(data.items_admin)
    }, [data, timestamp])

    const submit = (e) => {
        e.preventDefault()
        const data = {
            pagination: {
                items_store: itemsStore,
                items_admin: itemsAdmin,
            }
        }

        !readOnly && dispatch(EditConfig(data))

        setReadOnly(!readOnly)
    }
    return (
        <form className={style.box} onSubmit={e => submit(e)}>

            <div>
                <label>Items per page / store</label>
                <input
                    type="number"
                    required
                    readOnly={readOnly}
                    value={itemsStore}
                    onChange={e => setItemsStore(parseInt(e.target.value))}
                />
            </div>

            <div>
                <label>Items per page / admin view</label>
                <input
                    type="number"
                    required
                    readOnly={readOnly}
                    value={itemsAdmin}
                    onChange={e => setItemsAdmin(parseInt(e.target.value))}
                />
            </div>

            <div>
                <button>{readOnly ? 'Edit' : 'Save'}</button>
            </div>

        </form>
    )
}

export default FormPaginationComponent