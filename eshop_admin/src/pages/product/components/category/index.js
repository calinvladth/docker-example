import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {
    CreateOrEditProductCategory,
    DeleteCategory,
    EditCategory,
    GetCategories,
    PostCategory
} from "../../../../redux/categories/actions";
import {useParams} from "react-router";

const CategoryComponent = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    const product = useSelector(state => state.product)
    useEffect(() => {
        dispatch(GetCategories())
    }, [dispatch])

    if (categories.success && categories.loaded) {
        return (
            <div className={style.box}>
                <div>
                    <CreateCategory/>
                </div>
                <div>
                    <ListCategories data={categories.data} product={product.data}/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p>Loading ...</p>
            </div>
        )
    }

}

const CreateCategory = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const submit = (e) => {
        e.preventDefault()
        dispatch(PostCategory({name: name}))
        setName('')
    }
    return (
        <form className={style.form} onSubmit={(e) => submit(e)}>
            <input
                placeholder={'Category name'}
                type="text"
                required={true}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button>Save</button>
        </form>
    )
}

const ListCategories = ({data, product}) => {
    const [activeItem, setActiveItem] = useState({})
    const [editItem, setEditItem] = useState({})
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const {id} = useParams()

    const submit = () => {
        dispatch(EditCategory(editItem.id, {name: name}, id))
    }

    return (
        <div className={style.boxList}>
            {data.map(o => <div
                    key={o.name}
                    className={style.boxListItem}
                    onMouseEnter={() => setActiveItem(o)}
                    onDoubleClick={() => {
                        setEditItem(o)
                        setName(o.name)
                    }}
                    onMouseLeave={() => {
                        setActiveItem({})
                        setEditItem({})
                        setName('')
                    }}
                >

                    <input type="text"
                           value={editItem.name === o.name ? name : o.name}
                           onClick={() => dispatch(CreateOrEditProductCategory(id, o.id))}
                           onChange={e => {
                               setName(e.target.value)
                           }}
                           required={true}
                           readOnly={false}

                    />

                    {activeItem.name === o.name && editItem.name !== o.name &&
                    <span onClick={() => dispatch(DeleteCategory(o.id, id))}>Remove</span>}
                    {editItem.name === o.name && <span onClick={() => submit()} className={style.boxListEdit}>Save</span>}
                </div>
            )}

        </div>
    )
}

export default CategoryComponent