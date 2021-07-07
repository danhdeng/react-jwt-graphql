import React from 'react'
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AccessWithToken from './components/AccessWithToken';
import Header from './components/Header';
import Home from './components/Home';
import {Login} from './components/Login';
import {Register} from './components/Register';

export const Routes = () => {
    return (
        <BrowserRouter>
            <div>
             <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/accesswithtoken" component={AccessWithToken} />
            </Switch>
            </div>
        </BrowserRouter>
    )
}
