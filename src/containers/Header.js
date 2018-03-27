import { connect } from 'react-redux';
import { initLoginInfo } from '../redux/actions';
import Header from '../components/header/Header';


const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

const mapDispatchToProps = (dispatch) => ({
	initLoginInfo: (loginInfo) => {
		dispatch(initLoginInfo(loginInfo))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)