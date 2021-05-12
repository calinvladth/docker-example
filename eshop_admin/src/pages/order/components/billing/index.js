import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import {useDispatch} from "react-redux";
import {EditOrder} from "../../../../redux/order/actions";
import {useParams} from "react-router";

const BillingComponent = ({billing}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [address, setAddress] = useState('')
    const [readOnly, setReadOnly] = useState(true)
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        setFirstName(billing.firstName)
        setLastName(billing.lastName)
        setEmail(billing.email)
        setPhone(billing.phone)
        setCity(billing.city)
        setZip(billing.zip)
        setAddress(billing.address)
    }, [billing])

    const submit = (e) => {
        e.preventDefault()
        if (!readOnly) {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                city: city,
                zip: zip,
                address: address
            }

            dispatch(EditOrder(id, data))
        }
        setReadOnly(!readOnly)
    }

    return (
        <form className={style.box} onSubmit={e => submit(e)}>
            <div className={style.formGroup}>
                <div>
                    <label>First Name</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        readOnly={readOnly}
                        required={true}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        readOnly={readOnly}
                        required={true}
                    />
                </div>
            </div>

            <div>
                <label>Email</label>
                <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    readOnly={readOnly}
                    required={true}
                />
            </div>

            <div>
                <label>Phone Number</label>
                <input
                    type='text'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    readOnly={readOnly}
                    required={true}
                />
            </div>

            <div>
                <label>City</label>
                <input
                    type='text'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    readOnly={readOnly}
                    required={true}
                />
            </div>

            <div>
                <label>Zip</label>
                <input
                    type='text'
                    value={zip}
                    onChange={e => setZip(e.target.value)}
                    readOnly={readOnly}
                    required={true}
                />
            </div>

            <div>
                <label>Address</label>
                <input
                    type='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    readOnly={readOnly}
                    required={true}
                />
            </div>

            <div>
                {
                    readOnly ? <button>Edit</button> : <button>Save</button>
                }

            </div>

        </form>
    )
}

export default BillingComponent