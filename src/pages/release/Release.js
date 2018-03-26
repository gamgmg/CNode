import React, { Component } from 'react'
import { WingBlank, WhiteSpace, List, Button, Picker, InputItem } from 'antd-mobile'
import SimpleMDE from 'react-simplemde-editor'
import 'github-markdown-css/github-markdown.css'
import 'react-simplemde-editor/demo/dist/stylesheets/vendor.css'

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
	// 跳转页面
	changePage(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	releaseTopic(){
		console.log('tab',this.state.tab[0])
		console.log('title',this.state.title)
		console.log('content',this.state.content)
		!this.state.tab && console.log('模板不能为空')
		!this.state.content && console.log('内容不能为空')
		!this.state.title 
			? console.log('标题不能为空')
			: this.state.title.length < 10 && console.log('标题字数不能少于10字节')
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