import React, { Component } from 'react'
import { WingBlank, WhiteSpace, List } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import getDateDiff from '@/utils/timestamp'

const Item = List.Item

class Collections extends Component {
	constructor(props){
		super(props);
		this.state = {
			collectionsList: []
		}
	}
	componentWillMount(){
		this.getData();
	}
	getData(){
		axios
			.get(getPath(`topic_collect/${this.props.match.params.loginname}`))
			.then(({data})=>{
				console.log(data)
				this.setState({collectionsList: data.data})
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
	// 跳转页面
	changePage(url){
		console.log(url)
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	render(){
		let { match } = this.props;
		let collectionsList = this.state.collectionsList;
		console.log(match)
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
								<li className="active">{ match.params.loginname } 收藏的话题</li>
							</ul>
						</div>
					</div>
					<div className="panel">
						{
							collectionsList &&
								collectionsList.length !== 0 
									? collectionsList.map((list, index)=>{
										return (
											<Item 
												key={index}
												extra={getDateDiff(list.last_reply_at)} 
												align="middle" 
												thumb={list.author.avatar_url}
												multipleLine
												onClick={this.changePage(`/topic/${list.id}`)}
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
						}
					</div>
					<WhiteSpace />
				</div>
			</WingBlank>					
		)
	}
}

export default Collections;