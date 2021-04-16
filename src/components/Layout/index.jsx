import React, { Component } from 'react';
import PageHeader from './Header';
import Navigation from './Navigation';
import Content from './Content';
import { Layout } from 'antd';

const { Sider } = Layout;
export default class index extends Component {
  render() {
    return (
      < Layout >
        {/* 头部 */}
        <PageHeader />
        <Layout>
          {/* 左侧tab */}
          <Sider width={258}>
            <Navigation />
          </Sider>
          <Layout>
            {/* 主显示区 */}
            <Content />
          </Layout>
        </Layout>
      </Layout >
    )
  }
}
