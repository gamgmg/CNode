import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import Panel from './components/panel/Panel'

class Messages extends Component {
	constructor(props){
		super(props);
		this.state = {
			hasReadMessages: [],
			hasNotReadMessages: []
		}
	}
	componentWillMount(){
		this.getData();
	}
	getData(){
		axios
			.get(getPath('messages'), {
				params: {
					accesstoken: this.props.loginInfo.accessToken
				}
			})
			.then(({data})=>{
				data.success && this.setState({hasReadMessages: data.data.has_read_messages, hasNotReadMessages: data.data.hasnot_read_messages})
			})
	}
	// 标记单个消息为已读
	markMessage(msgId){
		axios
			.post(getPath(`message/mark_one/${msgId}`), {
				accesstoken: this.props.loginInfo.accessToken
			})
	}
	// 跳转页面
	changePage(url, id=null){
		return ()=>{
			id && this.markMessage(id);
			this.props.history.push({
				pathname: url
			})
		}
	}
	render(){
		let hasReadMessages = this.state.hasReadMessages,
			hasNotReadMessages = this.state.hasNotReadMessages;
		return (
			<WingBlank size="sm">
				<div className="collections">
					<WhiteSpace />
					<div className="panel">
						<div className="header">
							<ul className="breadcrumb">
								<li>
									<a onClick={ this.changePage('/') }>主页</a>
									<span className="divider"> / </span>
								</li>
								<li className="active">新消息</li>
							</ul>
						</div>
					</div>
					<Panel dataSource={hasNotReadMessages} changePage={this.changePage.bind(this)}/>
					<WhiteSpace />
					<div className="panel">
						<div className="header">
							<ul className="breadcrumb">
								<li className="">已读消息</li>
							</ul>
						</div>
					</div>
					<Panel dataSource={hasReadMessages} changePage={this.changePage.bind(this)}/>
					<WhiteSpace />
				</div>
			</WingBlank>					
		)
	}
}

export default Messages