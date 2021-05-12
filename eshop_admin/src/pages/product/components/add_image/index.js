import React from 'react'
import style from './index.module.sass'
import AddSvg from "../../../../assets/icons/add";
import {useDispatch} from "react-redux";
import {PostImages} from "../../../../redux/images/actions";
import {useParams} from "react-router";

const AddImage = ({product_id}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const submitImage = (e) => {
        const files = e.target.files
        const formData = new FormData()

        for (const file of files) {
            formData.append('path', file)
        }
        dispatch(PostImages(id, formData))
    }

    return (
        <div className={style.box}>
            <input
                style={{display: 'none'}}
                type="file" id="file"
                accept="image/*"
                multiple={true}
                onChange={(e) => submitImage(e)}/>
            <label className={style.boxLabel} htmlFor="file">
                <span>
                    <AddSvg/>
                </span>
            </label>
        </div>
    )
}

export default AddImage