import React, { Component } from 'react';
import { TabBar, WingBlank } from 'antd-mobile';
import Home from './home/Home'
import Search from './search/Search'
import logo from '../assets/img/cnodejs_light.svg'
import 'antd-mobile/dist/antd-mobile.css'
import '../assets/css/reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <WingBlank size="sm" className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div className="app-search">
            <Search />
          </div>
        </WingBlank>
        <TabBar>
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
        </TabBar>
      </div>
    );
  }
}

export default App;
