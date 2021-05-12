import React, {useEffect} from 'react'
import SectionSlotComponent from "../../components/section_slot";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {ClearMessageState, GetMessage} from "../../redux/message/actions";
import style from './index.module.sass'

export const MessagePath = `/messages/:id`
export const MessagePathRQ = '/messages'
const MessagePage = () => {
    const {message} = useSelector(state => state)
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetMessage(id))
        return function cleanup() {
            dispatch(ClearMessageState())
        }
    }, [id, dispatch])

    useEffect(() => {
        if (message.success && message.loaded) document.title = message.data.subject
    }, [message.success, message.loaded, message.data.subject])
    return (
        <div className={style.box}>
            <SectionSlotComponent title={'User message'}>
                {
                    message.success && message.loaded
                        ?
                        <div className={style.form}>
                            <div>
                                <label>Subject</label>
                                <input
                                    readOnly={true}
                                    type="text"
                                    defaultValue={message.data.subject}
                                />
                            </div>
                            <div>
                                <div>
                                    <label>Name</label>
                                    <input
                                        readOnly={true}
                                        type="text"
                                        defaultValue={message.data.name}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        readOnly={true}
                                        defaultValue={message.data.email}
                                    />
                                </div>
                            </div>

                            <div>
                                <label>Message</label>
                                <textarea
                                    readOnly={true}
                                    defaultValue={message.data.message}
                                />
                            </div>
                        </div>
                        :
                        <div>
                            <p>Loading ...</p>
                        </div>
                }

            </SectionSlotComponent>
        </div>
    )

}

export default MessagePage