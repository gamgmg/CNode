import React, { Component } from 'react'
import { WingBlank, WhiteSpace, List } from 'antd-mobile'

class Login extends Component {
	// 跳转页面
	changePage(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
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
						<div className="inner"></div>
					</div>
				</div>
			</WingBlank>
		)
	}
}

export default Login;