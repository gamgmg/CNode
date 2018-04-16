import { connect } from 'react-redux';
import Home from '../pages/home/Home'

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

export default connect(mapStateToProps)(Home)