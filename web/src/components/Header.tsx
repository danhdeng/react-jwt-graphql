import { storeKeyNameFromField } from '@apollo/client/utilities';
import React from 'react'
import { Link } from 'react-router-dom'
import { setAccessToken } from '../accessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

export default function Header() {
    const {data, loading} =useMeQuery({fetchPolicy: "network-only"});
    const [logout, {client}]=useLogoutMutation();
    let body: any=null;
    if(loading){
        body=null;
    }else if(data && data.me ){
        body= <div>you are logged in as {data.me.email}</div>
    }
    else{
        body=<div>not log in</div>
    }

    return (
        <div>
            <header>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/accesswithtoken">Access with Token</Link>
                {!loading && data && data.me && <button onClick={async()=>{
                        await logout();
                        setAccessToken("");
                        await client!.resetStore();
                    }}>Logout</button> 
                }
            </header>
            {body}
        </div>
    )
}
