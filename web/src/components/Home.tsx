import React from 'react'
import { useUsersQuery } from '../generated/graphql'

export default function Home() {
    const {data,} =useUsersQuery({fetchPolicy: "cache-and-network"});
    if(!data){
        return <div>loading....</div>
    }
    return (
        <div>
            <div>Users:</div>
            <div>
                <ul>
                    { data.users.map(item=>(
                        <li key={item.id}>{item.id},  {item.email}</li>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}
