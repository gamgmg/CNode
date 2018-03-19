import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { WingBlank } from 'antd-mobile'
import Home from './home/Home'
import User from './user/User'
import logo from '../assets/img/cnodejs_light.svg'
import 'antd-mobile/dist/antd-mobile.css'
import '../assets/css/reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="app">
        <WingBlank size="sm" className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div className="app-header_list">
            <div>
              <NavLink to="/home">首页</NavLink>
            </div>
            <div>新手入门</div>
            <div>API</div>
            <div>注册</div>
            <div>登录</div>
          </div>
        </WingBlank>
        <div className="app-content">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user/:loginname" component={User} />
            <Redirect from="/" to="/home" />
            <Route component={Home} />
          </Switch>
        </div>
        {/*<TabBar>
          <TabBar.Item 
            title="首页"
            key="home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />}
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />}
          >
            <Home />
          </TabBar.Item>
          <TabBar.Item 
            title="我的"
            key="me"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />}
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />}
          >
            <div>adfsdf</div>
          </TabBar.Item>
        </TabBar>*/}
      </div>
      </Router>
    );
  }
}

export default App;
