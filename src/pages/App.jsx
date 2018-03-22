import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { WingBlank } from 'antd-mobile'
import Loadable from 'react-loadable'
import BackToTop from '../components/backToTop/BackToTop'
import logo from '../assets/img/cnodejs_light.svg'
import 'antd-mobile/dist/antd-mobile.css'
import '../assets/css/reset.css'
import './App.css';

const LoadableHome = Loadable({
  loader: () => import('./home/Home'),
  loading: any => null,
  delay: 300
})

const LoadableTopic = Loadable({
  loader: () => import('./topic/Topic'),
  loading: any => null,
  delay: 300 
})

const LoadableUser = Loadable({
  loader: () => import('./user/User'),
  loading: any => null,
  delay: 300
})

const LoadableLogin = Loadable({
  loader: () => import('../containers/Login'),
  loading: any => null,
  delay: 300
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showBackToTop: false
    }
  }
  componentDidMount(){
    let content = ReactDOM.findDOMNode(this.refs.content)
    content.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount(){
    let content = ReactDOM.findDOMNode(this.refs.content)
    content.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  handleScroll(){
    let content = ReactDOM.findDOMNode(this.refs.content)
    if(content.scrollTop >= 200){
      this.setState({ showBackToTop: true })
    }else {
      this.setState({ showBackToTop: false })
    }
  }
  backToTop(){
    let content = ReactDOM.findDOMNode(this.refs.content)
    content.scrollTop = 0;
    this.setState({ showBackToTop: false })
  }
  render() {
    let backToTop = this.backToTop.bind(this);
    return (
      <Router>
      <div className="app">
        <BackToTop showBackToTop={this.state.showBackToTop} backToTop={backToTop} />
        <WingBlank size="sm" className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div className="app-header_list">
            <div>
              <NavLink to="/home">首页</NavLink>
            </div>
            <div>未读消息</div>
            <div>
              <NavLink to="/login">登陆</NavLink>
            </div>
            <div>退出</div>
          </div>
        </WingBlank>
        <div className="app-content" ref="content">
          <Switch>
            <Route path="/home" component={LoadableHome} />
            <Route path="/topic/:id" component={LoadableTopic} />
            <Route path="/user/:loginname" component={LoadableUser} />
            <Route path="/login" component={LoadableLogin} />
            <Redirect from="/" to="/home" />
            <Route component={LoadableHome} />
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
