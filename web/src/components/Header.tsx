import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from '../generated/graphql'

export default function Header() {
    const {data} =useMeQuery({fetchPolicy: "network-only"});
    console.log("user data: ", data);
    return (
        <div>
            <header>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/accesswithtoken">Access with Token</Link>
            </header>
            {data && data.me ? <div>you are logged in as {data.me.email}</div> :null}
        </div>
    )
}
