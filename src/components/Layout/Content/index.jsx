import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ScreenDate from '../../../pages/home/ScreenDate/index';
import ManualGoods from '../../../pages/home/ManualGoods';
import { Layout } from 'antd';

const { Content } = Layout;
class index extends Component {
  render() {
    return (
      <Content
        className="site-layout-background"
        style={{
          padding: 0,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Switch>
          <Route path="/home/screenDate" component={ScreenDate}></Route>
          <Route path="/home/manualGoods" component={ManualGoods}></Route>
          <Redirect to='/home/screenDate'></Redirect>
        </Switch>
      </Content>
    );
  }
}

export default index;
