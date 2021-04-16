import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Header } = Layout;
class index extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Breadcrumb style={{ margin: '16px 0', display: "inline-block" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
    );
  }
}

export default index;
