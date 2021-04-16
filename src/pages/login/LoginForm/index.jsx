import React, { Component } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input, message, Button } from 'antd';
import { login } from '../../../api/login';
import './index.less';

export default class index extends Component {
  state = {
    user: "",
    pass: "",
    loadings: false,
  }
  saveUserName = e => {
    this.setState({
      user: e.target.value
    });
  }
  savePassword = e => {
    this.setState({
      pass: e.target.value
    });
  };
  enterLoading = () => {
    this.setState({
      loadings: true
    });
    const { user, pass } = this.state;
    if (!user || !pass) {
      message.error('请输入账号和密码');
      this.setState({
        loadings: false
      });
    } else {
      sessionStorage.setItem("nowUser", this.state.user);
      let data = {
        user: this.state.user,
        pass: this.$md5(this.state.pass)
      };
      login(data).then(res => {
        if (res) {
          this.setState({
            loadings: false
          });
          this.$localForage.setItem(this.state.user + 'userInfo', res);
          this.props.user_is_login(true);
        } else {
          this.setState({
            loadings: false
          });
        }
      });
    }
  };
  render() {
    const { loadings } = this.state;
    return (
      <div className="formform">
        <div className="form_title">
          <p>登录</p>
        </div>
        <div className="form_table">
          <div className="editClass">
            <Input onInput={this.saveUserName} className="myinput" size="large" placeholder="账号" bordered={false} prefix={<UserOutlined />} />
          </div>
          <div className="editClass">
            <Input.Password onInput={this.savePassword} onPressEnter={this.enterLoading} className="myinput" size="large" placeholder="密码" bordered={false} prefix={<UserOutlined />} />
          </div>
          <div className="line">
            <Button className="tt" type="primary" loading={loadings} onClick={this.enterLoading}> 登录 </Button>
          </div>
        </div>
      </div>
    )
  }
}
