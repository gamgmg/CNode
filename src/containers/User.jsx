import { connect } from 'react-redux'
import User from '../pages/user/User'

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

export default connect(mapStateToProps)(User)