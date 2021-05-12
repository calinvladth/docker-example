import React, {useState} from 'react'
import style from "../../../product/components/details/index.module.sass";
import {useDispatch} from "react-redux";
import {CreateProduct} from "../../../../redux/product/actions";
import {useHistory} from "react-router";

const FormComponent = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()

    const submit = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            price: price
        }

        dispatch(CreateProduct(data, history))
    }

    return (
        <form className={style.box} onSubmit={(e) => submit(e)}>

            <div className={style.input}>
                <label>Name</label>
                <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className={style.input}>
                <label>Price</label>
                <input
                    required
                    type="number"
                    step="0.01"
                    min={1}
                    value={price}
                    onChange={e => setPrice(parseFloat(e.target.value))}
                />
            </div>

            <div>
                <button>Save</button>
            </div>
        </form>
    )
}

export default FormComponent