/**
 * 专门用于暴露store
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // 支持异步action
import allReducers from './index';


export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));
