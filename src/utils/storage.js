let sessionStorage = {
	setLoginInfo(loginInfo){
		window.sessionStorage.setItem('loginInfo', loginInfo)
	},
	getLoginInfo(){
		let loginInfo = window.sessionStorage.getItem('loginInfo')
		return loginInfo ? JSON.parse(loginInfo) : { success: false, avatar_url: '', id: '', loginname: '', accessToken: '' }
	}
}

export default sessionStorage