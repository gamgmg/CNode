import React, { Component } from 'react'
import { NavBar, Icon, WingBlank, WhiteSpace, List } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import getDateDiff from '@/utils/timestamp'
import './Detail.css'

let Item = List.Item

class Detail extends Component {
	constructor(props){
		super(props);
		this.state = {
			detailData: Object.create(null),
			topThreeList: []
		}
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
		axios.get(getPath(`topic/${this.props.match.params.id}`))
		.then(({ data })=>{
			console.log(data)
			if(data.success){
				this.setState({
					detailData: data.data
				}, ()=>{
					data.data.replies && this.getTopThreeList(data.data.replies);
				})
				
			}
		})
	}
	clickBack(){
		window.history.back();
	}
	// 注释script
	escape(str){
		return str.replace(/\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
	}
	fromTo(tab){
		let tabsList = {
			ask: '问答',
			share: '分享',
			job: '招聘',
		}
		return tabsList[tab];
	}
	// 获取点赞数大于3的回复列表
	getTopThreeList(replies){
		if(!replies) return; 
		let topThreeList = replies.filter( reply => reply.ups.length >=3 )
		for(let j=0;j<topThreeList.length-1;j++){
	    	//两两比较，如果前一个比后一个大，则交换位置。
	       	for(let i=0;i<topThreeList.length-1-j;i++){
	            if(topThreeList[i].ups.length<topThreeList[i+1].ups.length){
	                let temp = topThreeList[i];
	                topThreeList[i] = topThreeList[i+1];
	                topThreeList[i+1] = temp;
	            }
	        } 
	    }
	    this.setState({ topThreeList });
	}
	// 点赞数前三的回复设置高亮
	setHeightLight(target){		
		let topThreeList = this.state.topThreeList,
			topThreeListLen = topThreeList.length;

		for(let i=0; i < (topThreeListLen < 3 ? topThreeListLen : 3); i++){
			if(topThreeList[i].id === target.id){
				return true;
			}
		}
	}
	render(){
		let { title, top, content, create_at, author, visit_count, tab, replies } = this.state.detailData; 
		let repliesList = replies
			? replies.map((reply, index)=>{
				return (
					<div className={ this.setHeightLight(reply) ? 'cell reply_highlight' : 'cell' } key={ reply.id }>
						<Item 
							extra={reply.ups.length} 
							align="middle" 
							thumb={reply.author.avatar_url}
						>
					  		<span>{ reply.author.loginname }</span>
					  		<a>
					  			<span> { ++index }楼</span>
					  			<span> { getDateDiff(reply.create_at) }</span>
				  			</a>
				  			{
				  				author 
				  					? author.loginname === reply.author.loginname
				  						? ( <span className="authorLabel">作者</span> ) 
				  						: null
			  						: null
				  			}
				  			
						</Item>
						<div className="dc-reply-content">
							<div dangerouslySetInnerHTML={{__html: this.escape(reply.content?`${reply.content}`:'')}} />
						</div>
					</div>
				)
			})
			: null
		return (
			<div className="detail">
				<WingBlank size="sm">
					<NavBar
						mode="light"
						icon={<Icon type="left"/>}
						onLeftClick={this.clickBack}
					>
						详情
					</NavBar>
				</WingBlank>
				<WhiteSpace />
				<WingBlank size="sm">
					<div className="detail-topic-container">
						<div className="dc-header">
							<h1>
								{
									top 
										? ( <span className="dc-header-label">置顶</span> ) 
										: null
								}
								{ title }
							</h1>
							<div className="dc-header-info">
								<span>发布于{ getDateDiff(create_at) }</span>
								{
									author
										? ( <span>作者 { author.loginname }</span> )
										: null
								}
								<span>{ visit_count }次浏览</span>
								<span>来自 { this.fromTo(tab) }</span>
							</div>
						</div>
						<div className="dc-content">
							<div className="dc-topic-content">
								<div dangerouslySetInnerHTML={{__html: this.escape(content?`${content}`:'')}} />
							</div>
						</div>
					</div>
				</WingBlank>
				<WingBlank size="sm">
					<div className="detail-reply-container">
						<div className="dc-reply-header">
							<span>
								{ 
									replies 
										? replies.length
										: 0
						    	}回复
							</span>
						</div>
						{ repliesList }
					</div>
				</WingBlank>
			</div>
		)
	}
}

export default Detail;