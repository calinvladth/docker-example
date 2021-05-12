import React, {useEffect} from 'react'
import SectionSlotComponent from "../../components/section_slot";
import style from './index.module.sass'
import TitleComponent from "./components/title";
import ItemComponent from "./components/item";
import {useDispatch, useSelector} from "react-redux";
import {GetEmails} from "../../redux/emails/actions";
import Pagination from "../../components/pagination";
import {useHistory} from "react-router-dom";
import {addQuery, useQuery} from "../../services/url";

export const EmailsPath = '/emails'

const EmailsPage = () => {
    const dispatch = useDispatch()
    const {emails} = useSelector(state => state)

    // Query
    const history = useHistory()
    const query = useQuery()
    const page = query.get('page') || 1
    let filters_data = {}
    filters_data['page'] = query.get('page') || 1

    useEffect(() => {
        document.title = 'Emails List'
        dispatch(GetEmails(page, filters_data))
        // eslint-disable-next-line
    }, [
        dispatch,
        filters_data.page
    ])


    const pagination = (page = 1) => {
        filters_data['page'] = page
        history.push(EmailsPath + `?${addQuery(filters_data)}`)
    }
    return (
        <div className={style.box}>
            <SectionSlotComponent
                title={'Emails list'}>
                {
                    emails.success && emails.loaded && emails.data.length > 0
                        ?
                        <Pagination data={emails.pagination} action={pagination}>
                            <div className={style.boxContent}>
                                <div>
                                    <TitleComponent/>
                                </div>

                                {
                                    emails.data.map(o => <div key={o.id}>
                                        <ItemComponent email={o}/>
                                    </div>)
                                }

                            </div>
                        </Pagination>
                        :
                        <div>
                            {
                                emails.loaded ? <p>No email found</p> : <p>Loading ...</p>
                            }

                        </div>
                }


            </SectionSlotComponent>
        </div>
    )
}
export default EmailsPage