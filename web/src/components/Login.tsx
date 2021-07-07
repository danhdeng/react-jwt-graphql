import React, {useState} from 'react'
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

export const Login :React.FC<RouteComponentProps>=({history})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login]=useLoginMutation();

    const handleSubmit=async (e: any)=>{
        e.preventDefault();
        const response=await login({
            variables:{
                email,
                password
            }
        });
        
        if(response && response.data){
            setAccessToken(response.data.login.accessToken);
        }
        history.push("/");
    }
    return (
        <form onSubmit={handleSubmit}>
                <div><label htmlFor="email">Email: </label>
                <input
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={e=>{setEmail(e.target.value)}}
                    id="email" 
                />
            </div>
            <div><label htmlFor="password">Password: </label>
                <input
                    name="password"
                    type="password"
                    autoComplete="true"
                    value={password}
                    placeholder="Enter Password"
                    id="password"
                    onChange={e=>{setPassword(e.target.value)}}
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}
