import React, { Component } from 'react';
import { BrowserRouter, Route, IndexRoute, Switch, browserHistory } from 'react-router-dom';

import ChatApp from './components/App';
import RoomsPage from './components/pages/RoomsPage'
import ChatRoomPage from './components/pages/RoomPage'

const routes = (
    <Switch>
        <Route exact
            path="/"
            render={() => <ChatApp><RoomsPage /></ChatApp>}
        />
        <Route exact
            path="/rooms/:id"
            render={() => <ChatApp><ChatRoomPage /></ChatApp>}
        />
    </Switch>
);

export default routes;