import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { proxy_localForage } from "./utils/localForage.interceptor";
import md5 from 'js-md5';
import App from './App';
import 'antd/dist/antd.less';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
React.Component.prototype.$moment = moment;
React.Component.prototype.$locale = locale;
React.Component.prototype.$localForage = proxy_localForage;
React.Component.prototype.$md5 = md5;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
