import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import { TablePage } from './pages/TablePage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/about" exact>
                    <AboutPage />
                </Route>
                <Route path="/table" exact>
                    <TablePage />
                </Route>
                <Redirect to="/table" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/signin" exact>
                <AuthPage />
            </Route>
            <Route path="/signup" exact>
                <RegisterPage />
            </Route>
            <Redirect to="/signin" />
        </Switch>
    )
}