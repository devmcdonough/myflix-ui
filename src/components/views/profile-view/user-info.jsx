import React from "react";

export function UserInfo({ email, name }) {
    return (
        <>
            <h3>Your Info</h3>
            <p>User: {name}</p>
            <p>Email: {email}</p>
        </>
    )
}

export default UserInfo;
