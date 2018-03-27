import React, { Component } from 'react'
import { WingBlank, WhiteSpace, List, Button, Picker, InputItem, Toast } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import SimpleMDE from 'react-simplemde-editor'
import 'github-markdown-css/github-markdown.css'
import 'react-simplemde-editor/demo/dist/stylesheets/vendor.css'

// 板块数据
let district = [{
	value: 'dev',
	label: '测试'
}]

class Release extends Component {
	constructor(props){
		super(props);
		this.state = {
			tab: '',
			title: '',
			content: '',
		}
	}
	componentWillMount(){
		this.props.match.path.includes('edit') && this.getData();
	}
	getData(){
		axios
			.get(getPath(`topic/${this.props.match.params.id}`), {params: {mdrender: false}})
			.then(({ data })=>{
				if(data.success){
					this.setState({
						tab: [data.data.tab],
						title: data.data.title,
						content: data.data.content
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
	// 发布话题
	releaseTopic(){
		if(!this.state.tab[0]) {
			Toast.info('模板不能为空', 1);
			return;
		}
		if(!this.state.content) {
			Toast.info('内容不能为空', 1);
			return;
		}
		if(!this.state.title) { 
			Toast.info('标题不能为空', 1);
			return;
		}
		if(this.state.title.length < 10) {
			Toast.info('标题字数不能少于10个字', 1);
			return;
		}
		if(this.props.match.path.includes('edit')){
			axios
				.post(getPath('topics/update'), {
					accesstoken: this.props.loginInfo.accessToken,
					topic_id: this.props.match.params.id,
					title: this.state.title,
					tab: this.state.tab[0],
					content: this.state.content
				})
				.then(({data})=>{
					data.success && this.props.history.push({pathname: '/'})
				})
		}else{
			axios
				.post(getPath('topics'), {
					accesstoken: this.props.loginInfo.accessToken,
					title: this.state.title,
					tab: this.state.tab[0],
					content: this.state.content
				})
				.then(({data})=>{
					data.success && this.props.history.push({pathname: '/'})
				})
		}
		
	}
	render(){
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
								<li className="active">发布话题</li>
							</ul>
						</div>
						<div className="inner">
							<Picker 
								data={district} 
								cols={1} 
								onChange={ value => this.setState({tab: value}) } 
								onOk={ value => this.setState({tab: value}) } 
								className="forss"
								value={this.state.tab}
							>
					          	<List.Item arrow="horizontal">选择版块</List.Item>
					        </Picker>
							<WhiteSpace />
					        <InputItem 
								placeholder="标题字数 10字以上"
								onChange={(value)=>this.setState({title: value})}
								value={this.state.title}
							></InputItem>
							<WhiteSpace />
							<SimpleMDE  
								onChange={value => this.setState({content: value})}
								value={this.state.content}
								options={{
									placeholder: '请输入内容',
							    	styleSelectedText: false,
							    	renderingConfig: {
							    		singleLineBreaks: false
							    	}
								}}
							/>
							<Button className="collect_btn" inline size="small" onClick={ this.releaseTopic.bind(this) }>发布</Button>
						</div>
					</div>
					<WhiteSpace />
				</div>
			</WingBlank>
		)
	}
}

export default Release