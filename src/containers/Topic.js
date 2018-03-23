import { connect } from 'react-redux'
import Topic from '../pages/topic/Topic'

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

export default connect(mapStateToProps)(Topic)