import React, { Component } from 'react'
import axios from 'axios'
import getPath from '@/config/api'
class User extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.getData();
	}
	getData(){
		axios.get(getPath(`user/${this.props.match.params.loginname}`))
			.then(({data})=>{
				if(data.success){
					console.log(data.data)

				}
			})
	}
	render(){
		// let { match } = this.props;
		// console.log(match)
		return (
			<div>这是一个user页</div>
		)
	}
}

export default User;