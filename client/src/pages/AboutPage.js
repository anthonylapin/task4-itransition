import React from 'react'

export const AboutPage = () => {
    return (
        <div className="card" style={{ width: "50rem", marginLeft: "9rem", marginTop: "3rem" }}>
            <div className="card-body">
                <h5 className="card-title text-center">About</h5>
                <p>Assignment # 4: on the platform of your specialization (.NET / C # / Core / ASP.NET
                in any reincarnation / EntityFramework/ SQL Server | Java / Spring / Hibernate / MySQL
                | PH / Symfony (optional) / MySQL | JavaScript/ React / Node .js / Express / MySQL)
                implement a Web application that allows users to register
                and authenticate. Unauthenticated users do not have access to user management (they can only get
                through to the registration form or the authentication form). Authenticated users see a table (table with id,
                name, soap, registration date, last login date, status) with users. The table with the left column
                contains check-boxes for multiple selection, in the column heading the check-box "select all /
                deselect". Above the table there is a toolbar with actions: Block, Unblock, Delete
                (the last two can be better with icons). The user can delete or block himself - in this case,
                he must immediately be logged out. If someone else blocks or deletes the user, then on any next
                action the user is redirected to the login page.</p>
                <p>Table, multiple selection, toolbar - required.</p>
                <p>It is obligatory to use a CSS framework (the recommendation is Bootstrap,
                but it is not required, any other is possible).</p>
                <p>When registering, it should be possible to use any password, even of one character.</p>
            </div>
        </div>

    )
}