import React, {useEffect} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import TitleComponent from "./components/title";
import ItemComponent from "./components/item";
import {useDispatch, useSelector} from "react-redux";
import {GetMessages} from "../../redux/messages/actions";
import Pagination from "../../components/pagination";
import {useHistory} from "react-router-dom";
import {addQuery, useQuery} from "../../services/url";

export const MessagesPath = '/messages'

const MessagesPage = () => {
    const dispatch = useDispatch()
    const {messages} = useSelector(state => state)

    // Query
    const history = useHistory()
    const query = useQuery()
    const page = query.get('page') || 1
    let filters_data = {}
    filters_data['page'] = query.get('page') || 1

    useEffect(() => {
        document.title = 'Messages From Shop'
        dispatch(GetMessages(page, filters_data))
        // eslint-disable-next-line
    }, [
        dispatch,
        filters_data.page
    ])


    const pagination = (page = 1) => {
        // If no page query, set to 1
        filters_data['page'] = page
        history.push(MessagesPath + `?${addQuery(filters_data)}`)
    }

    return (
        <div className={style.box}>

            <SectionSlotComponent title={'Users mesages'}>
                {
                    messages.success && messages.loaded && messages.data.length > 0
                        ?
                        <Pagination data={messages.pagination} action={pagination}>
                            <div className={style.boxContent}>
                                <div>
                                    <TitleComponent/>
                                </div>
                                {
                                    messages.data.map(o => <div key={o.id}>
                                        <ItemComponent message={o}/>
                                    </div>)
                                }

                            </div>
                        </Pagination>
                        :

                        <div>
                            {
                                messages.loaded ? <p>No messages found</p> : <p>Loading ...</p>
                            }

                        </div>
                }

            </SectionSlotComponent>

        </div>
    )
}

export default MessagesPage