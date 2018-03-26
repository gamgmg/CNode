import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { PullToRefresh, SegmentedControl, WingBlank, List, ListView } from 'antd-mobile'
import moment from 'moment'
import 'moment/locale/zh-cn'
import axios from 'axios'
import getPath from '@/config/api'
import './Home.css'
const Item = List.Item
const Brief = Item.Brief

// 主题列表数据
let topicsList = []

class Home extends Component {
	constructor(props){
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2 
		})
		this.state = {
			dataSource: dataSource.cloneWithRows(topicsList), //topicsList作为ListView的源数据
			topicsList: [],
			page: 1,
			tab: null,
			selectedIndex: 0,
			loading: false,
			refreshing: false,
		}
	}
	componentWillMount(){
		this.getData();
	}
	componentDidMount(){
		let fixedBall = ReactDOM.findDOMNode(this.refs.fixedBall);
        this.props.loginInfo.success &&
            (fixedBall.style.backgroundImage = `url(${this.props.loginInfo.avatar_url})`);
	}
	getData(){
		this.setState({loading: true, refreshing: true});
		axios
			.get(getPath('topics'),{
				params: {
					page: this.state.page,
					limit: 20,
					tab: this.state.tab
				}
			})
			.then(({data})=>{
				if(data.success){
					topicsList = topicsList.concat(data.data);
					this.setState({
						topicsList, 
						loading: false,
						dataSource: this.state.dataSource.cloneWithRows(topicsList),
						refreshing: false,
					});
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
				this.setState({tab: 'good'});
				break;
			case 2:
				this.setState({tab: 'share'});
				break;
			case 3:
				this.setState({tab: 'ask'});
				break;
			case 4:
				this.setState({tab: 'job'});
				break;
			case 5:
				this.setState({tab: 'dev'});
				break;
			default:
				this.setState({tab: null});
				break;
		}
		topicsList = [];
		this.setState({
			selectedIndex: e.nativeEvent.selectedSegmentIndex,
			page: 1
		}, ()=>{
			this.getData();
		})
	}
	getTab(tab, top, good){
		let tabsList = {
			good: '精华',
			share: '分享',
			ask: '问答',
			job: '招聘',
			dev: '测试'
		}
		return top 
			? '置顶' 
			: good
				? '精华'
				: tabsList[tab];
	}
	// 跳转到详情页
	changePage(url){
		return ()=>{
			this.props.history.push({
				pathname: url
			})
		}
	}
	renderList(){
		const row = (rowData, sectionID, rowID) => {
			return (
				<Item 
					key={rowID}
					extra={moment(rowData.last_reply_at).fromNow()} 
					align="middle" 
					thumb={rowData.author.avatar_url}
					multipleLine
					wrap={true}
					onClick={this.changePage(`/topic/${rowData.id}`)}
				>
			  		<span className={(rowData.top || rowData.good) ? 'hc-label heightLight-label' : 'hc-label'}>{this.getTab(rowData.tab, rowData.top, rowData.good)}</span>
			  		{rowData.title}
			  		<Brief>{`${rowData.reply_count}/${rowData.visit_count}`}</Brief>
				</Item>
			)
		}
		return (
			<ListView 
				style={{
					height: document.querySelector('.app-content').offsetHeight - 28 + 'px',
					overflow: 'auto',
				}}
				dataSource={this.state.dataSource}
				renderFooter={() => (
					<div style={{padding: 30, textAlign: 'center'}}>
			          	{this.state.loading ? '加载中' : '加载完成'}
			        </div>
				)}
				renderRow={row}
				pageSize={4}
				scrollRenderAheadDistance={200}
		        scrollEventThrottle={20}
		        onEndReachedThreshold={10}
				pullToRefresh={
					<PullToRefresh 
						refreshing={this.state.refreshing}
						distanceToRefresh={100}
						onRefresh={()=>{
							this.setState({page: 1});
							this.getData();
						}}
					/>
				}
		        onEndReached={(event)=>{
					let current = this.state.page;
					this.setState({page: ++current});
					this.getData();
				}}
			/>
		)
	}
	render() {
		return (
			<WingBlank size="sm" className="home">
				{
					this.props.loginInfo.success &&
					 (<div className="fixedBall" ref="fixedBall" onClick={ this.changePage(`/user/${this.props.loginInfo.loginname}`) }></div>)
				}

				<div className="home-segment">
					<SegmentedControl selectedIndex={this.state.selectedIndex} values={['全部', '精华', '分享', '问答', '招聘', '测试']} onChange={this.segmentChange.bind(this)}/>
				</div>
				<div className="home-content">
					{
						this.state.dataSource.length !== 0 &&
							this.renderList()
					}
				</div>
			</WingBlank>
		)
	}
}

export default Home;