import React, {useEffect, useState} from 'react'
import style from '../form.module.sass'
import {useDispatch} from "react-redux";
import {EditConfig} from "../../../../redux/config/actions";

const FormShippingComponent = ({data, timestamp}) => {
    const [shipping, setShipping] = useState(0)
    const [freeShippingOver, setFreeShippingOver] = useState(0)
    const [readOnly, setReadOnly] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setShipping(data.shipping)
        setFreeShippingOver(data.free_shipping_over)
    }, [data, timestamp])


    const submit = (e) => {
        e.preventDefault()
        const data = {
            taxes: {
                shipping: shipping,
                free_shipping_over: freeShippingOver
            }
        }

        !readOnly && dispatch(EditConfig(data))

        setReadOnly(!readOnly)
    }
    return (
        <form className={style.box} onSubmit={e => submit(e)}>
            <div>
                <label>Shipping price</label>
                <input
                    type="number"
                    required
                    readOnly={readOnly}
                    value={shipping}
                    onChange={e => setShipping(e.target.value)}
                />
            </div>
            <div>
                <label>Free shipping over</label>
                <input
                    type="number"
                    required
                    readOnly={readOnly}
                    value={freeShippingOver}
                    onChange={e => setFreeShippingOver(e.target.value)}
                />
            </div>
            <div>
                <button>{readOnly ? 'Edit' : 'Save'}</button>
            </div>
        </form>
    )
}

export default FormShippingComponent