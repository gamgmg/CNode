import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import Panel from '@/commons/components/panel/Panel'

class Collections extends Component {
	constructor(props){
		super(props);
		this.state = {
			collectionsList: []
		}
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
		axios
			.get(getPath(`topic_collect/${this.props.match.params.loginname}`))
			.then(({data})=>{
				this.setState({collectionsList: data.data})
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
		let collectionsList = this.state.collectionsList;
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
					<Panel title='收藏的话题' dataSource={collectionsList} changePage={this.changePage.bind(this)}/>
					<WhiteSpace />
				</div>
			</WingBlank>					
		)
	}
}

export default Collections;