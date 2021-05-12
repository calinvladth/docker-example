import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import AddImage from "../add_image";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import  {ReorderArray, OrderByIndex} from "../../../../services/reorder";
import {api} from "../../../../config";
import RemoveImageComponent from "../remove_image";
import PrimaryImageComponent from "../primary_image";
import {useDispatch} from "react-redux";
import {BulkEditImages} from "../../../../redux/images/actions";
import {useParams} from "react-router";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    marginRight: '1rem',
    ...draggableStyle
});

const ImagesComponent = ({images}) => {
    const [items, setItems] = useState(OrderByIndex(images))
    const [activeItem, setActiveItem] = useState({})
    const [dragging, setDragging] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        setItems(OrderByIndex(images))
        // eslint-disable-next-line
    }, [images.length])

    function onDragStart(result) {
        setDragging(true)
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const newItems = ReorderArray(
            items,
            result.source.index,
            result.destination.index
        );

        dispatch(BulkEditImages(id, newItems))

        setItems(newItems)
        setDragging(false)
    }

    return (
        <div className={style.box}>

            <DragDropContext onDragStart={(e) => onDragStart(e)} onDragEnd={(e) => onDragEnd(e)}>
                <Droppable droppableId="droppable" direction="horizontal">

                    {
                        (provided, snapshot) => <div
                            className={style.imageSet}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >


                            {
                                items.map((item, index) =>
                                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                        {(provided, snapshot) => <div
                                            className={`${style.imageSetBox}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onMouseEnter={() => setActiveItem(item)}
                                            onMouseLeave={() => setActiveItem({})}
                                            style={getItemStyle(
                                                snapshot.isDraggingOver,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {
                                                index === 0 && activeItem.id !== item.id && <PrimaryImageComponent/>
                                            }
                                            {
                                                activeItem.id === item.id && <RemoveImageComponent item={item}/>
                                            }
                                            <img src={api + item.path} alt=""/>
                                        </div>
                                        }
                                    </Draggable>
                                )
                            }


                            {
                                !dragging && <div className={style.imageSetBox}>
                                    <AddImage/>
                                </div>
                            }

                            {provided.placeholder}
                        </div>
                    }

                </Droppable>
            </DragDropContext>


        </div>
    )

}


export default ImagesComponent