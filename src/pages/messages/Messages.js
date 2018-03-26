import React, { Component } from 'react'
import { WingBlank, WhiteSpace, List } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
const Item = List.Item

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
				console.log(data)
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
					<div className="panel">
						{
							hasNotReadMessages &&
								hasNotReadMessages.length !== 0 
									? hasNotReadMessages.map((list, index)=>{
										return (
											<Item key={index} data-seed={index}>
												<a onClick={this.changePage(`/user/${list.author.loginname}`)}>{ list.author.loginname }</a> 
												<span> 回复了你的话题 </span> 
												<a onClick={this.changePage(`/topic/${list.topic.id}`, list.id)}>{ list.topic.title }</a>
											</Item>
										)	
									})
									: (
										<div className="inner">
											<p>无消息</p>
										</div>
									)
						}
					</div>
					<WhiteSpace />
					<div className="panel">
						<div className="header">
							<ul className="breadcrumb">
								<li className="">已读消息</li>
							</ul>
						</div>
					</div>
					<div className="panel">
						{
							hasReadMessages &&
								hasReadMessages.length !== 0 
									? hasReadMessages.map((list, index)=>{
										return (
											<Item key={index} data-seed={index}>
												<a onClick={this.changePage(`/user/${list.author.loginname}`)}>{ list.author.loginname }</a> 
												<span> 回复了你的话题 </span> 
												<a onClick={this.changePage(`/topic/${list.topic.id}`)}>{ list.topic.title }</a>
											</Item>
										)	
									})
									: (
										<div className="inner">
											<p>无消息</p>
										</div>
									)
						}
					</div>
					<WhiteSpace />
				</div>
			</WingBlank>					
		)
	}
}

export default Messages