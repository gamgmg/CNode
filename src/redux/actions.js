import * as ActionTypes from './actionTypes'

export function setLoginInfo(loginInfo){
	return { type: ActionTypes.LOGIN, loginInfo }
}

export function initLoginInfo(loginInfo){
	return { type: ActionTypes.LOGOUT, loginInfo }
}