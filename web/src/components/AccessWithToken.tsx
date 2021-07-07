import React from 'react'
import { useAccessWithTokenQuery } from '../generated/graphql'

export default function AccessWithToken() {
    const {data, loading, error}=useAccessWithTokenQuery({fetchPolicy: "network-only"});

    if(loading){
        return <div>loading...</div>
    }
    if(error){
        console.log(error);
        return <div>{error.message}</div>
    }
    return (
        <div>
            {data?.accessWithToken}
        </div>
    )
}
