import React, { useState } from 'react'

export const UserDataList = ({ users, setUsers }) => {
    const [allChecked, setAllChecked] = useState(false)

    const handleCheck = e => {
        const { name, checked } = e.target

        if (name === "checkAll") {
            setAllChecked(checked)
            setUsers(prevUsers => prevUsers.map(user => ({ ...user, isChecked: checked })))
        } else {
            setUsers(prevUsers => prevUsers.map(user =>
                user.id === name ? { ...user, isChecked: checked } : user))
            setAllChecked(users.every(user => user.isChecked))
        }
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">
                            <p>Select/remove all</p>
                            <input type="checkbox"
                                name="checkAll"
                                checked={allChecked}
                                onChange={handleCheck} />
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created</th>
                        <th scope="col">Last login</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">
                                <input type="checkbox"
                                    name={user.id}
                                    checked={user.isChecked}
                                    onChange={handleCheck} />
                            </th>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.created}</td>
                            <td>{user.lastLogin}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 