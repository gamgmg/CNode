import React, { Component } from 'react'
import { WingBlank, WhiteSpace, InputItem, Button, Toast } from 'antd-mobile'
import sessionStorage from '../../utils/storage'
import axios from 'axios'
import getPath from '@/config/api'

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			disabled: false,
			loading: false,
			accessToken: '0a1d9039-4ed7-4f8d-b78b-ec9d39a34baa',
		}
	}
	// 跳转页面
	changePage(url){
		return ()=>{
			console.log(url)
			this.props.history.push({
				pathname: url
			})
		}
	}
	login(){
		this.setState({disabled: true,loading: true});
		axios
			.post(getPath('accesstoken'), {
				accesstoken: this.state.accessToken
			})
			.then(({data})=>{
				this.setState({disabled: false,loading: false})
				if(data.success){
					let loginInfo = Object.assign({}, data, { accessToken: this.state.accessToken })
					// 缓存数据
					sessionStorage.setLoginInfo(JSON.stringify(loginInfo));
					this.props.setLoginInfo(loginInfo);
					this.props.history.push({
						pathname: '/'
					})
				}
			})
			// .catch((err)=>{
			// 	this.setState({disabled: false,loading: false})
			// 	Toast.info('accessToken错误');
			// })
	}
	render(){
		return (
			<WingBlank size="sm">
				<WhiteSpace />
				<div className="login">
					<div className="panel">
						<div className="header">
							<ul className="breadcrumb">
								<li>
									<a onClick={ this.changePage('/') }>主页</a>
									<span className="divider"> / </span>
								</li>
								<li className="active">登录</li>
							</ul>
						</div>
						<WhiteSpace />
						<div className="inner">
							<InputItem 
								disabled={this.state.disabled} 
								placeholder="请输入accessToken"
								onChange={(value)=>{
									this.setState({
										accesstoken: value
									})
								}}
							></InputItem>
							<WhiteSpace />
							<Button 
								type="primary" 
								style={{color: '#fff'}} 
								onClick={()=>this.login()}
								loading={this.state.loading}
							>登录</Button>
						</div>
					</div>
				</div>
			</WingBlank>
		)
	}
}

export default Login;