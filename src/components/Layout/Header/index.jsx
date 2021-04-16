import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import heng_logo_t from '../../../aseets/image/heng_logo_t.png';

const { Header } = Layout;
class index extends Component {
  render() {
    return (
      <Header className="header" style={{ width: "100%", height: "80px", display: "flex" }}>
        <div className="logo" style={{ width: "258px" }} >
          <img src={heng_logo_t} style={{ height: "80px" }} alt="" />
        </div>
        <Breadcrumb style={{ lineHeight: "80px", color: "#fff" }}>
          <Breadcrumb.Item style={{ fontWeight: "600" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item style={{ fontWeight: "600" }}>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
    );
  }
}

export default index;
