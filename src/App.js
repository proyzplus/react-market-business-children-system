/*
 * @Author: proyzplus
 * @Date: 2021-03-29 10:34:13
 * @LastEditors: proyzplus
 * @LastEditTime: 2021-03-31 09:15:07
 * @Description: Description
 */
import React, { Component } from 'react';
import { proxy_localForage } from "./utils/localForage.interceptor";
import Layout from './components/Layout';
import Login from './pages/login';

import "./aseets/css/app.less";

export default class App extends Component {
  state = {
    isLogin: false,
    userInfo: {}
  }
  getUserInfo = () => {
    let nowUser = sessionStorage.getItem("nowUser");
    if (nowUser) {
      proxy_localForage.getItem(nowUser + "userInfo").then(res => {
        if (res) {
          this.setState({
            userInfo: res,
            isLogin: true
          });
        } else {
          this.setState({
            userInfo: {},
            isLogin: false
          });
        }
      });
    } else {
      this.setState({
        userInfo: {},
        isLogin: false
      });
    }
  }
  componentDidMount() {
    this.getUserInfo();
  }
  user_is_login = (val) => {
    this.setState({
      isLogin: val
    });
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div className="App">
        {
          isLogin ? <Layout /> : <Login user_is_login={this.user_is_login} />
        }
      </div>
    )
  }
}
