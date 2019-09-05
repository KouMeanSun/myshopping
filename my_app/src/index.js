import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Index from "./MyApp";
import AppRouter from './router'
import {HashRouter,Route,Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import zhCN from 'antd/lib/locale-provider/zh_CN'
import userInfo from "./components/UserInfo/reducers";
import createStore from "./createStore";

const reducers = {
    userInfo
};

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider  locale={zhCN}>
            <AppRouter/>
        </ConfigProvider>
    </Provider>
    , document.getElementById('root'));

// const reducers = {};
//
// const store = createStore(reducers);
//
// ReactDOM.render(
//     <Provider >
//         <ConfigProvider  locale={zhCN}>
//             <AppRouter/>
//         </ConfigProvider>
//     </Provider>
//     , document.getElementById('root'));


// ReactDOM.render(
//     <HashRouter >
//         <Route path={'/'} component={Index}>
//
//         </Route>
//     </HashRouter>
//     , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
