import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { UserDataList } from '../components/UserDataList'
import { Toolbar } from '../components/Toolbar'

export const TablePage = () => {
    const [usersData, setUsersData] = useState([])
    const history = useHistory()
    const auth = useContext(AuthContext)

    const { request, loading, clearError } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchUsersData = useCallback(async () => {
        try {
            const fetched = await request('/api/content/users', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsersData(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchUsersData()
    }, [fetchUsersData])

    const toolbarHandler = async (event) => {
        try {
            const status = event.target.name
            const method = event.target.value
            const checkedUsers = usersData.filter(user => user.isChecked)
            const idsOfCheckedUsers = checkedUsers.map(user => user.id)

            await request('/api/content/users', method, { status, ids: idsOfCheckedUsers }, {
                Authorization: `Bearer ${token}`
            })

            if ((method === 'DELETE' || status === 'Blocked') && idsOfCheckedUsers.includes(auth.userId)) {
                auth.logout()
            }
            history.push('/')
        } catch (e) { }
    }

    useEffect(() => {
        clearError()
    }, [clearError])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <Toolbar handler={toolbarHandler} />
            {!loading && <UserDataList users={usersData} setUsers={setUsersData} />}
        </div>
    )
}