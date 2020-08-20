import React from 'react'

export const Toolbar = ({ handler }) => {
    return (
        <div className="btn-group mr-2" role="group" style={{ marginTop: "2rem" }}>
            <button type="button"
                name="Blocked"
                value="PUT"
                onClick={handler}
                className="btn btn-secondary">
                Block
            </button>
            <button type="button"
                name="Active"
                value="PUT"
                onClick={handler}
                className="btn btn-secondary">
                Active
            </button>
            <button type="button"
                name="Delete"
                value="DELETE"
                onClick={handler}
                className="btn btn-secondary">
                Delete
            </button>
        </div>
    )
}