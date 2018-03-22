import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'

const initState = {
	loginInfo: {
		success: false,
		avatar_url: '',
		id: '',
		loginname: '',
		accessToken: ''
	}
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