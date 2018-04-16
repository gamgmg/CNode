import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd-mobile'
const Item = List.Item

class Panel extends Component {
	render(){
		return (
			<div className="panel">
				{
					this.props.dataSource &&
						this.props.dataSource.length !== 0 
							? this.props.dataSource.map((list, index)=>{
								return (
									<Item key={index} data-seed={index}>
										<a onClick={this.props.changePage(`/user/${list.author.loginname}`)}>{ list.author.loginname }</a> 
										<span> 回复了你的话题 </span> 
										<a onClick={this.props.changePage(`/topic/${list.topic.id}`, list.id)}>{ list.topic.title }</a>
									</Item>
								)	
							})
							: (
								<div className="inner">
									<p>无消息</p>
								</div>
							)
				}
			</div>
		)
	}
}

Panel.propTypes = {
	dataSource: PropTypes.array,
	changePage: PropTypes.func,
}

export default Panel;
