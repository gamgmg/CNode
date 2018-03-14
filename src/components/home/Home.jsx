import React, { Component } from 'react'
import { SegmentedControl, WingBlank, List } from 'antd-mobile'
import Page from '../page/Page'

import './Home.css'

import axios from 'axios'
import getPath from '@/config/api'
import getDateDiff from '@/utils/timestamp'

const Item = List.Item
const Brief = Item.Brief

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			topicsList: []
		}
	}
	componentDidMount(){
		axios.get(getPath('GET_TOPICS'),{
			params: {
				page: 50,
				limit: 20
			}
		})
			.then(({data})=>{
				if(data.success){
					this.setState({
						topicsList: data.data
					}, ()=>{
						console.log(this.state.topicsList)
					})
				}
			})
			.catch((err)=>{
				console.log(err)
			})
	}
	render() {
		return (
			<WingBlank size="sm" className="home">					
				<div className="home-segment">
					<SegmentedControl values={['全部', '精华', '分享', '问答', '招聘']} />
				</div>
				<div className="home-content">
					<List className="my-list">
						{
							this.state.topicsList.map((list)=>{
								return (
									<Item 
										key={list.id}
										extra={getDateDiff(new Date(list.last_reply_at))} 
										align="top" 
										thumb={list.author.avatar_url}
										multipleLine
									>
								  		{list.title}<Brief>{`${list.reply_count}/${list.visit_count}`}</Brief>
									</Item>
								)
							})
						}
					</List>
				</div>
				<div className="home-page">
					<Page />
				</div>
			</WingBlank>
		)
	}
}

export default Home;