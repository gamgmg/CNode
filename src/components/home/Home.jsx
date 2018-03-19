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
			selectedIndex: 0,
			loading: false,
		}
	}
	componentWillMount(){
		this.getData();
	}
	getData(){
		this.setState({loading: true});
		axios.get(getPath('topics'),{
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
				this.setState({topicsList, loading: false});
			}
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	// 切换类型
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
			case 4:
				this.setState({tab: 'good'});
				break;
			default:
				this.setState({tab: null});
				break;
		}
		topicsList = [];
		// setTimeout(()=>{this.getData()},10);
		this.setState({
			selectedIndex: e.nativeEvent.selectedSegmentIndex,
			page: 1
		}, ()=>{
			this.getData();
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
	render() {
		let { match } = this.props;
		// console.log(match)
		return (
			<WingBlank size="sm" className="home">					
				<div className="home-segment">
					<SegmentedControl selectedIndex={this.state.selectedIndex} values={['全部', '分享', '问答', '招聘', '精华']} onChange={this.segmentChange.bind(this)}/>
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
							!this.state.loading 
								? this.state.topicsList.map((list, index)=>{
									return (
										<Item 
											key={index}
											extra={getDateDiff(list.last_reply_at)} 
											align="middle" 
											thumb={list.author.avatar_url}
											multipleLine
											onClick={this.goToDetailPage(`${match.url + '/' + list.id}`)}
										>
									  		<span className={(list.top || list.good) ? 'hc-label heightLight-label' : 'hc-label'}>{this.getTab(list.tab, list.top, list.good)}</span>{list.title}<Brief>{`${list.reply_count}/${list.visit_count}`}</Brief>
										</Item>
									)
								}) 
								: null
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