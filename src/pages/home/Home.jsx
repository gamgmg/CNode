import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { PullToRefresh, SegmentedControl, WingBlank, List, ListView } from 'antd-mobile'
import BackToTop from '@/commons/components/backToTop/BackToTop'
import moment from 'moment'
import 'moment/locale/zh-cn'
import axios from 'axios'
import getPath from '@/config/api'
import sessionStorage from '@/utils/storage'
import './Home.css'
const Item = List.Item
const Brief = Item.Brief

class Home extends Component {
	constructor(props){
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2 
		})
		this.state = {
			dataSource: dataSource.cloneWithRows([]), //ListView源数据
			topicsList: [],
			page: 1,
			tab: null,
			selectedIndex: 0,
			loading: false,
			refreshing: false,
			showBackToTop: false,
		}
	}
	componentWillMount(){
		let tabList = {'all': 0, 'good': 1, 'share': 2, 'ask': 3, 'job': 4, 'dev': 5};
		for(let tab in tabList){
			if(sessionStorage.getTab('tab') === tab){
				this.setState({
					selectedIndex: tabList[tab]
				})
			}
		}
		let tab = sessionStorage.getTab('tab');
		let tabData = sessionStorage.getTabData(tab || 'all');
		if(tabData){
			this.setState(preState=>({
				dataSource: preState.dataSource.cloneWithRows(tabData)
			}))
		}else{
			this.getData();
		}
	}
	componentDidMount(){
		let fixedBall = ReactDOM.findDOMNode(this.refs.fixedBall);
        this.props.loginInfo.success &&
            (fixedBall.style.backgroundImage = `url(${this.props.loginInfo.avatar_url})`);

        let content = document.querySelector('.am-list-view-scrollview');
        content.addEventListener('scroll', this.throttle(this.handleScroll, 300))
	}
	componentWillUnmount(){
        let content = document.querySelector('.am-list-view-scrollview');
        content.removeEventListener('scroll', this.handleScroll);
    }
	getData(){
		this.setState({loading: true, refreshing: true});
		axios
			.get(getPath('topics'),{
				params: {
					page: sessionStorage.getPage(`${this.state.tab || 'all'}Page`),
					limit: 20,
					tab: sessionStorage.getTab('tab'),
				}
			})
			.then(({data})=>{
				if(data.success){
					let oldTabData = sessionStorage.getTabData(this.state.tab || 'all');
					let newTabData = oldTabData ? oldTabData.concat(data.data) : data.data;
					sessionStorage.setTabData(this.state.tab || 'all', JSON.stringify(newTabData));
					this.setState(preState=>({
						dataSource: preState.dataSource.cloneWithRows(newTabData),
					}),()=>{
						this.setState({loading: false, refreshing: false})
					})
				}
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	// 切换类型
	segmentChange(e){
		// 返回顶部
		document.querySelector('.am-list-view-scrollview').scrollTop = 0;
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
			
		this.setState({
			selectedIndex: e.nativeEvent.selectedSegmentIndex,
			page: sessionStorage.getPage(`${this.state.tab || 'all'}Page`)
		}, ()=>{
			sessionStorage.setTab('tab', this.state.tab || 'all');
			let tabData = sessionStorage.getTabData(this.state.tab || 'all');
			if(tabData){
				this.setState(preState=>({
					dataSource: preState.dataSource.cloneWithRows(tabData)
				}))
			}else{
				this.getData();
			}
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
	handleScroll = () => {
        let content = document.querySelector('.am-list-view-scrollview');
        if(content.scrollTop >= 200){
            this.setState({ showBackToTop: true })
        }else {
            this.setState({ showBackToTop: false })
        }
    }
    // 函数节流
    throttle(func, wait){
    	let timer, previous;
    	return function(){
    		const context = this;
    		const args = arguments;
    		const now = +new Date();
    		if(previous && now < previous + wait){
    			clearTimeout(timer);
    			timer = setTimeout(()=>{
    				previous = now;
    				func.apply(context, args)
    			}, wait)
    		}else{
    			previous = now;
    			func.apply(context, args)
    		}
    	}
    }
	backToTop(){
        let content = document.querySelector('.am-list-view-scrollview');
        content.scrollTop = 0;
        this.setState({ showBackToTop: false });
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
				pageSize={20}
				scrollRenderAheadDistance={500}
		        scrollEventThrottle={20}
		        onEndReachedThreshold={10}
				pullToRefresh={
					<PullToRefresh 
						refreshing={this.state.refreshing}
						distanceToRefresh={100}
						onRefresh={()=>{
							this.setState({page: 1},()=>{
								this.getData();
							});
						}}
					/>
				}
		        onEndReached={(event)=>{
					this.setState(preState=>({
						page: Number(sessionStorage.getPage(`${this.state.tab || 'all'}Page`)) + 1
					}),()=>{
						sessionStorage.setPage(`${this.state.tab || 'all'}Page`, this.state.page)
						this.getData();
					})
				}}
			/>
		)
	}
	render() {
		let backToTop = this.backToTop.bind(this);
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
				<BackToTop showBackToTop={this.state.showBackToTop} backToTop={backToTop} />
			</WingBlank>
		)
	}
}

export default Home;