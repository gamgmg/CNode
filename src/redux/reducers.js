import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'
import sessionStorage from '../utils/storage'

const initState = {
	loginInfo: sessionStorage.getLoginInfo()
}

function loginInfo(state = initState.loginInfo, action){
	switch(action.type){
		case ActionTypes.LOGIN:
			return action.loginInfo;
		case ActionTypes.LOGOUT:
			return { success: false, avatar_url: '', id: '', loginname: '', accessToken: '' }; 
		default:
			return state;
	}
}

const reducer = combineReducers({
	loginInfo
})

export default reducer;