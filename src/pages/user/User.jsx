import React, { Component } from 'react'
import { WingBlank, WhiteSpace, Button } from 'antd-mobile'
import moment from 'moment'
import 'moment/locale/zh-cn'
import axios from 'axios'
import getPath from '@/config/api'
import Panel from '@/commons/components/panel/Panel'

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
		axios
			.get(getPath(`user/${this.props.match.params.loginname}`))
			.then(({data})=>{
				if(data.success){
					this.setState({
						userInfo: data.data
					})
				}
			})
	}
	// 跳转页面
	changePage(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	render(){
		let { match } = this.props;
		let { avatar_url, create_at, loginname, recent_replies, recent_topics, score } = this.state.userInfo;
		return (
			<WingBlank size="sm">
				<div className="user">
					<WhiteSpace />
					<div className="panel">
						<div className="header">
							<ul className="breadcrumb">
								<li>
									<a onClick={ this.changePage('/') }>主页</a>
									<span className="divider"> / </span>
								</li>
							</ul>
						</div>
						<div className="inner userinfo">
							<div className="user_big_avatar">
								<img src={ avatar_url } alt={loginname}/>
							</div>
							<a className="dark">{ loginname }</a>
							<div className="user_profile">
								<ul className="unstyled">
									{
										this.props.loginInfo.success &&
											(<Button className="topics_btn" style={{backgroundColor: '#80bd01'}} inline size="small" onClick={ this.changePage('/release') }>发布话题</Button>)
									}
									<span className="big">{ score } </span>积分
									<li>
										<a className="dark">
											<span onClick={ this.changePage(`${match.url + '/collections' }`) }>查看话题收藏</span>
										</a>
									</li>
								</ul>
							</div>
							<p className="col_fade">注册时间 {moment(create_at).fromNow()}</p>
						</div>
					</div>
					<Panel title='最近创建的话题' dataSource={recent_topics} changePage={this.changePage.bind(this)}/>
					<Panel title='最近参与的话题' dataSource={recent_replies} changePage={this.changePage.bind(this)}/>
					<WhiteSpace />
				</div>
			</WingBlank>
		)
	}
}

export default User;