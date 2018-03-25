import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Home, Topic, User, Login, Header, Collections, Messages } from '../utils/loadable'
import { WingBlank } from 'antd-mobile'
import BackToTop from '../components/backToTop/BackToTop'
import 'antd-mobile/dist/antd-mobile.css'
import '../assets/css/reset.css'
import './App.css';



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
                    <Header />
                    </WingBlank>
                    <div className="app-content" ref="content">
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/topic/:id" component={Topic} />
                            <Route path="/user/:loginname/Collections" component={Collections} />
                            <Route path="/user/:loginname" component={User} />
                            <Route path="/my/messages" component={Messages} />
                            <Route path="/login" component={Login} />
                            <Redirect from="/" to="/home" />
                            <Route component={Home} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
