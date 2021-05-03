import React from 'react';
import { Switch, Route } from 'react-router-dom';
import home from './pages/home/index';
import register from './pages/registerproject/index';
import update from './pages/updateproject';

export default () => {

    return (
        <Switch>
            <Route exact path="/">
                <home />
            </Route>

            <Route exact path="/registerproject">
                <register />

            </Route>

            <Route exact path="/updateproject">
                <update />
            </Route>


        </Switch>
    );
}