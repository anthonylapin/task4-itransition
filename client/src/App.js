import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { LoadingIndicator } from './components/Loader'
import { Navbar } from './components/Navbar'

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token // convert to bool
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return (
      <LoadingIndicator />
    )
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId
    }}>
      <BrowserRouter>
        <Navbar authenticated={isAuthenticated} />
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
