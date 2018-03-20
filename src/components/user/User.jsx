import React, { Component } from 'react'
import { WingBlank, WhiteSpace, List } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import getDateDiff from '@/utils/timestamp'

const Item = List.Item

class User extends Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: Object.create(null)
		}
	}
	componentWillMount(){
		this.getData();
	}
	getData(){
		axios.get(getPath(`user/${this.props.match.params.loginname}`))
			.then(({data})=>{
				if(data.success){
					console.log(data.data)
					this.setState({
						userInfo: data.data
					})
				}
			})
	}
	getTab(tab, top, good){
		let tabsList = {
			ask: '问答',
			share: '分享',
			job: '招聘',
			good: '精华'
		}
		return top 
			? '置顶' 
			: good
				? '精华'
				: tabsList[tab];
	}
	// 跳转到详情页
	goToDetailPage(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	render(){
		let { match } = this.props;
		// console.log(match)
		let { avatar_url, create_at, githubUsername, loginname, recent_replies, recent_topics, score } = this.state.userInfo;
		return (
			<WingBlank size="sm">
				<div className="user">
					<WhiteSpace />
					<div className="panel">
						<div className="header">
							<ul className="breadcrumb">
								<li>
									<a>主页</a>
									<span className="divider"> / </span>
								</li>
							</ul>
						</div>
						<div className="inner userinfo">
							<div className="user_big_avatar">
								<img src={ avatar_url }/>
							</div>
							<a className="dark">{ loginname }</a>
							<div className="user_profile">
								<ul className="unstyled">
									<span className="big">{ score } </span>积分
									<li>
										<a className="dark">
											<span>查看话题收藏</span>
										</a>
									</li>
									<li>
										<a className="dark">
											<span>@{ githubUsername }</span>
										</a>
									</li>
								</ul>
							</div>
							<p className="col_fade">注册时间 {getDateDiff(create_at)}</p>
						</div>
					</div>
					<div className="panel">
						<div className="header">
							<span className="col_fade">最近创建的话题</span>
						</div>
						{
							recent_replies 
								? recent_replies.length !== 0 
									? recent_replies.map((list, index)=>{
										return (
											<Item 
												key={index}
												extra={getDateDiff(list.last_reply_at)} 
												align="middle" 
												thumb={list.author.avatar_url}
												multipleLine
												onClick={this.goToDetailPage(`${match.url + '/' + list.id}`)}
											>
										  		<span className={(list.top || list.good) ? 'hc-label heightLight-label' : 'hc-label'}>{this.getTab(list.tab, list.top, list.good)}</span>{list.title}
											</Item>
										)	
									})
									: (
										<div className="inner">
											<p>无话题</p>
										</div>
									)
								: null 
						}
					</div>
				</div>
			</WingBlank>
		)
	}
}

export default User;