import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { PullToRefresh, SegmentedControl, WingBlank, List } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import getDateDiff from '@/utils/timestamp'
import Detail from '../detail/Detail'
import './Home.css'
const Item = List.Item
const Brief = Item.Brief
let topicsList = []

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			topicsList: [],
			page: 1,
			tab: null,
			selectedIndex: 0
		}
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
		axios.get(getPath('GET_TOPICS'),{
			params: {
				page: this.state.page,
				limit: 20,
				tab: this.state.tab
			}
		})
		.then(({data})=>{
			if(data.success){
				topicsList = topicsList.concat(data.data);
				console.log(topicsList)
				this.setState({topicsList})
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	segmentChange(e){
		switch(e.nativeEvent.selectedSegmentIndex){
			case 1:
				this.setState({tab: 'share'});
				break;
			case 2:
				this.setState({tab: 'ask'});
				break;
			case 3:
				this.setState({tab: 'job'});
				break;
			default:
				this.setState({tab: null});
				break;
		}
		topicsList = [];
		setTimeout(()=>{this.getData()},10);
		this.setState({
			selectedIndex: e.nativeEvent.selectedSegmentIndex
		})
	}
	getTab(tab, top){
		let tabsList = {
			ask: '问答',
			share: '分享',
			job: '招聘',
		}
		return top ? '置顶' : tabsList[tab];
	}
	toDetail(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	render() {
		let { match } = this.props;
		console.log(match)
		return (
			<WingBlank size="sm" className="home">					
				<div className="home-segment">
					<SegmentedControl selectedIndex={this.state.selectedIndex} values={['全部', '分享', '问答', '招聘']} onChange={this.segmentChange.bind(this)}/>
				</div>
				<div className="home-content">
					<List className="my-list">
						<PullToRefresh
							direction='up'
							onRefresh={()=>{
								let current = this.state.page;
								this.setState({page: ++current});
								this.getData();
							}}
						>
						{
							this.state.topicsList.map((list)=>{
								return (
									<Item 
										key={list.id}
										extra={getDateDiff(new Date(list.last_reply_at))} 
										align="middle" 
										thumb={list.author.avatar_url}
										multipleLine
										onClick={this.toDetail(`${match.url + '/' + list.id}`)}
									>
								  		<span className="tab">{this.getTab(list.tab, list.top)}</span>{list.title}<Brief>{`${list.reply_count}/${list.visit_count}`}</Brief>
									</Item>
								)
							})
						}
						</PullToRefresh>
					</List>
				</div>
				<Route path={`${match.url + '/:id'}`} component={Detail} />
			</WingBlank>
		)
	}
}

export default Home;