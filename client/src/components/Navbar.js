import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = (props) => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const getNavItems = () => {
        if (props.authenticated) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/table">Table<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logoutHandler} href="/">Logout<span className="sr-only">(current)</span></a>
                    </li>
                </ul>
            )
        }

        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/signin">Sign In<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup">Sign Up<span className="sr-only">(current)</span></a>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">Task #4</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {getNavItems()}
            </div>
        </nav>
    )
}