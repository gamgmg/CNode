import React, { Component } from 'react'
import { PullToRefresh, SegmentedControl, WingBlank, List, ListView } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import getDateDiff from '@/utils/timestamp'
import './Home.css'
const Item = List.Item
const Brief = Item.Brief

let topicsList = []



class Home extends Component {
	constructor(props){
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2 
		})
		this.state = {
			dataSource: dataSource.cloneWithRows({}),
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
				// console.log(topicsList)
				this.setState({
					topicsList, 
					loading: false,
					dataSource: this.state.dataSource.cloneWithRows(topicsList),
				}, ()=>{
					console.log(this.state.dataSource)
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
			good: '精华',
			share: '分享',
			ask: '问答',
			job: '招聘',
			dev: '客户端测试'
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
	renderList(){
		const row = (rowData, sectionID, rowID) => {
			return (
				<Item 
					key={rowID}
					extra={getDateDiff(rowData.last_reply_at)} 
					align="middle" 
					thumb={rowData.author.avatar_url}
					multipleLine
					onClick={this.goToDetailPage(`/topic/${rowData.id}`)}
				>
			  		<span className={(rowData.top || rowData.good) ? 'hc-label heightLight-label' : 'hc-label'}>{this.getTab(rowData.tab, rowData.top, rowData.good)}</span>
			  		{rowData.title}
			  		<Brief>{`${rowData.reply_count}/${rowData.visit_count}`}</Brief>
				</Item>
			)
		}
		function MyBody(props) {
		  	return (
			    <div className="am-list-body my-body" style={{position: 'inherit', width: '100%'}}>
			      	{props.children}
			    </div>
		  	)
		}
		return (
			<ListView 
				style={{
					height: document.querySelector('.app-content').offsetHeight - 28 +'px',
					overflow: 'auto',
				}}
				dataSource={this.state.dataSource}
				renderFooter={() => (
					<div style={{padding: 30, textAlign: 'center'}}>
			          	{this.state.loading ? '加载中' : '加载完成'}
			        </div>
				)}
				renderBodyComponent={() => <MyBody />}
				renderRow={row}
				pageSize={4}
				scrollRenderAheadDistance={50}
		        scrollEventThrottle={20}
		        onEndReachedThreshold={10}
		        onEndReached={(event)=>{
					let current = this.state.page;
					this.setState({page: ++current});
					this.getData();
					// this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs)})
				}}
			/>
		)
	}
	render() {
		// let { match } = this.props;
		// console.log(match)
		return (
			<WingBlank size="sm" className="home">					
				<div className="home-segment">
					<SegmentedControl selectedIndex={this.state.selectedIndex} values={['全部', '精华', '分享', '问答', '招聘', '客户端测试']} onChange={this.segmentChange.bind(this)}/>
				</div>
				<div className="home-content">
					{/*<List className="my-list">
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
											onClick={this.goToDetailPage(`/topic/${list.id}`)}
										>
									  		<span className={(list.top || list.good) ? 'hc-label heightLight-label' : 'hc-label'}>{this.getTab(list.tab, list.top, list.good)}</span>{list.title}<Brief>{`${list.reply_count}/${list.visit_count}`}</Brief>
										</Item>
									)
								}) 
								: (
									<div className="skeleton-Screen">
										<div className="skeleton-Screen-img"></div>
										<div className="skeleton-Screen-content">
											<div className="skeleton-Screen-title"></div>
											<div className="skeleton-Screen-count"></div>
										</div>
									</div>
								)
						}
						</PullToRefresh>
					</List>*/}
					{
						this.state.dataSource.length !== 0 
							? this.renderList()
							: (
								<div className="skeleton-Screen">
									<div className="skeleton-Screen-img"></div>
									<div className="skeleton-Screen-content">
										<div className="skeleton-Screen-title"></div>
										<div className="skeleton-Screen-count"></div>
									</div>
								</div>
							)
					}
				</div>
			</WingBlank>
		)
	}
}

export default Home;