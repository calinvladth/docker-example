import React, {useEffect, useState} from 'react'
import style from '../form.module.sass'
import {useDispatch} from "react-redux";
import {EditConfig} from "../../../../redux/config/actions";

const FormPaymentComponent = ({data, timestamp}) => {
    const [stripePublicKey, setStripePublicKey] = useState('')
    const [stripeSecretKey, setStripeSecretKey] = useState('')
    const [currency, setCurrency] = useState('')
    const [readOnly, setReadOnly] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setStripePublicKey(data.stripe_public)
        setStripeSecretKey(data.stripe_secret)
        setCurrency(data.currency)
    }, [data, timestamp])

    const submit = (e) => {
        e.preventDefault()
        const data = {
            payment: {
                stripe_public: stripePublicKey,
                stripe_secret: stripeSecretKey,
                currency: currency
            }
        }

        !readOnly && dispatch(EditConfig(data))

        setReadOnly(!readOnly)
    }
    return (
        <form className={style.box} onSubmit={e => submit(e)}>
            <div>
                <label>Stripe public key</label>
                <input
                    type="text"
                    required
                    readOnly={readOnly}
                    value={stripePublicKey}
                    onChange={e => setStripePublicKey(e.target.value)}
                />
            </div>

            <div>
                <label>Stripe secret key</label>
                <input
                    type="text"
                    required
                    readOnly={readOnly}
                    value={stripeSecretKey}
                    onChange={e => setStripeSecretKey(e.target.value)}
                />
            </div>
            <div>
                <label>Currency | <a
                    style={{color: 'red'}}
                    href="https://stripe.com/docs/currencies"
                    target="_blank"
                    rel="noreferrer"
                >Supported Currencies</a></label>
                <input
                    type="text"
                    required
                    readOnly={readOnly}
                    value={currency}
                    onChange={e => setCurrency(e.target.value.toLowerCase())}
                />
            </div>

            <div>
                <button>{readOnly ? 'Edit' : 'Save'}</button>
            </div>

        </form>
    )
}

export default FormPaymentComponent