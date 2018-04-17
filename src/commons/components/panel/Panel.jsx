import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd-mobile'
import moment from 'moment'
import 'moment/locale/zh-cn'
const Item = List.Item

class Panel extends PureComponent {
	getTab(tab, top, good){
		let tabsList = {
			ask: '问答',
			share: '分享',
			job: '招聘',
			good: '精华',
			dev: '测试',
		}
		return top 
			? '置顶' 
			: good
				? '精华'
				: tabsList[tab];
	}
	render(){
		return (
			<div className="panel">
				<div className="header">
					<span className="col_fade">{this.props.title}</span>
				</div>
				{
					this.props.dataSource &&
						this.props.dataSource.length !== 0 
							? this.props.dataSource.map((list, index)=>{
								return (
									<Item 
										key={index}
										extra={moment(list.last_reply_at).fromNow()} 
										align="middle" 
										thumb={list.author.avatar_url}
										multipleLine
										onClick={this.props.changePage(`/topic/${list.id}`)}
									>
								  		<span className={(list.top || list.good) ? 'hc-label heightLight-label' : 'hc-label'}>{this.getTab(list.tab, list.top, list.good)}</span>{list.title}
									</Item>
								)	
							})
							: (
								<div className="inner">
									<p>无话题</p>
								</div>
							)
				}
			</div>
		)
	}
}

Panel.propTypes = {
	title: PropTypes.string,
	dataSource: PropTypes.array,
	changePage: PropTypes.func,
}

export default Panel;
