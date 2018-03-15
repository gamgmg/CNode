import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios'
import getPath from '@/config/api'
import './Detail.css'

class Detail extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
		axios.get(getPath('GET_TOPICS'), {
			params: {
				id: this.props.match.params.id
			}
		})
		.then((res)=>{
			console.log(res)
		})
	}
	clickBack(){
		window.history.back();
	}
	render(){
		// console.log(this.props)
		return (
			<div className="detail">
				<NavBar
					mode="light"
					icon={<Icon type="left"/>}
					onLeftClick={this.clickBack}
				>
					title
				</NavBar>
			</div>
		)
	}
}

export default Detail;