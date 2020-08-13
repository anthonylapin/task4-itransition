import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'

export const RegisterPage = () => {
    const { loading, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', firstName: '', lastName: ''
    })
    const history = useHistory()

    const routeChange = () => {
        history.push('/')
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        clearError()
    }, [clearError])

    const registerHandler = async () => {
        try {
            await request('/api/auth/signup', 'POST', { ...form })
            routeChange()
        } catch (e) { }
    }

    return (
        <div>
            <div className="card" style={{ marginTop: "3rem" }}>
                <div className="card-header">
                    Task #4, Itransition
            </div>
                <div className="card-body">
                    <h5 className="card-title text-center">Registration</h5>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            aria-describedby="emailHelp" placeholder="Enter email"
                            onChange={changeHandler} />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="row form-group">
                        <div className="col">
                            <input type="text" className="form-control"
                                name="firstName" placeholder="First name"
                                onChange={changeHandler} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control"
                                name="lastName" placeholder="Last name"
                                onChange={changeHandler} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={changeHandler} />
                    </div>
                    <div className="text-center">
                        <button onClick={registerHandler}
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}