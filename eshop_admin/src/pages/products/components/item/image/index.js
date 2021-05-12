import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import {api} from "../../../../../config";
import NoImage from '../../../../../assets/images/no-image.png'


const ImageComponent = ({image, index}) => {
    const [item, setItem] = useState({})

    useEffect(() => {
        setItem(image)
    }, [image])

    const notLoaded = (image) => {
        setItem({
            ...image,
            alternativeImage: true
        })
    }
    return (
        <div className={style.box}>
            <div className={style.boxBar}>
                <p>{index + 1}</p>
            </div>

            <div className={style.boxImage}>
                {
                    item.alternativeImage
                        ? <img
                            alt=""
                            src={NoImage}/>
                        : <img
                            onError={() => notLoaded(item)}
                            alt=""
                            src={item.path && api + item.path}
                        />
                }

            </div>
        </div>
    )
}

export default ImageComponent