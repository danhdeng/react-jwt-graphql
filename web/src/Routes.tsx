import React from 'react'
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

export const Routes = () => {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <Link to="/">Home</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>

                </header>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
            </div>
        </BrowserRouter>
    )
}
