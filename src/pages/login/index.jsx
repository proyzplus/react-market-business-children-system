import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import loginLogo from '../../aseets/image/loginLogo.png';
import loginKefu from '../../aseets/image/login-kefu.jpg';
import download from '../../aseets/image/download.png';
import download_click from '../../aseets/image/download_click.png';
import qq from '../../aseets/image/qq.png';
import qq_click from '../../aseets/image/qq_click.png';
import erweima from '../../aseets/image/erweima.png';
import erweima_click from '../../aseets/image/erweima_click.png';
import LoginForm from './LoginForm';
import { Tooltip } from 'antd';
import "./index.less";

export default class index extends Component {
  state = {
    downState: false,
    qqState: false,
    kefuState: false
  }
  changeState = (type, page) => {
    return () => {
      if (page === 'down') {
        this.setState({
          downState: type
        });
      } else if (page === 'qq') {
        this.setState({
          qqState: type
        });
      } else if (page === 'service') {
        this.setState({
          kefuState: type
        });
      }
    }
  }
  render() {
    const { downState, qqState, kefuState } = this.state
    const { user_is_login } = this.props;
    return (
      <div className="loginPageStyle">
        <div className="login-header">
          <div className="login-logo">
            <img src={loginLogo} alt="加载失败" />
            <p>欢迎登录门店后台管理</p>
          </div>
          <div className="login-right">
            <div className="login-head-tab-List">
              <div className="tab-bar" onMouseEnter={this.changeState(true, 'down')} onMouseLeave={this.changeState(false, 'down')}>
                <Tooltip placement="bottom" color="#ffffff" title={() =>
                  <div>
                    <p style={{ padding: "4px 20px" }}>
                      <a href="https://www.pgyer.com/eqwP">官网下载</a>
                    </p>
                    <p style={{ padding: "4px 20px" }}>
                      <a href="https://image.looovo.com/supermarket-release.apk">免费下载</a>
                    </p>
                  </div>} >
                  <img src={downState ? download_click : download} alt="" />
                  <p>下载应用</p>
                </Tooltip>
              </div>
              <div className="tab-bar" onMouseEnter={this.changeState(true, 'qq')} onMouseLeave={this.changeState(false, 'qq')}>
                <img src={qqState ? qq_click : qq} alt="" />
                <p onClick={() => { window.open('http://wpa.qq.com/msgrd?v=3&uin=66901404&site=qq&menu=yes') }}>QQ交谈</p>
              </div>
              <div className="tab-bar" onMouseEnter={this.changeState(true, 'service')} onMouseLeave={this.changeState(false, 'service')}>
                <Tooltip placement="bottom" color="#fff" title={() =>
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <div><img src={loginKefu} style={{ width: "120px" }} /></div>}>
                  <img src={kefuState ? erweima_click : erweima} alt="" />
                  <p>客 &nbsp;&nbsp; 服</p>
                </Tooltip>
              </div>
            </div>
            <LoginForm user_is_login={user_is_login} />
          </div>
        </div>
        <div className="Copyright">
          <span>Copyright© 2006 - {(new Date()).getFullYear()} 粤ICP备18013531号-1</span>
        </div>
        <Route path="/home" component={Layout} />
      </div >
    )
  }
}
