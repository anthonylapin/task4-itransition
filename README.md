Assignment # 4: on the platform of your specialization (.NET / C # / Core / ASP.NET in any reincarnation / EntityFramework / SQL Server | Java / Spring / Hibernate / MySQL | PH / Symfony (optional) / MySQL | JavaScript / React / Node .js / Express / MySQL) implement a Web application that allows users to register and authenticate. Unauthenticated users do not have access to user management (they can only get through to the registration form or the authentication form).

Authenticated users see a table (table with ID, name, soap, registration date, last login date, status) with users. The table with the left column contains check-boxes for multiple selection, in the column heading the check-box "select all / unselect". Above the table there is a toolbar with actions: Block, Unblock, Delete (the last two can be better with icons). The user can delete or block himself - in this case, he must immediately be logged out. If someone else blocks or deletes a user, then on any next action the user is redirected to the login page.

Table, multiple selection, toolbar - required.

It is obligatory to use a CSS framework (the recommendation is Bootstrap, but it is not required, any other is possible).

When registering, it should be possible to use any password, even one of one character.

When submitting an assignment, indicate your full name (you can without the O) and the following links:
1) Link to Github.
2) Link to the deployed project (no matter Azure, Heroku, whatever).
3) Recorded video, which displays registration, login, selection of one user (not a submissive), blocking it and showing the result (the status in the table has been updated), unblocking this user, selecting all users by clicking on the checkbox in the table header, blocking by pressing a button on the "Block" toolbar with automatic transition to the login page.
