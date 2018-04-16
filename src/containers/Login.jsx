import { connect } from 'react-redux'
import { setLoginInfo } from '../redux/actions'
import Login from '../pages/login/Login'

const mapDispatchToProps = (dispatch) => ({
	setLoginInfo: (loginInfo) => {
		dispatch(setLoginInfo(loginInfo));
	}
})

export default connect(null, mapDispatchToProps)(Login);