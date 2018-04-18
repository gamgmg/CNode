import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavBar, Icon, WingBlank, WhiteSpace, List, Button, Toast } from 'antd-mobile'
import SimpleMDE from 'react-simplemde-editor'
import { CSSTransition } from "react-transition-group"
import moment from 'moment'
import 'moment/locale/zh-cn'
import axios from 'axios'
import getPath from '@/config/api'
import 'github-markdown-css/github-markdown.css'
import 'react-simplemde-editor/demo/dist/stylesheets/vendor.css'
import './Topic.css'

let Item = List.Item

class Topic extends Component {
	constructor(props){
		super(props);
		this.state = {
			topicData: Object.create(null),
			topThreeList: [],
			isCollect: false,
			content: '',
			upsStatus: 'down',
			show: false,
		}
	}
	componentWillMount(){
		this.getData();
	}
	componentDidMount(){
		this.setState({show: true});
		this.props.loginInfo.success && this.markAllMessage();	
	}
	getData(){
		axios
			.get(getPath(`topic/${this.props.match.params.id}`))
			.then(({ data })=>{
				if(data.success){
					this.setState({
						topicData: data.data
					}, ()=>{
						data.data.replies && this.getTopThreeList(data.data.replies);
						this.props.loginInfo.loginname && this.getTopicCollects();
					})
					
				}
			})
	}
	// 标记全部已读
	markAllMessage(){
		axios
			.post(getPath('message/mark_all'), {
				accesstoken: this.props.loginInfo.accessToken
			})
	}
	// 获取用户收藏的主题
	getTopicCollects(){
		axios
			.get(getPath(`topic_collect/${this.props.loginInfo.loginname}`))
			.then(({data})=>{
				data.data.map( value => value.id === this.state.topicData.id && this.setState({isCollect: true}) )
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
			good: '精华',
			share: '分享',
			ask: '问答',
			job: '招聘',
			dev: '测试',
		}
		return tabsList[tab];
	}
	// 获取点赞数大于3的回复列表
	getTopThreeList(replies){
		if(!replies) return; 
		let topThreeList = replies.filter( reply => reply.ups.length >=3 )
		for(let j=0;j<topThreeList.length-1;j++){
	    	//两两比较，如果前一个比后一个小，则交换位置。
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
	goToUserPage(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	// 收藏主题
	collectTopic(){
		axios
			.post(getPath('topic_collect/collect'), {
				accesstoken: this.props.loginInfo.accessToken,
				topic_id: this.state.topicData.id
			})
			.then(({data})=>{
				data.success && this.setState({isCollect: true})
			})
	}
	// 取消收藏
	deCollectTopic(){
		axios
			.post(getPath('topic_collect/de_collect'), {
				accesstoken: this.props.loginInfo.accessToken,
				topic_id: this.state.topicData.id
			})
			.then(({data})=>{
				data.success && this.setState({isCollect: false})
			})
	}
	// 回复主题
	replyTopic(){
		axios
			.post(getPath(`topic/${this.state.topicData.id}/replies`), {
				accesstoken: this.props.loginInfo.accessToken,
				content: this.state.content,
			})
			.then((res)=>{
				window.location.reload()
			})
	}
	// 编辑主题
	updateTopic(){
		this.props.history.push({
			pathname: `/Topic/${this.state.topicData.id}/edit`
		})
	}
	// 为评论点赞
	replyUps(replyId, index){
		if(!this.props.loginInfo.success) {
			Toast.info('请先登录，登陆后即可点赞。');
			return;
		}

		axios
		.post(getPath(`/reply/${replyId}/ups`), {
			accesstoken: this.props.loginInfo.accessToken
		})
		.then(({data})=>{
			if(data.success){
				let topicData = this.state.topicData;
				switch(data.action){
					case 'down':
						topicData.replies[index].ups.pop();
						this.setState({upsStatus: 'down'});
						break;
					default:
						topicData.replies[index].ups.push(this.props.loginInfo.id);
						this.setState({upsStatus: 'up'});
						break;
				}
				this.setState({topicData})
			}
		})
	}
	// 回复另一个评论
	replyToReply(loginname){
		this.setState({content: `@${loginname}`});
		let topic = ReactDOM.findDOMNode(this.refs.topic);
		let addReply = ReactDOM.findDOMNode(this.refs.addReply);
		topic.scrollTop = addReply.offsetTop;	
	}
	render(){
		let { title, top, content, create_at, author, visit_count, tab, replies } = this.state.topicData; 
		let { loginInfo } = this.props;
		return (
			<CSSTransition in={this.state.show} timeout={300} classNames="translate">
			<div className="topic" ref="topic">
				<WingBlank size="sm">
					<NavBar
						mode="light"
						icon={<Icon type="left"/>}
						onLeftClick={this.clickBack}
					>详情</NavBar>
				</WingBlank>
				<WhiteSpace />
				<WingBlank size="sm">
					<div className="panel">
						<div className="header topic_header">
							<span className="topic_full_title">
								{
									top && ( <span className="dc-header-label">置顶</span> )
								}
								{ title }
							</span>
							<div className="changes">
								<span>发布于 { moment(create_at).fromNow() }</span>
								{
									author && ( <span onClick={this.goToUserPage(`/user/${author.loginname}`)}>作者 { author.loginname }</span> )
								}
								<span>{ visit_count } 次浏览</span>
								<span>来自 { this.fromTo(tab) }</span>
								{
									loginInfo.success && 
										!this.state.isCollect 
										? ( <Button className="collect_btn pull-right" inline size="small" onClick={this.collectTopic.bind(this)}>收藏</Button> )
										: ( <Button className="collect_btn pull-right" style={{backgroundColor: '#909090'}} inline size="small" onClick={this.deCollectTopic.bind(this)}>取消收藏</Button> )
								}
							</div>
							<div className="manage_topic">
								{
									loginInfo.success && author && loginInfo.loginname === author.loginname && <b className="icon-edit" onClick={this.updateTopic.bind(this)}></b>
								}
							</div>
						</div>
						<div className="inner inner_topic">
							<div className="dc-topic-content">
								<div dangerouslySetInnerHTML={{__html: this.escape(content?`${content}`:'')}} />
							</div>
						</div>
					</div>
				</WingBlank>
				<WingBlank size="sm">
					<div className="panel">
						<div className="header">
							<span>
								{ 
									replies 
										? replies.length
										: 0
						    	}回复
							</span>
						</div>
						{ 
							replies &&
								replies.map((reply, index)=>{
									return (
										<div className={ this.setHeightLight(reply) ? 'cell reply_highlight' : 'cell' } key={ reply.id }>
											<Item 
												key={index}
												extra={
													<div>
														<span className={reply.ups.includes(loginInfo.id) ? 'icon-good-filling ups' : 'icon-good-filling'} onClick={this.replyUps.bind(this, reply.id, index)}></span>
														<span> {reply.ups.length} </span>
														{
															loginInfo.success &&
																(<span className="icon-undo2" onClick={this.replyToReply.bind(this, reply.author.loginname)}></span>)
														}
													</div>
												} 
												align="middle" 
												thumb={reply.author.avatar_url}
											>
										  		<span onClick={this.goToUserPage(`/user/${reply.author.loginname}`)}>{ reply.author.loginname }</span>
										  		<a>
										  			<span> { ++index }楼</span>
										  			<span> { moment(reply.create_at).fromNow() }</span>
									  			</a>
									  			{
									  				author &&
									  					author.loginname === reply.author.loginname &&
									  						( <span className="authorLabel">作者</span> ) 
									  			}
									  			
											</Item>
											<div className="dc-reply-content">												
												<div dangerouslySetInnerHTML={{__html: this.escape(reply.content?`${reply.content}`:'')}} />
											</div>
										</div>
									)
								})
						}
						<WhiteSpace />
					</div>
				</WingBlank>
				{
					loginInfo.success &&
						(
							<WingBlank size="sm" className="addReply" ref="addReply">
								<div className="panel">
									<div className="header">
										<span className="col_fade">添加回复</span>
									</div>
									<div className="inner">
										<SimpleMDE  
											onChange={value => this.setState({content: value})}
											value={this.state.content}
											options={{
												placeholder: '请输入内容',
										    	spellChecker: false,
										    	styleSelectedText: false,
										    	renderingConfig: {
										    		singleLineBreaks: false
										    	}
											}}
										/>
										<Button className="collect_btn" inline size="small" onClick={this.replyTopic.bind(this)}>回复</Button>
									</div>
								</div>
								<WhiteSpace />
							</WingBlank>
						)
				}
			</div>
			</CSSTransition>
		)
	}
}

export default Topic;