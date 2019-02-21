// ========== Importing react lib ==========//
import React from 'react';
import ReactDOM from 'react-dom';

// ========== Importing Routing lib ========== //
import {
    createBrowserHistory
} from 'history';

// ========== Importing styles ========== //
import './styles/core.css'
// import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

// ========== Importing main app ========== //
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import routes from './routes.jsx'

import {
    loadState,
    saveState
} from 'mainLibs/localStorage';

import $ from 'jquery';
window.jQuery = window.$ = $;
require('vendor/bootstrap.min.js');

const history = createBrowserHistory({
    basename: '/',
});

const initialState = loadState();
const store = createStore(initialState, history);

store.subscribe(() => {
    saveState({});
});

if (process.env.NODE_ENV === 'development') {
    if (window.devToolsExtension) {
        window.devToolsExtension.open()
    }

}

const MOUNT_NODE = document.getElementById('react');
let render = (routerKey = null) => {
    ReactDOM.render( <
        AppContainer store = {
            store
        }
        routes = {
            routes
        }
        history = {
            history
        }
        />,
        MOUNT_NODE
    )
}

render();