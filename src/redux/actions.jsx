import * as ActionTypes from './actionTypes'

export function login(loginInfo){
	return { type: ActionTypes.LOGIN, loginInfo }
}