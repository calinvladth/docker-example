import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import AddSpecComponent from "./add_spec";
import SpecComponent from "./spec";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {OrderByIndex, ReorderArray} from "../../../../services/reorder";
import {useDispatch} from "react-redux";
import {BulkEditSpecs} from "../../../../redux/product/actions";
import {useParams} from "react-router";

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    ...draggableStyle
});

const SpecsComponent = ({specs}) => {
    const [items, setItems] = useState([])
    const [activeItem, setActiveItem] = useState({})
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        setItems(OrderByIndex(specs))
        // eslint-disable-next-line
    }, [specs.length])


    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = ReorderArray(
            items,
            result.source.index,
            result.destination.index
        )

        dispatch(BulkEditSpecs(id, newItems))

        setItems(newItems)
    }

    return (
        <div className={style.box}>
            <AddSpecComponent/>


            <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
                <Droppable droppableId="droppable">
                    {
                        (provided, snapshot) =>
                            <div className={style.boxSpecs}
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}
                            >
                                {
                                    items.map((item, index) => <Draggable key={item.id} draggableId={`${item.id}`}
                                                                          index={index}>
                                        {
                                            (provided, snapshot) => <div

                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onMouseEnter={() => setActiveItem(item)}
                                                onMouseLeave={() => setActiveItem({})}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <SpecComponent spec={item} active={activeItem.id === item.id}/>
                                            </div>
                                        }
                                    </Draggable>)
                                }
                                {provided.placeholder}
                            </div>
                    }

                </Droppable>
            </DragDropContext>


        </div>
    )
}

export default SpecsComponent