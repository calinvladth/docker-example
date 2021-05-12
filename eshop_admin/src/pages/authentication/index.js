import React, {useEffect, useState} from 'react'
import style from './index.module.sass'
import SectionSlotComponent from "../../components/section_slot";
import {useDispatch, useSelector} from "react-redux";
import {Login, Register} from "../../redux/authentication/actions";
import {CheckRegister} from "../../redux/check_register/actions";

export const AuthenticationPath = '/authentication'

const AuthenticationPage = () => {
    const [register, setRegister] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const {check_register} = useSelector(state => state)

    const submit = (e) => {
        e.preventDefault()
        const data = {
            email, password
        }
        if (register) {
            dispatch(Register(data))
        } else {
            dispatch(Login(data))
        }

    }

    useEffect(() => {
        document.title = 'Authentication'
        dispatch(CheckRegister())
    }, [dispatch])


    return (
        <div className={style.box}>
            <SectionSlotComponent title={register ? 'Register' : 'Login'}>
                <form className={style.form} onSubmit={e => submit(e)}>
                    <div>
                        <label>Email</label>
                        <input
                            required
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            required
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={style.action}>
                        <button>Submit</button>
                        {
                            check_register.data.register && <div onClick={() => setRegister(!register)}>
                                <span>{register ? 'Login' : 'Register'}</span>
                            </div>
                        }
                    </div>

                </form>
            </SectionSlotComponent>
        </div>
    )
}

export default AuthenticationPage