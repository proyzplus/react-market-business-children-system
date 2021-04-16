import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { ALLROUTER } from '../../../utils/router/index';
const { SubMenu } = Menu;

class Menus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: ['1001'],
      rootSubmenuKeys: [],
      selectedKeys: [this.props.history.location.pathname], //选中
      isShow: false //判断是否已经展开，如已展开停止重新赋值避免重新渲染和关系菜单         
    }
    this.handleSelectkeys = this.handleSelectkeys.bind(this)
  }
  UNSAFE_componentWillMount() {
    const state = this.props.location.state;
    if (state) {
      this.setState({
        openKeys: [state.parent, state.child ? state.child : '']
      });
    }
  }
  componentDidMount(props, nextProps) {
    for (var i = 0; i < ALLROUTER.length; i++) {
      if (ALLROUTER[i].children) {
        for (var j = 0; j < ALLROUTER[i].children.length; j++) {
          let navTabLi = ALLROUTER[i].children[j];
          if (navTabLi.children) {
            this.state.rootSubmenuKeys.push(navTabLi.id + "");
          }
        }
        this.state.rootSubmenuKeys.push(ALLROUTER[i].id + "");
      }
    }
    // 刷新菜单更新默认状态
    const { pathname } = this.props.history.location;
    const rank = pathname.split('/');
    switch (rank.length) {
      case 2:  //一级目录
        this.setState({
          selectedKeys: [pathname]
        });
        break;
      case 5: //三级目录，要展开两个subMenu
        this.setState({
          selectedKeys: [pathname],
        });
        break;
      default:
        this.setState({
          selectedKeys: [pathname],
        });
    }
    if (window.history && window.history.pushState) {
      window.onpopstate = function () {
        window.location.reload(true); //刷新页面
      };
    }
  }
  handleSelectkeys(e) {
    if (this.state.isShow) {
      this.setState({
        selectedKey: e.key,
        openKeys: e.keyPath[e.length] === 3 ? [e.keyPath[2], e.keyPath[1]] : [e.keyPath[0]],
        isShow: true
      });
    }
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    let openList;
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      if (latestOpenKey && latestOpenKey.length === 3) {
        openList = this.state.openKeys.filter((e) => {
          return e.length !== 3;
        })
        this.setState({
          openKeys: openList
        });
      } else {
        this.setState({
          openKeys: openKeys
        });
      }
    } else {
      if (latestOpenKey && latestOpenKey.length === 3) {
        openList = this.state.openKeys.filter((e) => {
          return e.length !== 3;
        })
        openList.push(latestOpenKey);
        this.setState({
          openKeys: openList[1] ? openList : [openList[0], openList[2]]
        });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    }
  }
  render() {
    const data = ALLROUTER;
    let html = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        let li = [];
        for (let j = 0; j < data[i].children.length; j++) {
          let navTabLi = data[i].children[j];
          if (navTabLi.children) {
            var oli = [];
            for (var k = 0; k < navTabLi.children.length; k++) {
              oli.push(
                <Menu.Item key={navTabLi.children[k].url}>
                  <Link to={
                    {
                      pathname: navTabLi.children[k].url,
                      state: {//三级菜单下传openKeys传两个值，展开两级
                        parent: this.state.openKeys[0],
                        child: this.state.openKeys[1]
                      }
                    }
                  }>
                    <span>{navTabLi.children[k].text}</span>
                  </Link>
                </Menu.Item>
              )
            }
            var oul = <SubMenu key={navTabLi.id} title={<span>{navTabLi.iconCls}<span>{navTabLi.text}</span></span>}>{oli}</SubMenu>;
            li.push(oul);
          } else {
            li.push(
              <Menu.Item key={navTabLi.url}>
                <Link to={
                  {
                    pathname: navTabLi.url,
                    state: {
                      parent: this.state.openKeys[0],
                    }
                  }
                } >
                  {navTabLi.iconCls}
                  <span>{navTabLi.text}</span>
                </Link>
              </Menu.Item>
            );
          }
        }
        let ul = <SubMenu key={data[i].id}
          title={
            <span>{data[i].iconCls}
              <span>{data[i].text}</span>
            </span>
          }>{li}</SubMenu>;
        html.push(ul);
      } else {
        html.push(
          <Menu.Item key={data[i].url}>
            <Link to={{
              pathname: data[i].url,
              //一级菜单下传空值，不展开菜单栏
              state: {
                parent: ''
              }
            }}>
              {data[i].iconCls}
              <span>{data[i].text}</span>
            </Link>
          </Menu.Item>
        )
      }
    }
    return (
      <Menu
        openKeys={this.state.openKeys}
        selectedKeys={[this.props.history.location.pathname]}
        onClick={this.handleSelectkeys}
        onOpenChange={this.onOpenChange}
        mode="inline"
        collapsed={this.state.collapsed}>
        {html}
      </Menu>
    )
  }
}

export default withRouter(Menus);
