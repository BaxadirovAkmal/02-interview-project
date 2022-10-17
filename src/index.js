import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.min.css';
import "./global.scss";
import store from './store/index';
import {Provider} from 'react-redux';


const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);

