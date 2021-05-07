import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/registerproject';
import Update from './pages/updateproject';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/registerproject">
                    <Register />
                </Route>
                <Route exact path="/updateproject/:id">
                    <Update />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;