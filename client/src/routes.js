import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/registerproject';
import Update from './pages/updateproject';

export default () => {

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/registerproject">
                <Register />

            </Route>

            <Route exact path="/updateproject">
                <Update />
            </Route>


        </Switch>
    );
}