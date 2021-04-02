import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import cookies from 'nookies'
import { useRouter } from 'next/router'
import { exists, isEmail } from '../utils/validators'
import CustomInput from '../components/CustomInput'

const SignUp = () => {
    const [formState, setFormstate] = useState({
        name: { value: '', error: '' },
        email: { value: '', error: '' },
        password: { value: '', error: '' }
    })
    const { name, email, password } = formState


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const Router = useRouter()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormstate({
            ...formState,
            [name]: {
                ...formState[name],
                value
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if(!exists(name.value) || !exists(email.value) || !exists(password.value)) {
            setError('Please enter required credentials')
            return 
        }

        try {
            setLoading(true)
            console.log(formState)
            // const response = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_API}/auth/signin`, { ...formState })
            const response = await axios.post(`/api/auth/signup`, { name: name.value, email: email.value, password: password.value })
            console.log(response)
            setLoading(false)

            Router.push('/signin')

        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading(false)
        }

    }

    const handleValidateEmail = (e) => {
        const { name, value } = e.target

        if(!isEmail(value)) {
            setFormstate({
                ...formState,
                [name]: {
                    ...formState[name],
                    error: 'A valid email is required'
                }
            })
        } else {
            setFormstate({
                ...formState,
                [name]: {
                    ...formState[name],
                    error: null
                }
            })
        }
    }

    const handleCloseError = () => {
        setError(null)
    }

    return (
        <section className="column is-full">
            <div className="container">
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <form className="my-6 py-6" onSubmit={handleSubmit}>
                            <CustomInput label="Name" name="name" value={name.value} placeholder="example@somemail.com"
                                onChange={handleInputChange} onBlur={handleValidateEmail} 
                                error={name.error}/>
                            

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input 
                                        autoComplete="off"
                                        name="email" 
                                        value={email.value} 
                                        onChange={handleInputChange} 
                                        onBlur={handleValidateEmail}
                                        className={`input${(email.error) ? ' is-danger' : ''}`} type="email" placeholder="example@somemail.com" />
                                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                                    <span className="icon is-small is-right"><i className="fas fa-exclamation-triangle"></i></span>
                                </div>
                                { 
                                    (email.error) && <p className="help is-danger">{email.error}</p> 
                                }
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input 
                                        name="password" 
                                        value={password.value} 
                                        onChange={handleInputChange} 
                                        onBlur={handleValidateEmail}
                                        className="input is-success#" type="password" placeholder="*******"/>
                                    <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                                    <span className="icon is-small is-right"><i className="fas fa-check"></i></span>
                                </div>
                                {/**<p className="help is-success">This Email is available</p>**/}
                            </div>

                            <div className="field">
                                <div className="control">
                                  <p>Already have an account, <Link href="/signin"><a>sign in</a></Link></p>
                                </div>
                            </div>
                    
                            <div className="field is-grouped">
                                <div className="control">
                                    <button type="submit" className="button is-link">Sign in</button>
                                </div>
                            </div>
                            { 
                                (error) 
                                && (<div class="notification is-danger is-light"><button onClick={handleCloseError} class="delete"></button>{error}</div>)
                            }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
