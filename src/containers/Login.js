import { connect } from 'react-redux'
import { loginToken } from '../redux/actions'
import Login from '../pages/login/Login'

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

// const mapDispatchToProps = (dispatch) => ({
// 	login: (loginInfo) => {
// 		dispatch(login(loginInfo));
// 	}
// })

export default connect(mapStateToProps)(Login);