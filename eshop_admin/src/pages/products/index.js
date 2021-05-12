import React, {useEffect} from 'react'
import style from './index.module.sass'
import ItemComponent from "./components/item";
import SectionSlotComponent from "../../components/section_slot";
import {useDispatch, useSelector} from "react-redux";
import {GetProducts} from "../../redux/products/actions";
import AddSvg from "../../assets/icons/add";
import {NewProductPath} from "../new_product";
import TitleComponent from "./components/title";
import Pagination from "../../components/pagination";
import {useHistory} from "react-router-dom";
import {addQuery, useQuery} from "../../services/url";


export const ProductsPath = '/products'

const ProductsPage = () => {
    // const [showFilters, setShowFilters] = useState(false)
    const {products, config} = useSelector(state => state)
    const dispatch = useDispatch()

    // Query
    const history = useHistory()
    const query = useQuery()
    const page = query.get('page') || 1
    let filters_data = {}
    filters_data['page'] = query.get('page') || 1
    if (query.get('sort_by')) filters_data['sort_by'] = query.get('sort_by')
    if (query.get('category')) filters_data['category'] = query.get('category')

    useEffect(() => {
        document.title = 'Products'
        dispatch(GetProducts(page, filters_data))
        // eslint-disable-next-line
    }, [
        dispatch,
        filters_data.sort_by,
        filters_data.page,
        filters_data.category
    ])

    function pagination(page = 1) {
        // If no page query, set to 1
        filters_data['page'] = page
        history.push(ProductsPath + `?${addQuery(filters_data)}`)
    }

    return (
        <div className={style.box}>
            <SectionSlotComponent
                title={`Products`}
                action={{icon: <AddSvg/>, link: NewProductPath}}
            >
                {
                    products.data.length > 0
                        ?
                        <ProductsList products={products} pagination={pagination} currency={config.data.payment.currency}/>
                        :
                        <div>
                            <p>No products in the store</p>
                        </div>
                }

            </SectionSlotComponent>
        </div>
    )
}

const ProductsList = ({products, pagination, currency}) => (
    <Pagination data={products.pagination} action={pagination}>
        <div className={style.list}>

            <div>
                <TitleComponent/>
            </div>

            {
                products.loaded && products.success
                    ?
                    products.data.map(o => <div key={o.id}>
                        <ItemComponent product={o} currency={currency}/>
                    </div>)
                    :
                    <div>
                        <p>Loading...</p>
                    </div>
            }
        </div>
    </Pagination>
)
export default ProductsPage