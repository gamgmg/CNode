let sessionStorage = {
	setLoginInfo(loginInfo){
		window.sessionStorage.setItem('loginInfo', loginInfo)
	},
	getLoginInfo(){
		let loginInfo = window.sessionStorage.getItem('loginInfo')
		return loginInfo ? JSON.parse(loginInfo) : { success: false, avatar_url: '', id: '', loginname: '', accessToken: '' }
	},
	removeLoginInfo(){
		window.sessionStorage.removeItem('loginInfo');
	},
	setTabData(tab, tabData){
		window.sessionStorage.setItem(tab, tabData)
	},
	getTabData(tab){
		let tabData = window.sessionStorage.getItem(tab)
		return JSON.parse(tabData)
	},
	setTab(tab, tabValue){
		window.sessionStorage.setItem(tab, tabValue)
	},
	getTab(tab){
		let tabValue = window.sessionStorage.getItem(tab)
		return tabValue === 'all' ? null : tabValue 
	},
	setPage(page, tabPage){
		window.sessionStorage.setItem(page, tabPage)
	},
	getPage(page){
		let tabPage = window.sessionStorage.getItem(page)
		return tabPage ? tabPage : 1
	}
}

export default sessionStorage