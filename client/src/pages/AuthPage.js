import React, { useState, useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        clearError()
    }, [clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/signin', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    return (
        <div>
            <div className="card" style={{ marginTop: "3rem" }}>
                <div className="card-header">
                    Task #4, Itransition
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">Authorization</h5>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            aria-describedby="emailHelp" placeholder="Enter email"
                            onChange={changeHandler} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={changeHandler} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" disabled={loading} onClick={loginHandler} style={{ marginRight: 10 }}>Sign in</button>
                        <a href="/signup" className="btn btn-secondary">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    )
}