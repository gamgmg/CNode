import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { initLoginInfo } from '../../redux/actions'
import logo from '../../assets/img/cnodejs_light.svg'
import axios from 'axios'
import getPath from '@/config/api'

class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
			messageCount: 0
		}
	}
	componentWillReceiveProps(prew){
		let accesstoken = prew.loginInfo.accessToken
		accesstoken && this.getMessageCount(accesstoken);
	}
	getMessageCount(accesstoken){
		axios
			.get(getPath('message/count'), {
				params: {
					accesstoken
				}
			})
			.then(({data})=>{
				data.success && this.setState({ messageCount: data.data })
			})
	}
	render(){
		let { loginInfo, initLoginInfo } = this.props
		return (
			<div>
				<img src={logo} className="app-logo" alt="logo" />
				<div className="app-header_list">
		      		<div>
		        		<NavLink to="/home">首页</NavLink>
		      		</div>
		      		{
		      			loginInfo.success
		      				? (
		      					<React.Fragment>
		      						<div>
					      			{  
					      				this.state.messageCount.length > 0 &&
					      					( <span className="big messages_count">{ this.state.messageCount }</span> )
					      			}
					      			<NavLink to="/my/messages">未读消息</NavLink>
					      			</div> 
						      		<div><a onClick={()=>initLoginInfo()}>退出</a></div>
		      					</React.Fragment>
	      					)
	      					: (
								<React.Fragment>
									<div>
						        		<NavLink to="/login">登陆</NavLink>
						      		</div>
								</React.Fragment>
	      					)
		      		}
		    	</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

const mapDispatchToProps = (dispatch) => ({
	initLoginInfo: (loginInfo) => {
		dispatch(initLoginInfo(loginInfo))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)




