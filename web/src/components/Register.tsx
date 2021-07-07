import React, {useState} from 'react'
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Register :React.FC<RouteComponentProps>=({history})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register]=useRegisterMutation();

    const handleSubmit=async (e: any)=>{
        e.preventDefault();
        const response=await register({
            variables:{
                email,
                password
            }
        });
        if(!response){
            return <p>registrtion error</p>
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
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    )
}
