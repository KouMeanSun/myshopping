import {createStore,compose,applyMiddleware,combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from "redux-axios-middleware";
import {createLogger} from "redux-logger";
import axios from 'axios';
import './axios.config';

const loggerMiddleware = createLogger();

const middleware = [axiosMiddleware(axios),thunkMiddleware];

process.env.NODE_ENV === 'development' && middleware.push(loggerMiddleware);

const enhancer = compose(applyMiddleware(...middleware));
export default reducers => createStore(combineReducers({...reducers}),{},enhancer);



