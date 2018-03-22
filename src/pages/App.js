import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { WingBlank } from 'antd-mobile'
import Loadable from 'react-loadable'
import BackToTop from '../components/backToTop/BackToTop'
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

const LoadableHeader = Loadable({
    loader: () => import('../components/header/Header'),
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
                    <WingBlank className="app-header" size="sm">
                    <LoadableHeader />
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
                </div>
            </Router>
        );
    }
}

export default App;
