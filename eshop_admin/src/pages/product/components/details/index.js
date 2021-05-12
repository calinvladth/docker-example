import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import {ClearProductState, EditProduct} from "../../../../redux/product/actions";

const DetailsComponent = ({product}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [descriptionFull, setDescriptionFull] = useState('')
    const [readOnly, setReadOnly] = useState(true)
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description_short)
        setDescriptionFull(product.description_long)

        return function cleanup() {
            dispatch(ClearProductState())
        }
        // eslint-disable-next-line
    }, [dispatch, id])

    const submit = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            price: price,
            description_short: description,
            description_long: descriptionFull
        }

        !readOnly && dispatch(EditProduct(id, data))
        
        setReadOnly(!readOnly)
    }

    return (
        <form className={style.box} onSubmit={(e) => submit(e)}>

            <div className={style.input}>
                <label>Name</label>
                <input
                    required
                    readOnly={readOnly}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className={style.input}>
                <label>Price</label>
                <input
                    required
                    readOnly={readOnly}
                    type="number"
                    step="0.01"
                    min={1}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>

            <div className={style.input}>
                <label>Short Description</label>
                <input
                    required
                    readOnly={readOnly}
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className={style.input}>
                <label>Full Description</label>
                <textarea
                    required
                    readOnly={readOnly}
                    value={descriptionFull}
                    onChange={e => setDescriptionFull(e.target.value)}
                />
            </div>

            <div>
                {
                    readOnly
                        ?
                        <button>Edit</button>
                        :
                        <button>Save</button>
                }

            </div>


        </form>
    )
}

export default DetailsComponent