// 该文件用于汇总所有reducer
import { combineReducers } from 'redux'; 
import userInfo from './reducers/userInfo';

export default combineReducers({
      userInfo
});

