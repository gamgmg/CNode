import { connect } from 'react-redux'
import Messages from '../pages/messages/Messages'

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

export default connect(mapStateToProps)(Messages)
